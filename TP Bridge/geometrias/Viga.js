function Viga(curva,radio,npoints,nlevels){
	Extrusion.call(this,curva, new Circulo(npoints,radio,0.0, 0.0, 0.0),nlevels);

	this.initTexture("alambres.jpg");
}

inheritPrototype(Viga, Extrusion);

Viga.prototype.setTextureBuffer = function(i,j){
	this.texture_coord_buffer.push(i);
	this.texture_coord_buffer.push(j);
}