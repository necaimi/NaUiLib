
    
    
    function checkedHandler(event, state){};

    var checkedHandler_fn = checkedHandler;
    

    function SelectBox(obj){
        this._obj = obj,
        this._oldIndex = -1;
        this._itemmap = {};
        this._isMutux = true;
    };
    
    SelectBox.prototype.getObj = function(){
        return this._obj;
    };
    
    SelectBox.prototype.setMutux = function(b){
        this._isMutux = b;
    };

    SelectBox.prototype.getItems = function(){
        if(this._isMutux){
        return this._itemmap["item-"+this._oldIndex];
        }else{
        var _items = [], i = 0, len = this._itemmap.length;
            for(i; i < len; i++){
                var curItem = this._itemmap["item-"+i];
                if( curItem._checked)
                {
                   _items.push(curItem);
                }
            }
            
            return _items;
            
        }
    };
    
    SelectBox.prototype.addItem = function(obj, index, cfn){
        
        if(!obj && index != null){
            return null;
        }
        
        if(this._itemmap["item-"+index]){
            return null;
        }
        
        var _item = new Item(obj, index, cfn, this);
        $(obj).bind("click", function(){
            var isMutux = _item._parent._isMutux;
            if(_item._checked && isMutux){
                return true;
            }
            
            if(!isMutux){
            _item._checked ? _item._parent._cancelItem(_item) : _item._parent._selectItem(_item);
            }else{
            _item._parent._selectItem(_item);
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
        
        if(this._oldIndex != -1 && this._isMutux){
        this._itemmap["item-"+this._oldIndex].check(false);
        }
        
        this._oldIndex = obj._index;
    };
    
     SelectBox.prototype.selectIndex = function(index){
         if(this._itemmap["item-"+index])
         {
            this._selectItem(this._itemmap["item-"+index]);
         }

         
     };
    
    SelectBox.prototype._cancelItem = function(obj){
        this._itemmap[obj].check(false);
    };
    
    function Item(obj, index, cfn, parent){
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

             _selectBox.addItem(this, index, checkedHandler_fn);
         });
         this.prototype = _selectBox;
         
         var defWparam = $selbox.attr("def-num");
         _selectBox.selectIndex(defWparam);
     });
    });