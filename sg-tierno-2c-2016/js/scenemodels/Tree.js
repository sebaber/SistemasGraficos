
function Tree(type, logLength) {
	Model.call(this);


	var logRadius = 0.25;
	var logHeigh = 0.5;


	var spline = new CubicBSpline();
	var t = type % 3;
	//var t = 2;
	var points = Tree.prototype.points[t];


	spline.addControlPoint(points[0]);
	spline.addControlPoint(points[0]);
	spline.addControlPoint(points[0]);

	for(var i = 1; i < points.length-1; i++) {
		spline.addControlPoint(points[i]);
	}

	spline.addControlPoint(points[points.length-1]);
	spline.addControlPoint(points[points.length-1]);
	spline.addControlPoint(points[points.length-1]);
	spline.scaleY(logLength*2);
	//spline.recalculateLength(10000);

	var geo = new RevolutionSurface(20,50	,spline, 2*Math.PI,new TextureGenerator(-10,10,true));
	//arreglo un poco la normal en la punta, sino quedan cualquier cosa.
	var cup = new Model(geo, new TexturedMaterial({texture:"hojas_"+ type +".jpg", diffuseColor:[0.2,0.2,0.2]}));
	cup.translateY(logLength);
	this.add(cup);
	var log = new Model(new Cylinder(logLength,0.5, 20, new TextureGenerator(10,10,true)), new TexturedMaterial({texture:"tree.jpg",diffuseColor:[0.4,0.5,0.5]}));
	log.rotateZ(90);
	log.translateY(logLength/2);
	this.add(log);
}

Utils.inheritPrototype(Tree, Model);

Tree.prototype.points = [[[0,1],[1,1],[1.5,0.75],[1.3, 0.75],[1.3, 0.5],[2, 0.25],[1.5,0.15],[2,0.1],[0.5,0]],
						[[0,1],[1,1],[1.3,0.75],[1.5, 0.75],[1.5, 0.5],[1, 0.25],[0.8,0.15],[0.6,0.1],[0.5,0]],
						[[0,1.25],[0.5,1],[0.5, 1],[0.7, 0.75],[0.7, 0.75],[1.1, 0.5],[1.1, 0.5],[0.8, 0.5],[1.2, 0.25],[1.5, 0.25],[1, 0.25],[1, 0.25],[1.5, 0],[1.5, 0],[0.5,0]]];

Tree.prototype.colors = [[141/255,246/255,37/255],[50/255,249/255,100/255],[33/255,203/255,20/255]];

