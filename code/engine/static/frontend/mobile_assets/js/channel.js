var channelApp = angular.module('Channel',[]);


// service to interact with channel API
// URL : api/channel/()
channelApp.service('channelService',['$http',function($http){

	// to fetch user channel details
	this.getUserChannelInfo = function(username, cb){
	$http({
	  url:"/api/channel/fetch-info/"+username,
	  method:'GET'
	}).then(function(success){
	  cb(success.data);
	},function(error){

	});
	};

	// to fetch user channel details
	this.getSubscribedChannelsInfo = function(cb){
	$http({
	  url:"/api/channel/subscribed-channels/",
	  method:'GET'
	}).then(function(success){
	  cb(success.data);
	},function(error){

	});
	};

	// to create new channel
	this.createNewChannel = function(channelData, cb){
	$http({
	  url:"/api/channel/create/",
	  method:'POST',
	  data:channelData,
	}).then(function(success){
	  cb(success.data);
	},function(error){

	});
	};

	// to fetch channel idyas
	this.fetchChannelIdyas = function(channelName, filter, cb){
		console.log(filter);
	$http({
	  url:"/api/channel/fetch-idya/"+channelName+"/"+filter+"/",
	  method:'GET',
	}).then(function(success){
	  cb(success.data);
	},function(error){

	});
	};


	// to search for channel
	this.searchChannel = function(channelName, cb){
	$http({
	  url:"/api/channel/search-channel/"+channelName,
	  method:'GET',
	}).then(function(success){
	  cb(success.data);
	},function(error){

	});
	};


	}]);



// controller for the channel application
channelApp.controller('channelPageController'[function(){


	}]);


// directive to manage channel page loading or creation
channelApp.directive('loadChannelManager',['$rootScope','$state','$interval','channelService',function($rootScope,$state, $interval, channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/channel_page_frame.html',
		link:function(scope, elem, attrs){

			$state.go('channel.list');
			
			//toggles search panel
			scope.toggleSearchPanel = function(){
				console.log("toggling search pannel");
				$state.go('channel.search');
				console.log($state.$current.name);

			};

			// idya addition panel
			scope.toggleIdyaSelectPanel = function(){
				$rootScope.blackBox.popup.popupStatus = true;
				$rootScope.blackBox.popup.showAddIdyaPanel = true;
			};	

			// to observer the state change 
			scope.$watch(function(){return $state.$current.name}, 
				function(newVal, oldVal){
					if($state.$current.name == 'channel.list'){
						scope.showChannelList = true;
						scope.showSearchPanel = false;	
						scope.showMyChannelDisplay = false;					
					}
					else if($state.$current.name == 'channel.search'){
						scope.showSearchPanel = true;	
						scope.showMyChannelDisplay = false;
						scope.showChannelList = false;					
					}
					else if($state.$current.name == 'channel.display.mychannel'){
						scope.showMyChannelDisplay = true;
						scope.showSearchPanel = false;
						scope.showChannelList = false;
					}
					else if($state.$current.name == 'channel.create'){
						scope.showCreatePanel = true;
						scope.showMyChannelDisplay = false;
						scope.showSearchPanel = false;
						scope.showChannelList = false;
					}
					else{
						scope.showChannelList = true;
						scope.showCreatePanel = false;
						scope.showMyChannelDisplay = false;
						scope.showSearchPanel = false;						
					};
				});

	        scope.goBack = function(){
	          window.history.back();
	        };
		}
	}
	}]);

channelApp.directive('loadChannelList',['$rootScope', '$state','channelService',function($rootScope, $state, channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/channel_list.html',
		link:function(scope, elem, attrs){
			user = $rootScope.blackBox.activeProfile.username;
			scope.updateChannelListPage = function(){

	        channelService.getUserChannelInfo(user ,function(response){
		          if(response.error){
		          	scope.showCreatePanel = true;
		          }
		          else
		          {
		          	scope.myChannelInfo = response;
		          	console.log(scope.myChannelInfo);
		          }		          
		      });
	        };

	        scope.displayMyChannel = function(){
	        	$state.go('channel.display.mychannel');
	        };
	        scope.updateChannelListPage();

		},
	}
	}]);

channelApp.directive('loadSubscribedChannels',['$rootScope','channelService',function($rootScope, channelService){
	return{
		retrict:'E',
		template:'',
		link:function(scope, elem, attrs){
			console.log("subscribed-channels link workiing");
			scope.updateChannelList= function(){

	        channelService.getSubscribedChannelsInfo(function(response){
		          if(response.status){
		          	scope.subscribedChannelNone = true;
		          }
		          else
		          {
		          	scope.subscribedChannelList = response;
		          	console.log(scope.subscribedChannelList);
		          }		          
		      });
	        };

	        scope.updateChannelList();

		},
	}
	}]);



