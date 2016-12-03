
var ShaderSource = function(type) {
    this.elements = [];
    this.type = type;
    this.glContext = GLContext.getContext();
    this.attributes = {};
    this.uniforms = {};
    this.varyings ={};
    this.lines = [];
    
}


ShaderSource.prototype.addCodeLine = function(line) {
	this.lines.push(line);
};


ShaderSource.prototype.addAttribute = function(type, name) {
	if(Utils.isDefined(this.attributes[name])){
		console.log("Redefiniendo Atributo" + name);
	}
	this.attributes[name] = type;
};

ShaderSource.prototype.addUniform = function(type, name) {
	if(Utils.isDefined(this.uniforms[name])){
		console.log("Redefiniendo uniform: " + name);
	}
	this.uniforms[name] = type;
};

ShaderSource.prototype.addVarying = function(type, name) {
	if(Utils.isDefined(this.varyings[name])){
		console.log("Redefiniendo Varying: " + name);
	}
	this.varyings[name] = type;
};



ShaderSource.prototype.build = function() {
	var src = "";

	
	src += "precision mediump float;\n";	
	
	
	for(var i in this.attributes) {
		src += "attribute " + this.attributes[i] + " " + i + ";\n"; 
	}
	
	for(var i in this.uniforms) {
		src += "uniform " + this.uniforms[i] + " " + i + ";\n"; 
	}

	for(var i in this.varyings) {
		src += "varying " + this.varyings[i] + " " + i + ";\n"; 
	}

	src += "void main (void) {"
	var dot= "";
	var line = "";
	for(var i in this.lines){
		line = this.lines[i];
		dot = line[line.length-1] == "{" || line[line.length-1] == "}" ? "" : ";";
		src += line + dot + "\n";
	}

	src+="}"


	var shader = this.glContext.createShader(this.type);

  	// Creamos un shader WebGL según el atributo type del <script>.

	// Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
  	this.glContext.shaderSource(shader, src);

  	// Compilamos el shader.
  	
	this.glContext.compileShader(shader);  
	return {sh:shader, sr: src };
};

ShaderSource.prototype.getType = function() {
	return this.type;
};
