angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
    url: '/LoginPage',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/SignupPage',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
  .state('listPage', {
    url: '/ListPage',
    templateUrl: 'templates/listPage.html',
    controller: 'listPageCtrl',
    resolve: {
      user: function(UserService) {
        return UserService.init();
      }
    }
  })
  .state('detail', {
    url: '/DetailPage/:id',
    templateUrl: 'templates/detail.html',
    controller: 'detailCtrl',
    resolve: {
      user: function(UserService) {
        return UserService.init();
      }
    }
  })  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/ListPage');

});
