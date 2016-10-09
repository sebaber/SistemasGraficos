//Variable global de la aplicacion de consola
var app={
	reiniciar:function(){
		//Aca deberia hacer todas las funciones para liberar todos los buffers
		configCamaraTargets();
    	setupBuffers();
	},
	eliminarTodosLosPuntos:function(){
		perfilDelRioObject.eliminarPuntos();
		cargarSegundoCanvas();
	},
	dibujarTodosLosPuntos:function(){
		cargarSegundoCanvas();
	},

	agregarPuntos:true,
//terreno = new Terreno(12,12,5,4,4,0.2)
//Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres,sepTensor)
	anchoCosta: 18.0,
	largoCosta: 12.0,
	anchoRio: 3.0,
	anchoCalle: 4,
	ph1:0.5,
	ph2:1,
	ph3:3,
	yCalle: 6,
	nroTorres: 4,
	sepTensor: 0.2,
//Inicializacion del target de la camara
	targetX: 0,
	targetY: 0,
//  var h1=1.5;
//  var h2=1;
//  var h3=0.5;
	alturaTorre1: 1.5,
  	alturaTorre2: 1.0,
  	alturaTorre3: 0.5
};

configCamaraTargets();

function configCamaraTargets (){
	//x = anchoCosta * 2 + anchoDelRio
	//y = largoCosta
	app.targetX = (app.anchoCosta * 2 + app.anchoRio ) / 2;
	app.targetY = (app.largoCosta) / 2;
	cameraTarget = [app.targetX, 0 , app.targetY];
}

function GUI (){
		//gui.remember(gof);
		var gui = new dat.GUI();

		var f1 = gui.addFolder('Comandos');
			f1.add(app, 'reiniciar').name("Reiniciar (Tecla R)");
		//	f1.add(app, 'cargarDatos').name("Cargar Datos");

		var f2 = gui.addFolder('Parametros generales');
		// f2.add(app,'anchoCosta',5,50).name("Ancho Costa");
		// f2.add(app,'largoCosta',5,50).name("Largo Costa");
		// f2.add(app,'anchoCalle',2,8).name("Ancho Calles");
		f2.add(app,'yCalle',2,10).name("Posicion Calle").step(1.0);
		f2.add(app,'nroTorres',2,4).name("Numero Torres").step(1.0);
		f2.add(app,'sepTensor',0.05,1).name("Separacion Tensores").step(0.05);
		// f2.add(app,'alturaTorre1',0.1,2.0).name("Alturta Torre 1").step(0.1);
		// f2.add(app,'alturaTorre2',0.1,2.0).name("Alturta Torre 2").step(0.1);
		// f2.add(app,'alturaTorre3',0.1,2.0).name("Alturta Torre 3").step(0.1);
		f2.add(app,'ph1',0.1,2.0).name("Alturta Ph 1").step(0.1);
		f2.add(app,'ph2',0.1,2.0).name("Alturta Ph 2").step(0.1);
		f2.add(app,'ph3',0.1,3.0).name("Alturta ph3 3").step(0.1);

		//f2.add(app, 'alturaMaxima', 1.0, 60.0).name("altura maxima").step(1);
		//f2.add(app, 'ancho',4,25).name("Ancho");

		//f2.add(app, 'modo',["random","secuencial"]).name("modo");

		var f3 = gui.addFolder('Parametros Rio');
		f3.add(app,'agregarPuntos').name("Agregar Puntos");
		f3.add(app,'dibujarTodosLosPuntos').name("Dibujar Puntos");
		f3.add(app,'eliminarTodosLosPuntos').name("Eliminar Puntos");
/*
		f1.close();
		f2.close();
		f3.close();
*/
		f1.open();
		f2.open();
		f3.open();

		gui.width = 289;
}

//Parte de escucha de datos de mouse para el canvas
$( document ).ready(function() {// esto es para esperar que carge la libreria Jquery


	function updateCoordinates(e){
		if (app.agregarPuntos){
			//var pos=$("#perfilDelRioCanvas").position();
			var posX = e.offsetX;
			var posY = e.offsetY;
			perfilDelRioObject.agregarPunto([posX,posY]);
			cargarSegundoCanvas();
		}
	}

    var mouseIsPressed=false;

/*
     $("#perfilDelRioCanvas").bind('mousemove',function(e){
        if (mouseIsPressed) updateCoordinates(e);
    });
*/

     $("#perfilDelRioCanvas").bind('mousedown',function(e){
            mouseIsPressed=true;
            updateCoordinates(e);
    });

     $("#perfilDelRioCanvas").bind('mouseup',function(e){
           mouseIsPressed=false;
    });


});
