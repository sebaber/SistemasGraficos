//Variable global de la aplicacion de consola
var app={
	alturaMaxima:10,
	reiniciar:function(){
		alert("apreto reiniciar");
	},
	detener:function(){
		alert("apreto detener");
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
	}
};

function GUI (){

		var gui = new dat.GUI();
		//gui.remember(gof);
		
		var f1 = gui.addFolder('Comandos');		
			f1.add(app, 'reiniciar').name("Reiniciar");
			f1.add(app, 'detener').name("detener");			

		var f2 = gui.addFolder('Parametros generales');		
		
		f2.add(app, 'alturaMaxima', 1.0, 60.0).name("altura maxima").step(1);
		f2.add(app, 'ancho',4,25).name("Ancho");

		f2.add(app, 'modo',["random","secuencial"]).name("modo");

		var f3 = gui.addFolder('Parametros Rio');				
		f3.add(app,'umbral',0.0,100).name("umbral");
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