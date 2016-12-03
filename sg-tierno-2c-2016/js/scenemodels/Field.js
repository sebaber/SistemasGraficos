

var Field = function (width,  length, waterwidth,roadW, height,cpoints, roadParam) {

	   	Model.call(this);
		this.terrainLevels = 100;
		this.fieldL = length;

		//ALTURA DESDE EL AGUA HASTA LA PARTE PLANA
		//ESTO ES PARA QUE LLEGUE AL FINAL DEL MAPA
		this.width = width;
		this.waterW = waterwidth;
		this.roadW = roadW;
   		this._generate(roadParam,height, cpoints);

}

Utils.inheritPrototype(Field, Model);

Field.prototype.regenerate = function(roadParam,height, cp) {
	this.clear();
	this._generate(roadParam, height, cp);
};


Field.prototype._generate = function(roadParam, h,cp) {
   		var floorY =- h -15;
   		var riverPath  = this._generateRiverPath(cp);
   		
   		var factor = this._generateBeach(riverPath,h,floorY);
   		this._generateFloor(floorY+h, factor/2, riverPath);

		this._generateGrass(roadParam,riverPath,h);
		this.lastPath= this._generateRiverPath(cp);
}

//no se si va a servir al final.
Field.prototype.computeWidth = function(curve,definition) {
	var step = 1/(definition);
	var minZ = 10000000;
	var maxZ = -10000000;

	for(var i = 0; i <= definition;i++) {
		var pos = curve.getPosition(i*step);
		if(pos[2] < minZ) {
			minZ =pos[2];
		}
		if(pos[2] > maxZ) {
			maxZ = pos[2];
		}
	}
	return maxZ - minZ;
};

Field.prototype._generateFloor = function(floorY,factor, path) {
		var waterWidth =this.width*0.6;
		var seg = new QuadraticBezier();
		seg.addControlPoint([0,0]);
		seg.addControlPoint([factor/2,-20]);
		seg.addControlPoint([factor,0]);
		var seg2 = new Segment(0,this.fieldL);
		seg.rotateY(-90);
		var wgeom = new SweptSurface(this.terrainLevels, 32,seg,path,false, new BotomTextureGenerator());		

		//var floor = new Model(wgeom, new TexturedMaterial({texture:"soil.jpg"}));
		var floor = new Model(wgeom, new BeachMaterial({textures:["arena1.jpg", "gravel2.jpg", "arena1.jpg", "difuminado2.jpg"], 
											delimiter: 2}));

		floor.translateZ(-factor/2);
		floor.translateY(floorY);
		this.add(floor);
};

Field.prototype._generateBeach = function(riverPath,height,floorY) {
		var factor = this.waterW*0.4;

		var sandProfile = new CubicBSpline();
		sandProfile.addControlPoint([0, 0]);
		sandProfile.addControlPoint([0, 0]);
		sandProfile.addControlPoint([0, 0]);

		sandProfile.addControlPoint([0, 0]);

		sandProfile.addControlPoint([factor/6 + (0.1 *height ), 0]);
		sandProfile.addControlPoint([factor/4, -height*0.8]);
		sandProfile.addControlPoint([factor *3/4, -height*0.8]);
		sandProfile.addControlPoint([factor, floorY]);
		sandProfile.addControlPoint([factor, floorY]);
		sandProfile.addControlPoint([factor, floorY]);
		sandProfile.addControlPoint([factor, floorY]);
		sandProfile.rotateY(-90);

		var sandGeom = new SweptSurface(this.terrainLevels, 32,sandProfile,riverPath,false,new BeachTextureGenerator());
		var sand = new Model(sandGeom,new BeachMaterial({textures:["pasto2.jpg", "rocas2.jpg", "arena1.jpg", "trancision1.jpg"], 
											delimiter: height*0.3}));
		sand.translateY(height);
		sand.translateZ(-this.waterW/2);
		this.add(sand);


		sandProfile.rotateY(180);
		sandGeom = new SweptSurface(this.terrainLevels, 32,sandProfile,riverPath,false,new BeachTextureGenerator());
		sand = new Model(sandGeom,new BeachMaterial({textures:["pasto2.jpg", "rocas2.jpg", "arena1.jpg","trancision1.jpg"], 
											delimiter: height*0.3}));
		sand.translateY(height);
		sand.translateZ(this.waterW/2);
		this.add(sand);
		return factor;

};

