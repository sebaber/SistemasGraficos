function Modelo(_rows, _cols) {
  Transformable.call(this);
  this.cols = _cols;
  this.rows = _rows;
  this.texture = null;

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

  this.normalMap = null;
  this.useNormalMap = false;

  this.reflectionMap = null;
  this.useReflectionMap = false;

  this.ra = 0.3;
  this.ga = 0.3;
  this.ba = 0.3;
  this.rd = 1.0;
  this.gd = 1.0;
  this.bd = 1.0;
  this.rs = 1.0;
  this.gs = 1.0;
  this.bs = 1.0;

  this.transparente = false;
  this.base = false;

  this._initBuffers();
}

inheritPrototype(Modelo, Transformable);

Modelo.prototype._initBuffers = function(){
  this._createIndexBuffer();
  this._setPositionAndColorVertex();
  this._setupWebGLBuffers();
};

Modelo.prototype.setTransparente = function(trans){
  this.transparente = trans;
};

Modelo.prototype.getTransparente = function(){
  return this.transparente;
};

Modelo.prototype.setBase = function(bas){
  this.base = bas;
};

Modelo.prototype.getBase = function(){
  return this.base;
};

Modelo.prototype.initTexture = function(texture_file) {
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

Modelo.prototype.initNormalMap = function(normal_file) {
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

Modelo.prototype.initReflectionMap = function(reflection_file) {
  this.useReflectionMap = true;
  var texture = gl.createTexture();
  this.reflectionMap = texture;

  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
 // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  var sources = [
    ["assets/cubemap/right.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
    ["assets/cubemap/left.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
    ["assets/cubemap/top.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
    ["assets/cubemap/bottom.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
    ["assets/cubemap/front.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
    ["assets/cubemap/back.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
  ];

  for (var i = 0; i < sources.length; i++) {
    var image = new Image();
    image.src = sources[i][0];
    gl.texImage2D(sources[i][1], 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
    image.onload = function(texture, face, image) {
      return function() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
      }
    } (texture, sources[i][1], image);
  }
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

Modelo.prototype._createIndexBuffer = function(){
  this.index_buffer = [];

  for(i = 0; i< this.rows-1; ++i){
    if(i%2 === 0){
      for(j=0;j<this.cols;++j){
          this.index_buffer.push((i*this.cols) + j);
          this.index_buffer.push(((i+1)*this.cols) + j);
      }
      this.index_buffer.push((i+1)*this.cols);
    }else{
      for(j=this.cols-1;j>=0;--j){
          this.index_buffer.push((i*this.cols) + j);
          this.index_buffer.push(((i+1)*this.cols) + j);
      }
      this.index_buffer.push((i+1)*this.cols);
    }
  }
};

Modelo.prototype._setupWebGLBuffers = function(){

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

Modelo.prototype.setLightConfiguration = function(ra, ga, ba, rd, gd, bd, rs, gs, bs){
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

Modelo.prototype.activateLightConfiguration = function(){

  //gl.uniform1i(glProgram.useNormalMapUniform, cielo.useNormalMap);
  //gl.uniform1i(glProgram.useReflectionMapUniform, cielo.useReflectionMap);
  gl.uniform3f(glProgram.ambientColorUniform, this.ra, this.ga, this.ba );
  gl.uniform3f(glProgram.directionalColorUniform, this.rd, this.gd, this.bd);
  gl.uniform3f(glProgram.specularColorUniform, this.rs, this.gs, this.bs);
};

Modelo.prototype.draw = function(mvMatrix){
  this.activateLightConfiguration();

  gl.uniform1f(glProgram.reflectionLevel, 1.0);

  // if (this.transparente) {
  //   gl.blendFunc(gl.SRC_ALPHA, 0.0);
  //   gl.enable(gl.BLEND);
  //   //gl.disable(gl.DEPTH_TEST);
  //   gl.uniform1f(gl.alphaUniform, 1.0);
  //   gl.uniform1i(glProgram.useTransparenteUniform, true);
  // } else {
  //   gl.disable(gl.BLEND);
  //   gl.enable(gl.DEPTH_TEST);
  //   gl.uniform1i(glProgram.useTransparenteUniform, false);
  // }

  gl.uniform1i(glProgram.useNormalMapUniform, this.useNormalMap);
  gl.uniform1i(glProgram.useReflectionMapUniform, this.useReflectionMap);

  gl.uniform1i(glProgram.useMezclaMapUniform, false);

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

  this.applyTransformationMatrix(mvMatrix,false);

  gl.uniformMatrix4fv(glProgram.ModelMatrixUniform, false, this.getObjectMatrix());

  var normalMatrix = mat3.create();
	mat3.normalFromMat4(normalMatrix,this.getObjectMatrix());
	gl.uniformMatrix3fv(glProgram.nMatrixUniform, false, normalMatrix);

	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, this.normalMap);
	gl.uniform1i(glProgram.normalSamplerUniform, 1);

  gl.activeTexture(gl.TEXTURE5);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.reflectionMap);
	gl.uniform1i(glProgram.reflectionSamplerUniform, 5);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  // Dibujamos.
  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length-1, gl.UNSIGNED_SHORT, 0);
};
