




/**
 * A Flying Camera allows free motion around the scene using FPS style controls (WASD + mouselook)
 * This type of camera is good for displaying large scenes
 */
var Camera = function (up) {
	this.up = up;	
	this.speed = 50;
	
	this.pressedKeys = [];
    this.zoomIn = false;
    this.zoomOut = false;

    this.target = vec3.create();
    this.position = vec3.create();
    this.viewMat = mat4.create();
    this.moving = false;

    this.DIRECTION_SIDES = 0;
    this.DIRECTION_FRONT = 1;
    this.DIRECTION_UP = 2;
    this.DIRECTION_ZOOM = 3;
    this.ZOOM_SPEED_SCALE = 10;
    this.ANGLE_SPEED_SCALE = 1/100;
}


Camera.prototype.getPosition = function (value){
	return this.position;
}


Camera.prototype.getViewMatrix = function () {
        
        if(this.dirty) {
        	this.viewMat = mat4.create();
        	mat4.lookAt(this.viewMat, this.position, this.target, this.up);
        	this.dirty = false;
        }

        return this.viewMat;
}

Camera.prototype.update = function (frametime) {
            var dir = [0, 0, 0,0];

            var speed = (this.speed / 1000) * frametime;

            if(this.pressedKeys['W'.charCodeAt(0)]) {
                dir[this.DIRECTION_FRONT] += speed;
            }
            if(this.pressedKeys['S'.charCodeAt(0)]) {
                dir[this.DIRECTION_FRONT] -= speed;
            }
            if(this.pressedKeys['A'.charCodeAt(0)]) {
                dir[this.DIRECTION_SIDES] -= speed;
            }
            if(this.pressedKeys['D'.charCodeAt(0)]) {
                dir[this.DIRECTION_SIDES] += speed;
            }
            if(this.pressedKeys[32]) { // Space, mueve arriba
                dir[this.DIRECTION_UP] += speed;
            }
            if(this.pressedKeys[17]) { // Ctrl, mueve abajo
                dir[this.DIRECTION_UP] -= speed;
            }

            //zoom de la camara.
            if(this.zoomIn) {
            	dir[this.DIRECTION_ZOOM] += speed*this.ZOOM_SPEED_SCALE;
            }
            if(this.zoomOut) {
            	dir[this.DIRECTION_ZOOM] -= speed*this.ZOOM_SPEED_SCALE;
            }
            this.zoomIn = false;
            this.zoomOut = false;

 
 			this._updateByDirections(dir);
}


Camera.prototype._updateByDirections = function (dir) {
	throw new Error("Not Implemented");


}

Camera.prototype.keydown = function (key){
	this.pressedKeys[key] = true;
	
}

Camera.prototype.keyup = function (key){
	this.pressedKeys[key] = false;
}


Camera.prototype.press= function(button){
    if(button == 0) {
        this.moving = true;
    }

};

Camera.prototype.release= function(button){
    if(button == 0 || !Utils.isDefined(button)) {
        this.moving = false;
    }

};


Camera.prototype.zoom= function(ammount){
	this.zoomIn = this.zoomIn || ammount < 0; 
	this.zoomOut = this.zoomOut || ammount > 0; 
};
