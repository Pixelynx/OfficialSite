(function ($) {


   // ==== BEGINS PLUGGIN ==== //
   $.fn.techslider = function (data, callback) {

      // ==== CACHE DOM ==== //
      let $techslider = $(this);
      let $tsContent = $techslider.find('.TS-content');
      let $tsNext = $techslider.find('button.TS-next-btn');
      let $tsPrev = $techslider.find('button.MS-prev-btn');
      let $imgCurrent = $msContent.find('.active');

      // ==== VARIABLES ==== //
      let animateSlideNext,
      animateSlidePrev;

      // ==== EVENT HANDLERS ==== //
      $tsNext.on('click', animateSlidePrev);
      $tsPrev.on('click', animateSlideNext);
      $multislider.on('click','.TS-prev-btn, .TS-next-btn');

      // ==== FUNCTIONS ==== //

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