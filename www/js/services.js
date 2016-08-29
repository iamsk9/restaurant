angular.module('starter.services', [])

.service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

/*Service for the category controller*/
.service('itemsService', function ($http, Backand, $filter) {
  var baseUrl = '/1/objects/';
  var objectName = 'category/';
  var selected = [];
  var list_data = [];

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  getTodos = function () {
    return $http.get(getUrl());
  };

  saveList = function (data) {
    list_data = data;
  };

  getSavedList = function(){
    return list_data;
  };

  selectedDish = function (id) {
    var index = selected.indexOf(id);
    if (index > -1)
        selected.splice(index, 1);
    else
        selected.push(id);
  };

  getSelectedDishes = function(){
    var selected_dishes = [];
    var i;
    var data = [];
    for(i=0;i<selected.length;i++){
      data = data.concat($filter('filter')(list_data, {id:selected[i]}));
      }
    return data;
  };

  getTotalCost  = function(data){
    var i, cost = 0;
    for (i = 0; i < data.length; i++) {
    data += data[i].id;
  }
  console.log(cost*100);
};

  return {
    getTodos: getTodos,
    selectedDish: selectedDish,
    getSelectedDishes: getSelectedDishes,
    saveList: saveList,
    getSavedList: getSavedList,
    getTotalCost: getTotalCost
  };
})

/*Service for the Signup controller*/
.service('signService', function ($http, Backand) {
  var self = this,
  baseUrl = '/1/objects/',
  objectName = 'items/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  addMember = function (data) {
    console.log(data);
    return $http.post(getUrl(), data);
  };

  return {
    addMember: addMember,
  };
})

.service('signinService', function ($http, Backand) {
  var baseUrl = '/1/objects/';
  var objectName = 'items/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  logining = function (data) {
    console.log(data);
    return $http({
            method: 'GET',
            url: getUrl(),
            params: {
                filter: JSON.stringify([{
                    fieldName: "email",
                    operator: "equals",
                    value: data
                }])
            }
        }).then(function (response) {
            if (response.data && response.data.data && response.data.data.length == 1){
                console.log(response.data.data["0"].password);
                return response.data.data[0];
            }
        });
  };

  return {
    logining: logining,
  };
});
