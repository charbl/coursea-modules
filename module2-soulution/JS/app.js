(function() {
  'use strict';
// Create our app LunchCheck
angular.module("ShoppingListCheckOff", [])
.controller("ToBuyShoppingController", ToBuyShoppingController)
.controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);


function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [{name:"Cookies",quanity:30},{name:"Chips",quanity:5},{name:"Soda",quanity:12},{name:"Peanuts",quanity:21},{name:"Bread",quanity:1}];
  var itemsBought = [];

  service.buyItem = function(index) {
    itemsBought.push(itemsToBuy[index]);
    itemsToBuy.splice(index,1);
  };
  service.getBuyItems = function() {
      return itemsToBuy;
  };
  service.getBoughtItems = function() {
      return itemsBought;
  };
};

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
    var ToBuyCtrl = this;
    ToBuyCtrl.items = ShoppingListCheckOffService.getBuyItems();
    ToBuyCtrl.buyItem = function(index) {
      console.log(index);
      ShoppingListCheckOffService.buyItem(index);
    }

};

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
   var BoughtCtrl = this;
   BoughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtItems();

};



// Counts how many items in the string based on comma seperated
})();
