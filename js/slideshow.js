'use strict';

angular
  .module('slideshow', ['ngAnimate'])
  .directive('slideshow', ['$interval', slideshowDirective]);

function slideshowDirective($interval){
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    template: '<img class="slide" ng-repeat="slide in slides" ng-src="{{slide.image}}" ng-show="slide.show" width="1200" height="435" alt="">',
    link: linkFunction
  };

  function linkFunction(scope){
    var vm = scope;
    vm.slides = vm.data; // Slides object returned from controller if "data" attribute is set to "slides" in controller
    vm.slideIndex = 0;
    var i = 0;
    vm.slides[0].show = true;

    $interval(function(){
      if (i < vm.slides.length) {
        for (var j = 0; j < vm.slides.length; j++) {
          vm.slides[j].show = false;
        }
        vm.slides[i].show = true;
        i++;
      } else {
        i = 0;
      }
    }, 5000);




  }
}
