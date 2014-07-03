// Managing the CAMS activity list
function CamsListCtrl($scope, Activity) {
	$scope.activities = Activity.query();
}

// Creating a new activity
function CamsNewCtrl($scope, $location, Activity) {
	$scope.activity = {
		type : '',
		description : ''
	};

	$scope.createActivity = function () {
		var activity = $scope.activity;
		if (activity.type.length > 0 && activity.description.length > 0) {
			var newActivity = new Activity(activity);
			newActivity.$save(function (p, resp) {
				if (!p.error) {
					$location.path('activities');
				} else {
					alert('Could not create activity');
				}
			});
		} else {
			alert('You must enter type and description!');
		}
	};
}
