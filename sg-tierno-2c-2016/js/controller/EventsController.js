

var EventsController = function(elementId,processor) {
	this.element = document.getElementById(elementId);
	this._install();
	this.processor = processor;
	this.lastDownTarget = null;
}



EventsController.prototype._install= function(){
	var that = this;
	this.element.onmousedown = function (e) {
		that._mousedown(e);
	}
	this.element.onmouseup = function (e) {
		that._mouseup(e);
	}

	this.element.onmousemove = Utils.throttle(function (e) {
        that._onmousemove(e);
    },1/60);

	this.element.onmouseout = function (e){
		that._onmouseout(e);
	}
	this.element.onmousewheel = function (e){
		that._onmousewheel(e);
	}
	this.element.onfocus = function (e){
		that.lastDownTarget = event.target;
	}

	this.element.addEventListener("blur",function (e){
		that.lastDownTarget = null;
	},true);

	document.onkeydown = function (e) {
		that._onkeydown (e);
	}

	document.onkeyup = function (e) {
		that._onkeyup (e);
	}
    document.addEventListener('mousedown', function(event) {
        that.lastDownTarget = event.target;
    }, false);

};


EventsController.prototype._mousedown = function (e){
	this.processor.mousedown(e.button);
}


EventsController.prototype._mouseup = function (e){
	this.processor.mouseup(e.button);
}

EventsController.prototype._onmousemove = function (e){

	this.processor.mousemove(e.movementX, e.movementY);
}

EventsController.prototype._onmouseout = function (e){
	this.processor.mouseout();
}

EventsController.prototype._onkeydown = function (e){
    if(this.lastDownTarget == this.element) {
           this.processor.keydown(e.keyCode);
           e.preventDefault();
    }
	
}

EventsController.prototype._onmousewheel = function (e){
	this.processor.wheel(e.deltaX, e.deltaY);
}


EventsController.prototype._onkeyup = function (e){

        this.processor.keyup(e.keyCode);

		if(this.lastDownTarget == this.element) {
           e.preventDefault();
    	}
}
