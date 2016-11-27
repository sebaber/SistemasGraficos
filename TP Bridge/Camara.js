//Camara Orbital
var cameraUp = [ 0.0, 1.0, 0.0 ];
var lastpos = [ 0.0, 0.0 ];
var zoomMax = 80.0;
var mx;
var my;
var mouseIsDown = false;
//var phi = Math.PI * 0.35;
//var theta = Math.PI * 1.25;
var phi = -Math.PI * 0.45;
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
var xPosGlobal = -app.largoCosta*0.3;
var yPosGlobal = app.largoCosta/2;



function mouseMove(event){
	mx = event.clientX;
	my = event.clientY;
	if (mouseIsDown && camaraOrbitalActiva) {
		phi += -(my - lastpos[1]) * 0.005;
		theta += -(mx - lastpos[0]) * 0.005;
		if (phi < -Math.PI * 0.499)
			phi = -Math.PI * 0.499;
		if (phi > -Math.PI * 0.001)
			phi = -Math.PI * 0.001;
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
			scale = 1.15;
		else
			scale = 0.85;
		if ((cameraRad * scale) < zoomMax && (cameraRad * scale) > 0.0) {
			//cameraPos[0] *= scale;
			//cameraPos[1] *= scale;
			//cameraPos[2] *= scale;
			//cameraRad = norma(subtractVectors(cameraTarget,cameraPos));
			cameraRad *= scale;
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
  else if (event.key == 't'){
    switchLight();
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

function switchLight() {
  var divLuz = document.getElementById("luz");
  if (ambientalLightActive) {
    ambientalLightActive = false;
    directionalLightActive = true;
    specularLightActive = false;
    allLightActive = false;
    console.log("Lighting: only directional");
  } else {
    if (directionalLightActive) {
      ambientalLightActive = false;
      directionalLightActive = false;
      specularLightActive = true;
      allLightActive = false;
      console.log("Lighting: only specular");
    } else {
      if (specularLightActive) {
        ambientalLightActive = false;
        directionalLightActive = false;
        specularLightActive = false;
        allLightActive = true;
        console.log("Lighting: all lights on");
      } else {
        if (allLightActive) {
          ambientalLightActive = true;
          directionalLightActive = false;
          specularLightActive = false;
          allLightActive = false;
          console.log("Lighting: ambiental only");
        }
      }
    }
  }
  gl.uniform1i(glProgram.lightAmbientalUniform, ambientalLightActive);
  gl.uniform1i(glProgram.lightDirectionalUniform, directionalLightActive);
  gl.uniform1i(glProgram.lightSpecularUniform, specularLightActive);
  gl.uniform1i(glProgram.lightTotalUniform, allLightActive);
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
		yPos += app.velocidad;
	}
	if (teclaAbajoActiva) {
		yPos -= app.velocidad;
	}
	if (teclaDerechaActiva){
		xPos += app.velocidad;
	}
	if (teclaIzquierdaActiva){
		xPos -= app.velocidad;
	}
	if (teclaSubirActiva){
		zPos -= app.velocidad;
	}
	if (teclaBajarActiva){
		zPos += app.velocidad;
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
	// console.log("before");
	// console.log(glProgram.cameraPositionUniform);
	gl.uniform3f(glProgram.cameraPositionUniform, xPosGlobal,	zPosGlobal, yPosGlobal);
	// console.log("after");
	// console.log(glProgram);

	return pMatrix;
}

var cameraMatrix;
var u_proj_matrix;
var u_view_matrix;

function moverCamaraOrbital()
{
	var phi2 = phi;
	var theta2 = theta;
	cameraPos[0] = cameraRad * Math.cos(theta2) * Math.sin(phi2);
	cameraPos[2] = -1*cameraRad * Math.sin(theta2) * Math.sin(phi2);
	cameraPos[1] = -1*cameraRad * Math.cos(phi2);

	cameraPos[0] -= cameraTarget[0];
	//	cameraPos[1] += cameraTarget[1];
	cameraPos[2] -= cameraTarget[2];
	cameraMatrix = mat4.create();
	mat4.identity(cameraMatrix);

	cameraMatrix = makeLookAt([-1*cameraPos[0].toFixed(2),-1*cameraPos[1].toFixed(2),-1*cameraPos[2].toFixed(2)
		], cameraTarget, [0.0,1.0,0.0]);

	mat4.multiply(pMatrix,pMatrix,cameraMatrix);
	mat4.translate(pMatrix, pMatrix,[cameraPos[0],cameraPos[1],cameraPos[2]]);
	// console.log(glProgram);
	// console.log(cameraPos);
	gl.uniform3f(glProgram.cameraPositionUniform, cameraPos[0],
		cameraPos[1], cameraPos[2]);
		// console.log(glProgram.cameraPositionUniform);
	return cameraMatrix;
}

function configCamara(){
	// Preparamos una matriz de perspectiva.
	mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
	if (camaraOrbitalActiva){
		CameraMatrix = actualizarMovimientosDeCamara(pMatrix);
		gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
		gl.uniformMatrix4fv(u_view_matrix, false, CameraMatrix);
	} else{
		pMatrix = actualizarMovimientosDeCamara(pMatrix);
		gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
	}
}
