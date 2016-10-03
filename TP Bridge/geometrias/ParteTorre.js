function ParteTorre(piezaTorre,empalmeTorre,scale){
	ModeloComplejo.call(this);
  this.scale = scale;
	this.agregarModelo(piezaTorre);
	this.agregarModelo(empalmeTorre);
}

inheritPrototype(ParteTorre, ModeloComplejo);

ParteTorre.prototype.postInit = function(){
  console.log("entro");
  this.scaleNonUniform(this.scale,1,this.scale);
};
