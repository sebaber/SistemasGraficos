function Torre(curva,nlevels){
	Extrusion.call(this,curva, new PerfilTorre(),nlevels);
}

inheritPrototype(Torre, Extrusion);
