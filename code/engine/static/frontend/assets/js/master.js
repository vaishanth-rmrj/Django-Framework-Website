var masterApp = angular.module('Master',['idyahub','profile','ui.router']);

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
            url: '/idyahub/list',
            template:'',
            controller:'idyahubListPageController',              
        })
    .state('idyahub', {
            url: '/idyahub/:hubName',
            template:'',
            controller:'hubDashboardController',              
        })
    .state('profile', {
            url: '/profile/:username',
            template: '',
            controller:'profilePageController',
                         
        });
    // .state('hublist', {
    //         url: '/idyahub/list',
    //         templateUrl:'/static/frontend/assets/template/idyahub-list.html', 
    //     })
    // .state('profile', {
    //         url: '/profile/:username',
    //         templateUrl:'/static/frontend/assets/template/user_profile.html',      
    //     })
    // .state('idyahubDashboard', {
    //         url: '/idyahub/:hubname',
    //         templateUrl:'/static/frontend/assets/template/idyahub-dashboard.html',      
    //     })
    // .state('idyaDetailView', {
    //         url: '/idya/details/:id',
    //         templateUrl:'/static/frontend/assets/template/idya-detail-view.html',      
    //     });

});
// module parameters initilization
masterApp.run(['$rootScope','$transitions', '$state','$stateParams', 'dashboardService',function($rootScope, $state, $stateParams,$transitions, dashboardService){
 // updated the state on new pageload 
  $rootScope.stateName = "dashboard";
  // $transitions.onStart({}, function(trans) {
  //  console.log("statechange start");
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
  this.idyaBookmark = function(idya,cb){
    console.log(idya);
    $http({
      url:"/api/account/profile/bookmark/"+idya,
      method:'GET'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };


}]);

masterApp.controller('masterController',['$scope','$rootScope','$state','$window','dashboardService',function($scope, $rootScope, $state, $window, dashboardService)
{		  
  // initialize the state to dashboard on every refresh
  $state.go('dashboard');

  // fetch logged in profile
  dashboardService.getActiveProfileData(function(response){
  $scope.activeProfile = response;
  }); 

  // the black box contains all the variables
  // initializing black box
  $rootScope.blackBox = {}

  // inisialise the app
  $scope.showIdyaDetails = false;

  // state change event
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
   console.log("state changed");
   console.log(toState);    
  });

  $scope.updateState = function(stateName){
  if (stateName == 'dashboard')
    {
      $scope.showDashboardNavbar = true;
      $scope.showIdyahubNavbar = false;
      $scope.showProfileNavbar = false;
      $state.go('dashboard');
    }
    else if (stateName == 'hublist')
    {
      
      // $scope.showDashboardNavbar = false;
      // $scope.showProfileNavbar = false;
      $scope.showIdyahubListPage = true;
      
      $state.go('hublist');
    }
    else if (stateName == 'notification')
    {
      
    }
    else
    {
      // $scope.showDashboardNavbar = false;
      // $scope.showIdyahubNavbar = false;
      $scope.showProfilePage = true;
      $state.go('profile',{
        'username': $scope.activeProfile.username,
    })
    };
  };

  mySwiper.on('slideChange', function () {
    var index = mySwiper.activeIndex;
    if (index == 0)
    {
      $scope.updateState('dashboard');
    };
    if (index == 1)
    {
      $scope.updateState('hublist');
      console.log("hublist");
    };
    if (index == 2)
    {
      $scope.updateState('notification');
    };
    if (index == 3)
    {
      $scope.updateState('profile');
    };

  });

	
	$scope.showSideNav = false;
	$scope.toggleSideBar = function(){
		if ($scope.showSideNav == true)
		{ $scope.showSideNav = false }
		else
		{ $scope.showSideNav = true };		
	};

	$scope.showPopup = false;

  // profile search modal
	$scope.showSearchProfileModal = false;
	$scope.toggleSearchProfileModal = function(){
		if ($scope.showSearchProfileModal == true)
		{ 
			$scope.showSearchProfileModal = false;
			$scope.showPopup = false;
      $scope.showSearchDropUp = false;
		}
		else
		{ 
			$scope.showSearchProfileModal = true;
			$scope.showPopup = true; 
      $scope.showSearchDropUp = true;
		};		
	};

  // idya search modal
  $scope.showSearchIdyaModal = false;
  $scope.toggleSearchIdyaModal = function(){
    if ($scope.showSearchIdyaModal == true)
    { 
      $scope.showSearchIdyaModal = false;
      $scope.showPopup = false;
      $scope.showSearchDropUp = false;
    }
    else
    { 
      $scope.showSearchIdyaModal = true;
      $scope.showPopup = true; 
      $scope.showSearchDropUp = true;
    };    
  };

  // idyahub search modal
  $scope.showSearchIdyahubModal = false;
  $scope.toggleSearchIdyahubModal = function(){
    if ($scope.showSearchIdyahubModal == true)
    { 
      $scope.showSearchIdyahubModal = false;
      $scope.showPopup = false;
      $scope.showSearchDropUp = false;
    }
    else
    { 
      $scope.showSearchIdyahubModal = true;
      $scope.showPopup = true; 
      $scope.showSearchDropUp = true;
    };    
  };

// idya comment modal
$scope.showCommentModal = false;

// triggered by emit signal from idyablock template
$scope.$on('toggleCommentModalEvent', function (event, args) {
 
  console.log('idya comment modal toggled');
  $scope.blackBox.idyaFocused = args.idya;
  $scope.toggleCommentModal();

});

$scope.toggleCommentModal = function(){

	if ($scope.showCommentModal == true)
	{ 
    $scope.showPopup = false;
		$scope.showCommentModal = false;		 
	}
	else
	{ 
    $scope.showPopup = true; 
		$scope.showCommentModal = true;
	};		
};



// idya menu modal
$scope.showMenuModal = false;

// triggered by emit signal from idyablock template
$scope.$on('toggleMenuModalEvent', function (event, args) {
 
  console.log('idya menu modal toggled');
  $scope.blackBox.idyaFocused = args.idya;
  $scope.toggleMenuModal();

});

$scope.toggleMenuModal = function(){

  if ($scope.showMenuModal == true)
  { 
    $scope.showPopup = false; 
    $scope.showMenuModal = false;
  }
  else
  { 
    $scope.showPopup = true; 
    $scope.showMenuModal = true;    
  };
};

// display options to add idya
$scope.showAddIdyaModal = false;
// triggered by emit signal from idyahub dashboard
$scope.$on('toggleAddIdyaEvent', function (event, args) {
 
  console.log('displaying idya options');
  $scope.blackBox.addIdyaForHub = args.hubname;
  $scope.toggleAddIdyaModal();

});
$scope.toggleAddIdyaModal = function(){
	if ($scope.showAddIdyaModal == true)
	{ 
		$scope.showAddIdyaModal = false;
		$scope.showPopup = false; 
	}
	else
	{ 
		$scope.showAddIdyaModal = true;
		$scope.showPopup = true; 
	};		
};

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


//for displaying idyahub dashboard
$scope.showIdyahub = false;
$scope.displayIdyahub = function(hubName){
  console.log(hubName);
  $state.go('idyahub',{
    'hubName':hubName
  });
  $scope.showIdyahub = true;
};
// triggered by emit signal from idyahub dashboard
$scope.$on('closeIdyahubEvent', function (event, args) {
 
  console.log('closing idyahub dashboard');
  $scope.closeIdyaHub();

});
$scope.closeIdyaHub = function(){
  console.log("hub closed");
  $scope.showIdyahub = false;
};


//fetch idya details

// triggered by emit signal from idyablock template
$scope.$on('displayIdyaDetailsEvent', function (event, args) {
 
  console.log('displaying idya detials');
  $scope.detailsForTheIdya = args.idya;
  $scope.fetchIdyaDetails();

});
$scope.fetchIdyaDetails =function(slug){
  $scope.showIdyaDetails = true;    
};

$scope.closeIdyaDetails = function(){
  $scope.showIdyaDetails = false;
};



// floating search button
$scope.showSearchDropUp = false;
$scope.openSearchDropUp = function(){
  $scope.showSearchDropUp = true;
};
$scope.closeSearchDropUp = function(){
  $scope.showSearchDropUp = false;
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
masterApp.directive('loadDashboardPage',['dashboardService',function(dashboardService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/assets/template/dashboardPage.html',
    link:function(scope, elem, attrs){
      scope.showDashboardSideNav = false;
      scope.toggleDashboardPageSideNav = function(){
        if (scope.showDashboardSideNav == true) {
          scope.showDashboardSideNav = false;
        }else{
          scope.showDashboardSideNav = true;
        };

      };
    }
  };
}]);

masterApp.directive('searchProfileModal',function(){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/searchProfilePopup.html',
    replace:true,
    controller:function($scope){
    }
  }
})
.directive('searchIdyaModal',function(){
    return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/searchIdyaPopup.html',
    replace:true,
    controller:function($scope){
    }
  }
})
.directive('searchIdyahubModal',function(){
    return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/searchIdyahubPopup.html',
    replace:true,
    controller:function($scope){
    }
  }
})
.directive('commentModal',function(){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/commentPopup.html',
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
.directive('menuModal',function(){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/menuPopup.html',
    replace:true,
    controller:function(){
    },
    link:function(scope, elem, attrs){
      console.log(attrs.idyaSlug);
    }
  }
})
.directive('addIdyaModal',function(){
	  return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/addIdyaPopup.html',
    replace:true,
    controller:function($scope, $attrs){
      console.log($attrs);
      // trigger comment modal
      $scope.emitDisplayIdyaEditorSignal = function (idyaType) {
       $scope.$emit('toggleIdyaEditorEvent',{'idyaType':idyaType});
      };
    },
    link:function(scope, elem, attrs){

    },
  }
});


