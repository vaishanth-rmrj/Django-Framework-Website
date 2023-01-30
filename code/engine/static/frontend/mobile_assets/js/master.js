var masterApp = angular.module('Master',['idyahub','profile','Channel','ui.router']);

// App congiguration
masterApp.config(function($interpolateProvider) 
{ 
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})
.config(['$locationProvider', function($locationProvider) 
{
  $locationProvider.hashPrefix('');
}])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('dashboard', {
            url: '/',
            template: '', 
            controller:'dashboardPageController',          
        })
    .state('hublist', {
            url: '/idyahub/list/',
            template:'',
            controller:'idyahubListPageController',              
        })
    .state('hublist.myhub', {
            url: 'my-hub/',
            template:'',             
        })
    .state('hublist.popularhub', {
            url: 'popular-hub/',
            template:'',             
        })
    .state('hublist.create', {
            url: 'create-hub/',
            template:'',             
        })
    .state('idyahub', {
            url: '/idyahub/:hubName/',
            template:'',
            controller:'hubDashboardController',              
        })
    .state('idyahub.questiondetailview', {
            url: 'question-details/:question',
            template:'',            
        })
    .state('channel', {
            url: '/channel/',
            template: '',
            controller:'channelPageController',
                         
        })
    .state('channel.list', {
            url: 'list/',
            template: '',
                         
        })
    .state('channel.create', {
            url: 'create/',
            template: '',
                         
        })
    .state('channel.display', {
            url: 'display/',
            template: '',
                         
        })
    .state('channel.display.mychannel', {
            url: 'my-channel/',
            template: '',
                         
        })
    .state('channel.search', {
            url: 'search/',
            template: '',
                         
        })
    .state('profile', {
            url: '/profile/',
            template: '',
            controller:'profilePageController',
                         
        })
    .state('profile.display', {
            url: ':username/',
            template: '',
                         
        })
    .state('profile.edit', {
            url: 'edit/',
            template: '',
                         
        })
    .state('profile.search', {
            url: 'search/',
            template: '',
                         
        })
    .state('notification', {
            url: '/notification/',
            template: '',
                         
        });
    // .state('hublist', {
    //         url: '/idyahub/list',
    //         templateUrl:'/static/frontend/mobile_assets/template/idyahub-list.html', 
    //     })
    // .state('profile', {
    //         url: '/profile/:username',
    //         templateUrl:'/static/frontend/mobile_assets/template/user_profile.html',      
    //     })
    // .state('idyahubDashboard', {
    //         url: '/idyahub/:hubname',
    //         templateUrl:'/static/frontend/mobile_assets/template/idyahub-dashboard.html',      
    //     })
    // .state('idyaDetailView', {
    //         url: '/idya/details/:id',
    //         templateUrl:'/static/frontend/mobile_assets/template/idya-detail-view.html',      
    //     });

});
// module parameters initilization
masterApp.run(['$rootScope','$transitions', '$state','$stateParams', 'dashboardService',function($rootScope, $state, $stateParams,$transitions, dashboardService){
 // updated the state on new pageload 
  $rootScope.stateName = "dashboard";
  // $transitions.onStart({}, function(trans) {
  //  console.log("statechange start");
  // });
  // $transitions.onSuccess({}, function(transition) {
  // console.log(
  //     "Successful Transition from " + transition.from().name +
  //     " to " + transition.to().name
  // );
// });

}]);
masterApp.service('dashboardService',['$http',function($http){

  // to get the user info of the requested profile
  this.getActiveProfileData = function(cb){
    $http({
      url:"/api/account/profile/active/",
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // to get the user idyas of the requested profile
  this.getidyas = function(username,cb){
    $http({
      url:"/api/engine/idya/list/personalized/"+username,
      method:'GET'
    }).then(function(success){

      //$(success.data).each(function(index,ele){
       //       var data = ele.post;
       //       text = $(data).text();
       //       ele.post = text;
       //   });
      cb(success.data);
    },function(error){

    });
  };

  // to get the user idyas of the requested profile
  this.getProfileidyas = function(username, cb){
    $http({
      url:"/api/engine/idya/list/"+username,
      method:'GET'
    }).then(function(success){
      // $(success.data).each(function(index,ele){
      //         var data = ele.post;
      //         text = $(data).text();
      //         ele.post = text;
      //     });
      cb(success.data);
    },function(error){

    });
  };

  // to get user requested idya detaiks
  this.getidyaDetails = function(idyaSlug,cb){
    $http({
      url:"/api/engine/idya/"+idyaSlug,
      method:'GET'
    }).then(function(success){
      //$(success.data).each(function(index,ele){
       //       var data = ele.post;
       //       text = $(data).text();
       //       ele.post = text;
       //   });
      cb(success.data);
    },function(error){

    });
  };

  // executed when like button is pressed
  this.idyaLike = function(id,cb){
    $http({
      url:"/api/engine/idya/"+id+"/like",
      method:'GET',
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // executed when dislike button is pressed
  this.idyaDisLike = function(id,cb){
    $http({
      url:"/api/engine/idya/"+id+"/dislike",
      method:'GET',
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // executed when bookmark button is pressed
  this.idyaBookmark = function(idyaSlug,cb){
    console.log(idyaSlug);
    $http({
      url:"/api/account/profile/bookmark-idya/"+idyaSlug,
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

// to post new idya
  this.postIblog = function(data,cb){
    $http({
      url:"/api/engine/idya/add/",
      method:'POST',
      data : data,
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

}]);

masterApp.controller('masterController',['$scope','$rootScope','$state','$location','$timeout','dashboardService',function($scope, $rootScope, $state, $location, $timeout, dashboardService)
{		  
  
  // fetch logged in profile
  dashboardService.getActiveProfileData(function(response){
    $rootScope.blackBox.activeProfile = response;
  }); 

  // the black box contains all the variables
  // initializing black box
  $rootScope.blackBox = {};

  $rootScope.blackBox.pageStatus = {};
  $rootScope.blackBox.popup = {};
  $rootScope.blackBox.editor = {};
  $rootScope.blackBox.idyaViewer = {};
  $rootScope.blackBox.tempStorage = {};

  $scope.angular = angular;
  // inisialise the app
  $scope.showIdyaDetails = false;

  // to observer the state change and transition between slides
  $scope.$watch(function(){return $state.$current.name}, 
    function(newVal, oldVal){
    // initial state -- dashboard
    console.log('state change has occured');    
    
    var stateName = $state.current.name;
    if (stateName == 'dashboard')
    {
      mySwiper.slideTo(2, 500);
      
    }
    else if ($state.$current.includes.hublist == true)
    {
      
      $rootScope.blackBox.pageStatus.showIdyahubListPage = true;
      mySwiper.slideTo(1, 500);
    }
    else if ($state.$current.includes.channel == true)
    {
      console.log('changing state to channel');
      $rootScope.blackBox.pageStatus.showChannelPage = true;
      mySwiper.slideTo(3, 500);
    }
    else if ($state.$current.includes.notification == true)
    {
      mySwiper.slideTo(0, 500);
    }
    else if (stateName == 'profile' || stateName == 'profile.display' || stateName == 'profile.edit' || $state.$current.includes.profile)
    {
      console.log('changing state to profile');
      if($rootScope.blackBox.pageStatus.showProfilePage){
        mySwiper.slideTo(4, 500);    

      }else{        
        $rootScope.blackBox.pageStatus.showProfilePage = true;
        mySwiper.slideTo(4, 500);
        $state.go('profile.display',{
          'username': $rootScope.blackBox.activeProfile.username,
        });
      };        
    }
    else{
      //  do nothing
    };

    //close all the popup
    $rootScope.blackBox.popup.popupStatus = false;
  });


  mySwiper.on('slideChange', function () {
    var index = mySwiper.activeIndex;
    console.log("slide index " + index);
    if (index == 2)
    {
      $state.go('dashboard');
    }
    else if (index == 1)
    {
      $state.go('hublist');
    }
    else if (index == 0)
    {
      $state.go('notification');
    }
    else if (index == 3)
    {
      $state.go('channel');
    }
    else if (index == 4)
    {
      $state.go('profile.display',{
        'username': $rootScope.blackBox.activeProfile.username,
      });
    }
    else
    {
      $state.go('dashboard');
    };
    console.log($state.current.name);
  });

	$scope.showSideNav = false;
	$scope.toggleSideBar = function(){
		if ($scope.showSideNav == true)
		{ $scope.showSideNav = false }
		else
		{ $scope.showSideNav = true };		
	};

	$scope.showPopup = false;



//inisializing iEditor 
$scope.iEditor = {};
$scope.iEditor.params={}
$scope.showIdyaEditor=false;
// triggered by emit signal from add idya modal
$scope.$on('toggleIdyaEditorEvent', function (event, args) {
 
  console.log('displaying idya editor');
  $scope.toggleIdyaEditor(args.idyaType);

});
// triggered by emit signal from editor navigation
$scope.$on('toggleEditorEvent', function (event, args) {
 
  console.log('closing idya editor');
  $scope.toggleIdyaEditor();

});
$scope.toggleIdyaEditor = function(idyaType){
  console.log(idyaType);
  if ($scope.showIdyaEditor == true)
  { 
    $scope.showIdyaEditor = false;
  }
  else
  { 
    $scope.showIdyaEditor = true;
    $scope.toggleAddIdyaModal();
    $scope.iEditor.params.idyaType = idyaType;
  };    
};

	$scope.goBack = function(){
    window.history.back();
  };

}]);

masterApp.controller('topNavController',['$scope',function($scope)
{	

}]);

masterApp.controller('dashboardPageController',['$scope','dashboardService',function($scope,dashboardService){

  var username = 'vluth98';
  

  
}]);

masterApp.controller('idyaDetailViewController',['$scope','dashboardService',function($scope,dashboardService){



  
}]);

// angular custom directives

// loading the dashboard page
masterApp.directive('loadDashboardManager',['$rootScope', 'dashboardService',function($rootScope, dashboardService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/mobile_assets/template/dashboard_page/dashboard_page_frame.html',
    link:function(scope, elem, attrs){
      scope.showDashboardSideNav = false;
      scope.toggleDashboardPageSideNav = function(){
        if (scope.showDashboardSideNav == true) {
          scope.showDashboardSideNav = false;
        }else{
          scope.showDashboardSideNav = true;
        };
      };

      scope.openFilterIdyaModal = function () {
       $rootScope.blackBox.popup.popupStatus = true;
       $rootScope.blackBox.popup.showFilterIdyaModal = true;
      };
    }
  };
}]);

masterApp.directive('commentModal',function(){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/mobile_assets/template/snippet/commentPopup.html',
    replace:true,
    controller:function($scope){
    },
    link:function(scope, elem, attrs){
      console.log(attrs.idyaSlug);
      // submit user comment
      scope.recentComments = [];
      var dict = [];
      scope.submitComment = function(comment){
        console.log(comment);
        if (comment != undefined && comment != ""){
        dict.push(comment);
        scope.recentComments = dict;
        };
      };
    }
  }
})
.directive('menuModal',['$rootScope',function($rootScope){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/mobile_assets/template/snippet/menuPopup.html',
    replace:true,
    link:function(scope, elem, attrs){
      scope.closeMenuModal = function () {
         $rootScope.blackBox.popup.popupStatus = false;
         $rootScope.blackBox.popup.showMenuModal = false;
        };
    }
  }
}])
.directive('filterIdyaModal',['$rootScope',function($rootScope){
    return{
    restrict:'EA',
    templateUrl:'/static/frontend/mobile_assets/template/snippet/modal_filter_idya.html',
    replace:true,
    link:function(scope, elem, attrs){
      scope.closeFilterIdyaModal = function () {
         $rootScope.blackBox.popup.popupStatus = false;
         $rootScope.blackBox.popup.showFilterIdyaModal = false;
        };
    }
  }
}])
.directive('addIdyaModal',['$rootScope',function($rootScope){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/mobile_assets/template/snippet/addIdyaPopup.html',
    replace:true,    
    link:function(scope, elem, attrs){
      scope.emitDisplayIdyaEditorSignal = function (idyaType) {
       $rootScope.blackBox.editor.showEditorPanel = true;       
       if(idyaType == 'blog'){
        $rootScope.blackBox.editor.editContentType = 'iBlog';
       }
       else if(idyaType == 'image'){
        $rootScope.blackBox.editor.editContentType = 'iMage';
       }
       else if(idyaType == 'video'){
        $rootScope.blackBox.editor.editContentType = 'iVideo';
       }
       else{}
      };
    },
  }
}]);

// directive for fetching idyas for the dashboard
masterApp.directive("loadIdyaLibrary",['$rootScope','dashboardService',function($rootScope,dashboardService){
  return{
    restrict:'E',
    template:'',
    link:function(scope,elem, attrs){
      setTimeout(function () 
      {
      var user = $rootScope.blackBox.activeProfile.username;
      // fetching personalized idyas for dashboard
      dashboardService.getidyas(user, function(response){
          scope.idyas = response;
          console.log(scope.idyas);
        });
      }, 1)
     
   }
    }
}]);

// directive for loading iBlock template and perform its fuctions
masterApp.directive("idyaBlockTemplate",['$rootScope','dashboardService',function($rootScope, dashboardService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/snippet/iBlock.html',
    replace:true,
    link:function(scope, elem, attrs)
    {
        // trigger menu modal
       scope.toggleMenuModal = function (idya) {
         $rootScope.blackBox.popup.popupStatus = true;
         $rootScope.blackBox.popup.showMenuModal = true;
        };
      // trigger comment modal
      scope.toggleCommentModalSignal = function (idya) {
       $scope.$emit('toggleCommentModalEvent', { 'idya': idya });
      };
      // trigger for displaying requested idya details
      scope.displayIdyaDetails = function (idyaSlug) {
       $rootScope.blackBox.idyaViewer.viewIdya = true;
       $rootScope.blackBox.idyaViewer.idyaSlug = idyaSlug;
      };
      //executed when like button pressed
      scope.liked = function(idya){
        dashboardService.idyaLike(idya.id ,function(response){});
        $('#'+idya.id+'-like-btn').addClass('btn-pressed-animate');
        $('#'+idya.id+'-dislike-btn').removeClass('btn-pressed-animate');
      };

      //executed when dislike button pressed
      scope.disliked = function(idya){
        dashboardService.idyaDisLike(idya.id ,function(response){});
        $('#'+idya.id +'-dislike-btn').addClass('btn-pressed-animate');
        $('#'+idya.id +'-like-btn').removeClass('btn-pressed-animate');

      };

      //executed when bookmark button pressed
      scope.bookmark = function(idyaSlug, id){        
        dashboardService.idyaBookmark(idyaSlug,function(response){
          console.log(response.status);
          if(response.status == "removed"){
            $('#'+id+'-bookmark-btn').removeClass('btn-pressed-animate');
          }else{
            $('#'+id+'-bookmark-btn').addClass('btn-pressed-animate');
          };
        });     

      };
    }
  }
}]);


//directive for loading profile pic

masterApp.directive("loadProfilePic",function($http){
  return {
    restrict:'EA',
    scope:{
      username: '=',
    },
    replace:true,
    template:"<img ng-src=\"[[ProfilePic]]\" style=\"max-width: 100%;max-height: 100%\">",
    link:function(scope,elements){    
      console.log("fetching profile iMage");
      user = scope.username; // it is an array of username
      username=user[0][0]; // to get the first element
      console.log(username);
      $http.get("/api/account/profile/fetch-profile-pic/"+username).then(function(response){          
          scope.ProfilePic = response.data.image;
          console.log(scope.ProfilePic);
      })
    },

  }
});

// directive for displaying requested idya details
masterApp.directive("idyaDetailView",['$rootScope','dashboardService',function($rootScope, dashboardService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/idya-detail-view.html',
    replace:true,
    controller:function($scope, dashboardService){
      //executed when like button pressed
      $scope.liked = function(idya){
        dashboardService.idyaLike(idya.id ,function(response){});
        $('#'+idya.id+'-like-btn').addClass('btn-pressed-animate');
        $('#'+idya.id+'-dislike-btn').removeClass('btn-pressed-animate');
        $scope.idya.likeCount++
      };

      //executed when dislike button pressed
      $scope.disliked = function(idya){
        dashboardService.idyaDisLike(idya.id ,function(response){});
        $('#'+idya.id +'-dislike-btn').addClass('btn-pressed-animate');
        $('#'+idya.id +'-like-btn').removeClass('btn-pressed-animate');
        $scope.idya.dislikeCount++

      };     

      //executed when bookmark button pressed
      $scope.bookmark = function(idya){
        dashboardService.idyaBookmark(idya,function(response){});
        $('#'+idya+'-bookmark-btn').addClass('btn-pressed-animate');

      };      

    },
    link:function(scope, elem, attrs){
        var idya = $rootScope.blackBox.idyaViewer.idyaSlug;
        dashboardService.getidyaDetails(idya,function(response){
          scope.idyaDetails = response;
          console.log(response);
        });

      // close idya details display
      scope.closeIdyaDetails = function (idyaSlug) {
       $rootScope.blackBox.idyaViewer.viewIdya = false;
       $rootScope.blackBox.idyaViewer.idyaSlug = "";
      };

      },
  }
}]);

//idya editor section
masterApp.directive("idyaEditorManager",['$rootScope',function($rootScope){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/idyaEditorTemplate.html',
    link:function(scope, elem, attrs){

      // close idya add panel
      $rootScope.blackBox.popup.popupStatus = false;
      $rootScope.blackBox.popup.showAddIdyaPanel = false;
      console.log($rootScope.blackBox.editor.editContentType);
      if($rootScope.blackBox.editor.editContentType == "iBlog"){
        scope.loadIBogEditor = true;
      }
      else if($rootScope.blackBox.editor.editContentType == "iMage"){
        scope.loadImageEditor = true;
      }
      else if($rootScope.blackBox.editor.editContentType == "iVideo"){
        scope.loadIvideoEditor = true;
      }
      else{};

      // initialize to stage 1
      scope.showStage1 = true;
      scope.nextStage = function(){
        if (scope.showStage1){
          scope.showStage2 = true;
          scope.showStage1 = false;
          scope.showStage3 = false;
        }
        else if(scope.showStage2){
          scope.showStage3 = true;
          scope.showStage2 = false;
          scope.showStage1 = false;
        }
        else{
          scope.showStage1 = true;
          scope.showStage3 = false;
          scope.showStage2 = false;
        }
      };
      scope.prevStage = function(){
        if (scope.showStage3){
          scope.showStage2 = true;
          scope.showStage1 = false;
          scope.showStage3 = false;
        }
        else if(scope.showStage2){
          scope.showStage3 = false;
          scope.showStage2 = false;
          scope.showStage1 = true;
        }
        else{
          scope.showStage1 = true;
          scope.showStage3 = false;
          scope.showStage2 = false;
        }
      }
     
    },
  }
}]);

//idya editor section
masterApp.directive("iLogEditor",['$rootScope','dashboardService', function($rootScope, dashboardService){
  return{
    restrict:'E',
    replace : true,
    templateUrl:'/static/frontend/mobile_assets/template/snippet/iLogEditor.html',
    controller:function($scope){

      $('#iEditor').trumbowyg({
        btns: [
              ['undo', 'redo'], // Only supported in Blink browsers
              ['formatting'],
              ['strong', 'em', 'del'],
              ['superscript', 'subscript'],
              ['link'],
              ['insertImage'],
              ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
              ['unorderedList', 'orderedList'],
              ['horizontalRule'],
              ],
          autogrow: false,
      });
    },
    link:function(scope, elem, attrs){

      scope.idyaData = {};
      scope.createDataModel = function(){
        var text = $('#iEditor').trumbowyg('html');
        scope.idyaData.post = text;
        scope.idyaData.channel = $rootScope.blackBox.channelInfo.name;
        scope.idyaData.idyatype = 'iLog';
        console.log(scope.idyaData);
        dashboardService.postIblog(scope.idyaData, function(response){
        
          console.log(response);
        });
      };
      



    },
  }
}]);

//idya editor section
masterApp.directive("loadBottomNavManager",['$rootScope','$state',function($rootScope, $state){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/bottom_nav.html',

    link:function(scope, elem, attrs){

      scope.goState = function(stateName){
        console.log('changing state');
          if (stateName == 'dashboard'){
            $state.go('dashboard');
          }
          else if (stateName == 'channel'){
            $state.go('channel');
          }
          else if (stateName == 'profile'){
            $state.go('profile.display',{'username': $rootScope.blackBox.activeProfile.username,});
          }
          else if (stateName == 'idyahub'){
            $state.go('hublist');
          }
          else if (stateName == 'notification'){
            $state.go('notification');
          }
          else{
            $state.go('dashboard');
          };     
      };
      // to observer the state change
      scope.$watch(function(){return $state.$current.name}, 
        function(newVal, oldVal){
        if ($state.$current.includes.dashboard)
        {
          scope.dashboardIconActive = true;
          scope.idyahubIconActive = false;
          scope.channelIconActive = false;
          scope.notificationIconActive = false;
          scope.profileIconActive = false; 
          
        }
        else if ($state.$current.includes.hublist)
        {
          scope.dashboardIconActive = false;
          scope.idyahubIconActive = true;
          scope.channelIconActive = false;
          scope.notificationIconActive = false;
          scope.profileIconActive = false; 
        }
        else if ($state.$current.includes.channel)
        {
          scope.dashboardIconActive = false;
          scope.idyahubIconActive = false;
          scope.channelIconActive = true;
          scope.notificationIconActive = false;
          scope.profileIconActive = false; 
        }
        else if ($state.$current.includes.notification)
        {
          scope.dashboardIconActive = false;
          scope.idyahubIconActive = false;
          scope.channelIconActive = false;
          scope.notificationIconActive = true;
          scope.profileIconActive = false; 
        }
        else if ($state.$current.includes.profile)
        {
          scope.dashboardIconActive = false;
          scope.idyahubIconActive = false;
          scope.channelIconActive = false;
          scope.notificationIconActive = false;
          scope.profileIconActive = true;          
        }
        else{
          //  do nothing
        };
      }) 
    },
  }
}]);
