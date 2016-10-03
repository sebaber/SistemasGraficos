function Torre(h1,h2,h3){
	ModeloComplejo.call(this);
	var h1final = h1+h1/4;
	var h2final = h1final+h2+h2/4;
	var h3final = h2final+h3+h3/4;
	var piezaTorre1 = new PiezaTorre(new Segmento([0,0,0],[0,h1,0]),10);
	var piezaTorre2 = new EmpalmeTorre(h1,h1/4);
	var piezaTorre3 = new PiezaTorre(new Segmento([0,h1final,0],[0,h1final+h2,0]),10);
	var piezaTorre4 = new EmpalmeTorre(h1final+h2,h2/4);
	var piezaTorre5 = new PiezaTorre(new Segmento([0,h2final,0],[0,h2final+h3,0]),10);
	var piezaTorre6 = new EmpalmeTorre(h2final+h3,h3/4);
	this.agregarModelo(piezaTorre1);
	this.agregarModelo(piezaTorre2);
	this.agregarModelo(piezaTorre3);
	this.agregarModelo(piezaTorre4);
	this.agregarModelo(piezaTorre5);
	this.agregarModelo(piezaTorre6);
	this.translate(12,0,-6);
	piezaTorre1.scaleNonUniform(0.4,1,0.4);
	piezaTorre2.scaleNonUniform(0.4,1,0.4);
	piezaTorre3.scaleNonUniform(0.2,1,0.2);
	piezaTorre4.scaleNonUniform(0.2,1,0.2);
	piezaTorre5.scaleNonUniform(0.1,1,0.1);
	piezaTorre6.scaleNonUniform(0.1,1,0.1);
}

inheritPrototype(Torre, ModeloComplejo);
