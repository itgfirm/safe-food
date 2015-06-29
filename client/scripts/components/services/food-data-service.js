define(['angular', 'app'],
	function(angular, app){
		app.service('FoodDataService', function(){
			var foodSearchData = null;

			var setFoodSearchData = function(data){
				foodSearchData = data;
			};

			var getFoodSearchData = function(){
				return foodSearchData;
			};
			return {
				setFoodSearchData : setFoodSearchData,
				getFoodSearchData : getFoodSearchData
			};
		});
});