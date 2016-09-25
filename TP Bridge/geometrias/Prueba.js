function Prueba() {
	this.vertexOfProfile = [ 0.0, 0.0, 1.0, 0.0, 1.0, 2.5, 0.8, 3.0, 0.8, 4.0,
			0.7, 4.1, 0.7, 7.0 ];

	SuperficieDeRevolucion.call(this, this.vertexOfProfile);
}

inheritPrototype(Prueba, SuperficieDeRevolucion);
