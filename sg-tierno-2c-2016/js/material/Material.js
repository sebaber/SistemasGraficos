Material = function (shader) {
	this.shader = shader;
}




Material.prototype.fillAttributes = function (levels, faces) {
	
}

Material.prototype.getShader = function(){
	return this.shader;
}
/*
WaterMaterial = function (color) {
	ColoredMaterial.call(this, color, new TextureGenerator());	
	this.shader = new WaterShaderProgram();
}																								

Utils.inheritPrototype(WaterMaterial, ColoredMaterial);
*/


PhongMaterial = function (options) {
	var defaults = {
  		diffuseColor : [1,1,1],
  		specularColor: [0,0,0],
  		ambientColor : [1,1,1],
  		enableLight : true,
  		alpha: 1.0
	}
	var opts = Utils.extend(defaults, options);
	if(!Utils.isDefined(opts.shader)) {
		if(!Utils.isDefined(PhongMaterial.shaderSingleton)) {
			PhongMaterial.shaderSingleton = new PhongShaderProgram();
		}		
		opts.shader = PhongMaterial.shaderSingleton;
	}

	this.diff = opts.diffuseColor;
	this.spec = opts.specularColor;
	this.amb = opts.ambientColor;
	this.enableLight = opts.enableLight;
	this.alpha = opts.alpha;
	Material.call(this, Utils.isDefined(opts.shader) ? opts.shader : PhongMaterial.shaderSingleton);
}																								

Utils.inheritPrototype(PhongMaterial, Material);
PhongMaterial.prototype.getAmbientColor = function () {
	return this.amb;
}

PhongMaterial.prototype.getSpecularColor = function(){
	return this.spec;
}


PhongMaterial.prototype.getDiffuseColor = function(){
	return this.diff;
}

PhongMaterial.prototype.getEnableLight = function () {
	return this.enableLight;
}


PhongMaterial.prototype.getAlpha = function () {
	return this.alpha;
}