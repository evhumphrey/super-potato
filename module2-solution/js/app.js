(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

/* ToBuyController */
// Inject to protect against minification loss
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var buyList = this;

  // get the buy list data from service and attach to this controller as prop
  buyList.items = ShoppingListCheckOffService.getToBuyItems();

  // bind to ng-click of 'Bought' button
  buyList.checkOffItem = function(itemIndex) {
    // console.debug("BUTTON CLICKED");
    ShoppingListCheckOffService.checkOffItem(itemIndex);
  }
}

/* AlreadyBoughtController */
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  // get the bought list data from service and attach to this controller as prop
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

/* Custom Service */
function ShoppingListCheckOffService() {
  var service = this;

  // The default list of items to Buy
  var itemsToBuy = [
    {
      name: "cookies",
      quantity: 10
    },
    {
      name: "bananas",
      quantity: 5
    },
    {
      name: "carrots",
      quantity: 4
    },
    {
      name: "chips",
      quantity: 8
    },
    {
      name: "sodas",
      quantity: 6
    }
  ];
  var itemsBought = [];

  // service function available for controllers to use
  service.checkOffItem = function(itemIndex) {
    var item = itemsToBuy[itemIndex];

    // console.log("Check Off Item: \n\t", item);
    itemsBought.push(item);
    itemsToBuy.splice(itemIndex, 1);
    // console.log("Item \n\t", item, "\nhas been moved");
    // console.debug("To buy items: \n\t", itemsToBuy, "\nBought items: \n\t", itemsBought);
  }

  service.getToBuyItems = function() {
    // console.log("To buy items: ", itemsToBuy);
    return itemsToBuy;
  }

  service.getBoughtItems = function() {
    // console.log("Bought items: ", itemsBought);
    return itemsBought;
  }

}

})();
