function CopaDelArbol(lista) {
	this.vertexOfProfile = lista;
	var color = [0,0.7,0];
	SuperficieDeRevolucion.call(this, this.vertexOfProfile,color);

	this.initTexture("hojas.jpg");
}

inheritPrototype(CopaDelArbol, SuperficieDeRevolucion);
