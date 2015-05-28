angular.module("ModelBoardInfo",[]).factory("ModelBoardInfo",function(){var info;return info={update:function(tiles){var tile,xTiles,yTiles,_i,_len;for(this.x=0,this.y=0,this.loss=!1,this.win=!1,this.numOfTiles=0,this.numOfClears=0,this.numOfFlags=0,this.numOfMines=0,xTiles=[],yTiles=[],_i=0,_len=tiles.length;_len>_i;_i++)tile=tiles[_i],this.numOfTiles++,-1===xTiles.indexOf(tile.model.x)&&xTiles.push(tile.model.x),-1===yTiles.indexOf(tile.model.y)&&yTiles.push(tile.model.y),tile.model.isClear===!0&&this.numOfClears++,tile.model.isFlagged===!0&&this.numOfFlags++,tile.model.isMine===!0&&this.numOfMines++,tile.model.isMine===!0&&tile.model.isClear===!0&&(this.loss=!0);return this.x=xTiles.length,this.y=yTiles.length,this.loss===!1&&this.numOfTiles-this.numOfMines-this.numOfClears===0&&(this.win=!0),this}}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9ib2FyZEluZm8vbW9kZWwuY29mZmVlIiwibW9kZWxzL2JvYXJkSW5mby9tb2RlbC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZmFjdG9yeSIsImluZm8iLCJ1cGRhdGUiLCJ0aWxlcyIsInRpbGUiLCJ4VGlsZXMiLCJ5VGlsZXMiLCJfaSIsIl9sZW4iLCJ0aGlzIiwieCIsInkiLCJsb3NzIiwid2luIiwibnVtT2ZUaWxlcyIsIm51bU9mQ2xlYXJzIiwibnVtT2ZGbGFncyIsIm51bU9mTWluZXMiLCJsZW5ndGgiLCJpbmRleE9mIiwibW9kZWwiLCJwdXNoIiwiaXNDbGVhciIsImlzRmxhZ2dlZCIsImlzTWluZSJdLCJtYXBwaW5ncyI6IkFBQUFBLFFBQ0NDLE9BQU8scUJBSVBDLFFBQVEsaUJBQWtCLFdBRXZCLEdBQUFDLEtDTEYsT0RLRUEsT0FDSUMsT0FBUSxTQUFDQyxPQUNMLEdBQUFDLE1BQUFDLE9BQUFDLE9BQUFDLEdBQUFDLElBWUEsS0FaQUMsS0FBS0MsRUFBSSxFQUNURCxLQUFLRSxFQUFJLEVBQ1RGLEtBQUtHLE1BQVUsRUFDZkgsS0FBS0ksS0FBVSxFQUNmSixLQUFLSyxXQUFjLEVBQ25CTCxLQUFLTSxZQUFjLEVBQ25CTixLQUFLTyxXQUFjLEVBQ25CUCxLQUFLUSxXQUFjLEVBRW5CWixVQUNBQyxVQUVBQyxHQUFBLEVBQUFDLEtBQUFMLE1BQUFlLE9BQUFWLEtBQUFELEdBQUFBLEtDTEpILEtBQU9ELE1BQU1JLElEUUxFLEtBQUtLLGFBRzhCLEtBQWhDVCxPQUFPYyxRQUFRZixLQUFLZ0IsTUFBTVYsSUFDekJMLE9BQU9nQixLQUFLakIsS0FBS2dCLE1BQU1WLEdBR1EsS0FBaENKLE9BQU9hLFFBQVFmLEtBQUtnQixNQUFNVCxJQUN6QkwsT0FBT2UsS0FBS2pCLEtBQUtnQixNQUFNVCxHQUd4QlAsS0FBS2dCLE1BQU1FLFdBQVcsR0FDckJiLEtBQUtNLGNBR05YLEtBQUtnQixNQUFNRyxhQUFhLEdBQ3ZCZCxLQUFLTyxhQUdOWixLQUFLZ0IsTUFBTUksVUFBVSxHQUNwQmYsS0FBS1EsYUFHTmIsS0FBS2dCLE1BQU1JLFVBQVUsR0FBUXBCLEtBQUtnQixNQUFNRSxXQUFXLElBQ2xEYixLQUFLRyxNQUFPLEVDTjFCLE9EUU1ILE1BQUtDLEVBQUlMLE9BQU9hLE9BQ2hCVCxLQUFLRSxFQUFJTCxPQUFPWSxPQUdiVCxLQUFLRyxRQUFRLEdBQVNILEtBQUtLLFdBQWFMLEtBQUtRLFdBQWFSLEtBQUtNLGNBQWUsSUFDN0VOLEtBQUtJLEtBQU0sR0FFZkoiLCJmaWxlIjoibW9kZWxzL2JvYXJkSW5mby9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcbi5tb2R1bGUgJ01vZGVsQm9hcmRJbmZvJywgW1xuIyBEZXBlbmRlbmNpZXNcbl1cblxuLmZhY3RvcnkgJ01vZGVsQm9hcmRJbmZvJywgKCkgLT5cblxuICAgIGluZm8gPVxuICAgICAgICB1cGRhdGU6ICh0aWxlcykgLT5cbiAgICAgICAgICAgIHRoaXMueCA9IDBcbiAgICAgICAgICAgIHRoaXMueSA9IDBcbiAgICAgICAgICAgIHRoaXMubG9zcyAgICA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLndpbiAgICAgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5udW1PZlRpbGVzICA9IDBcbiAgICAgICAgICAgIHRoaXMubnVtT2ZDbGVhcnMgPSAwXG4gICAgICAgICAgICB0aGlzLm51bU9mRmxhZ3MgID0gMFxuICAgICAgICAgICAgdGhpcy5udW1PZk1pbmVzICA9IDBcblxuICAgICAgICAgICAgeFRpbGVzID0gW11cbiAgICAgICAgICAgIHlUaWxlcyA9IFtdXG5cbiAgICAgICAgICAgIGZvciB0aWxlIGluIHRpbGVzXG5cbiAgICAgICAgICAgICAgICAjIEFsbCBUaWxlc1xuICAgICAgICAgICAgICAgIHRoaXMubnVtT2ZUaWxlcysrXG5cbiAgICAgICAgICAgICAgICAjIFggVGlsZXNcbiAgICAgICAgICAgICAgICBpZiB4VGlsZXMuaW5kZXhPZih0aWxlLm1vZGVsLngpID09IC0xXG4gICAgICAgICAgICAgICAgICAgIHhUaWxlcy5wdXNoKHRpbGUubW9kZWwueClcblxuICAgICAgICAgICAgICAgICMgWSBUaWxlc1xuICAgICAgICAgICAgICAgIGlmIHlUaWxlcy5pbmRleE9mKHRpbGUubW9kZWwueSkgPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgeVRpbGVzLnB1c2godGlsZS5tb2RlbC55KVxuXG4gICAgICAgICAgICAgICAgIyBDbGVhcmVkIFRpbGVzXG4gICAgICAgICAgICAgICAgaWYgdGlsZS5tb2RlbC5pc0NsZWFyID09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1PZkNsZWFycysrXG5cbiAgICAgICAgICAgICAgICAjIEZsYWdnZWQgVGlsZXNcbiAgICAgICAgICAgICAgICBpZiB0aWxlLm1vZGVsLmlzRmxhZ2dlZCA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtT2ZGbGFncysrXG5cbiAgICAgICAgICAgICAgICAjIE1pbmVkIFRpbGVzXG4gICAgICAgICAgICAgICAgaWYgdGlsZS5tb2RlbC5pc01pbmUgPT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bU9mTWluZXMrK1xuXG4gICAgICAgICAgICAgICAgIyBDaGVjayBHYW1lIExvc3NcbiAgICAgICAgICAgICAgICBpZiB0aWxlLm1vZGVsLmlzTWluZSA9PSB0cnVlICYmIHRpbGUubW9kZWwuaXNDbGVhciA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9zcyA9IHRydWVcblxuICAgICAgICAgICAgdGhpcy54ID0geFRpbGVzLmxlbmd0aFxuICAgICAgICAgICAgdGhpcy55ID0geVRpbGVzLmxlbmd0aFxuXG4gICAgICAgICAgICAjIENoZWNrIEdhbWUgV2luXG4gICAgICAgICAgICBpZiB0aGlzLmxvc3MgPT0gZmFsc2UgJiYgdGhpcy5udW1PZlRpbGVzIC0gdGhpcy5udW1PZk1pbmVzIC0gdGhpcy5udW1PZkNsZWFycyA9PSAwXG4gICAgICAgICAgICAgICAgdGhpcy53aW4gPSB0cnVlXG5cbiAgICAgICAgICAgIEAiLG51bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==