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
  var idName = $(this)[0].className;
  var foodName = ($(this).find('.foodName').text());
  var unique = false;
  var listArray = [];
  var numberOfFoodPortions = {};
  $('#ingredients li').each(function(){
    listArray.push(Number($(this)[0].className));
    var $foodPortions = $(this).find('.numberOfPortions');
    var numberOfPortions = Number($foodPortions.text());
    if(idName == $(this)[0].className) {
      numberOfPortions++;
      unique = true;
    }
    numberOfFoodPortions[Number($(this)[0].className)] = numberOfPortions;
    $foodPortions.text(numberOfPortions);
  });
  if(unique == false) {
    listArray.push(Number($(this)[0].className));
    var updatedListItem = '<li class='+idName+'> <span class="foodName">'+foodName+'</span> <br>Number Of Portions:<span class="numberOfPortions"> 1 </span> </li>';
    numberOfFoodPortions[idName] = 1;
    $('#ingredients').append(
      updatedListItem
    );
  }
  evaluteFinalNutrients(listArray, numberOfFoodPortions);
});


function evaluteFinalNutrients(listArray,numberOfFoodPortions) {
  console.log(listArray);
  console.log(numberOfFoodPortions);
  $('#nutrients').empty();
  var finalNutrientValues = {};
  var reducedArray = dummyFoodData.filter(function(object){
    if(listArray.indexOf(object.id) > -1) {
      return object;
    }
  });
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
