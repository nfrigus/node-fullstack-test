import angular from 'angular';
import Operation from './Operation';


angular.module('app', [])
  .controller('AppController', ['$scope', 'operation', AppController])
  .component('dateInput', {
    templateUrl: 'templates/date-input.html',
    controller: DateInputController,
    bindings: {
      ngModel: '=',
    }
  })
  .factory('operation', function() {
    return new Operation([]);
  });

function AppController($scope , operation) {
  $scope.timestamp = Date.now();
  $scope.reset = () => { $scope.timestamp = Date.now() };
}


function DateInputController() {
  this.ngModel = 0;
  this.days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31,
  ]
  this.months = [
    { title: 'Jan', value: 0 },
    { title: 'Feb', value: 1 },
    { title: 'Mar', value: 2 },
    { title: 'Apr', value: 3 },
    { title: 'May', value: 4 },
    { title: 'Jun', value: 5 },
    { title: 'Jul', value: 6 },
    { title: 'Aug', value: 7 },
    { title: 'Sep', value: 8 },
    { title: 'Oct', value: 9 },
    { title: 'Nov', value: 10 },
    { title: 'Dec', value: 11 },
  ]

  this.year = (function (value) {
    const date = new Date(this.ngModel);
    value = +value;

    if (arguments.length && 1970 <= value && value < 1e4) {
      date.setFullYear(value);
      this.ngModel = date.getTime();
    }

    return date.getFullYear();
  }).bind(this);

  this.day = (function (value) {
    const date = new Date(this.ngModel);
    value = +value;

    if (arguments.length && 1 <= value && value <= 31) {
      date.setDate(value);
      this.ngModel = date.getTime();
    }

    return date.getDate();
  }).bind(this);

  this.month = (function (value) {
    const date = new Date(this.ngModel);
    value = +value;
    if (arguments.length && 0 <= value && value <= 11) {
      date.setMonth(value);
      this.ngModel = date.getTime();
    }

    return date.getMonth();
  }).bind(this);
}
