angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,signService, Backand, $http, $rootScope, $ionicPopup, itemsService, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $rootScope.$broadcast('authorized');

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  var vm = this;
  vm.doSignUp = doSignUp;
  vm.doLogin  = doLogin;
  vm.openDishes = openDishes;
  vm.place_order = place_order;

  //Login function
  function doLogin() {
    console.log("ok");
    signService.logining(vm.loginData)
        .then(function () {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for Logining In...'
          });
          vm.loginData.email = '';
          vm.loginData.password = '';
        });
  }

  function openDishes() {
    $scope.list_items = itemsService.getSelectedDishes();

    /*$scope.total_cost =*/ //itemsService.getTotalCost($scope.list_items);
    //console.log(total);
  }

  function place_order() {
    $state.go('app.address');
  }

  // Perform the login action when the user submits the login form
  function doSignUp() {
    signService.addMember(vm.object)
        .then(function (result) {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for signing up...'
          });
          /*vm.object.name = '';
          vm.object.address = '';
          vm.object.email = '';
          vm.object.password = '';
          vm.object.phoneno = '';
          vm.object.landline = '';*/
          $location.path('#/app/list');
        });
  }
})

.controller('CategoryCtrl', function($scope) {
  $scope.categories = [
    { image: 'img/p1.jpg', name: 'French Cusine',id: 1 },
    { image: 'img/p2.jpeg', name: 'Indian Thalli',id: 2 },
    { image: 'img/p3.jpg', name: 'BreakFast',id: 3 },
    { image: 'img/p4.jpg', name: 'Western Cusine',id: 4 },
    { image: 'img/p5.jpg', name: 'South Indian',id: 5 },
    { image: 'img/p6.jpg', name: 'Biryani',id: 6 }
  ];
})
/*ListCtrl for the list.html page*/
.controller('ListCtrl', function($scope, itemsService, $ionicPopup) {
  $scope.list_item = [];

  itemsService.getTodos()
  .then(function (result) {
    $scope.list_items = result.data.data;
    itemsService.saveList(result.data.data);
  });

  $scope.clicked = function (id) {
    itemsService.selectedDish(id);
  };
})
/*Signin controller for the signup.html page*/
.controller('SigninCtrl', function($scope, $ionicModal, $timeout, signinService, Backand, $http, $rootScope, $ionicPopup) {
  var vm = this;
  vm.doLogin  = doLogin;

  //Login function
  function doLogin() {
    signinService.logining(vm.loginData.email)
        .then(function (result) {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for Logining In...'
          });
          vm.loginData.email = '';
          vm.loginData.password = '';
        });
  }
})
.controller('OrderCtrl', function($scope, Backand, $http, $ionicPopup, $state, $location) {
  $scope.order = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Thank You...',
      template: "Your Order has been placed.<br>Get Ready to enjoy."
    });
    $location.path('#/app/list');
  };
});
