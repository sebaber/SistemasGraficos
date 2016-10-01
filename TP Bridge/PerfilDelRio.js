var perfilDelRioObject = new PerfilDelRio();

function cargarSegundoCanvas(){
	var canvasPerfil=document.getElementById("perfilDelRioCanvas");
	var ctx=canvasPerfil.getContext("2d");
	ctx.fillStyle="#326464";
	ctx.fillRect(0,0,200,200);

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
	var puntos = perfilDelRioObject.obtenerPuntosSpline();
	ctx.beginPath();
	ctx.lineWidth = 2;
	var punto = puntos[0];
	ctx.moveTo(punto[0],punto[1]);
	for(var i= 1; i < puntos.length; ++i ){
		punto = puntos[i];
		ctx.lineTo(punto[0],punto[1]);
	}		
	ctx.stroke();
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

function PerfilDelRio () {
	this.inicio = [100,0];
	this.puntos = [[25,50],[175,75]];
	this.final  = [100,200];
    //Paso con que recorre la curva
    this.paso = 0.1;
}

PerfilDelRio.prototype.obtenerPunto=function (u, indice){

	var p0=puntosDeControl[indice];
	var p1=puntosDeControl[indice + 1];
	var p2=puntosDeControl[indice + 2];
	var p3=puntosDeControl[indice + 3];

	var spline=new Object();

	punto.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
	punto.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];

	return punto;
}

PerfilDelRio.prototype.agregarPunto =function (punto){
	this.puntos.push(punto);
}

PerfilDelRio.prototype.obtenerPuntosSpline =function (){
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
		for(u=0.0; u < 1.0; u += this.paso){
			var puntoNuevo  = splineTramo.p(u);
			puntosCurvaSuave.push(puntoNuevo);
		}		
	}
	return puntosCurvaSuave;
}