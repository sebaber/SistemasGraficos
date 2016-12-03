
function Forest(fieldL,roadS,roadE,path,trees,side) {


	Model.call(this);
	var curveMargin = 0.2;
	var constraints = [];
	var maxScale = 3;
	var minScale = 1;
  	var tree;
  	var i = 0;
  	var u;
  	var start, end, pos;
  	var c =0;
  	while ( i  < trees) {
  		u = Math.random() * (1-curveMargin) + curveMargin/2 ;
  		path.getPosition(u);
  		//si el side es true, es el bosque izquierdo, sino el derecho 
  		pos = path.getPosition(u);
  		start = side ? fieldL : 1.2	*pos[2];
  		end = side ? pos[2]*1.2 : fieldL;

  		//decido en que posicion horizontal va a ir.
  		var zpos = Math.random() *(end - start) + start;
  		//creo el nuevo arbol.
  		var treeScale = Math.random() * (maxScale - minScale) + maxScale;
  		var shape = new CircleTest([pos[0],pos[1], zpos],0.5*treeScale);

  		while(this._conflictRoad(shape,roadS, roadE)) {
  			u = Math.random() * (1-curveMargin) + curveMargin/2 ;
  			pos = path.getPosition(u);
	  		start = side ? fieldL : pos[2];
			end = side ? pos[2] : fieldL;
			zpos = Math.random() *(end - start) + start;
  			shape = new CircleTest([pos[0],pos[1], zpos],0.5*treeScale);
  		}

		
  		while(this._conflict(shape,constraints) && c < 10) {
  			c++;
  			zpos = Math.random(end - start) + start;
  			shape = new CircleTest([pos[0],pos[1], zpos],0.5*treeScale);
  		}
  		if(c <10) {
			tree = new Tree( Math.floor((Math.random()* 10)) % 3, Math.random()+1);
			tree.scale(treeScale);	
  			i++;
	 		tree.translateX(pos[0]);
	  		tree.translateZ(zpos);
	  		this.add(tree);
	  		constraints.push(shape);

  		}
  		c =0;
  		
  	}

}

Utils.inheritPrototype(Forest, Model);

Forest.prototype._conflict = function(circle, constraints) {
	for(var i in constraints) {
		if(constraints[i].overlaps(circle)) {
			return true;
		}
	}
	return false;
};

Forest.prototype._conflictRoad = function(circle, start, end) {
	if(circle.pos[0] >= start && circle.pos[0] <= end)
		return true;

	if(circle.radius + circle.pos[0] < start) 
		return  false;

	if(circle.pos[0] -circle.radius > end) 
		return  false;

	return true;
};


function CircleTest (pos, radius)  {
	this.pos  = vec3.fromValues(pos[0], pos[1], pos[2]);
	this.radius = radius;
}
CircleTest.prototype.overlaps = function(circle) {
	var d = vec3.distance(this.pos, circle.pos);
	return d < this.radius + circle.radius;
};
