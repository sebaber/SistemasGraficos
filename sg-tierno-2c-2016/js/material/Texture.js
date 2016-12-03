
var Texture = function(textureFile, highr) {
  this.gl = GLContext.getContext();
  this.texture = this.gl.createTexture();
  this.texture.image = new Image();
  var that = this;
  this.texture.image.onload = function() {
                gl = that.gl;
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, that.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.texture.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                if(Utils.isDefined(highr) && highr){
                  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);  
                } else {
                  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);  
                }
                
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);
	}
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
              new Uint8Array([124, 124, 124, 255]))
	this.texture.image.src = textureFile;	
}

Texture.prototype.getGLTexture = function () {
     return this.texture;
}
            
            

            
