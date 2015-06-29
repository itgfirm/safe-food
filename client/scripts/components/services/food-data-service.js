define(['angular', 'app'],
	function(angular, app){
		app.service('FoodDataService', function(){
			var foodSearchData = null;
			var initialized = false;

			var setFoodSearchData = function(data){
				foodSearchData = data;
			};

			var getFoodSearchData = function(){
				return foodSearchData;
			};

			var setInitialized = function(initialize){
				initialized = initialize;
			};

			var isInitialized = function(){
				return initialized;
			};

			return {
				setFoodSearchData : setFoodSearchData,
				getFoodSearchData : getFoodSearchData,
				setInitialized : setInitialized,
				isInitialized : isInitialized
			};
		});
});