var riverPoints = [[100,0], [100,200]];

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
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(100, 0);
	ctx.lineTo(100, 200);
	ctx.stroke();
	ctx.closePath();
}
