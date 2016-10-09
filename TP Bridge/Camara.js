//Camara Orbital
var cameraRad = app.targetX;
cameraTarget =[app.targetX, 0.0 , app.targetY]; // [0.0, 0.0 , 0.0];
var cameraPos = [ 0.0 , 0.0, app.targetY ];
var cameraUp = [ 0.0, 1.0, 0.0 ];
var lastpos = [ 0.0, 0.0 ];
var zoomMax = 80.0;
var mx;
var my;
var mouseIsDown = false;
//var phi = Math.PI * 0.35;
//var theta = Math.PI * 1.25;
var phi = Math.PI * 0.5;
var theta = Math.PI;

var camaraOrbitalActiva = false;

//Camara FPS
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
var yRotGlobal = Math.PI * 0.5;
var zPosGlobal = -0.75;
var xPosGlobal = 0.0;
var yPosGlobal = app.largoCosta/2;



function mouseMove(event){ 
	mx = event.clientX;
	my = event.clientY;
	if (mouseIsDown && camaraOrbitalActiva) {
		phi += -(my - lastpos[1]) * 0.005;
		theta += -(mx - lastpos[0]) * 0.005;
		if (phi > Math.PI * 0.499)
			phi = Math.PI * 0.499;
		if (phi < Math.PI * 0.001)
			phi = Math.PI * 0.001;
	}
	lastpos[0] = mx;
	lastpos[1] = my;
}

function mouseDown(event){		
	mouseIsDown = true;       
}

function mouseUp(event){
	mouseIsDown = false;		
}

function mouseWheel(event) {
	if (camaraOrbitalActiva) {
		if (event.deltaY > 0)
			scale = 1.1;
		else
			scale = 0.9;
		if ((cameraRad * scale) < zoomMax && (cameraRad * scale) > 0.0) {
			cameraPos[0] *= scale;
			cameraPos[1] *= scale;
			cameraPos[2] *= scale;
			cameraRad = norma(subtractVectors(cameraTarget,cameraPos));
		}
	}
}

function keyPressDownEvent(event){
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
  else if (event.key == 'c'){
  	camaraOrbitalActiva = !camaraOrbitalActiva;
  }
  else if (event.key == 'r'){
  	app.reiniciar();
  }
}

function actualizarMovimientosDeCamara(pMatrix){
	if(camaraOrbitalActiva){
		return moverCamaraOrbital();
	}else{
		return moverCamaraHombre(pMatrix);
	}
}

function moverCamaraHombre(pMatrix){
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

var cameraMatrix;
var u_proj_matrix;
var u_view_matrix;
var cameraPositionUniform;

function moverCamaraOrbital()
{	
	var phi2 = phi;
	var theta2 = theta;	
	cameraPos[0] = cameraRad * Math.cos(theta2) * Math.sin(phi2);
	cameraPos[2] = cameraRad * Math.sin(theta2) * Math.sin(phi2);
	cameraPos[1] = cameraRad * Math.cos(phi2);

	cameraPos[0] += cameraTarget[0];
	cameraPos[1] += cameraTarget[1];
	cameraPos[2] += cameraTarget[2];
	
	cameraMatrix = mat4.create();
	mat4.identity(cameraMatrix);
	mat4.lookAt(cameraMatrix, vecFrom(cameraPos), vecFrom(cameraTarget), vecFrom(normalize(cameraUp)));
	mat4.rotate(cameraMatrix, cameraMatrix, Math.PI * 0.25, [1, 0, 0]);
	mat4.translate(cameraMatrix, cameraMatrix, cameraPos);
	mat4.multiply(pMatrix,pMatrix,cameraMatrix);
    //cameraMatrix = makeLookAt(cameraPos, cameraTarget, cameraUp)
    //pMatrix = mat4.multiply(pMatrix, pMatrix, cameraMatrix);
	//mat4.translate(pMatrix, pMatrix, [cameraTarget[0], cameraTarget[1], cameraTarget[2]]);
	//gl.uniform3f(cameraPositionUniform,cameraPos[0],cameraPos[1],cameraPos[2]);
	return cameraMatrix;
}

function makeLookAt(cameraPosition, target, up) {
  var zAxis = normalize(
      subtractVectors(cameraPosition, target));
  var xAxis = normalize(cross(up, zAxis));
  var yAxis = normalize(cross(zAxis, xAxis));
 return Utils.getMatrizRotacion(xAxis,yAxis,zAxis);
  /*return [
     xAxis[0], xAxis[1], xAxis[2], 0,
     yAxis[0], yAxis[1], yAxis[2], 0,
     zAxis[0], zAxis[1], zAxis[2], 0,
     cameraPosition[0],
     cameraPosition[1],
     cameraPosition[2],
     1];
   */
}

function normalize(v) {
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  // make sure we don't divide by 0.
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
}

function subtractVectors(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}

function norma(a) {
  return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
}


function vecFrom(a) {
  return vec3.fromValues(a[0],a[1],[2]);
}

function configCamara(){
	// Preparamos una matriz de perspectiva.
	mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
	if (camaraOrbitalActiva){
		CameraMatrix = actualizarMovimientosDeCamara(pMatrix);
		gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
		//gl.uniformMatrix4fv(u_view_matrix, false, CameraMatrix);
	} else{
		pMatrix = actualizarMovimientosDeCamara(pMatrix);
		gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
	} 
}