// directive for rendering idya content
masterApp.directive("idyaBlock",['$http','dashboardService',function($http,dashboardService){
  return{
    restrict:'EA',
    templateUrl:'/static/frontend/assets/template/snippet/idya-block.html',
    replace:true,
    controller:function($scope,$rootScope,$http,dashboardService){
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

    }
  }
}]);

// directive for fetching idyas for the dashboard
masterApp.directive("fetchIdyaForDashboard",['$http','dashboardService',function($http,dashboardService){
  return{
    restrict:'E',
    template: '<div class="dashboardInfoSection">'
              +'<p style="font-size: 18px;" class="punchedText">[[idyas.length]] idyas have been fetched</p>'
              +'</div>'
              +'<hr style="width:100%">'
              +'<idya-block-template></idya-block-template>'
              +'<!-- idicating the competion -->'
              +'<div class="text-center container-fluid" ng-if="idyas">'
              +'<p style="color: rgba(0,0,0,0.4)">You have caught up with all the idyas</p>'
              +'<hr>'
              +'<button type="button" class="nullBtn iBtn">Fetch More idyas</button>'
              +'</div>',
    scope:{
      username:'='
    },
    transclude:true,
    bindToController: true,
    controllerAs: 'fetchIdyaForDashboardCtrl',
    controller: function ($scope,$attrs) {
      setTimeout(function () 
      {
        var myUsername = $attrs.username;
      
      // fetching personalized idyas for dashboard
      dashboardService.getidyas(myUsername, function(response){
          $scope.idyas = response;
          console.log($scope.idyas);
        });
      
      }, 1)
    }
     
   }
}]);

