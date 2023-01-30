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

  // to get the hub content
  this.getHubContent = function(hubname, filterBy, cb){
    $http({
      url:"/api/idyahub/fetch-content/"+hubname+"/"+filterBy+"/",
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get a preview of the shared idya
  this.getIdyaPreview = function(idyaID,cb){
    $http({
      url:"/api/engine/idya-preview/"+idyaID,
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get the hub question details
  this.getQuestionInfo = function(slug, cb){
    $http({
      url:"/api/qna/question-info/"+slug,
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get the answer for question
  this.getAnswers = function(slug, cb){
    $http({
      url:"/api/qna/question-answer/"+slug,
      method:'GET'
    }).then(function(success){
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

// loading the hub list page
idyahubApp.directive('loadIdyahubListManager',['$rootScope','$state','hubService',function($rootScope, $state, hubService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_list_page/idyahub_list_frame.html',
    link:function(scope, elem, attrs){

      // object containing all the parameters
      scope.hubPageParams = {};
      scope.hubPageParams.hubListParams = {};
      scope.hubPageParams.hubDashboardParams = {}

      scope.hubListParams = {};
      scope.hubListParams.hubDetails = {};

      // watch for state change
      scope.$watch(function(){return $state.current},
       function(newValue, oldValue) {            
      if ($state.$current.includes.hublist){
        if($state.current.name == "hublist.myhub" || $state.current.name == "hublist")
        {
          scope.hubListParams.showPopularHub = false;
          scope.hubListParams.showMyHub = true;
          scope.hubListParams.showHubDashboard = false;
        }
        else if($state.current.name == "hublist.popularhub")
        {
          scope.hubListParams.showPopularHub = true;
          scope.hubListParams.showMyHub = false;
          scope.hubListParams.showHubDashboard = false;
        }
        else if($state.current.name == "hublist.create")
        {
          $rootScope.blackBox.popup.popupStatus = true;
          $rootScope.blackBox.popup.showIdyahubCreationForm = true;
        }else{
          scope.hubListParams.showPopularHub = false;
          scope.hubListParams.showMyHub = true;
          scope.hubListParams.showHubDashboard = false;
        };        
      };
      }, true);
      // initialize the page to my hub section
      $state.go('hublist.myhub');

      scope.toggleMyHubSlide = function(){
        $state.go('hublist.myhub');
      };

      scope.togglePopularHubSlide = function(){
        $state.go('hublist.popularhub');
      };

      // watch for state change
      scope.$watch(function(){return $state.current},
       function(newValue, oldValue) {            
      if ($state.$current.includes.idyahub){

        scope.hubListParams.hubDetails= {};

        if($state.current.name == "idyahub")
        {
          scope.hubListParams.showHubDashboard = true;
          scope.hubListParams.showPopularHub = false;
          scope.hubListParams.showMyHub = false;
        }
        else
        {
          // do nothing
        }
      };
      }, true);    

      scope.toggleHubDashboard = function(hub){
        console.log(hub);
        scope.hubListParams.hubDetails = {};
        scope.hubListParams.hubDetails.name = hub.hubName;
        scope.hubListParams.hubDetails.pic = hub.hubPic;
        console.log(scope.hubListParams.hubDetails);
        $state.go('idyahub',{'hubName':hub.hubName});        
        
      };
      scope.openHubCreationModal = function(){
        console.log("hub creation slide toggled");
        $state.go('hublist.create');
        
      };
      scope.toggleSearchBar = function(){
        if(scope.hubListParams.showSearchBar){
          scope.hubListParams.showSearchBar = false;
        }else{
          scope.hubListParams.showSearchBar = true;
        };
        
      };

      // to change the content type displayed in hub dashboard
      scope.hubPageParams.hubDashboardParams.filterContentBy = 'all';
      scope.hubDashboardContentFilter = function(filterType){
        scope.hubPageParams.hubDashboardParams.filterContentBy = filterType;
        scope.hubPageParams.hubDashboardParams.showHubInfo = false;
      };

      // to display hub info
      scope.openHubInfo = function(){
        scope.hubPageParams.hubDashboardParams.showHubInfo = true;
      };

    }
  };
}]);


// loading the dashboard page
idyahubApp.directive('loadIdyahubDashboard',['$rootScope','$state', 'hubService',function($rootScope, $state, hubService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_dashboard/hub_dashboard.html',
    link:function(scope, elem, attrs){
        console.log('link for hub dashboard working');

      // watch for state change
      scope.$watch(function(){return $state.current},
       function(newValue, oldValue) {            
      if ($state.$current.includes.idyahub){

        if($state.current.name == "idyahub.questiondetailview")
        {
          scope.showQuestionDetailView = true;
          scope.hubListParams.showQuestionDetailView = true;
        }
        else
        {
          scope.showQuestionDetailView = false;
          scope.hubListParams.showQuestionDetailView = false;

        }
      };
      }, true); 


      scope.openAskQuestionModal = function(){
      $rootScope.blackBox.popup.popupStatus = true;
      $rootScope.blackBox.popup.showAskQuestionModal = true;
      $rootScope.blackBox.tempStorage.hubDetails = scope.hubListParams.hubDetails;
      };

    }
  };
}]);

idyahubApp.directive("askQuestionModal",['$rootScope','hubService',function($rootScope, hubService){
  return {
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_list_page/ask_question_modal.html',     
    link:function(scope,elem,attrs){      
      
      scope.closeAskQuestionModal = function(){
        $rootScope.blackBox.popup.popupStatus = false;
        $rootScope.blackBox.popup.showAskQuestionModal = false;
      };
      scope.submitQuestion = function(){
        scope.questionDetail = {};
        scope.questionDetail.question = scope.question;
        scope.questionDetail.hub = $rootScope.blackBox.tempStorage.hubDetails.name;
        scope.questionDetail.user = $rootScope.blackBox.activeProfile.username;

        console.log(scope.questionDetail);
      };
    },
    
  }
}]);

idyahubApp.directive("loadHubContent",['$state', 'hubService', function($state, hubService){
  return {
    restrict:'E',    
    link:function(scope,elem,attrs){   

      scope.fetchHubContent = function(){

      var filterBy = scope.hubPageParams.hubDashboardParams.filterContentBy;
      var hubName = $state.params.hubName; 

      hubService.getHubContent(hubName, filterBy, function(response){
        scope.contents = response;
        console.log(scope.contents);
      });

      };

      // watch for any change in content filter
      scope.$watch(function(){return scope.hubPageParams.hubDashboardParams.filterContentBy},
       function(newValue, oldValue) {

        // update the hub dashboard contents
        scope.fetchHubContent();
      }, true); 

      scope.fetchHubContent();
    },    
  }
}]);

// directive to manage idyahub question box
idyahubApp.directive("loadQuestionBox",['$state',function($state){
  return {
    restrict:'E',  
    templateUrl:'/static/frontend/mobile_assets/template/hub_dashboard/question_box.html',  
    link:function(scope,elem,attrs){      
      scope.openQuestionDetailView = function(question){
        console.log(question.slug);
        $state.go('idyahub.questiondetailview',{'question':question.slug});
        
      };
    },

    
  }
}]);

// directive to manage idyahub shared idya box
idyahubApp.directive("loadSharedIdyaBox",['$state', 'hubService',function($state, hubService){
  return {
    restrict:'E',  
    templateUrl:'/static/frontend/mobile_assets/template/hub_dashboard/shared_idya_box.html',  
    link:function(scope,elem,attrs){      

      hubService.getIdyaPreview(attrs.idyaId, function(response){
        scope.idyaPreview = response;
        console.log(scope.idyaPreview);
      });
      
    },

    
  }
}]);

// directive to display hub info
idyahubApp.directive("loadHubInfo",['$state', 'hubService',function($state, hubService){
  return {
    restrict:'E',  
    templateUrl:'/static/frontend/mobile_assets/template/hub_dashboard/hub_info.html',  
    link:function(scope,elem,attrs){      

      var hubName = $state.params.hubName;
      hubService.getHubData(hubName, function(response){
        scope.hubInfo = response;
        console.log(scope.hubInfo);
      });
      
    },

    
  }
}]);

// directive to manage idyahub question detail
idyahubApp.directive("loadQuestionDetailView",['$state', 'hubService',function($state, hubService){
  return {
    restrict:'E',  
    templateUrl:'/static/frontend/mobile_assets/template/hub_dashboard/question_detail_view.html',  
    link:function(scope,elem,attrs){      
      hubService.getQuestionInfo($state.params.question, function(response){
        scope.question_detail = response;
        console.log(response);
      });

      hubService.getAnswers($state.params.question, function(response){
        console.log("fetching answers");
        scope.answers = response;
        console.log(response);
      });
    },    
  }
}]);


// directive to load my hubs
idyahubApp.directive("loadMyHubSlide",['hubService',function(hubService){

  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_list_page/my_hub_view.html',
    link:function(scope, elem, attrs){
      console.log("link- my hub slide");
      hubService.getHubList(function(response){
        scope.HubList = response;
        console.log(response);
      });
    },

  }
}]);

// directive to load popular hubs
idyahubApp.directive("loadPopularHubSlide",function(){

  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_list_page/popular_hub_view.html',
    link:function(scope, elem, attrs){
      console.log("link- pop hub slide");
    },

  }
});

// directive to load idyahub creation form
idyahubApp.directive("createIdyahubModal",['$rootScope','$state',function($rootScope, $state){

  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/hub_list_page/create_hub_view.html',
    link:function(scope, elem, attrs){
      console.log("link- pop hub slide");
      scope.creationForm = {};
      scope.progress = function(stageNumber){
        console.log("stage number is"+stageNumber);
        scope.progressStageNos = stageNumber;
        if(stageNumber == 1){
          scope.showStage1 = true;
          scope.showStage2 = false;
          scope.showStage3 = false;
        }else if(stageNumber == 2){
          scope.showStage2 = true;
          scope.showStage1 = false;
          scope.showStage3 = false;
        }else{
          scope.showStage3 = true;
          scope.showStage2 = false;
          scope.showStage1 = false;
        }
      };
      scope.showStage1 = true;
      scope.progressStageNos = 1;
      scope.showForm = function(){
        console.log(scope.creationForm);
      };

      scope.closeHubCreationModal = function(){
        $rootScope.blackBox.popup.popupStatus = false;
        $rootScope.blackBox.popup.showIdyahubCreationForm = false;
        $state.go('hublist.myhub');
      };

    },

  }
}]);
