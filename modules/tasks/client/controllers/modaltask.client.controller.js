(function() {
    'use strict';
    // Tasks controller
    angular.module('tasks').directive('enterDirective', function() {
      return {
        link: function(scope, element, attrs) {
          $(element).keypress(function(e) {
            if (e.keyCode == 13) {
              console.log("Enter pressed " + element.val())
            }
          });
        }
      }
    }).config(function($mdDateLocaleProvider) {

        // $mdDateLocaleProvider.formatDate = function(date) {
        //   return moment(date).format('YYYY-MM-DD');
        // };
            $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
      };

    }).controller('ModalTaskCtrl', ModalTaskCtrl); ModalTaskCtrl.$inject = ['$scope', '$state', 'Authentication', '$modal',
    '$log', '$http', 'TasksService'
  ];

  function ModalTaskCtrl($scope, $state, Authentication, $modal, $log, $http,
    TasksService) {
    newTask.$inject = ['TasksService'];

    function newTask(TasksService) {
      return new TasksService();
    }
    //    vm.task.dueDate = new Date();
    $scope.minDate = new Date();
    $scope.format = 'dd/MM/yyyy';
    $scope.altInputFormats = ['d!/M!/yyyy'];
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    var app = this;
    // $scope.taskCategories = [{
    //   'cat': 'Cleaning',
    //   'filter': 'vm.task.cleaning'
    // } 
    // // {
    // //   'cat': 'Moving & Delivery',
    // //   'filter': 'moving: true'
    // // }, {
    // //   'cat': 'DIY',
    // //   'filter': 'DIY: true'
    // // }, {
    // //   'cat': 'Marketing & Design',
    // //   'filter': 'marketing: true'
    // // }, {
    // //   'cat': 'Online & IT',
    // //   'filter': 'online: true'
    // // }, {
    // //   'cat': 'Events & Photography',
    // //   'filter': 'photoEvents: true'
    // // }, {
    // //   'cat': 'Business & Admin',
    // //   'filter': 'office: true'
    // // }, {
    // //   'cat': 'Fun & Quirky',
    // //   'filter': 'funQuirky: true'
    // // }, {
    // //   'cat': 'Misc & Other ',
    // //   'filter': 'misc: true'
    // // }
    // ];
    app.closeAlert = function() {
      app.reason = null;
    };
    app.open = function(size) {
      var modalInstance = $modal.open({
        templateUrl: '/modules/tasks/client/views/createTaskModal.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: newTask
        },
        size: size
      });
      modalInstance.result.then(function(data) {
        app.closeAlert();
        app.summary = data;
      }, function(reason) {
        app.reason = reason;
      });
    };
  }
})();