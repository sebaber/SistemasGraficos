function ArbolRandom() {
	var randomNumber = Math.random(); // 0 y 1 
	var lista; //Lista con coordenadas r y z 
	if (randomNumber < 0.3333){
		//Navidad
		lista = [0.0, 0.0 
				,0.5, 0.0 
				,0.5, 0.75 
				,1.5, 0.5 
				,0.75, 1.5
				,1.4, 1.25
				,0.0, 2.5];
	} else if (randomNumber < 0.6666) {
		//Puntiagudo
		lista = [0.0, 0.0 
				,0.35, 0.0 
				,0.35, 0.75 
				,1.5, 0.5 
				,1.0, 1.0
				,0.625, 1.5
				,0.2, 2.25
				,0.0, 2.75];
	} else {
		//Arbol Redondo
		lista = [0.0, 0.0 
				,0.5, 0.0 
				,0.5, 1.0
				,0.75, 1.0625 
				,1.3, 1.4875 
				,1.5, 1.9125
				,1.3, 2.3375
				,0.75, 2.7625
				,0.4, 2.89
				,0.0, 2.975];
	}
	Arbol.call(this,lista);
	var randomXZ = 0.3;//Math.random();
	var randomY = 0.5;//Math.random();
	var x = randomXZ;
	var y = randomY;
	var z = randomXZ;	
	this.scaleNonUniform(x,y,z);
}

inheritPrototype(ArbolRandom, Arbol);