


var Scene = function (cameras) {
	Model.call(this);
	this.mvMatrix = mat4.create();

        this.activeCamera = 0;
        this.cameras = cameras;
}

Utils.inheritPrototype(Scene, Model);


Scene.prototype.draw = function (frametime) {

                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                
                // Preparamos una matriz de perspectiva.
                
                this.cameras[this.activeCamera].update(frametime);
                var vMatrix  = this.cameras[this.activeCamera].getViewMatrix();
                                
                // Preparamos una matriz de modelo+vista.
                GLContext.setViewMatrix(vMatrix);
                GLContext.setViewPosition(this.cameras[this.activeCamera].getPosition());  

                Model.prototype.draw.call(this);
}



Scene.prototype.mousemove = function (dx,dy) {
        this.cameras[this.activeCamera].rotate(dx,dy);
}


Scene.prototype.mousedown = function (button) {
        this.cameras[this.activeCamera].press(button);
}


Scene.prototype.mouseup = function (button) {
        this.cameras[this.activeCamera].release(button);
}

Scene.prototype.mouseout = function (button) {
        this.cameras[this.activeCamera].release();
}

Scene.prototype.keydown = function (key) {



        if(key == "C".charCodeAt(0)) {
                this.activeCamera =  (this.activeCamera + 1) %(this.cameras.length);
                return;
        }
        if(key == "Q".charCodeAt(0)){
                GLContext.nextDrawMode();
                return;
        }

        this.cameras[this.activeCamera].keydown(key);        
        
}


Scene.prototype.keyup = function (key) {
        this.cameras[this.activeCamera].keyup(key);
}


Scene.prototype.wheel = function (dx, dy) {
        this.cameras[this.activeCamera].zoom(dy);
}

