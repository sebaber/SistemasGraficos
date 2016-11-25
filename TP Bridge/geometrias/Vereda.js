function Vereda(curva,anchoCalle,nlevels,discriminante) {
  Extrusion.call(this,curva, new PerfilVereda(anchoCalle,discriminante),nlevels);

  this.initTexture("vereda.jpg");
  this.initNormalMap("vereda-normalmap.jpg");
}

inheritPrototype(Vereda, Extrusion);

Vereda.prototype.setTextureBuffer = function(i,j){
	this.texture_coord_buffer.push(j);
	this.texture_coord_buffer.push(i);
};
