define([ 'angular', 'app',
  'features/base/base-config',
  'features/food-recall-search/food-recall-search-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base.food-recall-search', {
        url: '/food-recall-search',
        params: { searchParams: null },
        views: {
          'content@base': {
            templateUrl: 'scripts/features/food-recall-search/food-recall-search.html', //jshint ignore:line
            controller: 'FoodRecallSearchController'
          }
        }
      });
    });

});
