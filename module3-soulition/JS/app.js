(function() {
  'use strict';
// Create our app LunchCheck
angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&',
      removeAll: '&'
    },
    controller: FoundItemDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
};

function FoundItemDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['$http'];
function MenuSearchService($http) {
    var MenuSearchServ = this;
    MenuSearchServ.getMatchedMenuItems = function(searchTerm) {
      return $http({url:"https://davids-restaurant.herokuapp.com/menu_items.json"}).then(function (result) {
    // process result and only keep items that match
        var foundItems = result.data.menu_items;
        var macthedItems = [];
        foundItems.forEach(function(item) {
          if(item.description.toLowerCase().indexOf(searchTerm) !== -1) {
            macthedItems.push(item);
          }
        });
    // return processed items
    return macthedItems;
    });
  }
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var NiDwnCtrl = this;
    NiDwnCtrl.items;
    NiDwnCtrl.searchForItems = function() {
      var promise = MenuSearchService.getMatchedMenuItems(NiDwnCtrl.searchTxt);
      promise.then(function (response) {
        NiDwnCtrl.items = response;
      }).catch(function (error) {
          console.log("Something went terribly wrong.");
      });
    };
    NiDwnCtrl.removeItem = function(index) {
      NiDwnCtrl.items.splice(index, 1);
    }
    NiDwnCtrl.removeAll = function() {
      NiDwnCtrl.items = null;
    }
};
})();
