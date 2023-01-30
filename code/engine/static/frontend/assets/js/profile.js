var ProfileApp = angular.module("profile",[]);


ProfileApp.service('ProfileService',['$http',function($http){

  // to get the user info of the requested profile
  this.getProfileData = function(username, cb){
    $http({
      url:"/api/account/profile/detail/"+username,
      method:'GET'
    }).then(function(success){
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

  // to get list of user friends
  this.getFriendList = function(username ,cb){
    $http({
      url:"/api/account/profile/friend/list/"+username,
      method:'GET'
    }).then(function(success){
      cb(success.data)
    },function(error){

    });

  };

  // to get list of user friends
  this.getBookmarkedidyaList = function(username, cb){

    $http({
      url:"/api/account/profile/bookmarked/idyas",
      method:'GET'
    }).then(function(success){
      // $(success.data).each(function(index,ele){
      //         var data = ele.post;
      //         text = $(data).text();
      //         ele.post = text;
      //     });
      cb(success.data);;
    },function(error){

    });

  };

}]);

ProfileApp.controller('profilePageController',['$rootScope','$scope','$http','$state','$stateParams','ProfileService','$location',function($rootScope,$scope,$http,$state,$stateParams,ProfileService, $location){

  if($state.params.username)
  {
    $scope.profileName = $state.params.username;
  };
  
  $scope.profilePageStatus = true;

  $scope.ShowBookmarkedIdyas = false;  
  $scope.ShowProfileIdyas = true;
  $scope.ShowFriendList = false;  

  $scope.showidyas = function(criteria){

    $scope.ShowBookmarkedIdyas = false;  
    $scope.ShowProfileIdyas = true;
    $scope.ShowFriendList = false;

    $scope.idyaFilter = criteria;

  };

  $scope.showBookmarkedidyas = function(){
    $scope.ShowBookmarkedIdyas = true;  
    $scope.ShowProfileIdyas = false;
    $scope.ShowFriendList = false;

    ProfileService.getBookmarkedidyaList(username,function(response){
    $scope.Bookmarkedidyas = response;
    console.log($scope.Bookmarkedidyas);
    });

  };

  $scope.fetchFriendsData = function(){

    $scope.ShowFriendList = true;
    $scope.ShowBookmarkedIdyas = false;  
    $scope.ShowProfileIdyas = false;

    };
  


  $scope.editProfileDialogShow = false;
  $scope.editProfileDialog = function(){
    
    console.log($scope.editProfileDialogShow);
    $scope.editProfileDialogShow = true;
    console.log($scope.editProfileDialogShow);
  };

}]);

ProfileApp.controller('idyaDisplayController',['$scope','$http','ProfileService',function($scope,$http,ProfileService){
  

  

}]);

ProfileApp.controller('profileSetupController',['$scope','$http','$stateParams','ProfileService',function($scope,$http,$stateParams,ProfileService){

var username = $stateParams.username;
$scope.editedProfile = {};

$scope.careerOptions = [{display:'Studying',value:'studying'},{display:'Working',value:'working'},{display:'Business',value:'business'},{display:'Entrepreneur',value:'entrepreneur'}]

  ProfileService.getProfileData(username,function(response){
    
  $scope.editedProfile = response;
  $scope.editedProfile.career = response.career;
  });
 

  $scope.careerOptions = [{display:'Studying',value:'studying'},{display:'Working',value:'working'},{display:'Business',value:'business'},{display:'Entrepreneur',value:'entrepreneur'}]

  $scope.editedProfileSave = function(){
    $http({
      url:"/accounts/api/"+username+"/profiledata/",
      data:$scope.editedProfile,
      method:'POST'
    }).then(function(success){
      console.log(success.data);
    },function(error){

    });
  };


}]);

// loading the profile page
ProfileApp.directive('loadProfilePage',['ProfileService',function(ProfileService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/assets/template/profilePage.html',
    link:function(scope, elem, attrs){
      scope.showProfilePageSideNav = false;
      scope.toggleProfilePageSideNav = function(){
        if (scope.showProfilePageSideNav == true) {
          scope.showProfilePageSideNav = false;
        }else{
          scope.showProfilePageSideNav = true;
        };

      };
    }
  };
}]);

ProfileApp.directive('userDataDisplay',['ProfileService',function(ProfileService){

  return {
  	restrict: 'E',
    templateUrl:'/static/frontend/assets/template/snippet/userDataDisplay.html',
    link:function(scope, elem, attrs){
      var username = attrs.username;
      // fetch profile data
      ProfileService.getProfileData(username,function(response){
        scope.Profile = response;
        console.log(scope.Profile);
      });
    }
  };

}]);

// directive for rendering idya content for profile page
ProfileApp.directive("fetchProfileIdya",['ProfileService',function(ProfileService){
  return{
    restrict:'E',
    replace:true,
    scope:{},
    templateUrl:'/static/frontend/assets/template/snippet/profileIdyaBlock.html',
    link:function(scope, elem, attrs){     
      if (attrs.profilename)
      {
        ProfileService.getProfileidyas(attrs.profilename , function(response){
          scope.idyas = response;
        });
      };      

      // //executed when like button pressed
      // scope.liked = function(idya){
      //   dashboardService.idyaLike(idya.id ,function(response){});
      //   $('#'+idya.id+'-like-btn').addClass('btn-pressed-animate');
      //   $('#'+idya.id+'-dislike-btn').removeClass('btn-pressed-animate');
      //   scope.idya.likeCount++
      // };

      // //executed when dislike button pressed
      // scope.disliked = function(idya){
      //   dashboardService.idyaDisLike(idya.id ,function(response){});
      //   $('#'+idya.id +'-dislike-btn').addClass('btn-pressed-animate');
      //   $('#'+idya.id +'-like-btn').removeClass('btn-pressed-animate');
      //   scope.idya.dislikeCount++

      // };

      // //executed when bookmark button pressed
      // scope.bookmark = function(idya){
      //   dashboardService.idyaBookmark(idya,function(response){});
      //   ('#'+idya+'-bookmark-btn').addClass('btn-pressed-animate');

      // };

    }
  }
}]);

ProfileApp.directive('displayFriendList',function($http){
  return{
    restrict:'E',
    scope:{},
    templateUrl:'/static/frontend/assets/template/snippet/displayFriendList.html',
    link: function(scope,elem,attrs){
      var username = attrs.username;
      $http.get("/api/account/profile/friend/list/"+username).then(function(success){
        scope.friendList = success.data;
        console.log(scope.friendList);
      });

      // filtering friend list
      scope.filterFriend = '';
      scope.searchFriend = function(frndName){
        scope.filterFriend = frndName;
      };
    }
  }

});

