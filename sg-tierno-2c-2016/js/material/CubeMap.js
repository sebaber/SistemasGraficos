
var CubeMap = function() {
  var gl = GLContext.getContext();
  var texture = gl.createTexture();
  this.texture = texture;

  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
 // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  var sources = [
    ["textures/cubemap/right.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
    ["textures/cubemap/left.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
    ["textures/cubemap/top.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
    ["textures/cubemap/bottom.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
    ["textures/cubemap/front.jpg", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
    ["textures/cubemap/back.jpg", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
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
  
}

CubeMap.prototype.getTexture = function () {
     return this.texture;
}
            
            

 
