


function Trail(maxPoints,initialPos,tone){




	var points=[];


	var segments = maxPoints;
    
    var trailsGeo = new THREE.BufferGeometry();
    var trailsMat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

    var positions = new Float32Array( segments * 3 );
    var colors = new Float32Array( segments * 3 );

    
    for ( var i = 0; i < segments; i ++ ) {

        // positions
        positions[ i * 3 ] = initialPos.x;
        positions[ i * 3 + 1 ] = initialPos.y;
        positions[ i * 3 + 2 ] = initialPos.z;
        
		var col = new THREE.Color();
		var sat = i/segments;
		col.setHSL(tone,1,sat);

        colors[ i * 3 ] = col.r;
        colors[ i * 3 + 1 ] =col.g;
        colors[ i * 3 + 2 ] =col.b;
    }	
    
    
    trailsGeo.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    trailsGeo.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    trailsGeo.computeBoundingSphere();

    var trailsMesh = new THREE.Line( trailsGeo, trailsMat );
    escena.add( trailsMesh );

    this.pushPosition=function(pos){

	    if (points.length>maxPoints) points.shift();
	    points.push(pos);

	    if (trailsGeo){
	    	var att=trailsGeo.getAttribute("position");

	      	for (var i=0;i< points.length;i++)  att.setXYZ(i,points[i].x,points[i].y,points[i].z);
	        
	      	att.needsUpdate=true;

	    }//if

    }

}