channelApp.directive('channelCreation',['$rootScope',function($rootScope){
	return{
		retrict:'E',
		template:'',
		link:function(scope, elem, attrs){

			// toggle creation form
			scope.toggleCreateForm = function(){
				console.log("toggling create form");
				if ($rootScope.blackBox.popup.showChannelCreationForm == true){
					console.log("closing the form");
				$rootScope.blackBox.popup.popupStatus = false;
				$rootScope.blackBox.popup.showChannelCreationForm =false;
				}
				else{
				$rootScope.blackBox.popup.popupStatus = true;
				$rootScope.blackBox.popup.showChannelCreationForm =true;
				}
			}
		}
	}
	}]);

channelApp.directive('myChannelDisplay',['$rootScope','$interval','channelService',function($rootScope, $interval, channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/my_channel_display.html',
		link:function(scope, elem, attrs){

			scope.updateChannelInfo = function(){
			var user = $rootScope.blackBox.activeProfile.username;
			channelService.getUserChannelInfo(user ,function(response){
		           	scope.channelInfo = response;
		           	$rootScope.blackBox.channelInfo = response;

		      });
			};
			scope.updateChannelInfo();
			$interval(scope.updateChannelInfo, 5000);
		}
	}	
	}]);

channelApp.directive('channelSearchManager',['channelService',function(channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/channel_search_panel.html',
		link:function(scope, elem, attrs){
			// to search input value change
			scope.$watch(function(){return scope.searchContent}, 
				function(newVal, oldVal){
					console.log(scope.searchContent);
				});
			scope.searchForChannel = function(){
			var channelName = scope.searchContent;
			channelService.searchChannel(channelName ,function(response){
	           	console.log(response);
			});
			};
		}
	}
	}]);

channelApp.directive('createChannelModal',['$rootScope','$state','channelService',function($rootScope, $state, channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/channel_create_form_popup.html',
		link:function(scope, elem, attrs){

			// channel data dict
			scope.newChannel = {};

			scope.closeCreateForm = function(){
				$rootScope.blackBox.popup.popupStatus = false;
				$rootScope.blackBox.popup.showChannelCreationForm =false;
				
			};
			
			scope.stageTransition = function(stageNumb){
				if(stageNumb == 1)
				{
					scope.showStep1 = true;
					scope.showStep2 = false;
				
				}
				else if(stageNumb == 2)
				{
					scope.showStep1 = false;
					scope.showStep2 = true;
				
				}
				else
				{
					scope.showStep1 = true;
					scope.showStep2 = false;
				}
			};

			// initialize to stage 1
			scope.stageTransition();

			scope.createChannel = function(){
				// adding username to the dict
				scope.newChannel.user = $rootScope.blackBox.activeProfile.pk;
				console.log(scope.newChannel);
				channelService.createNewChannel(scope.newChannel,function(response){				
				console.log(response);
				$state.go('channel.display');
				scope.closeCreateForm();
				});
			}
		}
	}
	}]);

channelApp.directive('loadChannelContent',['$rootScope', '$timeout', '$interval', 'channelService',function($rootScope, $timeout, $interval, channelService){
	return{
		retrict:'E',
		templateUrl:'/static/frontend/mobile_assets/template/channel_page/load_channel_content.html',
		link:function(scope, elem, attrs){

			// initialize filter - all
			var filter = "all";
			console.log(filter);

			scope.filterBy = function(type){
				console.log("filter by "+type);
				var filter = type;
				console.log(filter);
				scope.fetchChannelIdyas(filter);
			};
			scope.fetchChannelIdyas =function(filter){
				var channelName = $rootScope.blackBox.channelInfo.name;
				channelService.fetchChannelIdyas(channelName, filter, function(response){
		       		scope.idyas = response;
		       		console.log(scope.idyas);

		       		scope.result = {};
	       			if(response == "" && filter == "blog"){
		       			scope.result.blogIdyasEmpty = true;
		       		}
		       		else if(response == "" && filter == "image"){
		       			scope.result.imageIdyasEmpty = true;
		       		}
		       		else if(response == "" && filter == "video"){
		       			scope.result.videoIdyasEmpty = true;
		       		}
		       		else if(response == "" && filter == "all"){
		       			scope.result.allIdyasEmpty = true;
		       		}
		       		else{};
		    	});
			};
			
			// delay idya fetching function
			$timeout(scope.fetchChannelIdyas, 50);
		}
	}
	}]);