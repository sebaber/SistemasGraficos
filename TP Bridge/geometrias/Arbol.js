function Arbol(lista) {
	this.vertexOfProfile = lista;

	SuperficieDeRevolucion.call(this, this.vertexOfProfile);
}

inheritPrototype(Arbol, SuperficieDeRevolucion);


