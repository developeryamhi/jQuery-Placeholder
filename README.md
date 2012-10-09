jQuery-Placeholder
==================

Placeholder Plugin for jQuery by Biraj Pandey


Examples:
=========

    //  Default
    $("input[type=text]").placeholder();
    $("textarea").placeholder();
    
    //  With Fallback text for Browers with no support to placeholder
    $("input[type=text]").placeholder({fallback_text:'Placeholder Text'});
    $("textarea").placeholder({fallback_text:'Placeholder Text'});
    
    //  Set or Override Existing Placeholder Text
    $("input[type=text]").placeholder({text:'Placeholder Text'});
    $("textarea").placeholder({text:'Placeholder Text'});


Available Options
=================
    text: ''                  //  Sets or Overrides Existing Placeholder Text
    fallback_text: ''         //  Fallback Text for Browser who do not support placeholder attribute
    force: false              //  Force Custom Placerholder on every browser
    color: '#888'             //  Text Color for Custom Placeholder Text
    override_css: {}          //  Global CSS Properties for Custom Placeholder
    ie_override_css: {}       //  IE CSS Properties for Custom Placeholder
    ff_override_css: {}       //  Firefox CSS Properties for Custom Placeholder
    ch_override_css: {}       //  Chrome CSS Properties for Custom Placeholder
    op_override_css: {}       //  Opera CSS Properties for Custom Placeholder
    sa_override_css: {}       //  Safari CSS Properties for Custom Placeholder
    others_override_css: {}   //  Unknown Browsers CSS Properties for Custom Placeholder
    search_for: false         //  Search Placeholder text from 'label' with 'for' attribute for the input field
    search_label: false       //  Search Placeholder text from 'label' before or after the input field
    search_label_order: 'before,after'  //  Order to Search 'label'
    check_parent: false       //  Check if parent element is 'label' and retrieve placeholder text


Credit
======

Copyright 2012, Biraj Pandey ( http://www.powerfuldevelopment.com )
