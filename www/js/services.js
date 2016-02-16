angular.module('app.services', [])
  .service('ToDoService', ['$q', 'KinveyConfiguration', '$kinvey',
    function($q, KinveyConfiguration, $kinvey) {

      return {
        getAllItems: function() {
          var promise = $kinvey.DataStore.find('todo-collection');
          promise.then(function(models) {
            return models;
          }, function(err) {
            console.log(err)
            return err;
          });

          return promise;
        },
        /**
         * @param _id
         */
        deleteItem: function(_id) {
          var promise = $kinvey.DataStore.destroy('todo-collection', _id);
          promise.then(function() {
            return true;
          }, function(err) {
            console.log(err)
            return err;
          });
          return promise;
        },

        /**
         * @param _model.title
         * @param _model.status
         * @param _model.description
         */
        addItem: function(_model) {
          var promise = $kinvey.DataStore.save('todo-collection', _model);
          promise.then(function(model) {
            return model;
          }, function(err) {
            console.log(err)
            return err;
          });
          return promise;
        }
      }
    }
  ])

.service('UserService', ['$q', 'KinveyConfiguration', '$kinvey',
    function($q, KinveyConfiguration, $kinvey) {

      var initialized = false;


      return {

        /**
         *
         * @returns {*}
         */
        init: function() {
          try {
            var d = $q.defer();

            function getTheUser() {
              var d = $q.defer();
              $kinvey.User.me().then(function(currentUser) {
                return d.resolve(currentUser);
              }, function(err) {
                return d.reject({
                  error: "noUser"
                });
              });
              return d.promise;
            }

            console.log("in init");

            // if initialized, then return the activeUser
            if (initialized === false) {
              // Initialize Kinvey
              $kinvey.init(KinveyConfiguration).then(function() {
                  initialized = true;
                  console.log("in init: initialized");
                  return getTheUser();
                })
                .then(function(_user) {
                  console.log("in init got user: ", _user);
                  return d.resolve(_user);
                }, function(err) {
                  console.log("in init error: ", err);
                  return d.reject({
                    error: "noUser",
                    kinveyError: err
                  });
                });
              return d.promise;
            } else {
              return getTheUser();
            }



          } catch (EE) {
            console.log(EE)
          }

        },
        /**
         *
         * @param _userParams
         */
        createUser: function(_userParams) {

          var user = new Parse.User();
          user.set("username", _userParams.email);
          user.set("password", _userParams.password);
          user.set("email", _userParams.email);
          user.set("first_name", _userParams.first_name);
          user.set("last_name", _userParams.last_name);

          // should return a promise
          return user.signUp(null, {});

        },
        /**
         *
         * @param _parseInitUser
         * @returns {Promise}
         */
        currentUser: function(_parseInitUser) {

          // if there is no user passed in, see if there is already an
          // active user that can be utilized
          _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

          console.log("_parseInitUser " + Parse.User.current());
          if (!_parseInitUser) {
            return $q.reject({
              error: "noUser"
            });
          } else {
            return $q.when(_parseInitUser);
          }
        },
        /**
         *
         * @param _user
         * @param _password
         * @returns {Promise}
         */
        login: function(_user, _password) {
          return $kinvey.User.login(_user, _password);
        },
        /**
         *
         * @returns {Promise}
         */
        logout: function(_callback) {

          var defered = $q.defer();

          var user = $kinvey.getActiveUser();
          if (null !== user) {
            $kinvey.User.logout().then(function() {
              console.log("logged out", user);
            }, function(err) {
              console.log("Error: logged out", err);
            });
          }
        }

      }
    }
  ])
  .factory('BlankFactory', [function() {

  }])

.service('BlankService', [function() {

}]);
