angular.module('romanApp',['ui.router', 'angularSoundManager'])

.constant('moment', moment)


.directive('filterSideBar', function(){
	return {
		restrict: 'E',
		scope: {

		},
		templateUrl: './filter-side-bar.html'
	}
})



    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./views/view1.html",
            })
            .state('list',{
            	url:'/list',
            	templateUrl:'./views/view2.html',
            	controller: 'romanCtrl'
            })	


        $urlRouterProvider
            .otherwise('/');
        })



.controller('romanCtrl', function($scope, romanService, moment){
	$scope.moment = moment
	$scope.episodes = [];
	$scope.years = romanService.years
	$scope.getFeed = function() {
		romanService.getFeed().then(function(result){
			$scope.feed = romanService.formatEpisodeData(result);
			console.log($scope.feed)
			console.log($scope.years)

		});

	



	}


	   setTimeout(function(){
    $scope.getFeed();
  }, 50)
})

.service('romanService', function($http, $q) {
	var self = this;
	

	this.getFeed = function() {
		var q = $q.defer();
		$http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.99percentinvisible.org%2F99percentinvisible&api_key=pspfagpdvjpu7m4nbe8mcw77nocjyuc73xvkdwfh&count=100')
		// &api_key=pspfagpdvjpu7m4nbe8mcw77nocjyuc73xvkdwfh&count=100
			.then(function(response){
				var data = response.data.items;
				console.log(data)
				q.resolve(data);
			})
			return q.promise;
	};

	self.years = [];
	this.formatEpisodeData = function (result) {
		  for(var i=0;i<result.length;i++) {

		  		var episodeData  = {
		  		id: i.toString(),
		  		title: result[i].title.split('-').reverse()[0],
		  		artist: "Roman Mars",
		  		url: result[i].enclosure.link
		  	}

		  	
		  	result[i].playerData = episodeData;
		  	result[i].year = result[i].pubDate.slice(0,4);
		  	if (self.years.includes(result[i].year) == false) {
		  		self.years.push(result[i].year);
		  	}


		  	result[i].episodeNum = parseInt(result[i].title.split('-')[0])
		  	if (isNaN(result[i].episodeNum)) {
		  		delete result[i].episodeNum;
		  	}
		  	result[i].title = result[i].title.split('-').reverse()[0]



		  }
		 console.log(result)
		 return result
	};

	



	})

// .filter('yearFilter' , function($filter) {
// 	return function(years) {
// 		var i, len;

// 		var checkedYears = $filter('filter')(customers, {checked:true});

// 		if(checkedYears.length == 0) {
// 			return years;
// 		}

// 		var posts = {};
// 		for(i = 0, len = checkedYears.length; i < len; ++i ) {
// 			if(!episodes.hasOwnProperty(checkedYears[i].post)) {
// 				posts[checkedYears[i].post] = true;
// 			}
// 		}

// 		var ret = [];
// 		for (i=0, len = years.length;i < len; ++i) {
// 			if(posts[years[i].post]) {
// 				ret.push(years[i]);
// 			}
// 		}
// 		return ret;
// 	};
// })


// 
