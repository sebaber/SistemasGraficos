function TroncoDelArbol(lista) {
	this.vertexOfProfile = lista;
	var color = [0.7,0.3,0.0];
	SuperficieDeRevolucion.call(this, this.vertexOfProfile,color);
}

inheritPrototype(TroncoDelArbol, SuperficieDeRevolucion);


