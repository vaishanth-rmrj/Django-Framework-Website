var idyahubApp = angular.module('idyahub',[]);

idyahubApp.service('hubService',['$http',function($http){

  // to get the hub info
  this.getHubData = function(hubname,cb){
    $http({
      url:"/api/idyahub/info/"+hubname,
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get list of user subscribed idyahubs
  this.getHubList = function(cb){
    
    $http({
      url:"/api/idyahub/list/",
      method:'GET'
    }).then(function(success){
      cb(success.data);
      console.log(success.data);
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

idyahubApp.controller('idyahubListPageController',['$rootScope','$scope','hubService',function($rootScope,$scope,hubService){
  
  hubService.getHubList(function(response){
    $scope.HubList = response;
   });

  $scope.showHubSearchFilterBar = false;
  $scope.lookUpIdyahubOpen = function(){
    $scope.showHubSearchFilterBar = true;
  };
  $scope.lookUpIdyahubClose = function(){
    $scope.showHubSearchFilterBar = false;
  };
  
}]);

idyahubApp.controller('hubDashboardController',['$rootScope','$scope','$state','hubService',function($rootScope,$scope,$state,hubService){
  if ($state.params.hubName){
    $scope.hubName = $state.params.hubName;
  };
    
}]);

// loading the dashboard page
idyahubApp.directive('loadIdyahubListPage',['hubService',function(hubService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/assets/template/idyahubListPage.html',
    link:function(scope, elem, attrs){
      scope.showHubListPageSideNav = false;
      scope.toggleHubListPageSideNav = function(){
        console.log('hublist side nav toggled');
        if (scope.showHubListPageSideNav == true) {
          scope.showHubListPageSideNav = false;
        }else{
          scope.showHubListPageSideNav = true;
        };

      };
    }
  };
}]);


idyahubApp.directive('loadIdyahubPage', ['hubService',function(hubService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/assets/template/idyahubPage.html',
    controller:function($scope){
      // close idyahub dashboard
      $scope.emitCloseIdyahubSignal = function () {
        console.log('emitting idyahub close signal');
        $scope.$emit('closeIdyahubEvent');
      };
      // toggle add idya modal
      $scope.emitAddIdyaSignal = function (hubname) {
        console.log('emitting idya add options');
        $scope.$emit('toggleAddIdyaEvent',{'hubname':hubname});
      };
    },
    link: function(scope, elem, attrs){
      var hubName = attrs.hubname;
      // service to fetch hub information
      hubService.getHubData(hubName,function(response){
        scope.hubInfo = response;
      });
      // to toggle side nav
      scope.showHubDashboardSideNav = false;
      scope.toggleHubDashboardSidenav = function(){
        console.log("hub dashboard side nav toggled");
        if ( scope.showHubDashboardSideNav == true )
        {
            scope.showHubDashboardSideNav = false;
        }else{
            scope.showHubDashboardSideNav = true;
        };
      };     
    }
  }
}]);

idyahubApp.directive("fetchHubIdyas",function($http){
  return {
    restrict:'E',
    template:'<idya-block-template></idya-block-template>',      
    link:function(scope,elem,attrs){
      setTimeout(function () 
      {
        $http.get("/api/idyahub/idyas/"+attrs.hubname).then(function(response){       
         scope.idyas = response.data;
         console.log(scope.idyas);
      });
      }, 1000)
      
    },

    
  }
});


