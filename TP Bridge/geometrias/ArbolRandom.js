function ArbolRandom() {
	var randomNumber = Math.random();
	var lista; //Lista con coordenadas r y z 
	if (randomNumber < 0.3333){
		lista = [0.0, 0.0 
				,0.5, 0.0 
				,0.5, 0.75 
				,1.5, 0.5 
				,0.75, 1.5
				,1.4, 1.25
				,0.0, 2.5];
	} else if (randomNumber < 0.6666) {
		lista = [0.0, 0.0 
				,0.35, 0.0 
				,0.35, 0.75 
				,1.5, 0.5 
				,1.0, 1.0
				,0.625, 1.5
				,0.2, 2.25
				,0.0, 2.75];
	} else {
		lista = [0.0, 0.0 
				,0.5, 0.0 
				,0.5, 1.0
				,0.75, 1.25 
				,1.3, 1.75 
				,1.5, 2.25
				,1.3, 2.75
				,0.75, 3.25
				,0.4, 3.4
				,0.0, 3.5];
	}
	Arbol.call(this,lista);
}

inheritPrototype(ArbolRandom, Arbol);