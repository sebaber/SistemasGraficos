/*cameraRad = 50.0;
cameraPos = [ 0.0, cameraRad, 0.0 ];
cameraUp = [ 0.0, 0.0, 1.0 ];
cameraTarget = [ 0.0, 0.0, 0.0 ];
var lastpos = [ 0.0, 0.0 ];
var mx;
var my;
var mouseIsDown = false;
phi = Math.PI * 0.35;
theta = Math.PI * 1.25;

function mouseMove(event) {
	mx = event.clientX;
	my = event.clientY;
	if (mouseIsDown && cameraOrbital) {
		phi += -(my - lastpos[1]) * 0.005;
		theta += -(mx - lastpos[0]) * 0.005;
		if (phi > Math.PI * 0.499)
			phi = Math.PI * 0.499;
		if (phi < Math.PI * 0.001)
			phi = Math.PI * 0.001;
	}
	if (camaraCarro) {
		rotUp = my;
		rotObj = mx;
	}
	lastpos[0] = mx;
	lastpos[1] = my;
}

function mouseDown(event) {
	mouseIsDown = true;
}

function mouseUp(event) {
	mouseIsDown = false;
}

function mouseWheel(event) {
	if (cameraOrbital) {
		if (event.deltaY > 0)
			scale = 1.1;
		else
			scale = 0.9;
		if (cameraRad * scale < skyRad && cameraRad * scale > 5.0) {
			vec3.scale(cameraPos, scale);
			cameraRad = vec3.length(cameraPos);
		}
	}
}
*/

var teclaBajarActiva = false;
var teclaSubirActiva = false;
var teclaArribaActiva = false;
var teclaAbajoActiva = false;
var teclaDerechaActiva = false;
var teclaIzquierdaActiva = false;
var teclaRotarIzquierdaActiva = false;
var teclaRotarDerechaActiva = false;
var teclaRotarAbajoActiva = false;
var teclaRotarArribaActiva = false;

var xRotGlobal = 0.0;
var yRotGlobal = 0.0;
var zPosGlobal = 0.0;
var xPosGlobal = 0.0;
var yPosGlobal = 0.0;

function keyPressDownEvent(event){
  // if ( event.which == 13 ) {
  //  event.preventDefault();
  // }
  if (event.key == 'd'){
  	teclaDerechaActiva = true;
  }
  else if (event.key == 'a'){
  	teclaIzquierdaActiva = true;
  }
  else if (event.key == 'w'){
  	teclaArribaActiva = true;
  }
  else if (event.key == 's'){
  	teclaAbajoActiva = true;
  }
  else if (event.key == 'e'){
  	teclaSubirActiva = true;
  }
  else if (event.key == 'q'){
  	teclaBajarActiva = true;
  }
  else if (event.key == 'l'){
  	teclaRotarIzquierdaActiva = true;
  }
  else if (event.key == 'j'){
  	teclaRotarDerechaActiva = true;
  }
  else if (event.key == 'i'){
  	teclaRotarArribaActiva = true;
  }
  else if (event.key == 'k'){
  	teclaRotarAbajoActiva = true;
  }
}

function keyPressUpEvent(event){
//  if ( event.which == 13 ) {
//   event.preventDefault();
//  }
  if (event.key == 'd'){
  	teclaDerechaActiva = false;
  }
  else if (event.key == 'a'){
  	teclaIzquierdaActiva = false;
  }
  else if (event.key == 'w'){
  	teclaArribaActiva = false;
  }
  else if (event.key == 's'){
  	teclaAbajoActiva = false;
  }
  else if (event.key == 'e'){
  	teclaSubirActiva = false;
  }
  else if (event.key == 'q'){
  	teclaBajarActiva = false;
  }
  else if (event.key == 'l'){
  	teclaRotarIzquierdaActiva = false;
  }
  else if (event.key == 'j'){
  	teclaRotarDerechaActiva = false;
  }
  else if (event.key == 'i'){
  	teclaRotarArribaActiva = false;
  }
  else if (event.key == 'k'){
  	teclaRotarAbajoActiva = false;
  }
}

function actualizarMovimientosDeCamara(pMatrix){
	var xPos = 0.0;
	var yPos = 0.0;	
	var xRot = 0.0;
	var yRot = 0.0;
	var zPos = 0.0;

	if (teclaRotarIzquierdaActiva){
		yRot -= 0.01;
	}
	if (teclaRotarDerechaActiva){
		yRot += 0.01;
	}
	if (teclaRotarArribaActiva){
		xRot -= 0.01;
	}
	if (teclaRotarAbajoActiva){
		xRot += 0.01;
	}

	yRotGlobal -= yRot;
	xRotGlobal -= xRot;

	//Aplico la rotacion
	mat4.rotate(pMatrix, pMatrix, yRotGlobal, [0, 1, 0]);
	mat4.rotate(pMatrix, pMatrix, xRotGlobal, [Math.cos(yRotGlobal), 0, Math.sin(yRotGlobal)]);

	if (teclaArribaActiva){
		yPos += 0.025;
	}
	if (teclaAbajoActiva) {
		yPos -= 0.025;
	}
	if (teclaDerechaActiva){
		xPos += 0.025;
	}
	if (teclaIzquierdaActiva){
		xPos -= 0.025;
	}
	if (teclaSubirActiva){
		zPos -= 0.025;
	}
	if (teclaBajarActiva){
		zPos += 0.025;
	}
	
	var angulo = yRotGlobal * -1;

	var dxRespectoDeX = yPos * Math.cos(angulo);
	var dyRespectoDeX = yPos * Math.sin(angulo);
	var dxRespectoDeY = xPos * Math.cos(angulo - 1.57079632679);
	var dyRespectoDeY = xPos * Math.sin(angulo - 1.57079632679);

	xPosGlobal += (dyRespectoDeX + dyRespectoDeY);
	yPosGlobal += (dxRespectoDeX + dxRespectoDeY);
	zPosGlobal += (zPos);
	//Aplico la traslacion
	mat4.translate(pMatrix, pMatrix, [xPosGlobal, zPosGlobal , yPosGlobal]);

	return pMatrix;
}