​
(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);
function FoundItemsDirective() {
var ddo = {
templateUrl: 'foundItems.html',
scope:{
items: '<',
onRemove: '&'
},
controller: FoundItemDirectiveController,
controllerAs: 'found',
bindToController: true
};
return ddo;
}
function FoundItemDirectiveController() {
var found = this;
}
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
var menu = this;
menu.verifyitem=function(){
MenuSearchService.removeItemtotal();
if((menu.itemname!=undefined) && (menu.itemname!="")){
menu.items=MenuSearchService.getMatchedMenuItems(menu.itemname);
}else{
menu.items=[];
}
}
menu.removeItem = function (itemIndex) {
MenuSearchService.removeItem(itemIndex);
};
}
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
var item = [];
var items = [];
var service = this;
service.getMatchedMenuItems =function (word){
var promise = service.getitems2();
promise.then(function (response) {
service.items = response.data.menu_items;
for(var i=0;i<service.items.length;i++) {
if(service.checkinclude(service.items[i].name.toLowerCase(),word.toLowerCase())){
item=service.items[i];
items.push(item);
item="";
}
}
})
.catch(function (error) {
console.log("Something went terribly wrong.");
})
return items
}
service.checkinclude= function(str, word){
var result = str.includes(word);
return result
};
service.removeItemtotal = function () {
items.splice(0,items.length);
};
service.removeItem = function (itemIndex) {
items.splice(itemIndex, 1);
};
service.getitems2 =function (){
var items2 = [];
var response = $http({
method: "GET",
url: (ApiBasePath + "/menu_items.json")
});
return response
}
}
})();
