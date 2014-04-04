angular.module('CtrlBoard', ['ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals) {
  $scope.modals = ModelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  $scope.sliders = ModelSliders.init(5, 15, 8);
  CollectTiles.init($scope, $scope.sliders.info);
  $scope.tiles = CollectTiles.tiles;
  $scope.info = CollectTiles.info;
  $scope.checkTile = function(event, x, y) {
    return CollectTiles.checkTile(x, y, event);
  };
  $scope.autoSelect = function(num) {
    return CollectTiles.autoSelect(num);
  };
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    CollectTiles.newGame(sizeX, sizeY, numOfMines);
    return $scope.modals.reset();
  };
});
