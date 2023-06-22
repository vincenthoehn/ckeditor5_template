import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addListToDropdown, Model } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

import stockIcon from '/var/www/html/swportl/web/modules/custom/ckeditor5_template/icons/templateIcons/noticeIcon.svg';
import templateIcon from '/var/www/html/swportl/web/modules/custom/ckeditor5_template/icons/template.svg';
import * as svgIcons from '/var/www/html/swportl/web/modules/custom/ckeditor5_template/icons/templateIcons'; 

export default class Template extends Plugin {
    async init() {
        const editor = this.editor;
      	//load config file
        const templateArray = await fetch('/themes/cideon/js/ckeditor5/ckeditor5_templates.json')
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

        //create the items for the dropdown menu
        const createItems = (templateArray) => {
          const collection = new Collection();
            templateArray.forEach (template => {
              const templateElement = new Model ({
                label: template.title, 
                withText: true, 
                icon: svgIcons[template.icon] || stockIcon,
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