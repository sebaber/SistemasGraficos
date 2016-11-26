function Calle(curva,anchoCalle,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCalle),nlevels);

  this.initTexture("tramo-doblemarilla.jpg");
  this.initNormalMap("vereda-normalmap.jpg");
}

inheritPrototype(Calle, Extrusion);

Calle.prototype.setTextureBuffer = function(i,j){
	this.texture_coord_buffer.push(j);
	this.texture_coord_buffer.push(i);
}
