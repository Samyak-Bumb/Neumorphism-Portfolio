$(document).ready(function() {
   var progresssPath = document.querySelector('.progressss-wrap path');
   var pathLength = progresssPath.getTotalLength();

   progresssPath.style.transition = progresssPath.style.WebkitTransition = 'none';
   progresssPath.style.strokeDasharray = pathLength + ' ' + pathLength;
   progresssPath.style.strokeDashoffset = pathLength;
   progresssPath.getBoundingClientRect();
   progresssPath.style.transition = progresssPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

   var updateprogresss = function() {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progresss = pathLength - (scroll * pathLength / height);
      progresssPath.style.strokeDashoffset = progresss;
   }

   updateprogresss();
   $(window).scroll(updateprogresss);

   var offset = 50;
   var duration = 550;

   jQuery(window).on('scroll', function() {
      if(jQuery(this).scrollTop() > offset) {
         jQuery('.progresss-wrap').addClass('active-progresss');
      }
      else {
         jQuery('.progresss-wrap').removeClass('active-progresss');
      }
   });

   jQuery('.progresss-wrap').on('click', function(event) {
      event.preventDefault();
      jQuery('html, body').animate({scrollTop: 0}, duration);
      return false;
   })
});
