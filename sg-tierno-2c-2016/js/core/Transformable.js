/*
 * Objeto transformable en el espacio
 */
function 
Transformable() {
	this.matrix = mat4.create(); // matriz de transformaciones al objeto
	this.normal_matrix = mat4.create();
	this.super_matrix = mat4.create();
	mat4.identity(this.super_matrix);
	this.final_matrix = mat4.create();
	this.reset();

}


Transformable.prototype.translate = function (x, y, z) {
	var m = mat4.create();
	mat4.translate(m, m, [x, y, z]);
	this.applyTransformationMatrix(m, false);
};

Transformable.prototype.translateX = function (x) {
	this.translate(x, 0, 0);
};

Transformable.prototype.translateY = function (y) {
	this.translate(0, y, 0);
};

Transformable.prototype.translateZ = function (z) {
	this.translate(0, 0, z);
};

Transformable.prototype.rotate = function (deg, axis) {
	var m = mat4.create();
	mat4.rotate(m, m, Utils.degToRad(deg), axis);
	this.applyTransformationMatrix(m, false);
	
};

Transformable.prototype.rotateX = function (deg) {
	this.rotate(deg, [1, 0, 0]);
};

Transformable.prototype.rotateY = function (deg) {
	this.rotate(deg, [0, 1, 0]);
};

Transformable.prototype.rotateZ = function (deg) {
	this.rotate(deg, [0, 0, 1]);
};

Transformable.prototype.setPosition = function (x, y, z) {
	this.reset();
	this.translate(x, y, z);
};


Transformable.prototype.scaleX = function (factor) {
	var m = mat4.create();
	mat4.scale(m, m, [factor, 1, 1]);
	this.applyTransformationMatrix(m, false);
};

Transformable.prototype.scaleY = function (factor) {
	var m = mat4.create();
	mat4.scale(m, m, [1, factor, 1]);
	this.applyTransformationMatrix(m, false);
};

Transformable.prototype.scaleZ = function (factor) {
	var m = mat4.create();
	mat4.scale(m, m, [1, 1, factor]);
	this.applyTransformationMatrix(m, false);
};
Transformable.prototype.scale = function (factor) {
	var m = mat4.create();
	mat4.scale(m, m, [factor, factor, factor]);
	this.applyTransformationMatrix(m, false);
};


Transformable.prototype.applyTransformationMatrix = function (matrix, reset) {
	// Por defecto resetea la matriz de transformaciones
	if (!Utils.isDefined(reset) || reset === true) {
		this.reset();
	}
	mat4.multiply(this.matrix,  matrix,this.matrix);
	this._update();
};


Transformable.prototype.setSuperMatrix = function (matrix) {
	// Por defecto resetea la matriz de transformaciones
	this.super_matrix = mat4.clone(matrix);
	this._update();
};


Transformable.prototype.reset = function () {
	mat4.identity(this.matrix);
	mat4.identity(this.final_matrix);
};

Transformable.prototype.getMatrix = function () {
	return this.final_matrix;
};

Transformable.prototype.getNormalMatrix = function () {
	var m = this.getMatrix();
	var rot = mat3.create();
	mat3.normalFromMat4(rot,m);
	return rot;
};

Transformable.prototype._apply= function (vect) {
	var applied = vec3.create();
	vec3.transformMat4(applied,vect,this.getMatrix());
	return applied;
}

Transformable.prototype._applyRotation = function (vect) {
	var applied = vec3.create();
	vec3.transformMat3(applied,vect,this.getNormalMatrix());
	return applied;
}

Transformable.prototype._update = function () {
	mat4.multiply(this.final_matrix, this.super_matrix, this.matrix);
}