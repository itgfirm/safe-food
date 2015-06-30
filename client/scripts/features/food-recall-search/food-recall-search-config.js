define([ 'angular', 'app',
  'features/base/base-config',
  'features/food-recall-search/food-recall-search-controller' ],
  function (angular, app) {

    app.config(function($stateProvider) {
      $stateProvider.state('base.foodRecallSearch', {
        url: '/food-recall-search?page',
        views: {
          'content@base': {
            templateUrl: 'scripts/features/\
              food-recall-search/food-recall-search.html',
            controller: 'FoodRecallSearchController'
          }
        }
      });
    });

});
