angular.module('trackCAMS', ['activityServices'])
.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.
			when('/activities', {
				templateUrl : 'partials/list.html',
				controller :
				CamsListCtrl
			}).
			when('/new', {
				templateUrl : 'partials/new.html',
				controller :
				CamsNewCtrl
			}).
			otherwise({
				redirectTo : '/activities'
			});
		}
	]);