// directive for loading iBlock template and perform its fuctions
masterApp.directive("idyaBlockTemplate",['dashboardService',function(dashboardService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/assets/template/snippet/iBlock.html',
    replace:true,
    controller:function($scope){

    // trigger menu modal
     $scope.emitToggleMenuModalSignal = function (idya) {
       $scope.$emit('toggleMenuModalEvent', { 'idya': idya });
      };
    // trigger comment modal
    $scope.emitToggleCommentModalSignal = function (idya) {
     $scope.$emit('toggleCommentModalEvent', { 'idya': idya });
    };
    // trigger for displaying requested idya details
    $scope.emitDisplayIdyaDetailsSignal = function (idya) {
     $scope.$emit('displayIdyaDetailsEvent', { 'idya': idya });
    };


    },
    link:function(scope, elem, attrs)
    {
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
      scope.bookmark = function(idya){        
        dashboardService.idyaBookmark(idya,function(response){});
        $('#'+idya+'-bookmark-btn').addClass('btn-pressed-animate');

      };
    }
  }
}]);

// directive for rendering idya content
masterApp.directive("fetchIdya",['dashboardService',function(dashboardService){
  return{
    restrict:'E',
    replace:true,
    scope:{},
    templateUrl:'/static/frontend/assets/template/snippet/idyaBlock.html',
    link:function(scope, elem, attrs){
      if (attrs.username)
      {
        dashboardService.getidyas(attrs.username, function(response){
          scope.idyas = response;
          console.log(response);
        });
      };
      if (attrs.Profile)
      {
        dashboardService.getProfileidyas(attrs.Profile, function(response){
          scope.idyas = response;
        });
      };      

      //executed when like button pressed
      scope.liked = function(idya){
        dashboardService.idyaLike(idya.id ,function(response){});
        $('#'+idya.id+'-like-btn').addClass('btn-pressed-animate');
        $('#'+idya.id+'-dislike-btn').removeClass('btn-pressed-animate');
        scope.idya.likeCount++
      };

      //executed when dislike button pressed
      scope.disliked = function(idya){
        dashboardService.idyaDisLike(idya.id ,function(response){});
        $('#'+idya.id +'-dislike-btn').addClass('btn-pressed-animate');
        $('#'+idya.id +'-like-btn').removeClass('btn-pressed-animate');
        scope.idya.dislikeCount++

      };

      //executed when bookmark button pressed
      scope.bookmark = function(idya){
        dashboardService.idyaBookmark(idya,function(response){});
        ('#'+idya+'-bookmark-btn').addClass('btn-pressed-animate');

      };

    }
  }
}]);

