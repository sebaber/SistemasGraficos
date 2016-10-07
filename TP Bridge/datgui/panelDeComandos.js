//Variable global de la aplicacion de consola
var app={
	reiniciar:function(){
		//Aca deberia hacer todas las funciones para liberar todos los buffers
    	setupBuffers();
	},
	modo:"random",
	ancho:0,
	umbral:100,
	agregarPuntos:true,
	eliminarTodosLosPuntos:function(){
		perfilDelRioObject.eliminarPuntos();
		cargarSegundoCanvas();
	},
	dibujarTodosLosPuntos:function(){
		cargarSegundoCanvas();
	},

//terreno = new Terreno(12,12,5,4,4,0.2)
//Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres,sepTensor)
	anchoCosta: 12,
	largoCosta: 12,
	anchoRio: 5,
	anchoCalle: 4,
	nroTorres: 4,
	sepTensor: 0.2
};



function GUI (){

		var gui = new dat.GUI();
		//gui.remember(gof);
		
		var f1 = gui.addFolder('Comandos');		
			f1.add(app, 'reiniciar').name("Reiniciar");
		//	f1.add(app, 'cargarDatos').name("Cargar Datos");			

		var f2 = gui.addFolder('Parametros generales');		
		f2.add(app,'anchoCosta',5,50).name("Ancho Costa");
		f2.add(app,'largoCosta',5,50).name("Largo Costa");
		f2.add(app,'anchoCalle',2,8).name("Ancho Calles");		
		f2.add(app,'nroTorres',2,4).name("Numero Torres").step(1.0);		
		f2.add(app,'sepTensor',0.05,1).name("Separacion Tensores").step(0.05);	

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
};

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