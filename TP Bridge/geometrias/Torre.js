function Torre(curva,nlevels){
	ExtrusionCerrada.call(this,curva, new PerfilTorre(),nlevels);
}

inheritPrototype(Torre, ExtrusionCerrada);
