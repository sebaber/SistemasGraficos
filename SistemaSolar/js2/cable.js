


function Cable(){



    var texturas={
        "refmap4a.jpg":null,
        "piedra.jpg":null,
        "fondo2.jpg":null,
        "texto.png":null,
    };

    Object.keys(texturas).forEach(function(key) {

        var t = THREE.ImageUtils.loadTexture( "maps/"+key);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.repeat.set( 1, 1 );
        t.mapping = THREE.SphericalReflectionMapping;
        t.magFilter = THREE.LinearFilter;
        t.minFilter = THREE.LinearFilter;

        texturas[key]=t;
    });

    this.materiales= {
        "metal1":new THREE.MeshPhongMaterial({
            color: 0x666666,
            specular: 0x999999,
            shininess: 16,
            shading: THREE.SmoothShading,
            envMap: texturas["refmap4a.jpg"],
            reflectivity: 0.75
        }),
        "metal2": new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x444444,
            shininess: 32,
            shading: THREE.SmoothShading,
            envMap: texturas["refmap4a.jpg"],
            reflectivity: 0.35
        }),
        "metal3": new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x555555,
            shininess: 128,
            shading: THREE.SmoothShading,
            envMap: texturas["refmap4a.jpg"],
            reflectivity: 0.5
        }),
        "plastico1": new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x222222,
            shininess: 2,
            shading: THREE.SmoothShading
        }),
        "plastico2": new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            specular: 0x222222,
            shininess: 1,
            shading: THREE.SmoothShading
        }),
        "concreto": new THREE.MeshPhongMaterial({
            color: 0x707070,
            specular: 0x333333,
            shininess: 1,
            shading: THREE.SmoothShading,
            map:texturas["piedra.jpg"]
        }),
      
    };




    var me=this;
	this.modelos = {
		"armadura":null,
		"blindaje":null,
		"cable1":null,
		"cable2":null,
		"cubiertaInterior":null,
		"cubiertaExterior":{},
		"drenaje":null
	};
	
	this.counter = 0;
	
    this.cargarModelos=function(onCompleteCallback){
        
		this.onCompleteCallback = onCompleteCallback;
		var keys=Object.keys(this.modelos);
		for (var i = 0; i < keys.length; i++) {
			var loader = new THREE.ColladaLoader();
			
			console.log("load Model "+ keys[i] + '.DAE');
			
			loader.load('modelos/'+keys[i]+'.DAE',
				(function (key, context,modelos) {
					var f = function (collada) {

						console.log("carga completa de "+key)

						if( key != 'cubiertaExterior') {
							var geometry = collada.scene.children[0].children[0].geometry;
							context.modelos[key] = geometry;
						}
						
						context.counter++;

						if (context.counter == 7)  {
							
							console.log("carga completa")
							context.onCompleteCallback();
						}

					}
					return f;
				}(keys[i], this))
			);
		} // for
  
    }




}
