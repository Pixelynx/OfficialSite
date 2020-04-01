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
         animateSlidePrev;

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