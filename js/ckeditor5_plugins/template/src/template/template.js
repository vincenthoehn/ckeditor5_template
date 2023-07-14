import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addListToDropdown, Model } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

import noticeIcon from '@material-design-icons/svg/outlined/info.svg';
import templateIcon from '@material-design-icons/svg/outlined/description.svg';

export default class Template extends Plugin {
    async init() {
        const editor = this.editor;
      	//load config file
        const templateArray = await fetch('/modules/contrib/ckeditor5_template/js/ckeditor5_plugins/template/src/template/ckeditor5_templates.json')
          .then(res => res.json())
          .catch(error => console.error(error));

        editor.ui.componentFactory.add('template', function(locale) {

        const dropdownView = createDropdown(locale);
        dropdownView.buttonView.set({
          label: 'Template',
          withText: true,
          icon: templateIcon,
          tooltip: true
        });
          addListToDropdown(dropdownView, createItems(templateArray));
          dropdownView.listenTo(dropdownView, 'execute', _onexecute);
          dropdownView.render();
          return dropdownView;
        });

        const loadIcon = (name) => {
          try {
            return require(`@material-design-icons/svg/outlined/${name}`).default
          }catch(e){
            console.error(`ckeditor5_template: Could not load ${name}, use default instead!`)
          }
          return noticeIcon
        } 

        //create the items for the dropdown menu
        const createItems = (templateArray) => {
          const collection = new Collection();
            templateArray.forEach (template => {
              const templateElement = new Model ({
                label: template.title, 
                withText: true, 
                icon: loadIcon(template.icon),
                tooltip: template.description,
                html: template.html
              });
              collection.add({
                type: 'button',
                model: templateElement
              });
            });
            return collection;
        }

        //function that is executed when the button is clicked
        const _onexecute = (event) => {
          editor.model.change ( writer => {

            const template = templateArray.find(template => template.title === event.source.label);
            const viewFragment = editor.data.processor.toView(template.html);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(modelFragment, editor.model.document.selection);
          });
        }
        
      }
    }