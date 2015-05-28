angular.module("ModelTile",[]).factory("ModelTile",function($rootScope){var ModelTile;return ModelTile=function(){function ModelTile(attrs){this.model={x:void 0,y:void 0,uid:void 0,isMine:!1,isClear:!1,isFlagged:!1,adjacentMines:0},this.adjacentTiles=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],this.set(attrs)}return ModelTile.prototype.set=function(attrs){var attr,key;for(key in attrs)attr=attrs[key],this.model[key]=attr,this.model.uid=String(attrs.x)+"-"+String(attrs.y);return this},ModelTile.prototype.toggleFlag=function(){return this.model.isFlagged=!this.model.isFlagged,$rootScope.$broadcast("Tile:Flag",this),this},ModelTile.prototype.clear=function(){return this.model.isClear=!0,this.model.isFlagged=!1,this.collection.clearNeighbors(this),$rootScope.$broadcast("Tile:Clear",this),this},ModelTile}()});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy90aWxlLmNvZmZlZSIsIm1vZGVscy90aWxlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJmYWN0b3J5IiwiJHJvb3RTY29wZSIsIk1vZGVsVGlsZSIsImF0dHJzIiwidGhpcyIsIm1vZGVsIiwieCIsInkiLCJ1aWQiLCJpc01pbmUiLCJpc0NsZWFyIiwiaXNGbGFnZ2VkIiwiYWRqYWNlbnRNaW5lcyIsImFkamFjZW50VGlsZXMiLCJzZXQiLCJwcm90b3R5cGUiLCJhdHRyIiwia2V5IiwiU3RyaW5nIiwidG9nZ2xlRmxhZyIsIiRicm9hZGNhc3QiLCJjbGVhciIsImNvbGxlY3Rpb24iLCJjbGVhck5laWdoYm9ycyJdLCJtYXBwaW5ncyI6IkFBQUFBLFFBQ0NDLE9BQU8sZ0JBR1BDLFFBQVEsWUFBYSxTQUNsQkMsWUFFQSxHQUFBQyxVQ0xGLE9ES1FBLFdBQUEsV0FDVyxRQUFBQSxXQUFDQyxPQUNWQyxLQUFDQyxPQUNHQyxFQUFJLE9BQ0pDLEVBQUksT0FDSkMsSUFBTSxPQUNOQyxRQUFTLEVBQ1RDLFNBQVUsRUFDVkMsV0FBWSxFQUNaQyxjQUFnQixHQUVwQlIsS0FBQ1MsZ0JBQ0ksR0FBSSxLQUFPLEVBQUcsS0FBTyxFQUFHLEtBQ3hCLEdBQUssSUFBZ0IsRUFBSSxJQUN6QixHQUFLLElBQU0sRUFBSSxJQUFNLEVBQUksSUFHOUJULEtBQUNVLElBQUlYLE9DaUJiLE1EakNJRCxXQUFBYSxVQWtCQUQsSUFBSyxTQUFDWCxPQUNGLEdBQUFhLE1BQUFDLEdBQUEsS0FBQUEsTUFBQWQsT0NQSmEsS0FBT2IsTUFBTWMsS0RRTGIsS0FBQ0MsTUFBTVksS0FBT0QsS0FDZFosS0FBQ0MsTUFBTUcsSUFBTVUsT0FBT2YsTUFBTUcsR0FBSyxJQUFNWSxPQUFPZixNQUFNSSxFQ0w1RCxPRE1NSCxPQXRCSkYsVUFBQWEsVUF3QkFJLFdBQVksV0NGZCxNREdNZixNQUFDQyxNQUFNTSxXQUFZUCxLQUFFQyxNQUFNTSxVQUMzQlYsV0FBV21CLFdBQVcsWUFBYWhCLE1BQ25DQSxNQTNCSkYsVUFBQWEsVUE2QkFNLE1BQU8sV0NDVCxNREFNakIsTUFBQ0MsTUFBTUssU0FBVSxFQUNqQk4sS0FBQ0MsTUFBTU0sV0FBWSxFQUNuQlAsS0FBQ2tCLFdBQVdDLGVBQWVuQixNQUUzQkgsV0FBV21CLFdBQVcsYUFBY2hCLE1BQ3BDQSxNQ0ZERiIsImZpbGUiOiJtb2RlbHMvdGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcbi5tb2R1bGUgJ01vZGVsVGlsZScsIFtcbiMgRGVwZW5kZW5jaWVzXG5dXG4uZmFjdG9yeSAnTW9kZWxUaWxlJywgKFxuICAgICRyb290U2NvcGVcbikgLT5cbiAgICBjbGFzcyBNb2RlbFRpbGVcbiAgICAgICAgY29uc3RydWN0b3I6IChhdHRycykgLT5cbiAgICAgICAgICAgIEBtb2RlbCA9XG4gICAgICAgICAgICAgICAgeCA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIHkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB1aWQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpc01pbmUgOiBmYWxzZVxuICAgICAgICAgICAgICAgIGlzQ2xlYXIgOiBmYWxzZVxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZCA6IGZhbHNlXG4gICAgICAgICAgICAgICAgYWRqYWNlbnRNaW5lcyA6IDBcblxuICAgICAgICAgICAgQGFkamFjZW50VGlsZXMgPSBbXG4gICAgICAgICAgICAgICAgWy0xLCAtMV0sIFsgMCwgLTFdLCBbIDEsIC0xXSxcbiAgICAgICAgICAgICAgICBbLTEsICAwXSwgICAgICAgICAgIFsgMSwgIDBdLFxuICAgICAgICAgICAgICAgIFstMSwgIDFdLCBbIDAsICAxXSwgWyAxLCAgMV0sXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgICAgIEBzZXQgYXR0cnNcblxuICAgICAgICBzZXQ6IChhdHRycykgLT5cbiAgICAgICAgICAgIGZvciBrZXksIGF0dHIgb2YgYXR0cnNcbiAgICAgICAgICAgICAgICBAbW9kZWxba2V5XSA9IGF0dHJcbiAgICAgICAgICAgICAgICBAbW9kZWwudWlkID0gU3RyaW5nKGF0dHJzLngpICsgJy0nICsgU3RyaW5nKGF0dHJzLnkpXG4gICAgICAgICAgICBAXG5cbiAgICAgICAgdG9nZ2xlRmxhZzogLT5cbiAgICAgICAgICAgIEBtb2RlbC5pc0ZsYWdnZWQgPSAhQG1vZGVsLmlzRmxhZ2dlZFxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0ICdUaWxlOkZsYWcnLCBAXG4gICAgICAgICAgICBAXG5cbiAgICAgICAgY2xlYXI6IC0+XG4gICAgICAgICAgICBAbW9kZWwuaXNDbGVhciA9IHRydWVcbiAgICAgICAgICAgIEBtb2RlbC5pc0ZsYWdnZWQgPSBmYWxzZVxuICAgICAgICAgICAgQGNvbGxlY3Rpb24uY2xlYXJOZWlnaGJvcnMoQClcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0ICdUaWxlOkNsZWFyJywgQFxuICAgICAgICAgICAgQCIsbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9