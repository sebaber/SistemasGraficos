function Arbol(listaTronco,listaCopa) {
	ModeloComplejo.call(this);
	this.agregarModelo(new TroncoDelArbol(listaTronco));
	this.agregarModelo(new CopaDelArbol(listaCopa));
}

inheritPrototype(Arbol, ModeloComplejo);