Field.prototype._generateGrass = function(roadParam,riverPath, h) {
		var startLimit = -this.width/2;
		var endLimit = this.width/2;
		var trees = 30;
		roadX = riverPath.getPosition(roadParam)[0];
		riverPath.translateZ(-this.waterW/2 -10);
		var grassProfile = new Segment(0,this.width*0.3);
		grassProfile.rotateY(90);
		var grassGeom = new GrassSurface(this.terrainLevels, 32,riverPath, startLimit);
		var grass = new Model(grassGeom,new MixinMaterial({textures: ["difuminado.jpg", 
			"pasto2-normalmap.jpg","pasto1-normalmap.jpg", "pasto2.jpg", "pasto1.jpg", "pasto-ruido.jpg", "pasto-ruido-normalmap.jpg"]}));
		grass.translateY(h);

		var forest = new Forest(startLimit*0.75, roadX- this.roadW/2,roadX+ this.roadW/2, riverPath, trees,true );
		grass.add(forest);


		this.add(grass);



		riverPath.translateZ(this.waterW + 20);
		var grassProfile = new Segment(0,this.width*0.1);
		grassProfile.rotateY(-90);
		var grassGeom = new GrassSurface(this.terrainLevels, 32,riverPath, this.width/2);
			var grass = new Model(grassGeom,new MixinMaterial({textures: ["difuminado.jpg", 
			"pasto2-normalmap.jpg","pasto1-normalmap.jpg", "pasto2.jpg", "pasto1.jpg", "pasto-ruido.jpg","pasto-ruido-normalmap.jpg"]}));

		grass.translateY(h);
		forest = new Forest(endLimit*0.75, roadX- this.roadW/2,roadX+ this.roadW/2, riverPath, trees,false );
		grass.add(forest);

		this.add(grass);


};
Field.prototype._generateRiverPath = function (cp) {
	var rp = new CubicBSpline();



		rp.addControlPoint(cp[0]);
		rp.addControlPoint(cp[0]);
		rp.addControlPoint(cp[0]);
		for(var i = 1; i< cp.length-1; i++){
			rp.addControlPoint(cp[i]);
		}

		rp.addControlPoint(cp[cp.length-1]);
		rp.addControlPoint(cp[cp.length-1]);
		rp.addControlPoint(cp[cp.length-1]);
		rp.rotateX(180);
		rp.translateY(1);
		rp.rotateZ(-90);
		rp.rotateX(-90);
		rp.scaleZ(this.width/2);
		rp.scaleX(this.fieldL);

		return rp;
}

Field.prototype.getPath = function() {
	return this.lastPath;
};

var GrassSurface = function(levels, faces, path, fixedZ,txg) {
	this.fixedZ = fixedZ;
	SweptSurface.call(this, levels, faces, null, path,false,new GrassTextureGenerator());
}


Utils.inheritPrototype(GrassSurface, SweptSurface);

GrassSurface.prototype.createGrid = function () {
	var pathStep = 1.0/(this.levels-1);
	var curveStep = 1.0 /(this.faces-1);


	var attributes = {
		positions: [],
		normals : [],
		tangents : [],
		binormals : []
	};
	for(var i = 0; i < this.levels; i++) {
		
		
		var modif = this.path.getPosition(pathStep*i);
		this.curve = new Segment(0,modif[2]-this.fixedZ + 10);
		
		if(this.fixedZ>0) {
			this.curve.translateX(10);
			this.curve.rotateX(180);	
		} else {
			this.curve.translateX(-10);
		}
		
		this.curve.rotateY(90);

		this._completeLevel(pathStep,curveStep, i, attributes);

	}
	this.setPositions(attributes.positions);
	this.setNormals(attributes.normals);
	this.setTangents(attributes.tangents);
	this.setBinormals(attributes.binormals);
}
