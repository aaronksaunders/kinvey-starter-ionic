angular.module('app.controllers', [])

.controller('loginCtrl', [
  '$state', '$scope', 'UserService', // <-- controller dependencies
  function($state, $scope, UserService) {

    UserService.init();

    // ng-model holding values from view/html
    $scope.creds = {
      username: "adminuser",
      password: "password"
    };

    /**
     *
     */
    $scope.doLogoutAction = function() {
      UserService.logout()
        .then(function(_response) {
          // transition to next state
          $state.go('login');
        }, function(_error) {
          alert("error logging in " + _error.debug);
        })
    };

    /**
     *
     */
    $scope.doLoginAction = function() {
      UserService.login($scope.creds.username, $scope.creds.password)
        .then(function(_response) {

          alert("login success " + _response.name || _response.username);

          // transition to next state
          $state.go('listPage');

        }, function(_error) {
          alert("error logging in " + _error.description);
        })
    };
  }
])

/**
*
*/
.controller('signupCtrl', ['$scope', '$state', 'UserService', function($scope, $state, UserService) {
  $scope.user = {};

  $scope.doCreateAccount = function() {
    UserService.createUser($scope.user).then(function(_response) {
      console.log("created user", _response);
      alert("login success " + _response.name || _response.username);
      $state.go('listPage');
    }, function(_error) {
      console.log(_error);
      alert("error logging in " + _error.description);
    });
  }
}])

.controller('listPageCtrl', ['$state', '$scope', 'UserService', 'ToDoService', '$ionicModal', // <-- controller dependencies
  function($state, $scope, UserService, ToDoService, $ionicModal) {
    $scope.logout = function() {
      UserService.logout();
      $state.go('login');
    }

    $scope.deleteItem = function(_itemId) {
      ToDoService.deleteItem(_itemId).then(function(_result) {
        console.log("deleted item", _result);
        loadData();
      }, function(err) {
        console.log(err)
      });
    }

    $scope.addItem = function() {

      $scope.todo = {};

      $ionicModal.fromTemplateUrl('templates/todo-input-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal
        $scope.modal.show()
      })

      $scope.closeModal = function(_cancel) {
        $scope.modal.hide();

        if (_cancel === true) return;

        console.log("object to save:", $scope.todo);
        ToDoService.addItem($scope.todo).then(function(_result) {
          console.log("saved item", _result);
          loadData();
        }, function(err) {
          console.log(err)
        });
      };

      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

    }

    function loadData() {
      ToDoService.getAllItems().then(function(models) {
        $scope.dataList = models
      }, function(err) {
        console.log(err)
      });
    }

    loadData();
  }
])

.controller('detailCtrl', function($scope) {

})
