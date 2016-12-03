var ShaderProgram = function(vertexSrc, fragmentSrc) {

    this.glContext = GLContext.getContext();;
    this.vertexShader = null;
    this.fragmentShader = null;

    this.vertexShader = new Shader(vertexSrc);
    this.fragmentShader = new Shader(fragmentSrc);

    this.uniformHandlers = {}
    this.attributeHandlers = {}
    this._init();
    this.binder = null;

}

ShaderProgram.prototype._init = function (){
    this.gl_program = this.glContext.createProgram();
    // Creamos un programa de shaders de WebGL.


    // Asociamos cada shader compilado al programa.
    if(Utils.isDefined(this.vertexShader))
        this.vertexShader.attach(this.gl_program);

    if(Utils.isDefined(this.fragmentShader))
        this.fragmentShader.attach(this.gl_program);

    // Linkeamos los shaders para generar el programa ejecutable.

    this.glContext.linkProgram(this.gl_program);

    // Chequeamos y reportamos si hubo algún error.
    if (!this.glContext.getProgramParameter(this.gl_program, this.glContext.LINK_STATUS)) {
      alert("Unable to initialize the shader program: " +
            this.glContext.getProgramInfoLog(this.gl_program));
    } else {
        console.log("compilacion ok");
    }

    
    //
}

ShaderProgram.prototype.getContext = function() {
    return this.glContext;
};

ShaderProgram.prototype._initAttributes = function () {
    throw new Error("not impelemented");
}

ShaderProgram.prototype._initAttribute = function (name) {
    var handler = this.getAttribute (name);
    if(handler < 0){
            console.log("No encuentro el attribute "+ name);
    }
    this.glContext.enableVertexAttribArray(handler);
}

ShaderProgram.prototype.getAttribute = function (name) {
    var ath = this.attributeHandlers[name];
    if(ath >= 0) {
        return ath;
    }
    ath = this.glContext.getAttribLocation(this.gl_program, name);
    this.attributeHandlers[name] = ath;
    return ath;
}


ShaderProgram.prototype.use = function () {
    this.glContext.useProgram(this.gl_program);
}

ShaderProgram.prototype.bind = function (repository) {
    this.use();
    this._initAttributes();
    if(Utils.isDefined(this.binder))
    this.binder.bind(this, repository);
}

ShaderProgram.prototype.setAttribute = function (attr, attrBuffer) {
    var attrIdx = this.getAttribute(attr);
    if (attrIdx >= 0) {				
        if(!Utils.isDefined(attrBuffer)) {
            console.log("No esta definido el buffer:" +attr);
        }
        attrBuffer.associateAttrPointer(attrIdx);
    } 
};


ShaderProgram.prototype.getUniform = function ( name) {
    var loc =this.uniformHandlers[name];
    if(loc) {
        return loc;
    }
    loc = this.glContext.getUniformLocation(this.gl_program, name);
    this.uniformHandlers[name] = loc;
    return loc;
};

ShaderProgram.prototype._setBinder = function (binder) {
    this.binder= binder;
}

ShaderProgram.prototype.getBinder = function() {
    return this.binder;
};


