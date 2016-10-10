function ArbolRandom() {
	var randomNumber = Math.random(); // 0 y 1
	var lista; //Lista con coordenadas r y z
	if (randomNumber < 0.3333){
		//Navidad
		lista1 = [0.0, 0.0
				,0.5, 0.0
				,0.5, 0.75
				,0.0, 0.75];
		lista2 =[0.0, 0.75
				,1.5, 0.5
				,0.75, 1.5
				,1.4, 1.25
				,0.0, 2.5];
	} else if (randomNumber < 0.6666) {
		//Puntiagudo
		lista1 = [0.0, 0.0
				,0.35, 0.0
				,0.35, 0.75
				,0.0, 0.75];
		lista2 = [0.0, 0.75
				,1.5, 0.5
				,1.0, 1.0
				,0.625, 1.5
				,0.2, 2.25
				,0.0, 2.75];
	} else {
		//Arbol Redondo
		lista1 = [0.0, 0.0
				,0.5, 0.0
				,0.5, 1.0
				,0.0, 1.0];
		lista2 = [0.0, 1.0
				,0.5, 1.0
				,0.75, 1.0625
				,1.3, 1.4875
				,1.5, 1.9125
				,1.3, 2.3375
				,0.75, 2.7625
				,0.4, 2.89
				,0.0, 2.975];
	}
	this.setRadio(lista2);
	Arbol.call(this,lista1,lista2);
	// this.init();
}

inheritPrototype(ArbolRandom, Arbol);

ArbolRandom.prototype.init = function (posx,posy,posz) {
	var randomXZ = Math.random() / 2.0 + 0.2;
	var randomY = Math.random() / 2.0 + 0.7;
	var x = randomXZ;
	var y = randomY;
	var z = randomXZ;

	this.setPosition(posx,posy,posz);
  	this.rotateX(-(Math.PI/2));
  	//this.scaleNonUniform(1,1,1);
	this.scaleNonUniform(x,z,y);
	this.radio *= x;
};

Arbol.prototype.setRadio = function(lista){
	this.radio = 0; 
	for (var i = 0; i < lista.length; i++) {
		if (( i%2 == 1) &&(this.radio < lista[i])){
			this.radio = lista[i];
		}
	}
}

Arbol.prototype.getRadio = function(){
	return this.radio;
}