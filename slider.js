(function ($) {


   // ==== BEGINS PLUGGIN ==== //
   $.fn.techslider = function (data, callback) {

      // ==== CACHE DOM ==== //
      let $techslider = $(this);
      let $tsContent = $techslider.find('.TS-content');
      let $tsNext = $techslider.find('button#TS-next-btn');
      let $tsPrev = $techslider.find('button#TS-prev-btn');
      let $imgFirst = $tsContent.find('.slide:first');

      // ==== VARIABLES ==== //
      let $imgLast,
         animateSlideNext,
         animateSlidePrev,
         defaults,
         settings,
         animateDuration;

      // === DETERMINE ACTION ====
      // string = method | object or nothing is to initialize
      if (typeof data === 'string') {
         console.log('ACTION -- data === string: ', data)
         getStringArgs(data);
         return $techslider;
      } else if (typeof data === 'object' || typeof data === 'undefined') {
         console.log('ACTION -- data === object || undefined: ', data)

         init();
      };

      // ==== INITIALIZE ==== //
      function init() {
         createSettings();       // merge defaults and user provided options
         saveData();
         selectAnimation();
      };

      // ==== EVENT HANDLERS ==== //
      $tsNext.on('click', animateSlideNext);
      $tsPrev.on('click', animateSlidePrev);
      $techslider.on('click', '.TS-prev-btn, .TS-next-btn');

      // ==== FUNCTIONS ==== //

      // used if method is called after initialization
      function getStringArgs(str) {
         console.log('getStringArgs: ', str)
         if (typeof $techslider.data(str) !== 'undefined') {
            $techslider.data(str)();
         } else {
            console.error("Techslider currently only accepts the following methods: next, prev")
         }
      }

      // saves data object to DOM element
      function saveData() {
         $techslider.data({
            "next": function () { nextOne() },
            "prev": function () { prevOne(); },
            "settings": settings
         });
         console.log('saveData: ', settings)
      }

      // target first and last visible slides before each new animation
      function retargetSlides() {
         $imgFirst = $tsContent.find('.item:first');
         $imgLast = $tsContent.find('.item:last');
      }

      function isItAnimating(callback) {
         if (!$techslider.hasClass('active')) {
            //   $techslider.trigger('ms.before.animate'); // event!
            $techslider.addClass('active');
            callback();    //callback is animation
         }
      };

      // updated options with defaults, measure slide widths for animation calculations, carry out setting implementations
      function createSettings() {
         defaults = settings || {
            continuous: false,	// endless scrolling with no pauses
            slideAll: false,	// slide all visible slides, or just one at a time
            interval: 2000,		// time bewteen slide animation, 0 or 'false' prevents auto-sliding
            duration: 500	    // duration of slide animation
         }
         settings = $.extend({}, defaults, data);

         animateDuration = settings.duration;
         console.log('createSettings -- defaults: ', defaults)
         console.log('createSettings -- settings: ', settings)
      }

      function selectAnimation() {
         animateSlideNext = $techslider.data('next');
         animateSlidePrev = $techslider.data('prev');
      };

      function prevOne() {
         isItAnimating(function () {
            retargetSlides();
            $imgFirst.animate(
               {
                  marginLeft: "-100px"
               }, {
               duration: animateDuration,
               easing: "swing",
               complete: function () {
                  $imgFirst.detach().addClass('hide').removeClass('active').appendTo($tsContent);
                  // doneAnimating();
               }
            }
            );
         });
      };

      function nextOne() {
         isItAnimating(function () {
            retargetSlides();
            $imgLast.css('margin-left', "-100px").prependTo($tsContent);
            $imgLast.animate(
               {
                  marginLeft: 0
               }, {
               duration: animateDuration,
               easing: "swing",
               complete: function () {
                  $imgLast.removeClass('active');
                  //  doneAnimating();
               }
            }
            );
         });
      }
      return $techslider;
   }


})(jQuery);