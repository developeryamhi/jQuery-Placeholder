jQuery-Placeholder
==================

Placeholder Plugin for jQuery by Biraj Pandey


Examples:
=========

    //  Default
    $("input[type=text], textarea").placeholder();
    
    //  With Fallback text for Browers with no support to placeholder
    $("input[type=text], textarea").placeholder({fallback_text:'Placeholder Text'});
    
    //  Set or Override Existing Placeholder Text
    $("input[type=text], textarea").placeholder({text:'Placeholder Text'});


Available Options
=================
    text: ''                  	//  Sets or Overrides Existing Placeholder Text
    fallback_text: ''         	//  Fallback Text for Browser who do not support placeholder attribute
    force: false              	//  Force Custom Placerholder on every browser
    color: '#888'             	//  Text Color for Custom Placeholder Text
    css: {}						//  Global CSS Properties for Custom Placeholder
    explorer_css: {}       		//  IE CSS Properties for Custom Placeholder
    firefox_css: {}       		//  Firefox CSS Properties for Custom Placeholder
    chrome_css: {}       		//  Chrome CSS Properties for Custom Placeholder
    opera_css: {}       		//  Opera CSS Properties for Custom Placeholder
    safari_css: {}       		//  Safari CSS Properties for Custom Placeholder
    others_css: {}   			//  Unknown Browsers CSS Properties for Custom Placeholder
    search_for: false         	//  Search Placeholder text from 'label' with 'for' attribute for the input field
    search_label: false       	//  Search Placeholder text from 'label' before or after the input field
    search_label_order: 'before,after'  			//  Order to Search 'label'
    check_parent: false       						//  Check if parent element is 'label' and retrieve placeholder text
	holder_elem: function($elem, browser) {}		//	Callback for Main Holder Element for Custom Placeholder
	placeholder_elem: function($elem, browser) {}	//	Callback for Placeholder Element


Available Methods
=================
	$(SELECTOR).placeholder('holderElement');			//	Returns Main Holder Element for Custom Placeholder
	$(SELECTOR).placeholder('placeholderElement');		//	Returns Custom Placeholder Element


Credit
======

Copyright 2012, Biraj Pandey ( http://www.powerfuldevelopment.com )
