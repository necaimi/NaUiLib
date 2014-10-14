
    
var Fn = Function, global = (new Fn("return this"))();
    if(!global.UiLib){
        global.UiLib = {};
    }

    global.UiLib.SelectBox = {
        checkedHandler : function(event, state){
        },
        
        Initlize : function(){
            
        function SelectBox(obj){
        this._obj = obj,
        this._oldIndex = null;
        this._itemmap = {};
        this._isMutux = true;
        };
    
    SelectBox.prototype.getObj = function(){
        return this._obj;
    };
    
    SelectBox.prototype.setMutux = function(b){
        this._isMutux = b;
    };
    
    SelectBox.prototype.addItem = function(obj, cfn, index){

        if(!obj){
            return null;
        }
        
        if(this._itemmap["item-"+index]){
            return null;
        }
      
        var _item = new Item(obj, cfn, index, this);
       
        $(obj).bind("click", function(){
            var _parent = _item._parent;
            if(_item._checked &&  _parent._isMutux)
                return true;
            
            if(_parent._isMutux){
            _parent._selectItem(_item);
            }else{
            _item._checked ? _parent._cancelItem(_item) : _parent._selectItem(_item);
            }
            
        }).bind("checked", function(){
            var ret = _item._cfn.apply(_item, arguments);
            if(ret){
                return ret;
            }else{
                return (new $.Deferred()).resolve().promise();
            }
            
        });
        
        this._itemmap["item-"+index]  =  _item;
        return _item;
    };
    
    SelectBox.prototype._selectItem = function(obj){
        obj.check(true);
        
        if(this._oldIndex != null && this._isMutux){
        this._itemmap["item-"+this._oldIndex].check(false);
        }
        
        this._oldIndex = obj._index;
    };
    
    SelectBox.prototype.selectIndex = function(index){
           var curObj =  this._itemmap["item-"+index];
           this._selectItem(curObj);
            
     };
        
    SelectBox.prototype.cancelInex = function(index){
          var curObj =  this._itemmap["item-"+index];
           this._cancelItem(curObj);
    };
            
    SelectBox.prototype._cancelItem = function(obj){
            obj.check(false);
    };
            
    SelectBox.prototype.getItems = function(){
        var retItem = [];
        if(this._isMutux){
            retItem.push(this._itemmap["item-"+this._oldIndex]);
            return retItem;
        }else{
            var i = 0, len = this._itemmap.length;
            for(i; i < len ; i++){
                var curItem = this._itemmap["item-"+i];
                if(curItem.checked){
                    retItem.push(curItem);
                }
            }
            
            return curItem;
            
        }
    };
    
    function Item(obj, cfn, index, parent){
        this._obj = obj,
        this._cfn = cfn,
        this._checked = false,
        this._index = index,
        this._parent = parent;
    };
    
    Item.prototype.check = function(b){
        var changed = this._checked == b;
        this._checked = b;
        
        if(!changed){
            $(this._obj).triggerHandler("checked", {"checked":b, "target":this._obj});
        }
    };
    

 $(document).ready(function(){
     $("[c-type='selectbox']").each(function(index, element){
         var _selectBox = new SelectBox(this), $selbox = $(this);
      
         $selbox.find("[c-type='item']").each(function(index, element){
             _selectBox.addItem(this, UiLib.SelectBox.checkedHandler, index);
         });
         
         this.prototype = _selectBox;
         
         var defWparam = $selbox.attr("def-select");
         _selectBox.selectIndex(defWparam);
     });
    });

        }
    };

    UiLib.SelectBox.Initlize();

   
    
   