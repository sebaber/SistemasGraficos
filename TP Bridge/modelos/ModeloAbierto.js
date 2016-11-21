function ModeloAbierto(_rows, _cols) {
  Transformable.call(this);
  this.cols = _cols;
  this.rows = _rows;
  this.texture = null;
  this.normalMap = null;
	this.reflectionMap = null;

	this.useNormalMap = false;
	this.useReflectionMap = false;

  this.index_buffer = null;
  this.position_buffer = null;
  this.texture_coord_buffer = null;
  this.tangent_buffer = null;
  this.normal_buffer = null;
  this.binormal_buffer = null;

  this.webgl_position_buffer = null;
  this.webgl_index_buffer = null;
  this.webgl_texture_coord_buffer = null;
  this.webgl_tangent_buffer = null;
  this.webgl_normal_buffer = null;
  this.webgl_binormal_buffer = null;


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
  console.log("PASO CON TEXTURA: "+normal_file);
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
      // this.index_buffer.push((i+1)*this.cols);
    }else{
      for(j=this.cols-1;j>=0;--j){
          this.index_buffer.push((i*this.cols) + j);
          this.index_buffer.push(((i+1)*this.cols) + j);
      }
      // this.index_buffer.push((i+1)*this.cols);
    }
  }
};

ModeloAbierto.prototype._setupWebGLBuffers = function(){

  this.webgl_normal_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
      gl.STATIC_DRAW);

  // Activo el buffer de binormales
  if (this.binormal_buffer !== null) {
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
  if (this.tangent_buffer !== null) {
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

    // 1. Creamos un buffer para las posicioens dentro del pipeline.
    this.webgl_position_buffer = gl.createBuffer();
    // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
    // hemos creado.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    // 3. Cargamos datos de las posiciones en el buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información del color
    // this.webgl_color_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

    // Activo el buffer de coordenadas de texturas
    this.webgl_texture_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);

    // Repetimos los pasos 1. 2. y 3. para la información de los índices
    // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
    // Notar también que se usa un array de enteros en lugar de floats.
    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
};

ModeloAbierto.prototype.draw = function(mvMatrix){

  gl.uniform1i(glProgram.useNormalMapUniform, this.uUseNormalMap);

  var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  var textureCoordAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
  gl.enableVertexAttribArray(textureCoordAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  var vertexTangentAttribute = gl.getAttribLocation(glProgram, "aVertexTangent");
  gl.enableVertexAttribArray(vertexTangentAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.vertexAttribPointer(vertexTangentAttribute,3, gl.FLOAT, false, 0, 0);

  var vertexBinormalAttribute = gl.getAttribLocation(glProgram, "aVertexBinormal");
  gl.enableVertexAttribArray(vertexBinormalAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.vertexAttribPointer(vertexBinormalAttribute,3, gl.FLOAT, false, 0, 0);

  var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.vertexAttribPointer(vertexNormalAttribute,3, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.uniform1i(gl.getUniformLocation(glProgram, "uSampler"), 0);

  this.applyTransformationMatrix(mvMatrix,false);

  var u_model_view_matrix = gl.getUniformLocation(glProgram, "uModelMatrix");
  gl.uniformMatrix4fv(u_model_view_matrix, false, this.getObjectMatrix());

  var normalMatrix = mat3.create();
	mat3.normalFromMat4(normalMatrix,u_model_view_matrix);
	gl.uniformMatrix3fv(gl.getUniformLocation(glProgram, "uNMatrix"), false, normalMatrix);

  gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, this.normalMap);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uNormalSampler"), 1);

	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, this.reflectionMap);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uReflectionSampler"), 2);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

  // Dibujamos.
  gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
};
