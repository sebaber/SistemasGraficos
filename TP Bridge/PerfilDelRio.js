var perfilDelRioObject = new Perfil();

function cargarSegundoCanvas(){
	var canvasPerfil=document.getElementById("perfilDelRioCanvas");
	var ctx=canvasPerfil.getContext("2d");
	ctx.fillStyle="#326464";
	ctx.fillRect(0,0,200,200);
	ctx.strokeStyle = "#000000";

	//Punto de comienzo y fin
 	//ctx.strokeStyle = "rgba(50, 0, 255, 0.5)";
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(100, 0);
	ctx.lineTo(100, 3);
    ctx.stroke();
	ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(100, 200);
	ctx.lineTo(100, 197);
    ctx.stroke();
	ctx.closePath();

	//Resto del camino que deberia ser con BsSpline 2d
	ctx.beginPath();
	ctx.lineWidth = 2;

	var puntos = perfilDelRioObject.obtenerPuntosSpline(0.1);
	var punto = puntos[0];
	ctx.moveTo(punto[0],punto[1]);
	for(var i= 1; i < puntos.length; ++i ){
		punto = puntos[i];
		ctx.lineTo(punto[0],punto[1]);
	}


	//otra forma de graficar

	// var fs = perfilDelRioObject.obtenerFuncionSpline(200,200);
	// var punto = fs.p(0);
	// ctx.moveTo(punto[0],punto[1]);
	// for(var i= 0; i < 1; i += 0.01 ){
	// 	punto = fs.p(i);
	// 	ctx.lineTo(punto[0],punto[1]);
	// }

	var puntos = perfilDelRioObject.obtenerPuntosDelUsuario();
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#1111aa";
	for(var i= 0; i < puntos.length; ++i ){
		var punto = puntos[i];
		ctx.moveTo(punto[0],punto[1]-2);
		ctx.lineTo(punto[0],punto[1]+2);
		ctx.stroke();
	}
	ctx.closePath();
}

function calcularPuntoSiguienteSpline(anteultimo,ultimo){
    var vec3ault = vec3.create(anteultimo);
    var vec3ult = vec3.create(ultimo);
    var aux = vec3.create();
    vec3.subtract(vec3ult,vec3ault,aux);
    vec3.add(vec3ult,aux,aux);
    var sig = [aux[0],aux[1],aux[2]];
    return sig;
}

function Perfil () {
	this.inicio = [100,0];
	this.puntos = [];
	this.final  = [100,200];
    //Paso con que recorre la curva
    //this.paso = 0.1;
}

Perfil.prototype.eliminarPuntos=function (){
	this.puntos = [];
}

Perfil.prototype.obtenerPuntosDelUsuario=function (){
	return this.puntos;
}

Perfil.prototype.obtenerPunto=function (u, indice){

	var p0=puntosDeControl[indice];
	var p1=puntosDeControl[indice + 1];
	var p2=puntosDeControl[indice + 2];
	var p3=puntosDeControl[indice + 3];

	var spline=new Object();

	punto.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
	punto.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];

	return punto;
}

Perfil.prototype.agregarPunto =function (punto){
	this.puntos.push(punto);
	this.puntos.sort(function(a, b){return a[1]-b[1]});
}

Perfil.prototype.obtenerPuntosSpline =function (pasoDeCalculo){
	var puntosDelCamino = [];
	var puntosCurvaSuave = [];

	puntosDelCamino.push(this.inicio);
	puntosDelCamino.push(this.inicio);
	puntosDelCamino.push(this.inicio);
	for(k=0; k < this.puntos.length; ++k){
		puntosDelCamino.push(this.puntos[k]);
	}
	puntosDelCamino.push(this.final);
	puntosDelCamino.push(this.final);
	puntosDelCamino.push(this.final);

	for(k=0; k < (puntosDelCamino.length-3); ++k){
		var splineTramo = new SplineCubica(puntosDelCamino[k],puntosDelCamino[k+1],
			puntosDelCamino[k+2],puntosDelCamino[k+3]);
		for(u=0.0; u < 1.0; u += pasoDeCalculo){
			var puntoNuevo  = splineTramo.p(u);
			puntosCurvaSuave.push(puntoNuevo);
		}
	}
	return puntosCurvaSuave;
}

//Una forma de sacar los puntos es darme el largo del rio y el paso de calculo que
//queres para cada calculo
// 	var puntos = perfilDelRioObject.obtenerPuntosSplineTransformados(100,0.1);
Perfil.prototype.obtenerPuntosSplineTransformados =function (largoDelRio,pasoDeCalculo){
	var puntosCurvaSuave = this.obtenerPuntosSpline(pasoDeCalculo);
	var puntosCurvaSuaveTransformado = [];
	var largoDelCanvas = 200.0;
	var factor = largoDelRio / largoDelCanvas;
	for(k=0; k < puntosCurvaSuave.length; ++k){
		var punto = puntosCurvaSuave[k];
		punto[0] *= factor;
		punto[1] *= factor;
		// seteo en la nueva curva x, y , z=0
		puntosCurvaSuaveTransformado.push([punto[0], punto[1],0]);
	}
	return puntosCurvaSuaveTransformado;
}

Perfil.prototype.obtenerFuncionSpline =function (largoDelRio,largoDelCanvas,anchoDelRio,anchoDelCanvas){
	var puntosDelCamino = [];

	puntosDelCamino.push(this.inicio);
	puntosDelCamino.push(this.inicio);
	puntosDelCamino.push(this.inicio);
	for(k=0; k < this.puntos.length; ++k){
		puntosDelCamino.push(this.puntos[k]);
	}
	puntosDelCamino.push(this.final);
	puntosDelCamino.push(this.final);
	puntosDelCamino.push(this.final);

	var splineCompleja = new SplineCubicaCompleja(largoDelRio,largoDelCanvas,anchoDelRio,anchoDelCanvas);
	for(k=0; k < (puntosDelCamino.length-3); ++k){
		var splineTramo = new SplineCubica(puntosDelCamino[k],puntosDelCamino[k+1],
			puntosDelCamino[k+2],puntosDelCamino[k+3]);
		splineCompleja.agregarSpline(splineTramo);
	}
	return splineCompleja;
}
