'use strict';

angular
  .module('slideshow', ['ngAnimate', 'ngTouch'])
  .directive('slideshow', ['$interval', '$timeout', slideshowDirective]);

function slideshowDirective($interval, $timeout){
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    template: '<img class="slide" ng-repeat="slide in slides" ng-src="{{slide.image}}" ng-show="slide.show" ng-swipe-left="nextSlide()" ng-swipe-right="prevSlide()" width="1200" height="435" alt="">',
    link: linkFunction
  };

  function linkFunction(scope, element){
    // scope variables
    var vm = scope;
    vm.slides = vm.data; // Slides object returned from controller if "data" attribute is set to "slides" in controller
    var i = 0;
    vm.slides[0].show = true;

    // functions
    vm.startSlideshow = startSlideshow;
    vm.nextSlide = nextSlide;
    vm.prevSlide = prevSlide;

    function startSlideshow(direction){
      if (i < vm.slides.length) {
        for (var j = 0; j < vm.slides.length; j++) {
          vm.slides[j].show = false;
        }
        vm.slides[i].show = true;
        if (direction === 'next') {
          i++;
        }
        if (direction ==='prev') {
          if (i > 0) {
            i--;
          } else {
            i = vm.slides.length -1;
          }
        } else {
          // increment at interval when no argument is passed
          i++;
        }
      } else {
        // reset slideshow when transitioning from last slide
        for (var k = 0; k < vm.slides.length; k++) {
          vm.slides[k].show = false;
        }
        i = 0;
        vm.slides[i].show = true;
      }
    }
    $interval(startSlideshow, 5000);
    startSlideshow();

    function nextSlide(){
      startSlideshow('next');
    }
    function prevSlide() {
      startSlideshow('prev');
    }

    $timeout(function(){
      var slideHeight = element.children()[0].offsetHeight;
      element.parent().css('height', slideHeight);
    }, 1000);


  }

}
