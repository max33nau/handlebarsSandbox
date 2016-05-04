var dummyFoodData = [
  {
    name: 'Apple',
    category: 'fruit',
    nutrients: [
      {
        name: 'vitamin C',
        quantity: '1',
        measure: 'cup',
        value: '10',
        unit: 'kcal'
      },
      {
        name: 'vitamin D',
        quantity: '2',
        measure: 'cups',
        value: '20',
        unit: 'kcal'
      }
    ],
    Qty: '1',
    Unit: 'whole apple'
  },
  {
    name: 'Milk',
    category: 'liquid',
    nutrients: [
      {
        name: 'calcium',
        quantity: '2',
        measure: 'cups',
        value: '40',
        unit: 'kcal'
      },
      {
        name: 'vitamin D',
        quantity: '2',
        measure: 'cups',
        value: '20',
        unit: 'kcal'
      }
    ],
    Qty: '1',
    Unit: 'cup'
  },
  {
    name: 'Cabbage',
    category: 'veggie',
    nutrients: [
      {
        name: 'iron',
        quantity: '1',
        measure: 'cup',
        value: '10',
        unit: 'kcal'
      },
      {
        name: 'vitamin D',
        quantity: '2',
        measure: 'cups',
        value: '20',
        unit: 'kcal'
      }
    ],
    Qty: '1',
    Unit: 'whole cabbage'
  }
];

var dummyRecipeData = [
  {
    name: 'Apple bananza',
    ingredients: [
      {
        name: 'apple',
        quantity: '2',
        unit: 'slices',
        calories: '200'
      },
      {
        name: 'banana',
        quantity: '1',
        unit: 'whole',
        calories: '200'
      },
      {
        name: 'apple juice',
        quantity: '20',
        unit: 'ounces',
        calories: '200'
      }
    ],
    totalCalories: '600'
  },
  {
    name: 'Green Machine',
    ingredients: [
      {
        name: 'broccoli',
        quantity: '1',
        unit: 'lb',
        calories: '200'
      },
      {
        name: 'brussel sprouts',
        quantity: '10',
        unit: 'sprouts',
        calories: '100'
      },
      {
        name: 'soymilk',
        quantity: '15',
        unit: 'ounces',
        calories: '250'
      }
    ],
    totalCalories: '550'
  }
];


var $listOfFoods = $('#listOfFoods');
var $listOfRecipes = $('#listOfRecipes');
var $foodTemplate = $('#food-template');
var $recipeTemplate = $('#recipe-template');
var compiledFoodTemplate = Handlebars.compile($foodTemplate.html());
var compiledRecipeTemplate = Handlebars.compile($recipeTemplate.html());

dummyFoodData.forEach(function(foodObject){
  $listOfFoods.append(
    compiledFoodTemplate(foodObject)
  );
});

dummyRecipeData.forEach(function(recipeObject){
  $listOfRecipes.append(
    compiledRecipeTemplate(recipeObject)
  );
});

$listOfRecipes.hide();

var $listOfRecipes = $('#listOfRecipes');
var $listOfFoods = $('#listOfFoods');
$('#mainNav').on('click','li',function(){
  console.log($(this)[0].id );
  if($(this)[0].id == 'navRecipes') {
    $listOfFoods.hide();
    $listOfRecipes.show();
  } else if($(this)[0].id =='navIngredients') {
    $listOfRecipes.hide();
    $listOfFoods.show();
  }
});
