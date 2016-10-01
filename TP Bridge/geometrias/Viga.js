function Viga(curva,radio,npoints,nlevels){
	Extrusion.call(this,curva, new Circulo(npoints,radio,0.0, 0.0, 0.0),nlevels);
}

inheritPrototype(Viga, Extrusion);
