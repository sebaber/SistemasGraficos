
var PhongVertexSource = function(parametrization) {

	var ctx = GLContext.getContext();
	ShaderSource.call(this, ctx.VERTEX_SHADER);

	this.addAttribute("vec3", "vertexPosition");
	this.addAttribute("vec3", "vertexNormal");

	this.addUniform("mat4", "viewMatrix");
	this.addUniform("mat4", "modelMatrix");
	this.addUniform("mat4", "proyMatrix");
	this.addUniform("mat3", "normalMatrix");	
	
	this.addVarying("vec3", "vnormal");
	this.addVarying("vec3", "vertPos");

	if(Utils.isDefined(parametrization) && Utils.isDefined(parametrization.attributes)) {
		for(var i in parametrization.attributes) {
			var e = parametrization.attributes[i];
			this.addAttribute(e.type, e.name);
		}
	}

	if(Utils.isDefined(parametrization) && Utils.isDefined(parametrization.varyings)) {
		for(var i in parametrization.varyings) {
			var e = parametrization.varyings[i];
			this.addVarying(e.type, e.name);
		}
	}

	if(Utils.isDefined(parametrization) && Utils.isDefined(parametrization.uniforms)) {
		for(var i in parametrization.uniforms) {
			var e = parametrization.uniforms[i];
			this.addUniform(e.type, e.name);
		}
	}
	this.addCodeLine("vec4 vertPos4 = modelMatrix * vec4(vertexPosition, 1.0)");
	this.addCodeLine("vertPos = vec3(vertPos4) / vertPos4.w");
	this.addCodeLine("vnormal = normalize(normalMatrix * vertexNormal)");
	

	if(Utils.isDefined(parametrization) && Utils.isDefined(parametrization.lines)) {
		for(var i in parametrization.lines) {
			this.addCodeLine(parametrization.lines[i]);
		}
	}


	this.addCodeLine("gl_Position = proyMatrix * viewMatrix * vertPos4");
}

Utils.inheritPrototype(PhongVertexSource, ShaderSource);





PhongFragmentSource= function(parametrization) {
    var ctx = GLContext.getContext();

    ShaderSource.call(this, ctx.FRAGMENT_SHADER);
    
    this.addVarying("vec3", "vnormal");
    this.addVarying("vec3", "vertPos");

    this.addUniform("vec3", "lightPos");
    this.addUniform("vec3", "viewPosition");
    this.addUniform("float", "La");
    this.addUniform("float", "Ld");
    this.addUniform("float", "Ls");
    this.addUniform("float", "shininessVal");
	this.addUniform("vec3","ambientColor");		
	this.addUniform("vec3","diffuseColor");		
	this.addUniform("vec3","specularColor");	
	this.addUniform("bool", "enableLight");	
	this.addUniform("float", "alphaMat");

	if(Utils.isDefined(parametrization.varyings)) {
		for(var i in parametrization.varyings) {
			var e = parametrization.varyings[i];
			this.addVarying(e.type, e.name);
		}
	}

	if(Utils.isDefined(parametrization.uniforms)) {
		for(var i in parametrization.uniforms) {
			var e = parametrization.uniforms[i];
			this.addUniform(e.type, e.name);
		}
	}


	this.addCodeLine("vec3 N = normalize(vnormal)");
	this.addCodeLine("vec3 L = normalize(lightPos)");
	this.addCodeLine("vec3 V = normalize(viewPosition-vertPos)");


	this.addCodeLine("vec3 computedAmbientColor = ambientColor");
	this.addCodeLine("vec4 computedDiffuseColor");		
	this.addCodeLine("vec3 computedSpecularColor = specularColor");
	

	if(Utils.isDefined(parametrization.extras)) {
		for(var i in parametrization.extras){
			this.addCodeLine(parametrization.extras[i]);	
		}
	}
	this.addCodeLine("float lambertian = max(dot(N, L), 0.0)");
	this.addCodeLine("float specular = 0.0");
	this.addCodeLine("if(lambertian > 0.0) {");
	this.addCodeLine("vec3 R = reflect(-L, N)");
	this.addCodeLine("float specAngle = max(dot(R, V), 0.0)");
	this.addCodeLine("specular = pow(specAngle, shininessVal)");
	this.addCodeLine("}");


	
	if(Utils.isDefined(parametrization.textures) && parametrization.textures.length > 0) {
		for(var i in parametrization.textures){
			this.addCodeLine(parametrization.textures[i]);	
		}
	} else {
		this.addCodeLine("computedDiffuseColor = vec4(diffuseColor,alphaMat)");		
	}

	this.addCodeLine("if(enableLight) {");
		this.addCodeLine("float alpha = computedDiffuseColor.w");
		this.addCodeLine("vec3 ac = La * computedAmbientColor");
		this.addCodeLine("vec3 dc = Ld * lambertian * computedDiffuseColor.rgb");
		this.addCodeLine("vec3 sc = Ls * specular * computedSpecularColor");
		this.addCodeLine("gl_FragColor = vec4(ac + dc + sc , computedDiffuseColor.w)");
	this.addCodeLine("} else {");
	this.addCodeLine("gl_FragColor =  computedDiffuseColor");
	this.addCodeLine("}");

	//this.addCodeLine("gl_FragColor = vec4( N, alpha)");

}

Utils.inheritPrototype(PhongFragmentSource, ShaderSource);

