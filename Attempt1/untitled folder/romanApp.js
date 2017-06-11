angular.module('romanApp',['angularSoundManager'])

.constant('moment', moment)



.controller('romanCtrl', function($scope, romanService, moment){
	$scope.moment = moment
	$scope.getFeed = function() {
		romanService.getFeed().then(function(response){
			$scope.feed = response.data.items;
			console.log($scope.feed)
		});
		
		$scope.cat = ["cat", 'fog', 'blog', 'coffee', "stout"]


	}

	   setTimeout(function(){
    $scope.getFeed();
  }, 100)
})

.service('romanService', function($http) {
	this.getFeed = function() {
		return $http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.99percentinvisible.org%2F99percentinvisible&api_key=jpo2dfep1qddbkbrkkthp6wpxxcvuj6wa3wzbgic&count=150')
	}



	})


// https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.99percentinvisible.org%2F99percentinvisible
