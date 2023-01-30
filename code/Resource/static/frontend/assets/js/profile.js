var ProfileApp = angular.module("profile",[]);


ProfileApp.service('ProfileService',['$http',function($http){

  // to get the user info of the requested profile
  this.getProfileData = function(username,cb){
    $http({
      url:"/accounts/api/"+username+"/profiledata",
      method:'GET'
    }).then(function(success){
      console.log(success.data);
      cb(success.data);
    },function(error){

    });
  };

  // to get the user idyas of the requested profile
  this.getProfileidyas = function(username,cb){
    $http({
      url:"/idya/api/"+username+"/idyas/all/",
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

  // to get list of user friends
  this.getFriendList = function(frnd_array,cb){
    $(frnd_array).each(function(i,user_id){
      usernameArray = []

    $http({
      url:"/accounts/api/"+user_id+"/fetch/username/",
      method:'GET'
    }).then(function(success){
      
      var info = success.data;
      usernameArray.push(info.username);
    },function(error){

    });

    });
    cb(usernameArray);

  };

  // to get list of user friends
  this.getBookmarkedidyaList = function(username,cb){

    $http({
      url:"/api/activity/"+username+"/bookmarked/idyas",
      method:'POST'
    }).then(function(success){
      $(success.data).each(function(index,ele){
              var data = ele.post;
              text = $(data).text();
              ele.post = text;
          });
      cb(success.data);;
    },function(error){

    });

  };

}]);

ProfileApp.controller('profileController',['$scope','$http','$state','$stateParams','ProfileService',function($scope,$http,$state,$stateParams,ProfileService){

  $scope.profilePageStatus = true;

  console.log($state.current);
  var username = $stateParams.username;
  console.log(username);
  $scope.idyaFilter = '';

  $scope.ShowBookmarkedIdyas = false;  
  $scope.ShowProfileIdyas = true;
  $scope.ShowFriendList = false;

  ProfileService.getProfileData(username,function(response){
    $scope.Profile = response;
    console.log(response);
  });


  ProfileService.getProfileidyas(username,function(response){
    $scope.idyas = response;
  });

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
    });

  };

  $scope.fetchFriendsData = function(){

    $scope.ShowFriendList = true;
    $scope.ShowBookmarkedIdyas = false;  
    $scope.ShowProfileIdyas = false;

    Profile = $scope.Profile;
    friends_list = Profile.friends;

    ProfileService.getFriendList(friends_list,function(response){
        $scope.frnds_arry = response;
      });

    };

  $scope.filterFriend = '';
  $scope.searchFriend = function(frnd_name){
    $scope.filterFriend = frnd_name;
    console.log(frnd_name);
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

ProfileApp.controller('profileSetupController',['$scope','$http','$routeParams','ProfileService',function($scope,$http,$routeParams,ProfileService){

var username = $routeParams.username;
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

ProfileApp.directive('userDataDisplay',function(){

  return {
  	restrict: 'E',
    templateUrl:'/static/assets/template/snippet/user-data-display.html',
  };

});

ProfileApp.directive("idyaBlockProfile",function($http){
  return{
    restrict:'EA',
    templateUrl:'/static/assets/template/snippet/idya-block.html',          
    replace:true,
    controller:function($scope,$http){
      //executed when like button pressed
      $scope.liked = function(idya){
        $http.post('/engine/user/'+idya+'/liked/').then(function(response){
            $('#'+idya+'-like-btn').addClass('btn-pressed-animate');
            $('#'+idya+'-dislike-btn').removeClass('btn-pressed-animate');
        });

      };

      //executed when dislike button pressed
      $scope.disliked = function(idya){
        $http.post('/engine/user/'+idya+'/disliked/').then(function(response){
            $('#'+idya+'-dislike-btn').addClass('btn-pressed-animate');
            $('#'+idya+'-like-btn').removeClass('btn-pressed-animate');
        });

      };

      //executed when bookmark button pressed
      $scope.bookmark = function(idya){
        console.log("bookmark button working");
        console.log(idya);

      };

    },
  }
});

// Directive for loading friends list data
ProfileApp.directive("friendListBox",function($http){
  return{
    restrict:'EA',
    templateUrl:'/static/assets/template/snippet/friend-box.html',
    replace:true,
    scope:{
      username:"=",
    },
    controller:function($scope,$http){
      //executed when follow button pressed
    },

    link:function(scope,elements,attrs){

      var friend_name = attrs.username;

      scope.frnd = {};
      scope.frnd.Name = friend_name;
      $http.get("/accounts/api/"+friend_name+"/profiledata/").then(function(response){
        
        scope.friendProfile = response.data;
        console.log(response.data);

      });



    },
  }
});

