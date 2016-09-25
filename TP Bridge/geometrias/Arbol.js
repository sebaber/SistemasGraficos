function Arbol() {
	this.vertexOfProfile = [ 0.0, 0.0, 0.5, 0.0, 0.5, 0.75, 1.5, 0.5, 0.75, 1.5,1.4,1.25,0,2.5];

	SuperficieDeRevolucion.call(this, this.vertexOfProfile);
}

inheritPrototype(Arbol, SuperficieDeRevolucion);
