var ShaderBinder = function() {
	
	// buffers
	this.uniforms = {};
	this.attributes = {};
	
}

ShaderBinder.prototype.addUniform= function(name, location, method){
        this.uniforms[name] = {method: method, location:location};       
};


ShaderBinder.prototype.addAttribute= function(name, location){
        this.attributes[name] = location;   
};



ShaderBinder.prototype.bind = function(program, repository) {
    for (var name in this.uniforms) {
        var element = this.uniforms[name];
        var hndl = program.getUniform(name);
        if(hndl < 0){
            console.log("No encuentro el param "+ name);
        }
        element.method(hndl, Utils.isDefined(element.location) ? repository[element.location]() : null);
    }

    var attrs = repository.getVertexAttributes();
    for(var name in this.attributes) {
        var element = this.attributes[name];
        program.setAttribute(name, attrs[element]);
    }

}


