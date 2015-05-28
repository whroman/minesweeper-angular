angular.module("CtrlBoard",["ngSlider","CollectTiles","ModelSliders","ModelModals","angularLocalStorage"]).controller("CtrlBoard",function($scope,storage,CollectTiles,ModelSliders,ModelModals){var save,savedGame;return $scope.modals=ModelModals.set("Resources/templates/modals/",["instructions","newGame"]),$scope.sliders=ModelSliders.init(5,20,10),savedGame=storage.get("tiles"),$scope.tiles=savedGame?new CollectTiles(savedGame):new CollectTiles($scope.sliders.info.x.val,$scope.sliders.info.y.val,$scope.sliders.info.mines.val),save=function(){return storage.set("tiles",$scope.tiles.all)},save(),$scope.$on("Tiles:Updated",function(){return save()}),$scope.$on("Tiles:NewGame",function(){return save(),$scope.modals.reset()}),window.logScope=function(){return window.$scope=$scope}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2JvYXJkLmNvZmZlZSIsImNvbnRyb2xsZXJzL2JvYXJkLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwic3RvcmFnZSIsIkNvbGxlY3RUaWxlcyIsIk1vZGVsU2xpZGVycyIsIk1vZGVsTW9kYWxzIiwic2F2ZSIsInNhdmVkR2FtZSIsIm1vZGFscyIsInNldCIsInNsaWRlcnMiLCJpbml0IiwiZ2V0IiwidGlsZXMiLCJpbmZvIiwieCIsInZhbCIsInkiLCJtaW5lcyIsImFsbCIsIiRvbiIsInJlc2V0Iiwid2luZG93IiwibG9nU2NvcGUiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUNDQyxPQUFPLGFBRUosV0FDQSxlQUNBLGVBQ0EsY0FDQSx3QkFFSEMsV0FBVyxZQUFhLFNBQ3JCQyxPQUNBQyxRQUNBQyxhQUNBQyxhQUNBQyxhQUdBLEdBQUFDLE1BQUFDLFNDSUYsT0RKRU4sUUFBT08sT0FBU0gsWUFBWUksSUFDeEIsK0JBRUksZUFDQSxZQUtSUixPQUFPUyxRQUFVTixhQUFhTyxLQUFLLEVBQUcsR0FBSSxJQUcxQ0osVUFBWUwsUUFBUVUsSUFBSSxTQUVwQlgsT0FBT1ksTUFEUk4sVUFDb0IsR0FBQUosY0FBYUksV0FFYixHQUFBSixjQUNmRixPQUFPUyxRQUFRSSxLQUFLQyxFQUFFQyxJQUN0QmYsT0FBT1MsUUFBUUksS0FBS0csRUFBRUQsSUFDdEJmLE9BQU9TLFFBQVFJLEtBQUtJLE1BQU1GLEtBSWxDVixLQUFPLFdDN0JQLE1EOEJJSixTQUFRTyxJQUFJLFFBQVNSLE9BQU9ZLE1BQU1NLE1BRXRDYixPQUNBTCxPQUFPbUIsSUFBSSxnQkFBaUIsV0M3QjVCLE1EOEJJZCxVQUVKTCxPQUFPbUIsSUFBSSxnQkFBaUIsV0M1QjVCLE1ENkJJZCxRQUNBTCxPQUFPTyxPQUFPYSxVQUVsQkMsT0FBT0MsU0FBVyxXQzdCbEIsTUQ4QklELFFBQU9yQixPQUFTQSIsImZpbGUiOiJjb250cm9sbGVycy9ib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcbi5tb2R1bGUgJ0N0cmxCb2FyZCcsIFtcbiMgRGVwZW5kZW5jaWVzXG4gICAgJ25nU2xpZGVyJ1xuICAgICdDb2xsZWN0VGlsZXMnXG4gICAgJ01vZGVsU2xpZGVycydcbiAgICAnTW9kZWxNb2RhbHMnXG4gICAgJ2FuZ3VsYXJMb2NhbFN0b3JhZ2UnXG5dXG4uY29udHJvbGxlciAnQ3RybEJvYXJkJywgKFxuICAgICRzY29wZSxcbiAgICBzdG9yYWdlLFxuICAgIENvbGxlY3RUaWxlcyxcbiAgICBNb2RlbFNsaWRlcnMsXG4gICAgTW9kZWxNb2RhbHMsXG4pIC0+XG4gICAgIyBJbml0IG1vZGFsc1xuICAgICRzY29wZS5tb2RhbHMgPSBNb2RlbE1vZGFscy5zZXQoXG4gICAgICAgICdSZXNvdXJjZXMvdGVtcGxhdGVzL21vZGFscy8nLFxuICAgICAgICBbXG4gICAgICAgICAgICAnaW5zdHJ1Y3Rpb25zJyxcbiAgICAgICAgICAgICduZXdHYW1lJ1xuICAgICAgICBdXG4gICAgKVxuXG4gICAgIyBJbml0IG1vZGFsIHNsaWRlcnNcbiAgICAkc2NvcGUuc2xpZGVycyA9IE1vZGVsU2xpZGVycy5pbml0IDUsIDIwLCAxMFxuXG4gICAgIyBMb2FkIG9yIENyZWF0ZSBnYW1lXG4gICAgc2F2ZWRHYW1lID0gc3RvcmFnZS5nZXQgJ3RpbGVzJ1xuICAgIGlmIHNhdmVkR2FtZVxuICAgICAgICAkc2NvcGUudGlsZXMgPSBuZXcgQ29sbGVjdFRpbGVzIHNhdmVkR2FtZVxuICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnRpbGVzID0gbmV3IENvbGxlY3RUaWxlcyhcbiAgICAgICAgICAgICRzY29wZS5zbGlkZXJzLmluZm8ueC52YWwsXG4gICAgICAgICAgICAkc2NvcGUuc2xpZGVycy5pbmZvLnkudmFsLFxuICAgICAgICAgICAgJHNjb3BlLnNsaWRlcnMuaW5mby5taW5lcy52YWxcbiAgICAgICAgKVxuXG4gICAgIyBQZXJzaXN0IGB0aWxlc2AgZGF0YSBhbmQgc2V0IHVwIGV2ZW50IHRvIHBlcnNpc3RzIHdoZW4gYHRpbGVzYCBpcyB1cGRhdGVkXG4gICAgc2F2ZSA9IC0+XG4gICAgICAgIHN0b3JhZ2Uuc2V0ICd0aWxlcycsICRzY29wZS50aWxlcy5hbGxcblxuICAgIHNhdmUoKVxuICAgICRzY29wZS4kb24gJ1RpbGVzOlVwZGF0ZWQnLCAtPlxuICAgICAgICBzYXZlKClcblxuICAgICRzY29wZS4kb24gJ1RpbGVzOk5ld0dhbWUnLCAtPlxuICAgICAgICBzYXZlKClcbiAgICAgICAgJHNjb3BlLm1vZGFscy5yZXNldCgpXG5cbiAgICB3aW5kb3cubG9nU2NvcGUgPSAoKSAtPlxuICAgICAgICB3aW5kb3cuJHNjb3BlID0gJHNjb3BlIixudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=