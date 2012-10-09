/*!
 * jQuery placeholder plugin: simple placeholder fix for every browser
 * For Examples and documentation: http://www.powerfuldevelopment.com
 * Authors: Biraj Pandey
 */

(function($) {

    $.fn.placeholder = function(options) {
        var settings = $.extend( {
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
            check_parent: false
        }, options);

        var testInput = document.createElement('input');
        var testTextarea = document.createElement('textarea');
        var pInputSupported = ('placeholder' in testInput);
        var pTextareaSupported = ('placeholder' in testTextarea);
        if(settings.force===true) {
            pInputSupported = false;
            pTextareaSupported = false;
        }

        var navi = navigator.userAgent.toLowerCase();
        var isBrowser = 'others';
        if(navi.indexOf("firefox") > -1)
            isBrowser = 'ff';
        else if(navi.indexOf("opera") > -1)
            isBrowser = 'op';
        else if(navi.indexOf("chrome") > -1)
            isBrowser = 'ch';
        else if(navi.indexOf("msie") > -1)
            isBrowser = 'ie';
        else if(navi.indexOf("safari") > -1)
            isBrowser = 'sa';

        var validTypes = {text:'',email:'',number:'',color:'',date:'',datetime:'','datetime-local':'',
            month:'',password:'',range:'',tel:'',time:'',url:'',week:''};

        return this.each(function() {
            if((this.nodeName!='INPUT' && !(this.getAttribute('type') in validTypes)) && this.nodeName!='TEXTAREA')
                return;
            var node = this.nodeName.toLowerCase();
            var $this = $(this);
            this.settings = settings;
            var hText = findHText($this, this.settings);
            if((node=='input' && pInputSupported) || (node=='textarea' && pTextareaSupported)) {
                $this.attr('placeholder', hText);
            } else {
				if(settings.force)	$this.attr('placeholder', '');
                setupPlaceholder($this, hText, settings);
            }
        });

        function setupPlaceholder($elem, hText) {
            var $span = $("<span>" + hText + "</span>");
            $span.css({position:'absolute',top:'2px',left:'4px',color:settings.color,cursor:'text','font-size':$elem.css('font-size')});
            if($elem[0].nodeName=='INPUT')  $span.css('line-height',$elem[0].offsetHeight+'px');
            for(var i in settings.override_css)
                $span.css(i, settings.override_css[i]);
            for(var j in settings[isBrowser + '_override_css'])
                $span.css(j, settings[isBrowser + '_override_css'][j]);
            var $pwrap = $("<div class='placeholder-wrapper'></div>");
            $pwrap.append($elem.clone());
            $pwrap.append($span);
            $pwrap.css('position', 'relative');
            $elem.data('placeholder_text', hText);
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
        }

        function findHText($elem) {
            var hText = ($elem.attr('placeholder') && $elem.attr('placeholder').length>0) ? $elem.attr('placeholder') : $elem[0].getAttribute('placeholder');
            if(settings.text!='')   hText = settings.text;
            if(hText=='' && settings.search_for && $elem.attr('id')) {
                var $forElem = $("label[for=" + $elem.attr('id') + "]");
                if($forElem.length>0)   hText = $forElem.text();
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
            if(hText=='')   hText = settings.fallback_text;
            hText = hText.replace(/ +(?= )/g, '').replace(/\:/g, '');
            return hText;
        }
    };
})(jQuery);