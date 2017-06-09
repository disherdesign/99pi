angular.module('romanApp',[])


.controller('romanCtrl', function($scope, romanService){
	$scope.getFeed = function() {
		romanService.getFeed().then(function(response){
			$scope.feed = response.data.items;
			console.log($scope.feed)
		});
		



	}

	   setInterval(function(){
    $scope.getFeed();
  }, 10000)
})

.service('romanService', function($http) {
	this.getFeed = function() {
		return $http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.99percentinvisible.org%2F99percentinvisible')
	}



	})
