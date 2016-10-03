function Torre(h1,h2,h3){
	ModeloComplejo.call(this);
	var h1final = h1+h1/4;
	var h2final = h1final+h2+h2/4;
	var h3final = h2final+h3+h3/4;
	var parte1 = new ParteTorre(new PiezaTorre(new Segmento([0,0,0],[0,h1,0]),10),new EmpalmeTorre(h1,h1/4),0.1);
	var parte2 = new ParteTorre(new PiezaTorre(new Segmento([0,h1final,0],[0,h1final+h2,0]),10),new EmpalmeTorre(h1final+h2,h2/4),0.05);
	var parte3 = new ParteTorre(new PiezaTorre(new Segmento([0,h2final,0],[0,h2final+h3,0]),10),new EmpalmeTorre(h2final+h3,h3/4),0.025);
	this.agregarModelo(parte1);
	this.agregarModelo(parte2);
	this.agregarModelo(parte3);
}

inheritPrototype(Torre, ModeloComplejo);
