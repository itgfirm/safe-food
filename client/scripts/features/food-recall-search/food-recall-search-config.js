define([ 'angular', 'app',
  'features/food-recall-search/food-recall-search-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base.foodRecallSearch', {
        url: '/food-recall-search',
        views: {
          'main@': {
            templateUrl: 'scripts/features/food-recall-search/food-recall-search.html',
            controller: 'FoodRecallSearchController'
          }
        }
      });
    });

});
