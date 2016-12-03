var FixedCenterCamera = function () {
    Camera.call(this, vec3.fromValues(0,1,0));
    this.TARGET_UP = vec3.fromValues(0,1,0);

    this.up = vec3.clone(this.TARGET_UP);
    this.setTarget(vec3.fromValues(0,0,0),vec3.fromValues(100,100,100));
    this.minDistance = 20;


}


Utils.inheritPrototype(FixedCenterCamera, Camera);

FixedCenterCamera.prototype.rotate = function(dx, dy) {
        //roto el vector posicion y que dsps el set target se encargue.
        if (this.moving && (dx || dy)) {
                var posAux = vec3.create();
                vec3.subtract(posAux, this.position, this.target);
                var m = mat4.create();
                mat4.translate(m,m,this.target);
                if(dy) {
                    var axisR = vec3.create();
                    vec3.cross(axisR, posAux, this.TARGET_UP);
                    vec3.normalize(axisR,axisR);
                    mat4.rotate(m,m,dy*this.ANGLE_SPEED_SCALE,axisR);
                }
                if(dx) {
                    mat4.rotate(m,m,-dx*this.ANGLE_SPEED_SCALE,this.TARGET_UP);
                }
                vec3.transformMat4(posAux,posAux,m);
                this.setTarget(this.target,posAux);

         }
}

FixedCenterCamera.prototype._updateByDirections = function (dir) {
            //modifico según cada movimiento que hubo.
            var viewDir = vec3.create();
            var posAux = vec3.create();
            vec3.subtract(posAux, this.position,this.target);
            vec3.normalize(viewDir, posAux);
            vec3.clone(this.position);

            //un zoom es lo mismo que arriba y abajo en esta camara.
            dir[this.DIRECTION_UP] = dir[this.DIRECTION_UP] ? dir[this.DIRECTION_UP] : dir[this.DIRECTION_ZOOM];
            var m = mat4.create();
            mat4.translate(m,m,this.target);
            //movimiento hacia los costados.
            if(dir[this.DIRECTION_SIDES]) {
                mat4.rotate(m,m,dir[this.DIRECTION_SIDES]*this.ANGLE_SPEED_SCALE,this.TARGET_UP);
                this.dirty = true;
            }
            //movimiento hacia atras y adelante
            if(dir[this.DIRECTION_FRONT]){
                var axisR = vec3.create();
                vec3.cross(axisR, viewDir, this.TARGET_UP);
                vec3.normalize(axisR,axisR);
                mat4.rotate(m,m,-dir[this.DIRECTION_FRONT]*this.ANGLE_SPEED_SCALE,axisR);
                this.dirty = true;
            }
            // zoom in y zoom out
            if(dir[this.DIRECTION_UP]){
                var scaled = vec3.create();
                vec3.scale(scaled,viewDir,dir[this.DIRECTION_UP]);
                mat4.translate(m,m,scaled);
                this.dirty = true;
            }
            
            //si hubo algun cambio, transformo la posicion de la camara y reseteo 
            if (this.dirty) {

                vec3.transformMat4(posAux, posAux,m);   
                this.setTarget(this.target, posAux);
            } 

            
                
            

}
              
//Setea en qué posicion está el target y el angulo horizontal (0,2pi)
FixedCenterCamera.prototype.setTarget = function (target, position){
    //el up sale mirando el ángulo de la posicion del visor y el plano y del target.
    this.position = position;
    this.target = target;
    var posaux = vec3.create();
    vec3.subtract(posaux, this.position, this.target);
    var length = vec3.len(posaux);
    //corrijo si esta muy cerca
    if(length < this.minDistance) {
        vec3.normalize(posaux,posaux);
        vec3.scale(posaux, posaux, this.minDistance);
        length = this.minDistance;
    }
    //corrijo para que no se ponga paralelo al eje Y r/ target
    var angle = vec3.angle(posaux, this.TARGET_UP);
    var m = mat4.create();
    var diference = 0;  
    var axisR = vec3.create();
    vec3.cross(axisR, posaux, this.TARGET_UP);
    if(angle < Math.PI / 8) {
        diference = angle - Math.PI/8
        
    } 
    //corrijo paralelo al eje pero por abajo.
    var upAux = vec3.create();
    vec3.scale(upAux, this.TARGET_UP, -1);
    angle =  vec3.angle(posaux, upAux);
    if(angle < Math.PI / 8) {
        diference = Math.PI/8 -angle;   
    }

    if(diference) {
        mat4.rotate(m,m,diference,axisR);
        vec3.transformMat4(posaux,posaux,m);
    }
    vec3.add(this.position,this.target,posaux);
    this._updateUp();
    this.dirty = true;
} 


//Recalcula la dirección del up
FixedCenterCamera.prototype._updateUp = function (){
    var posaux = vec3.create();
    vec3.subtract(posaux, this.position, this.target);

    var angle = vec3.angle(this.target,posaux);
    var axisR = vec3.create();

    vec3.cross(axisR, posaux,this.TARGET_UP);   
    vec3.normalize(axisR,axisR);

    //voy a rotar el up respecto del eje perpendicular.
    var m = mat4.create();
    mat4.fromRotation(m, Math.PI/2-angle, axisR);
    vec3.transformMat4(this.up, this.TARGET_UP, m);
    this.dirty = true;
} 