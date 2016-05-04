var dummyFoodData = [
  {
    name: 'Apple',
    category: 'fruit'
  },
  {
    name: 'Milk',
    category: 'liquid'
  },
  {
    name: 'Cabbage',
    category: 'veggie'
  }
];



var $listOfFoods = $('#listOfFoods');
var $foodTemplate = $('#food-template');
var compiledFoodTemplate = Handlebars.compile($foodTemplate.html());

dummyFoodData.forEach(function(foodObject){
  $listOfFoods.append(
    compiledFoodTemplate(foodObject)
  );
});
