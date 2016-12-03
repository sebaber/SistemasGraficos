
// H en el plano xy con su centro en el origen..

var Column = function (long,topH, type,reduction,close) {
	Model.call(this);

	this.material =  new TexturedMaterial({texture: "metal4.jpg", normalMap: "metal4-normalmap.jpg", specularColor:[0,0,0]});
	var sideHeight = type;

	var aitch = this._generateH(sideHeight);
	//aitch.rotateX(90);
	aitch.rotateY(90);
	//voy a estruir sobre el eje Y;	
	var path = new Segment(0,long-topH);
	path.rotateZ(-90);

	//Creo la superficie de barrido.
	var geom = new SweptSurface(2, 80,aitch,path, true, new TextureGenerator( (1-type) +3, (1-type) +7,true));
	this.body = new Model(geom, this.material);
	this.body.translateY(long-topH);
	this.add(this.body);

	var reductionC = topH > 0 ? this._generateH(reduction) : this._generateClosing(type);
	//reductionC.rotateX(90);
	reductionC.rotateY(90);
	var top = new Model(new ColumnHat(80,aitch,reductionC,topH, new TextureGenerator(1+(1-type)-0.5,7,true)),this.material);
	top.translateY(long);
	this.add(top);
	if(Utils.isDefined(close)&& close) {
		top = this._generateTop(reduction);
		top.translateY(long);
		this.add(top);
	}

}
Utils.inheritPrototype(Column, Model);


Column.prototype._generateH = function (u){
	var legW = (u-0.2)*u/2;
	var coreW = (0.2 + 1 -u)*u; 
	var legH = (0.2 + (1-u)/2) * u;
	var totalH = u;
	var coreH = totalH - legH*2;
	
	
	var aitch = new ComplexCurve();



	//Cierro la H
	var seg = new Segment(0,legH);
	//lo muevo a su posicion OK
	seg.rotateX(70);
	seg.rotateZ(90);
	seg.translateX(coreW/2);
	seg.translateY(-totalH/2);
	aitch.add(seg);
	


	//segmento core inferior.
	seg = new Segment(0,coreW);
	seg.rotateZ(180);
	seg.translateX(coreW/2);
	seg.translateY(-coreH/2);
	aitch.add(seg);


	//Segmento corto pata izq inferior OK
	seg = new Segment(0,legH);
	//lo muevo a su posicion
	seg.rotateX(110);
	seg.rotateZ(-90);
	seg.translateX(-coreW/2);
	seg.translateY(-coreH/2);
	aitch.add(seg);


	//segmento horizontal pata izquierda inferior.
	seg = new Segment(0,legW);
	//lo muevo a su posicion
	seg.rotateZ(180);
	seg.translateX(-coreW/2);
	seg.translateY(-totalH/2);
	aitch.add(seg);



	//segmento largo pata izquierda OK
	seg = new Segment(0,totalH);
	//lo muevo a su posicion	
	seg.rotateZ(90);
	seg.translateX(-totalH/2);
	seg.translateY(-totalH/2);
	aitch.add(seg);



	//segmento horizontal pata izquierda superior.
	seg = new Segment(0,legW);
	seg.translateX(-totalH/2);
	seg.translateY(totalH/2);
	aitch.add(seg);



	//segmento corto pata superior izquierda
	seg = new Segment(0,legH);
	//lo muevo a su posicion
	seg.rotateZ(-90);
	seg.translateX(-coreW/2);
	seg.translateY(totalH/2);
	aitch.add(seg);


	//segmento core superior. 
	seg = new Segment(0,coreW);
	seg.translateX(-coreW/2);
	seg.translateY(coreH/2);
	aitch.add(seg);

	//segmento corto pata superior derecha
	seg = new Segment(0,legH);
	//lo muevo a su posicion

	seg.rotateZ(90);
	seg.translateX(coreW/2);
	seg.translateY(coreH/2);
	aitch.add(seg);


	//segmento horizontal pata derecha superior.
	seg = new Segment(0,legW);
	//lo muevo a su posicion
	seg.translateX(coreW/2);
	seg.translateY(totalH/2);
	aitch.add(seg);



	//segmento largo pata superior derecha OK
	seg = new Segment(0,totalH);
	//lo muevo a su posicion
	seg.rotateZ(-90);
	seg.translateX(totalH/2);
	seg.translateY(totalH/2);
	aitch.add(seg);


	//segmento horizontal pata derecha inferior.
	var seg = new Segment(0,legW);
	//lo muevo a su posicion
	seg.rotateZ(180);
	seg.translateX(coreW/2 + legW);
	seg.translateY(-totalH/2);
	aitch.add(seg);

return aitch;

}
Column.prototype._generateTop = function (u) {
	var size  = u;
	var curve = new Segment(0,size);
	var path = new Segment(0,size);
	curve.rotateX(180);
	curve.rotateY(90);
	
	curve.translateZ(size/2);
	curve.translateX(-size/2);
	
	var geom = new SweptSurface(2, 60,curve,path,true, new TextureGenerator(2,2,true));
	var m =  new Model(geom, this.material);
	return m;
}