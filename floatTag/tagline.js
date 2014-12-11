/* float line*/
/* need jQuery.js && tagline.css */

function tag(target, label, cfn){
    this._target = target,
    this._id = id,
    this._label = label;
};

var _tag = [];
function tagManager(pDom){
   this._pDom = pDom;
};

tagManager.prototype = {
    createTagLine:function(){
        if(!this._pDom){
            throw new Error("no Dom layout");
        }
        
        
    },
    show:function(){
    },
    hide:function(){
        
    },
    position:function(x,y){
    }
    
}
function tagRegrister(target, cTag, cfn){
   if(!Tag || !target){
       return null;
   }
    
    var _tag = new tag(targetcTag, cfn);
    
    
};