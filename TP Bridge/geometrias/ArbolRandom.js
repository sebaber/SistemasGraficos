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
	// this.init();
}

inheritPrototype(ArbolRandom, Arbol);

ArbolRandom.prototype.init = function (posx,posy,posz) {
	var randomXZ = Math.random() / 2 + 0.5;
	var randomY = Math.random() / 2 + 0.5;
	var x = randomXZ;
	var y = randomY;
	var z = randomXZ;

	this.setPosition(posx,posy,posz);
  	this.rotateX(-1.5);
  	this.scaleNonUniform(1,1,1.5);
	this.scaleNonUniform(x,y,z);
};
