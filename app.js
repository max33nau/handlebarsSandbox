var dummyFoodData = [
  {
    id: 1,
    name: 'Apple',
    category: 'fruits',
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
    quantity: '1',
    unit: 'whole apple'
  },
  {
    id: 2,
    name: 'Peanut',
    category: 'nuts',
    nutrients: [
      {
        name: 'vitamin C',
        quantity: '1',
        measure: 'cup',
        value: '30',
        unit: 'kcal'
      },
      {
        name: 'vitamin D',
        quantity: '2',
        measure: 'cups',
        value: '40',
        unit: 'kcal'
      }
    ],
    quantity: '10',
    unit: 'nuts'
  }
];

var $listOfFoods = $('#listOfFoods');
var $listOfRecipes = $('#listOfRecipes');
var $foodTemplate = $('#category-template');
var $nutrientTemplate = $('#nutrient-template');
var compiledFoodTemplate = Handlebars.compile($foodTemplate.html());
var compiledNutrientTemplate = Handlebars.compile($nutrientTemplate.html());

dummyFoodData.forEach(function(foodObject){
  $('#'+foodObject.category).append(
    compiledFoodTemplate(foodObject)
  );
});

$('.foodCategory').on('click', 'li', function(event){
  var newListItem = $(this)[0].outerHTML;
  //console.log(newListItem);
  $('#ingredients').append(
    newListItem
  );
  evaluteFinalNutrients();
});


function evaluteFinalNutrients() {
  $('#nutrients').empty();
  var listArray = [];
  var finalNutrientValues = {};
  var numberOfFoodPortions = {};
  $('#ingredients li').each(function(){
    listArray.push(Number($(this)[0].className));
  });
  var reducedArray = dummyFoodData.filter(function(object){
    if(listArray.indexOf(object.id) > -1) {
      return object;
    }
  });
  listArray.forEach(function(id){
    if(!numberOfFoodPortions[id]) {
      numberOfFoodPortions[id] = 1;
    } else {
      numberOfFoodPortions[id]++;
    }
  });
  console.log(numberOfFoodPortions);
  reducedArray.forEach(function(object){
    object.nutrients.forEach(function(nutrientObject){
      var newObject = {};
      if(!finalNutrientValues[nutrientObject.name]) {

        newObject.name = nutrientObject.name;
        newObject.unit = nutrientObject.unit;
        var total = Number(nutrientObject.value) * numberOfFoodPortions[object.id];
        newObject.value = total;
        finalNutrientValues[nutrientObject.name] = newObject;
      } else {
        finalNutrientValues[nutrientObject.name].value +=Number(nutrientObject.value) *numberOfFoodPortions[object.id];
      }
    });
  });
  console.log(finalNutrientValues);
  reducedArray[0].nutrients.forEach(function(nutrientObject) {
    $('#nutrients').append(
      compiledNutrientTemplate(finalNutrientValues[nutrientObject.name])
    );
  });
}

$('#startOver').on('click', function(){
  $('#nutrients').empty();
  $('#ingredients').empty();
});
