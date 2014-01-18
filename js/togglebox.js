// jQuery Plugin zum SlideToggle einer Contentbox

(function($) {
    $.fn.toggleBox = function(options) {
        
        var defaults = {
            textOpen: 'Verstecken',
            textClosed: 'Anzeigen',
            onToggle: null, // Callback,
			headingSelector: 'h2',
			slideSpeed: 'slow'
        };
        
        var settings = jQuery.extend(defaults, options);
        return this.each(function() {
            var $this = $(this);
            // alles mit div wrappen, außer Boxüberschrift
            var toggleHelper = $this.children().not(settings.headingSelector).wrapAll('<div class="toogle-helper"></div>').parent();
            var boxID = $this.attr('id') || '';
            if($this.hasClass('toggle-closed'))
                toggleHelper.css('display', 'none');
            
            var buttonText = $this.hasClass('toggle-closed') ? settings.textClosed : settings.textOpen;
            
            $this
                .find(settings.headingSelector)
                .prepend('<a href="#toggledbox" class="closebutton">' + buttonText + '</a>')
                .click(function() {
                    toggleHelper.slideToggle(settings.slideSpeed).parent().toggleClass('toggle-closed');
                    var isOpen = !(toggleHelper.parent().hasClass('toggle-closed'));
                    $(this).find('a').text(isOpen ? settings.textOpen : settings.textClosed);
                    if(settings.onToggle != null)
                        settings.onToggle.call(this, isOpen, boxID);
                });
        
        })
        
      
    }    

})(jQuery);