//DIRECTIVE FOR LOADING USER IMAGES

masterApp.directive("userImageLoader",function($http){
  return {
    restrict:'EA',
    scope:{
      username: '=',
    },
    replace:true,
    template:"<img ng-src=\"[[ProfilePic]]\" style=\"max-width: 100%;max-height: 100%\">",
    link:function(scope,elements){    
      user = scope.username; // it is an array of username
      username=user[0][0]; // to get the first element
      $http.get("/api/account/profile/fetch/dp/"+username).then(function(response){          
          scope.ProfilePic = response.data.image;
      })
    },

  }
});

// directive for displaying requested idya details
masterApp.directive("idyaDetailView",['dashboardService',function(dashboardService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/assets/template/idya-detail-view.html',
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
        var idya = attrs.forIdya;
        dashboardService.getidyaDetails(idya,function(response){
          scope.idyaDetails = response;
          console.log(response);
        });
      },
  }
}]);

//idya editor section
masterApp.directive("idyaEditorSection",[function(){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/assets/template/idyaEditorTemplate.html',
    scope:{},
    controller:function($scope){
      // trigger for displaying requested idya details
      $scope.emitCloseEditorSignal = function () {
       $scope.$emit('toggleEditorEvent');
      };
    },
    link:function(scope, elem, attrs){
      console.log(attrs.idyaType);
      if(attrs.idyaType == "iLog"){
        scope.showIlogEditor = true;
      }
      else if(attrs.idyaType == "iMage"){
        scope.showImageEditor = true;
      }
      else{
        scope.showIvideoEditor = true;
      }
    },
  }
}]);

//idya editor section
masterApp.directive("iLogEditor",[function(){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/assets/template/snippet/iLogEditor.html',
    controller:function($scope){

      $('#iEditor').trumbowyg({
        btns: [
              ['viewHTML'],
              ['undo', 'redo'], // Only supported in Blink browsers
              ['formatting'],
              ['strong', 'em', 'del'],
              ['superscript', 'subscript'],
              ['link'],
              ['insertImage'],
              ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
              ['unorderedList', 'orderedList'],
              ['horizontalRule'],
              ['removeformat'],
              ['fullscreen']
              ],
          autogrow: true,
      });
    },
    link:function(scope, elem, attrs){
    },
  }
}]);


