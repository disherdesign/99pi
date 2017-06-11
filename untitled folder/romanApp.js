angular.module('romanApp',[])


.constant('moment', moment);

.controller('romanCtrl', function($scope, romanService, moment){
	$scope.getFeed = function() {
		romanService.getFeed().then(function(result){
			$scope.feed = romanService.formatEpisodeData(result);
			console.log($scope.feed)
		});
	};




	   setTimeout(function(){
    $scope.getFeed();
  }, 100)
})

.service('romanService', function($http, $q) {
	 

	this.getFeed = function() {
		var deferred = $q.defer();

		$http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.99percentinvisible.org%2F99percentinvisible&api_key=jpo2dfep1qddbkbrkkthp6wpxxcvuj6wa3wzbgic&count=30')
			.then(function(response){
				var data = response.data;
				console.log(data)
				deferred.resolve(data);
			});
			return deferred.promise;
		};
	this.formatEpisodeData = function(result){
		var parsedResults = [];

  		for(var i=0;i<result.length;i++) {
  			var newObj= {
  				title:result[i].title,
  				date:result[i].pubDate
  			};
  			parsedResults.push(newObj);
		}
		return parsedResults;
	};
});



	// this.formatDate = function(date){
	// 	var arr = date.slice(0,10).split("-");
 //  		var newDate = [];
 //  		newDate.push(arr[1]);
 //  		newDate.push(arr[2]);
 //  		newDate.push(arr[0]);
 //  		newDate = newDate.join('.');
 //  		return newDate
	// }



	
