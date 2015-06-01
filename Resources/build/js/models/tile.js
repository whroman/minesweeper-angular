angular.module("ModelTile",[]).factory("ModelTile",function(){var ModelTile;return ModelTile=function(){function ModelTile(attrs){this.model={x:void 0,y:void 0,uid:void 0,isMine:!1,isClear:!1,isFlagged:!1,adjacentMines:0},this.adjacentTiles=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],this.set(attrs)}return ModelTile.prototype.set=function(attrs){var attr,key;for(key in attrs)attr=attrs[key],this.model[key]=attr,this.model.uid=String(attrs.x)+"-"+String(attrs.y);return this},ModelTile.prototype.toggleFlag=function(){return this.model.isFlagged=!this.model.isFlagged,this},ModelTile.prototype.clear=function(){return this.model.isClear=!0,this.model.isFlagged=!1,this},ModelTile.prototype.click=function($event){var flagKeyWasPressed;return flagKeyWasPressed=$event.shiftKey===!0||$event.altKey===!0,flagKeyWasPressed?this.toggleFlag():this.clear()},ModelTile}()});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy90aWxlLmNvZmZlZSIsIm1vZGVscy90aWxlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJmYWN0b3J5IiwiTW9kZWxUaWxlIiwiYXR0cnMiLCJ0aGlzIiwibW9kZWwiLCJ4IiwieSIsInVpZCIsImlzTWluZSIsImlzQ2xlYXIiLCJpc0ZsYWdnZWQiLCJhZGphY2VudE1pbmVzIiwiYWRqYWNlbnRUaWxlcyIsInNldCIsInByb3RvdHlwZSIsImF0dHIiLCJrZXkiLCJTdHJpbmciLCJ0b2dnbGVGbGFnIiwiY2xlYXIiLCJjbGljayIsIiRldmVudCIsImZsYWdLZXlXYXNQcmVzc2VkIiwic2hpZnRLZXkiLCJhbHRLZXkiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUNDQyxPQUFPLGdCQUdQQyxRQUFRLFlBQWEsV0FHbEIsR0FBQUMsVUNMRixPREtRQSxXQUFBLFdBQ1csUUFBQUEsV0FBQ0MsT0FDVkMsS0FBQ0MsT0FDR0MsRUFBSSxPQUNKQyxFQUFJLE9BQ0pDLElBQU0sT0FDTkMsUUFBUyxFQUNUQyxTQUFVLEVBQ1ZDLFdBQVksRUFDWkMsY0FBZ0IsR0FFcEJSLEtBQUNTLGdCQUNJLEdBQUksS0FBTyxFQUFHLEtBQU8sRUFBRyxLQUN4QixHQUFLLElBQWdCLEVBQUksSUFDekIsR0FBSyxJQUFNLEVBQUksSUFBTSxFQUFJLElBRzlCVCxLQUFDVSxJQUFJWCxPQ3dCYixNRHhDSUQsV0FBQWEsVUFrQkFELElBQUssU0FBQ1gsT0FDRixHQUFBYSxNQUFBQyxHQUFBLEtBQUFBLE1BQUFkLE9DUEphLEtBQU9iLE1BQU1jLEtEUUxiLEtBQUNDLE1BQU1ZLEtBQU9ELEtBQ2RaLEtBQUNDLE1BQU1HLElBQU1VLE9BQU9mLE1BQU1HLEdBQUssSUFBTVksT0FBT2YsTUFBTUksRUNMNUQsT0RNTUgsT0F0QkpGLFVBQUFhLFVBd0JBSSxXQUFZLFdDSGQsTURJTWYsTUFBQ0MsTUFBTU0sV0FBWVAsS0FBRUMsTUFBTU0sVUFDM0JQLE1BMUJKRixVQUFBYSxVQTRCQUssTUFBTyxXQ0RULE1ERU1oQixNQUFDQyxNQUFNSyxTQUFVLEVBQ2pCTixLQUFDQyxNQUFNTSxXQUFZLEVBQ25CUCxNQS9CSkYsVUFBQWEsVUFpQ0FNLE1BQU8sU0FBQ0MsUUFDSixHQUFBQyxrQkFLQSxPQUxBQSxtQkFDSUQsT0FBT0UsWUFBWSxHQUNuQkYsT0FBT0csVUFBVSxFQUdsQkYsa0JBQ0NuQixLQUFDZSxhQUVEZixLQUFDZ0IsU0NGTmxCIiwiZmlsZSI6Im1vZGVscy90aWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhclxuLm1vZHVsZSAnTW9kZWxUaWxlJywgW1xuIyBEZXBlbmRlbmNpZXNcbl1cbi5mYWN0b3J5ICdNb2RlbFRpbGUnLCAoXG5cbikgLT5cbiAgICBjbGFzcyBNb2RlbFRpbGVcbiAgICAgICAgY29uc3RydWN0b3I6IChhdHRycykgLT5cbiAgICAgICAgICAgIEBtb2RlbCA9XG4gICAgICAgICAgICAgICAgeCA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIHkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB1aWQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpc01pbmUgOiBmYWxzZVxuICAgICAgICAgICAgICAgIGlzQ2xlYXIgOiBmYWxzZVxuICAgICAgICAgICAgICAgIGlzRmxhZ2dlZCA6IGZhbHNlXG4gICAgICAgICAgICAgICAgYWRqYWNlbnRNaW5lcyA6IDBcblxuICAgICAgICAgICAgQGFkamFjZW50VGlsZXMgPSBbXG4gICAgICAgICAgICAgICAgWy0xLCAtMV0sIFsgMCwgLTFdLCBbIDEsIC0xXSxcbiAgICAgICAgICAgICAgICBbLTEsICAwXSwgICAgICAgICAgIFsgMSwgIDBdLFxuICAgICAgICAgICAgICAgIFstMSwgIDFdLCBbIDAsICAxXSwgWyAxLCAgMV0sXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgICAgIEBzZXQgYXR0cnNcblxuICAgICAgICBzZXQ6IChhdHRycykgLT5cbiAgICAgICAgICAgIGZvciBrZXksIGF0dHIgb2YgYXR0cnNcbiAgICAgICAgICAgICAgICBAbW9kZWxba2V5XSA9IGF0dHJcbiAgICAgICAgICAgICAgICBAbW9kZWwudWlkID0gU3RyaW5nKGF0dHJzLngpICsgJy0nICsgU3RyaW5nKGF0dHJzLnkpXG4gICAgICAgICAgICBAXG5cbiAgICAgICAgdG9nZ2xlRmxhZzogLT5cbiAgICAgICAgICAgIEBtb2RlbC5pc0ZsYWdnZWQgPSAhQG1vZGVsLmlzRmxhZ2dlZFxuICAgICAgICAgICAgQFxuXG4gICAgICAgIGNsZWFyOiAtPlxuICAgICAgICAgICAgQG1vZGVsLmlzQ2xlYXIgPSB0cnVlXG4gICAgICAgICAgICBAbW9kZWwuaXNGbGFnZ2VkID0gZmFsc2VcbiAgICAgICAgICAgIEBcblxuICAgICAgICBjbGljazogKCRldmVudCkgLT5cbiAgICAgICAgICAgIGZsYWdLZXlXYXNQcmVzc2VkID0gKFxuICAgICAgICAgICAgICAgICRldmVudC5zaGlmdEtleSBpcyB0cnVlIG9yXG4gICAgICAgICAgICAgICAgJGV2ZW50LmFsdEtleSBpcyB0cnVlXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGlmIGZsYWdLZXlXYXNQcmVzc2VkXG4gICAgICAgICAgICAgICAgQHRvZ2dsZUZsYWcoKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBjbGVhcigpIixudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=