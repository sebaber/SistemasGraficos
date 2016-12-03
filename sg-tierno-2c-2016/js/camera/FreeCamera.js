
var FreeCamera = function () {
    Camera.call(this, vec3.fromValues(0,1,0));
    this.up = vec3.fromValues(0,1,0);
    this.length = 10;
    this.setPosition(vec3.fromValues(0,0,0),vec3.fromValues(1,0,0));
}


Utils.inheritPrototype(FreeCamera, Camera);


FreeCamera.prototype.rotate = function(dx, dy) {
        if (this.moving && (dx || dy)) {
                    var xDelta = -dx*this.ANGLE_SPEED_SCALE;
                    var yDelta = -dy*this.ANGLE_SPEED_SCALE;

                    // direccion de la vision
                    var viewDir = vec3.create();
            		vec3.subtract(viewDir, this.target, this.position);

            		//eje horizontal de rotacion.
            		var horAxis = vec3.create();
            		vec3.cross(horAxis, viewDir, this.up);
            		vec3.normalize(horAxis, horAxis);

            		
            		//armo la matriz de transformacion.
            		var m = mat4.create();
            		if(yDelta) {

            			//control para el error hacia arriba.
            			if(yDelta > 0){ 
    	        			var angle = vec3.angle(viewDir, this.up);
	            			yDelta = (angle -yDelta ) > Math.PI/8 ? yDelta : (angle - Math.PI/8);
						}
            			//control hacia abajo.
            			
	            		if(yDelta < 0){
	            			var down = vec3.create();
	            			vec3.scale(down, this.up,-1);
	            			angle = vec3.angle(down,viewDir);
	            			yDelta = (angle  + yDelta) > Math.PI/8 ? yDelta : 0;
            			}
            			
            			mat4.rotate(m,m,yDelta,horAxis);
            		}
            		


            		if(xDelta) {
            			mat4.rotate(m,m,xDelta,this.up);
            		}
            		
            		//transformo el target
            		vec3.transformMat4(viewDir, viewDir,m);
            		vec3.add(this.target, viewDir, this.position);
            		this.dirty=true;

            }
}

FreeCamera.prototype._updateByDirections = function (dir) {
	 		//modifico según cada movimiento que hubo.
	        var viewDir = vec3.create();
            vec3.subtract(viewDir, this.target, this.position);
            vec3.normalize(viewDir, viewDir);

            if(dir[this.DIRECTION_SIDES]) {
            	var movement = vec3.create();
            	vec3.cross(movement, viewDir, this.up);
            	vec3.scaleAndAdd(this.position, this.position, movement,dir[this.DIRECTION_SIDES]);
            	vec3.scaleAndAdd(this.target, this.target, movement,dir[this.DIRECTION_SIDES]);
            	this.dirty = true;
            }
            //movimiento hacia atras y adelante
            if(dir[this.DIRECTION_FRONT]){
            	vec3.scaleAndAdd(this.position, this.position, viewDir,dir[this.DIRECTION_FRONT]);
            	vec3.scaleAndAdd(this.target, this.target, viewDir,dir[this.DIRECTION_FRONT]);
            	this.dirty = true;
            }
            //movimiento hacia arriba y abajo

}
	          

//En qué posición está la camara y en que direccion mira respecto de esa posicion.
FreeCamera.prototype.setPosition = function (pos, direction){
	this.position = pos;
	var v = vec3.create();
	vec3.normalize(v, direction);
	this.target = vec3.create();
	vec3.scale(this.target,  v, this.length);
	vec3.add(this.target, this.target, this.position);
	
	this.dirty = true;
}


