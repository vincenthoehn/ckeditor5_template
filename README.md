
# Drupal CKEditor 5 Template
(This project is no longer being developed here and may no longer be up to date. 
For more information, issues, current releases, check out the official Drupal project page!
https://www.drupal.org/project/ckeditor5_template
)

This project provides a CKEditor5 plugin for Drupal. It allows to insert predefined content.  

It is a successor of the Drupal ckeditor_template module. The predecessor is unfortunately only compatible with CKEditor4. To ensure that the template functionality also works with CKEditor5, we have developed the module. 




## Installation

* Enable ckeditor5 
* Clone the repo into your modules directory:
  `git clone git@git.drupal.org:project/ckeditor5_template.git`
* Install as you would normally install a contributed Drupal module.
  See https://www.drupal.org/docs/extending-drupal/installing-modules for more
  information.
* Go to `admin/config/content/formats` and drag the template button from the available buttons to the active tool list and save

Thats all :)

## Usage

There is the file `ckeditor5_template/js/ckeditor5_plugins/template/src/template/ckeditor5_templates.json`
in the project. It is a JSON file that is loaded at runtime. 
Your own content can be stored here in the following format:

```json
[
    {
      "title": "Link",
      "icon": "add_link.svg",
      "description": "Insert a link to the Drupal CKEditor5 project page.",
      "html": "<p>Do you know this cool <a href='https://www.drupal.org/project/ckeditor5' target='_blank'>editor</a>?</p>"
    },
...
]
```

* title | `string`
* icon | `*svg` from https://marella.me/material-design-icons/demo/font/#outlined
* description | `string`
* html | `any custom html code`

You have the possibility to choose from over 1000 available SVG. All outlined material-design-icons have been integrated into the build file. This is also the reason for the size of the file. 
When creating the template file, you only have to select an available SVG from https://marella.me/material-design-icons/demo/font/#outlined and enter it under `icons`.

## Demo
![ckeditor5_template](https://github.com/vincenthoehn/ckeditor5_template/assets/78547173/9fda4c64-a416-4b10-b46c-360daeded1b8)

 
