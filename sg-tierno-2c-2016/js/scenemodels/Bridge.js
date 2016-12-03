






var Bridge = function (l,l2,w,h,curvature,spaceT,columns,deepness, delta) {
	Model.call(this);
    this.l =l;
    this.w = w;
    this.l2 = l2;

    this._generate(h,curvature*h*0.01,spaceT,columns,deepness,delta);
    
}

Utils.inheritPrototype(Bridge, Model);

Bridge.prototype._generate = function(h,curvature,tensorsSpace, cols,deep,delta){
    
    var path = new CubicBezier();

    
    path.addControlPoint([0,0]);
    path.addControlPoint([this.l/2.0,curvature]);
    path.addControlPoint([this.l/2.0,curvature]);
    path.addControlPoint([this.l,0]);

    var roadPath = new ComplexCurve();
    var segl =  (this.l2 -this.l)/2;

    var s1 = new Segment(0,segl+delta);
    s1.translateX(-segl-delta);
    roadPath.add(s1);
    roadPath.add(path);

    var s2 = new Segment(0,segl-delta-20);
    s2.translateX(this.l);
    roadPath.add(s2);


    var road = new Road(roadPath, this.w,4);
    road.translateZ(this.w/2);
    //road.translateX(50);
    this.add(road);
    
    var panel1 = new BridgePanel(this.l, path,h,cols, tensorsSpace,deep*2);
    var panel2 = new BridgePanel(this.l, path,h,cols, tensorsSpace,deep*2);
    panel1.translateZ(1);
    panel2.translateZ(this.w-1);

    this.add(panel1);
    this.add(panel2); 
}

Bridge.prototype.regenerate = function (h,curvature,tensorsSpace,columns,deepness,delta) {
    this.clear();
    this._generate(h,curvature*h*0.01,tensorsSpace,columns,deepness,delta);
}
