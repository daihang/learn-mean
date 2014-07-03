angular.module('activityServices', ['ngResource']).
factory('Activity', function ($resource) {
	return $resource('activities/:activityId', {}, {
		query : {
			method : 'GET',
			params : {
				activityId : 'activities'
			},
			isArray : true
		}
	})
});
