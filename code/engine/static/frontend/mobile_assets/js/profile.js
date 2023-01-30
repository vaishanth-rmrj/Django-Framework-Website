var profileApp = angular.module("profile",[]);


profileApp.service('profileService',['$http',function($http){

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

  // to search for profiles
  this.searchForProfile = function(profileName, cb){
    $http({
      url:"/api/account/profile/search-profile/"+profileName,
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
      url:"/api/account/profile/friend-list/"+username,
      method:'GET'
    }).then(function(success){
      cb(success.data)
    },function(error){

    });

  };

  // to search for profile friend
  this.searchProfileFriend = function(profileName, friendName, cb){
    $http({
      url:"/api/account/profile/search-friend/"+profileName+"/"+friendName,
      method:'GET'
    }).then(function(success){
      cb(success.data)
    },function(error){

    });

  };

  // to get list of user friends
  this.getBookmarkedidyaList = function(username, cb){

    $http({
      url:"/api/account/profile/bookmarked-idyas/",
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

  // to check if the active profile is following the user
  this.checkFollowingStatus = function(profileName, cb){

    $http({
      url:"/api/account/profile/check-friend-status/"+profileName,
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



profileApp.controller('profileSetupController',['$scope','$http','$stateParams','profileService',function($scope,$http,$stateParams,profileService){

var username = $stateParams.username;
$scope.editedProfile = {};

$scope.careerOptions = [{display:'Studying',value:'studying'},{display:'Working',value:'working'},{display:'Business',value:'business'},{display:'Entrepreneur',value:'entrepreneur'}]

  profileService.getProfileData(username,function(response){
    
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

profileApp.controller('profilePageController',['$rootScope','$scope','$http','$state','$stateParams','profileService','$location',function($rootScope,$scope,$http,$state,$stateParams,profileService, $location){

  console.log("profile page controller initialized");
  // executed on URL change
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    console.log($state.current.name);
    if($state.current.name == 'profile')
  {
    $scope.fetchForUsername = $state.params.username;
  };    
  });    

$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams, options){ 
     console.log($state.params.username);
});

  $scope.editProfileDialogShow = false;
  $scope.editProfileDialog = function(){
    
    console.log($scope.editProfileDialogShow);
    $scope.editProfileDialogShow = true;
    console.log($scope.editProfileDialogShow);
  };

}]);

// loading the profile page
profileApp.directive('loadProfileManager',['$state','$timeout','profileService',function($state, $timeout, profileService){
  return {
    restrict: 'E',
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_page_frame.html',
    link:function(scope, elem, attrs){
        // initialize page variables
        scope.username = $state.params.username; 
        scope.search = {};
        scope.search.profile = "";

        // update profile if any changes in state
        scope.$watch(function(){return $state.params.username},
         function(newValue, oldValue) {
          if (newValue !== oldValue) {
            // fetch profile data
            scope.username = $state.params.username; 
          }
        }, true);
        
        // update profile if any changes in state
        scope.$watch(function(){return $state.current},
         function(newValue, oldValue) {            
        if ($state.$current.includes.profile){
          if($state.current.name == "profile.search"){
            scope.showProfileSearchPanel = true;
            scope.showProfileEditPanel = false;
          }else if($state.current.name == "profile.edit"){
            scope.showProfileEditPanel = true;
            scope.showProfileSearchPanel = false;
          }else{
            scope.showProfileEditPanel = false;
            scope.showProfileSearchPanel = false;
          }
        };
        }, true);
        
        // initially load friend list with a delay 
        $timeout( scope.ShowFriendList = true, 1000);
        scope.ShowBookmarkedIdyas = false;  

        scope.fetchProfileFriendsList = function(){
          scope.ShowFriendList = true;
          scope.ShowBookmarkedIdyas = false; 
        };

        scope.fetchProfileBookmarksList = function(){
          scope.ShowBookmarkedIdyas = true; 
          scope.ShowFriendList = false;
        };

        scope.toggleProfileEditPanel = function(){
          $state.go('profile.edit');
        };

        scope.toggleProfileSearchPanel = function(){
          $state.go('profile.search');
        };        
        
    }
  };
}]);

profileApp.directive('profileInfoDisplay',['profileService','$state','$interval',function(profileService, $state, $interval){

  return {
  	restrict: 'E',    
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_info_display.html',
    link:function(scope, elem, attrs){
      
      if ($state.$current.includes.profile == true){

      var fetchProfileInfo = function(){
        // fetch profile data
        var profileName = $state.params.username;
        profileService.getProfileData(profileName ,function(response){
          scope.details = response;
      })
      };

      fetchProfileInfo();

      // update profile info if any changes in state
      scope.$watch(function(){return $state.params.username},
       function(newValue, oldValue) {
        if (newValue !== oldValue) {
          // fetch profile data
          fetchProfileInfo();
        }
      }, true);

      // update info every 5 seconds
      $interval(fetchProfileInfo, 5000);

      }


      } 
  }
}]);

profileApp.directive('profileActionBar',['profileService','$state','$timeout',function(profileService, $state, $timeout){

  return {
    restrict: 'E',    
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_action_bar.html',
    link:function(scope, elem, attrs){      

      // to check active profile follows the user
      var profileName = scope.username;
      $timeout(
      profileService.checkFollowingStatus(profileName ,function(response){
          console.log(response);
          if (response.status == 'friend'){
            scope.userIsFriend = true;
          }else{
            scope.userIsFriend = false;
          };
      }), 5000);


      }


      } 
  
}]);


// directive to display profile friend list
profileApp.directive('displayFriendsList',['profileService',function(profileService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_friend_list.html',
    link: function(scope,elem,attrs){

      scope.fetchFriendsList = function(){
        console.log("fetching friend list");
        var username = scope.username;
        console.log(username);
        profileService.getFriendList(username ,function(response){
          scope.friendsList = response;
      });
      };

    scope.$watch('username', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        // update friend list
        scope.fetchFriendsList();
      }      
    }, true);

    scope.searchProfileFriend = function(){
      var profileName = scope.username;
      var friendName = scope.search.friendName;
      profileService.searchProfileFriend(profileName,  friendName, function(response){
        if(angular.equals(scope.friendsList, response)){
          // do nothing
        }else{
          console.log("updating friendList");
          scope.friendsList = response;
        };
      });
      if (scope.search.friendName == ""){
        // fetch all friends list
        scope.fetchFriendsList();
      };
    }
      //fetch friends list
      scope.fetchFriendsList();
    }
  
}
}]);

// directive to display bookmarked idyas
profileApp.directive('displayBookmarkIdyaList',['profileService',function(profileService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_bookmarked_idyas_display.html',
    link: function(scope,elem,attrs){

      scope.fetchBookmarkedIdyasList = function(){
        var username = scope.username;
        profileService.getBookmarkedidyaList(username ,function(response){
          scope.idyas = response;
      });
      };
      
    scope.$watch('username', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        // update bookmark list
        fetchBookmarkedIdyasList();
      }
      
    }, true);
  
    }
  }
}]);

// directive to search for profile
profileApp.directive('loadProfileSearchPanel',['$rootScope', 'profileService',function($rootScope, profileService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_search_panel.html',
    link: function(scope,elem,attrs){

      scope.$watch(function(){return scope.search.profile},
       function(newValue, oldValue) {
        var profileName = scope.search.profile;
        profileService.searchForProfile(profileName ,function(response){
          if(response.status){
            scope.searchResultsNone = true;
          }else{
            scope.searchResultsNone = false;
            scope.profileSearchResults = response;
            console.log(response);
          };
        });
      }, true);
  
    }
  }
}]);

// directive to edit profile details
profileApp.directive('loadProfileEditPanel',['$rootScope', 'profileService',function($rootScope, profileService){
  return{
    restrict:'E',
    templateUrl:'/static/frontend/mobile_assets/template/profile_page/profile_edit_panel.html',
    link: function(scope,elem,attrs){

      scope.fetchActiveProfileDetails = function(){
        var username = $rootScope.blackBox.activeProfile.username;
        profileService.getProfileData(username ,function(response){
          scope.editedProfile = response;
        });
      };
      scope.fetchActiveProfileDetails();
  
    }
  }
}]);

//directive for sticky nav functioning
profileApp.directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window);
    console.log(angular.element($window)) ;// wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                offsetTop = element.offset().top; // get element's top relative to the document
                console.log(offsetTop);
              angular.element($window).bind("scroll", function () {
                      var fromTop = $window.pageYOffset;
                      var body = angular.element(document).find('body');
                      body.toggleClass('down', (fromTop > 400));
                    });
              console.log('$window', $window);
      console.log('element', element);
            }
    };
});