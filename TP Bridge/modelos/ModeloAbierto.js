function ModeloAbierto(_rows, _cols) {
  Transformable.call(this);
  this.cols = _cols;
  this.rows = _rows;
  this.texture = null;
  this.texture2 = null;
  this.texture3 = null;

  this.index_buffer = null;
  this.position_buffer = null;
  this.texture_coord_buffer = null;
  this.tangent_buffer = [];
	this.binormal_buffer = [];
	this.normal_buffer = null;

  this.webgl_position_buffer = null;
  this.webgl_index_buffer = null;
  this.webgl_texture_coord_buffer = null;
  this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;
	this.webgl_normal_buffer = null;

  this.reflectionMap = null;
  this.useReflectionMap = false;

  this.normalMap = null;
  this.useNormalMap = false;

  this.mezcla = null;
  this.useMezcla = false;

  this.ra = 0.3;
  this.ga = 0.3;
  this.ba = 0.3;
  this.rd = 1.0;
  this.gd = 1.0;
  this.bd = 1.0;
  this.rs = 1.0;
  this.gs = 1.0;
  this.bs = 1.0;

  this._initBuffers();
}

inheritPrototype(ModeloAbierto, Transformable);

ModeloAbierto.prototype._initBuffers = function(){
  this._createIndexBuffer();
  this._setPositionAndColorVertex();
  this._setupWebGLBuffers();
};

ModeloAbierto.prototype.initTexture = function(texture_file) {
  // console.log("PASO CON TEXTURA: "+texture_file);
	var aux_texture = gl.createTexture();
	this.texture = aux_texture;
	this.texture.image = new Image();

	var tex = this.texture;
	var im = tex.image;
	this.texture.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.texture.image.src = "./assets/" + texture_file;
};

ModeloAbierto.prototype.initNormalMap = function(normal_file) {
	this.useNormalMap = true;
	var aux_texture = gl.createTexture();
	this.normalMap = aux_texture;
	this.normalMap.image = new Image();

	var tex = this.normalMap;
	var im = tex.image;
	this.normalMap.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.normalMap.image.src = "./assets/" + normal_file;
};

ModeloAbierto.prototype.initTexture2 = function(normal_file) {
	var aux_texture = gl.createTexture();
	this.texture2 = aux_texture;
	this.texture2.image = new Image();

	var tex = this.texture2;
	var im = tex.image;
	this.texture2.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.texture2.image.src = "./assets/" + normal_file;
};

ModeloAbierto.prototype.initTexture3 = function(normal_file) {
	var aux_texture = gl.createTexture();
	this.texture3 = aux_texture;
	this.texture3.image = new Image();

	var tex = this.texture3;
	var im = tex.image;
	this.texture3.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.texture3.image.src = "./assets/" + normal_file;
};

ModeloAbierto.prototype.initMezcla = function(normal_file) {
	this.useMezcla = true;
	var aux_texture = gl.createTexture();
	this.mezcla = aux_texture;
	this.mezcla.image = new Image();

	var tex = this.mezcla;
	var im = tex.image;
	this.mezcla.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.mezcla.image.src = "./assets/" + normal_file;
};

ModeloAbierto.prototype.initReflectionMap = function(reflection_file) {
	this.useReflectionMap = true;
	var aux_texture = gl.createTexture();
	this.reflectionMap = aux_texture;
	this.reflectionMap.image = new Image();

	var tex = this.reflectionMap;
	var im = tex.image;
	this.reflectionMap.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.reflectionMap.image.src = "./assets/" + reflection_file;
};

function handleLoadedTexture(tex, im) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
			gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
}

ModeloAbierto.prototype._createIndexBuffer = function(){
  this.index_buffer = [];
  for(i = 0; i< this.rows-1; ++i){
    if(i%2 === 0){
      for(j=0;j<this.cols;++j){
          this.index_buffer.push((i*this.cols) + j);
          this.index_buffer.push(((i+1)*this.cols) + j);
      }
    }else{
      for(j=this.cols-1;j>=0;--j){
          this.index_buffer.push((i*this.cols) + j);
          this.index_buffer.push(((i+1)*this.cols) + j);
      }
    }
  }
};

ModeloAbierto.prototype._setupWebGLBuffers = function(){

  this.webgl_normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
      gl.STATIC_DRAW);

  // Activo el buffer de binormales
  if (this.binormal_buffer.length > 0) {
    this.webgl_binormal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer),
        gl.STATIC_DRAW);
  } else {
    this.webgl_binormal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
        gl.STATIC_DRAW);
  }

  // Activo el buffer de tangentes
  if (this.tangent_buffer.length > 0) {
    this.webgl_tangent_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer),
        gl.STATIC_DRAW);
  } else {
    this.webgl_tangent_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
        gl.STATIC_DRAW);
  }

    this.webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    // Activo el buffer de coordenadas de texturas
    this.webgl_texture_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);

    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
};

ModeloAbierto.prototype.setLightConfiguration = function(ra, ga, ba, rd, gd, bd, rs, gs, bs){
  this.ra = ra;
  this.ga = ga;
  this.ba = ba;
  this.rd = rd;
  this.gd = gd;
  this.bd = bd;
  this.rs = rs;
  this.gs = gs;
  this.bs = bs;
}

ModeloAbierto.prototype.activateLightConfiguration = function(){

  //gl.uniform1i(glProgram.useNormalMapUniform, cielo.useNormalMap);
  //gl.uniform1i(glProgram.useReflectionMapUniform, cielo.useReflectionMap);
  gl.uniform3f(glProgram.ambientColorUniform, this.ra, this.ga, this.ba );
  gl.uniform3f(glProgram.directionalColorUniform, this.rd, this.gd, this.bd);
  gl.uniform3f(glProgram.specularColorUniform, this.rs, this.gs, this.bs);
}

ModeloAbierto.prototype.draw = function(mvMatrix){
   this.activateLightConfiguration();

  gl.uniform1f(glProgram.reflectionLevel, 0.05);

  gl.uniform1i(glProgram.useNormalMapUniform, this.useNormalMap);

  gl.uniform1i(glProgram.useMezclaMapUniform, this.useMezcla);

  gl.uniform1i(glProgram.useReflectionMapUniform, this.uUseReflectionMap);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.vertexAttribPointer(glProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.vertexAttribPointer(glProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.vertexAttribPointer(glProgram.vertexTangentAttribute,3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.vertexAttribPointer(glProgram.vertexBinormalAttribute,3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.vertexAttribPointer(glProgram.vertexNormalAttribute,3, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.uniform1i(gl.getUniformLocation(glProgram, "uTextureSampler"), 0);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, this.normalMap);
  gl.uniform1i(glProgram.normalSamplerUniform, 1);

  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, this.texture2);
  gl.uniform1i(glProgram.texture2Uniform, 2);

  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, this.texture3);
  gl.uniform1i(glProgram.texture3Uniform, 3);

  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_2D, this.mezcla);
  gl.uniform1i(glProgram.mezclaSamplerUniform,4);

  gl.activeTexture(gl.TEXTURE5);
	gl.bindTexture(gl.TEXTURE_2D, this.reflectionMap);
	gl.uniform1i(glProgram.reflectionSamplerUniform, 5);

  this.applyTransformationMatrix(mvMatrix,false);

  gl.uniformMatrix4fv(glProgram.ModelMatrixUniform, false, this.getObjectMatrix());

  var normalMatrix = mat3.create();
	mat3.normalFromMat4(normalMatrix,this.getObjectMatrix());
	gl.uniformMatrix3fv(glProgram.nMatrixUniform, false, normalMatrix);


  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  // Dibujamos.
  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
};
