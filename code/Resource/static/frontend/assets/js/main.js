var app = angular.module("mainApp",['profile','idyahub','anguvideo','htmlSanitize','ui.router']);

app.run(['$rootScope','$window','dashboardService',function($rootScope,$window,dashboardService){

  dashboardService.getProfileData(function(response){
  $rootScope.activeProfile = response;
  });   

  $rootScope.backButton = function(){
    $window.history.back();
  };
}]);
app.config(function($interpolateProvider) {
  //angular.e.lowercase = angular.$$lowercase;  
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('dashboard', {
            url: '/',
            templateUrl: '/static/assets/template/dashboard.html'
        })
    .state('hublist', {
            url: '/idyahub/list',
            templateUrl:'/static/assets/template/idyahub-list.html', 
        })
    .state('profile', {
            url: '/profile/:username',
            templateUrl:'/static/assets/template/user_profile.html',      
        })
    .state('idyahubDashboard', {
            url: '/idyahub/:hubname',
            templateUrl:'/static/assets/template/idyahub-dashboard.html',      
        });;

});

app.service('dashboardService',['$http',function($http){

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

  // to get the user idyas of the requested profile
  this.getidyas = function(username,cb){
    $http({
      url:"/idya/api/idyas",
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
    console.log(id);
    $http({
      url:"/idya/api/idya/like/",
      method:'POST',
      data:id,
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // executed when dislike button is pressed
  this.idyaDisLike = function(id,cb){
    $http({
      url:"/idya/api/idya/dislike/",
      method:'POST',
      data:id,
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };

  // executed when bookmark button is pressed
  this.idyaBookmark = function(idya,cb){
    $http({
      url:"/api/activity/bookmark/"+idya,
      method:'POST'
    }).then(function(success){
      cb(success.data);
    },function(error){

    });
  };


}]);
app.controller('masterController',['$rootScope','$scope','$http','$state','dashboardService',function($rootScope,$scope,$http,$state,dashboardService){

  $scope.updateState = function(state){
    $rootScope.stateName = $state.get(state)['name']
  }
  
  $scope.showBottomNavStatus = true;
	$scope.commentDialogBoxStatus = false;
	$scope.addCommentBoxStatus = false;
	$scope.showMenuModalStatus = false;
  $scope.showPostIdyaModalStatus = false;
  $scope.showSearchModalStatus = false;

	$scope.UserComment = {};

  

	$scope.trigCommentDialogBox = function(idya){
		$http.get("/comments-api/"+ idya).then(function(response){
          $scope.comments = response.data;
          $scope.idyaSlug = idya;
      	});
		$scope.commentDialogBoxStatus = true;		
    $scope.showBottomNavStatus = false;
	};

	$scope.closeCommentDialogBox = function(){
		$scope.commentDialogBoxStatus = false;
		$scope.addCommentBoxStatus = false;
    $scope.showBottomNavStatus = true;
	}

	$scope.AddCommentDialog = function(){
	    $scope.addCommentBoxStatus = true;
  };

  $scope.CommentSubmit = function(idyaSlug){
  	$scope.UserComment.idyaSlug = idyaSlug;
    var data_obj = $scope.UserComment;
    $http.post("/comments/add-comment/",data_obj).then(function(response){
        console.log(response.data);
        
    });
	};

	$scope.toggleMenuModal = function(opt,idya){
		if (opt == 'open')
		{
			$scope.showMenuModalStatus = true;
      $scope.showBottomNavStatus = false;
		}
		else
		{
			$scope.showMenuModalStatus = false;
      $scope.showBottomNavStatus = true;
		}
  	}

    $scope.togglePostIdyaModal = function(opt){
    if (opt == 'o')
    {
      $scope.showPostIdyaModalStatus = true;
      $scope.showBottomNavStatus = false;
    }
    else
    {
      $scope.showPostIdyaModalStatus = false;
      $scope.showBottomNavStatus = true;
    }
    }

    $scope.toggleSearchModal = function(opt){
    if (opt == 'o')
    {
      $scope.showSearchModalStatus = true;
      $scope.showBottomNavStatus = false;
    }
    else
    {
      $scope.showSearchModalStatus = false;
      $scope.showBottomNavStatus = true;
    }
    }
    
}]);


app.controller('fullscreenSideNavController',function($scope){


});

app.controller('navbarController',['$scope','dashboardService',function($scope,dashboardService){

  $scope.sidebarToggle = function(){
    $('#sidebar-nav-blur').toggleClass('d-none');
    $('#sidebar-nav').addClass('sidebar-nav-show');
    $('#idyaweb-bottom-nav').toggleClass('d-sm-none');
  };

  $scope.sidebarClose = function(){

    $('#sidebar-nav-blur').toggleClass('d-none');
    $('#sidebar-nav').toggleClass('sidebar-nav-show');
    $('#idyaweb-bottom-nav').toggleClass('d-sm-none');
    
  };

}]);

app.controller('dashboardIdyaBlockController',['$scope','$http','dashboardService',function($scope,$http,dashboardService){

  $scope.filterOptions = [{display:'Popularity',value:'popularity'},{display:'Show all',value:''},{display:'iLog',value:'iLog'},{display:'Videos',value:'iVideo'},{display:'Images',value:'iMage'}]
  $scope.idyaFilter = "";

  $scope.userhascommented = false;
  $scope.UserComment ={};

  var username = '';
  dashboardService.getidyas(username,function(response){
    $scope.idyas = response;
    console.log(response);
  });

  
}]);


app.controller('searchController',function($scope,$http){
  $scope.showPopupSearchResult = false;
  $scope.search = function(content){
    if(content && content.length>=4)
    {
    $http.get("/idya-api/idyas-search/"+content+"/").then(function(response){
        console.log(response.data);
        $scope.showPopupSearchResult = true;
        $scope.searchResults = response.data;

    });
  }
  else
  {
    $scope.showPopupSearchResult = false;
  }
  };
});

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.directive("idyaBlock",['$http','dashboardService',function($http,dashboardService){
  return{
    restrict:'EA',
    templateUrl:'/static/assets/template/snippet/idya-block.html',
    replace:true,
    controller:function($scope,$http,dashboardService){
      //executed when like button pressed
      $scope.liked = function(idya){

        console.log(idya);

        dashboardService.idyaLike(idya,function(response){});
        $('#'+idya+'-like-btn').addClass('btn-pressed-animate');
        $('#'+idya+'-dislike-btn').removeClass('btn-pressed-animate');
      };

      //executed when dislike button pressed
      $scope.disliked = function(idya){
        dashboardService.idyaDisLike(idya,function(response){});
        $('#'+idya+'-dislike-btn').addClass('btn-pressed-animate');
        $('#'+idya+'-like-btn').removeClass('btn-pressed-animate');

      };

      //executed when bookmark button pressed
      $scope.bookmark = function(idya){
        dashboardService.idyaBookmark(idya,function(response){});
        $('#'+idya+'-bookmark-btn').addClass('btn-pressed-animate');

      };

    }
  }
}]);

//DIRECTIVE FOR LOADING USER IMAGES

app.directive("userImageLoader",function($http){
  return {
    restrict:'EA',
    scope:{
      username: '=',
    },
    replace:true,
    template:"<img ng-src=\"[[userProfilePic]]\" style=\"max-width: 100%;max-height: 100%\">",
    link:function(scope,elements){    
      user = scope.username;
      username=user[0][0];
      $http.get("/accounts/api/"+username+"/profiledata/").then(function(response){
          
          scope.userProfilePic = response.data.image;
      })
    },

  }
});

//DIRECTIVE FOR HANDLING SEARCH RESULTS

app.directive("searchForm",function($http){
  return{
    restrict:'A',
    templateUrl:'search-form-template.html',
    scope:{
      text: '=',
    },
    replace:true,
    link:function(scope,elements){
      
      scope.search = function(data){
        console.log(data);
        
      $http.get("/idya-api/idyas-search/").then(function(response){
          scope.results = response.data;

      })
    }

    },
  }
});


