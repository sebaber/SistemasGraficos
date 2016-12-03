

Light = function () {
	this.enabled = true
	this.ambientCoef = 0.8;
	this.diffuseCoef = 0.8;
	this.specularCoef = 0.9;
	this.position = [-0.3, 0.0199, -0.9998];
	this.shininess = 15;	

}

Light.prototype.getEnabled= function(){
	return this.enabled;
};


Light.prototype.getPosition = function () {
	return  this.position;
}

Light.prototype.getAmbientColor = function () {

	return this.ambientCoef;
}

Light.prototype.getSpecularColor = function(){
	return this.specularCoef;
}


Light.prototype.getDiffuseColor = function(){
	return this.diffuseCoef;
}

Light.prototype.getShininess = function() {
	return this.shininess;
};