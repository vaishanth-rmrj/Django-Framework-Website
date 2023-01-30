var idyahubApp = angular.module('idyahub',[]);

idyahubApp.run(['$rootScope','dashboardService',function($rootScope,dashboardService){
  
  $rootScope.idyahubDashboardStatus = true;
  
}]);

idyahubApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs}}';
}]);

idyahubApp.service('hubService',['$http',function($http){

  // to get the hub info
  this.getHubData = function(hubname,cb){
    $http({
      url:"/idyahub/api/"+hubname+"/details/",
      method:'GET'
    }).then(function(success){
      cb(success.data);
      console.log(success.data);
    },function(error){

    });
  };

  // to get list of user liked idyahubs
  this.getHubList = function(username,cb){
    
    $http({
      url:"/api/idyahub/"+username+"/hub-list/",
      method:'POST'
    }).then(function(success){
      cb(success.data);
    },function(error){


    });
  };

  // to get the user info of the requested profile
  this.getProfileData = function(cb){
    $http({
      url:"/accounts/api/user/check/active/",
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get the hub idyas
  this.getHubIdyas = function(hubname,cb){
    $http({
      url:"/idya/api/abraidford4/"+hubname+"/idyas/",
      method:'GET'
    }).then(function(success){
          $(success.data).each(function(index,ele){
              var data = ele.post;
              text = $(data).text();
              ele.post = text;
          });
      cb(success.data);
    },function(error){

    });
  };

}]);

idyahubApp.controller('hubController',['$scope','hubService',function($scope,hubService){
  var username = 'vaishanth';
  hubService.getHubList(username,function(response){
    $scope.UserHubList = response;
  });
}]);

idyahubApp.controller('idyahubDashboardController',['$scope','$routeParams','hubService',function($scope,$routeParams,hubService){
  
  var hubname = $routeParams.hubname ;
  hubService.getHubIdyas(hubname,function(response){
    $scope.hubIdyas = response;
  });
  hubService.getHubData(hubname,function(response){
    $routeParams.hubDetails = response;
  });

}]);

idyahubApp.controller('idyahubNavbarController',['$scope','$routeParams','hubService',function($scope,$routeParams,hubService){
  
    $scope.hubDetails = $routeParams.hubDetails;
  
}]);


//DIRECTIVE FOR GATHERING HUB DETAILS


idyahubApp.directive("hubInfoGather",function($http){
  return {
    restrict:'EA',
    controller:function($scope,$element, $attrs){

      $http.get("/idyahub/api/"+$attrs.hubname+"/details/").then(function(response){
         
         $scope.hubDetails = response.data;
      });

    },
  }
});


