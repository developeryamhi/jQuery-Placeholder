/*!
* jQuery placeholder plugin: simple placeholder fix for every browser
* For Examples and documentation: http://www.powerfuldevelopment.com
* Authors: Biraj Pandey
*/

(function($) {

	$.fn.placeholder = function(method) {
		if (placeholder[method] && method.substr(0, 1)!='_') {
			return placeholder[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || !method) {
			return placeholder.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.placeholder' );
		}
	}

	$.placeholder = {};
	$.placeholder.defaults = {
		text: '',
		fallback_text: '',
		force: false,
		color: '#888',
		override_css: {},
		ie_override_css: {},
		ff_override_css: {},
		ch_override_css: {},
		op_override_css: {},
		sa_override_css: {},
		others_override_css: {},
		search_for: false,
		search_label: false,
		search_label_order: 'before,after',
		check_parent: false,
		holder_elem: function() {},
		placeholder_elem: function() {}
	};

	//	Placeholder Library
	var placeholder = {

		//	Browser
		_browser: 'others',

		//	Valid Input Types
		_validTypes: {text:'',email:'',number:'',color:'',date:'',datetime:'','datetime-local':'', month:'',password:'',range:'',tel:'',time:'',url:'',week:''},

		//	Init Placeholder
		init: function(options) {

			//	Resolve Settings
			var settings = $.extend($.placeholder.defaults, options);

			//	Create Input and Textarea for Testing
			var testInput = document.createElement('input');
			var testTextarea = document.createElement('textarea');
			var pInputSupported = ('placeholder' in testInput);
			var pTextareaSupported = ('placeholder' in testTextarea);

			//	Force Placeholder
			if(settings.force===true) {
				pInputSupported = false;
				pTextareaSupported = false;
			}

			//	Detect Browser
			var navi = navigator.userAgent.toLowerCase();
			if(navi.indexOf("firefox") > -1)
				placeholder._browser = 'ff';
			else if(navi.indexOf("opera") > -1)
				placeholder._browser = 'op';
			else if(navi.indexOf("chrome") > -1)
				placeholder._browser = 'ch';
			else if(navi.indexOf("msie") > -1)
				placeholder._browser = 'ie';
			else if(navi.indexOf("safari") > -1)
				placeholder._browser = 'sa';

			//	Loop Through Each Elements
			return this.each(function() {

				//	Check if Element Supports Placeholder
				if((this.nodeName!='INPUT' && !(this.getAttribute('type') in placeholder._validTypes)) && this.nodeName!='TEXTAREA')	return;

				//	Get Element Node Type
				var node = this.nodeName.toLowerCase();

				//	Get Element Object
				var $this = $(this);

				//	Store Settings
				$.data($this, 'placeholder-settings', settings);

				//	Find the Holder Text
				var hText = placeholder._find($this);

				//	Display the Placeholder
				if((node=='input' && pInputSupported) || (node=='textarea' && pTextareaSupported)) {
					$this.attr('placeholder', hText);
				} else {
					if(settings.force)	$this.removeAttr('placeholder');
					placeholder._setup($this, hText);
				}
			});
		},

		holderElement: function() {
			return $(this).parent();
		},

		placeholderElement: function() {
			return $(this).next();
		},

		//	Setup Custom Placeholder
		_setup: function($elem, hText) {
			var settings = $.data($elem, 'placeholder-settings');
            var $span = $("<span>" + hText + "</span>");
            $span.css({position:'absolute',top:'2px',left:'4px',color:settings.color,cursor:'text','font-size':$elem.css('font-size'),cursor:'text'});
            if($elem[0].nodeName=='INPUT') $span.css('line-height',$elem[0].offsetHeight+'px');
            for(var i in settings.override_css)
                $span.css(i, settings.override_css[i]);
            for(var j in settings[placeholder._browser + '_override_css'])
                $span.css(j, settings[placeholder._browser + '_override_css'][j]);
            var $pwrap = $("<div class='placeholder-wrapper'></div>");
            $pwrap.append($elem.clone());
            $pwrap.append($span);
            $pwrap.css('position', 'relative');
            $elem.data('placeholder-text', hText);
            $elem.replaceWith($pwrap);
            $pwrap.find($elem[0].nodeName.toLowerCase()).keyup(function(e) {
                if($(this).val().length>0) {
                    $(this).next().hide(0);
                } else {
                    $(this).next().show(0);
                }
                return true;
            });
            $pwrap.find($elem[0].nodeName.toLowerCase()).keyup();
			$pwrap.click(function(e) {
				$(this).find("span").prev().focus();
				e.preventDefault();
				return false;
			});
			settings.holder_elem($pwrap);
			settings.placeholder_elem($span);
        },

		//	Find the Holder Text for Element
        _find: function($elem) {
			var settings = $.data($elem, 'placeholder-settings');
            var hText = ($elem.attr('placeholder') && $elem.attr('placeholder').length>0) ? $elem.attr('placeholder') : $elem[0].getAttribute('placeholder');
			if(!hText || hText==undefined)	hText = '';
            if(settings.text!='') hText = settings.text;
            if(hText=='' && settings.search_for && $elem.attr('id')) {
                var $forElem = $("label[for=" + $elem.attr('id') + "]");
                if($forElem.length>0) hText = $forElem.text();
            }
            if(hText=='' && settings.search_label) {
                var sorders = settings.search_label_order.split(',');
                for(var i in sorders) {
                    if(sorders[i]=='after' && $elem.next().length>0) {
                        if($elem.next()[0].nodeName=='LABEL') {
                            hText = $elem.next().text();
                            break;
                        }
                    }
                    else if(sorders[i]=='before' && $elem.prev().length>0) {
                        if($elem.prev()[0].nodeName=='LABEL') {
                            hText = $elem.prev().text();
                            break;
                        }
                    }
                }
            }
            if(hText=='' && settings.check_parent) {
                if($elem.parent()[0].nodeName=='LABEL')
                    hText = $elem.parent().text();
            }
            if(hText=='') hText = settings.fallback_text;
            hText = hText.replace(/ +(?= )/g, '').replace(/\:/g, '');
            return hText;
        }
    };

})(jQuery);