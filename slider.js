(function ($) {


   // ==== BEGINS PLUGGIN ==== //
   $.fn.techslider = function (data, callback) {

      // ==== CACHE DOM ==== //
      let $techslider = $(this);
      let $tsContent = $techslider.find('.TS-content');
      let $tsNext = $techslider.find('button.TS-next-btn');
      let $tsPrev = $techslider.find('button.MS-prev-btn');
      let $imgCurrent = $tsContent.find('.active');

      // ==== VARIABLES ==== //
      let animateSlideNext,
         animateSlidePrev,
         defaults,
         settings,
         animateDuration;

      // === DETERMINE ACTION ====
      // string = method | object or nothing is to initialize
      if (typeof data === 'string') {
         getStringArgs(data);
         return $techslider;
      } else if (typeof data === 'object' || typeof data === 'undefined') {
         init();
      };

      // ==== INITIALIZE ==== //
      function init() {
         createSettings();       // merge defaults and user provided options
         // saveData();
         selectAnimation();
      };

      // ==== EVENT HANDLERS ==== //
      $tsNext.on('click', animateSlidePrev);
      $tsPrev.on('click', animateSlideNext);
      $techslider.on('click', '.TS-prev-btn, .TS-next-btn');

      // ==== FUNCTIONS ==== //

      // used if method is called after initialization
      function getStringArgs(str) {
         if (typeof $techslider.data(str) !== 'undefined') {
            $techslider.data(str)();
         } else {
            console.error("Techslider currently only accepts the following methods: next, prev")
         }
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

      }

      function selectAnimation() {
         animateSlideNext = $techslider.data('prev');
         animateSlidePrev = $techslider.data('next');
      };

      function slideLeft() {
         isItAnimating(function () {
            // reTargetSlides();
            $imgCurrent.animate(
               {
                  marginLeft: "-100px"
               }, {
               duration: "1s",
               easing: "swing",
               complete: function () {
                  $imgCurrent.detach().addClass('hide').removeClass('active').appendTo($tsContent);
                  // doneAnimating();
               }
            }
            );
         });
      };
      return $techslider;
   }


})(jQuery);