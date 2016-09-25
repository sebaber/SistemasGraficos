function CilindroCerrado(radio, largo, npoints,nlevels) {
  var pos;
  this.radio = radio;
  this.vertices = [];
	this.circulo = new Circulo(radio, 0.0, 0.0, 0.0);
	var d = 1.0 / npoints;

  for (var i = 0; i < npoints; i++) {
		var t = d * i;
		pos = this.circulo.getPosition(t);
		this.vertices.push([ pos[0], pos[1] ]);
	}

	pos = this.circulo.getPosition(0.0);
	this.vertices.push([ pos[0], pos[1] ]);

	ExtrusionCerrada.call(this,largo, this.vertices,nlevels+2);
}

inheritPrototype(CilindroCerrado, ExtrusionCerrada);
