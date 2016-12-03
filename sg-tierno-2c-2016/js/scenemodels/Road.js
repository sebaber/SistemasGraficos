


var Road = function (path, w, h) {
	Model.call(this);
    var g;
    var m;
    var c;
    var factor = 5;
    var hfactor = 0.2;
    var infBorder = -h*(1-hfactor)*0.95;
    var supborder = h + infBorder;

    var multInf =1/2;
    var multSup =1/8;
    var multLateral = 1/4;
    var multPeq = 1/14;
    //AL CARAJO
    //var veredaMaterial = new TexturedMaterial({texture: "vereda.jpg", normalMap:"vereda-normalmap.jpg"});
    var veredaMaterial = new TexturedMaterial({texture: "vereda.jpg", normalMap:"vereda-normalmap.jpg", specularColor:[0,0,0]});

    //la de abajo  OK
    c = new Segment(0,w- 2*w/factor);
    c.rotateX(180);
    c.rotateY(90);
    c.translateY(infBorder);
    this._addSeg(path, w-2*w/factor,c, multInf, veredaMaterial);



var cc = new ComplexCurve();


    //el lado izquierdo cortito
    c = new Segment(0,h);
    var deg = 45;
    c.rotateZ(90-deg);
    c.translateX((w-w/factor) - h * Math.cos(Utils.degToRad(deg))/2 - 1.5);
    c.rotateY(90);
    c.translateY(supborder - h * Math.cos(Utils.degToRad(deg)));
    cc.add(c);
        //el lado izquierdo arriba
    c = new Segment(0,w/factor);
    c.rotateY(90);
    c.translateY(supborder);
    c.translateZ(-w+ w/factor);
    cc.add(c);

    //el lado izquierdo
    c = new Segment(0,h); 
    c.rotateY(90);
    c.rotateX(-90);
    c.translateY(supborder);
    c.translateZ(-w);
    cc.add(c);
    

    //el lado izquierdo abajo.
    c = new Segment(0,w/factor);
    c.rotateZ(180);
    c.translateX(w);
    c.rotateY(90);
    c.translateY(infBorder);
    cc.add(c);







    this._addSeg(path, w,cc, multSup, veredaMaterial);



    //el lado derecho abajo.
    var cc = new ComplexCurve();
    c = new Segment(0,w/factor);
    
    c.rotateZ(180);
    c.translateX(w/factor);
    c.rotateY(90);
    c.translateY(infBorder);
    cc.add(c);
    //el lado derecho
    c = new Segment(0,h);
    c.rotateY(90);
    c.rotateX(90);
    c.translateY(infBorder);
    cc.add(c);
    
    //el lado derecho arriba
    c = new Segment(0,w/factor);
    c.rotateX(90);
    c.rotateY(90);
    c.rotateZ(90);
    c.translateY(supborder);
    cc.add(c);
    
    //el  lado cortito derecho
    c = new Segment(0,h); 
    //c.rotateX(180);
    c.rotateY(90);
    c.rotateX(-90+deg);
    c.translateY(supborder);
    c.translateZ(-w/factor);
    cc.add(c);
    this._addSeg(path, w,cc, multSup, veredaMaterial);

    //la ruta
    c = new Segment(0,w);
    c.rotateX(180);
    c.rotateZ(180);
    c.translateX(w);
    c.translateY(h*0.1);
    c.rotateY(90);
    g = new SweptSurface(32,50,c, path,true,new RoadTextureGenerator(10));
    m = new Model(g, new TexturedMaterial({texture: "tramo-doblemarilla.jpg", normalMap : "tramo-doblemarilla-normalmap.jpg",
                                            specularColor:[0.05,0.05,0.15]}));   
    m.translateZ(w/2);
    this.add(m);

}

Utils.inheritPrototype(Road, Model);


Road.prototype._generateCurveI = function(w,h) {
    var factor = 5;
    var hfactor = 0.2;
    var curve = new ComplexCurve();

    //vertical derecho
    var seg = new Segment(0,h*hfactor);
    seg.rotateZ(90);
    curve.add(seg);

    
    seg = new Segment(0,w/(factor+0.5));
    seg.translateY(h*hfactor);
    curve.add(seg);


    seg = new Segment(0,h *hfactor);
    seg.rotateZ(-90);
    seg.translateY(h *(hfactor) );
    seg.translateX(w/factor);
    curve.add(seg);

    seg = new Segment(0,w/factor);
    seg.rotateZ(-180);
    seg.translateX(w/factor);
    //curve.add(seg);

    return curve;
};


Road.prototype._generateCurveC = function(w,h) {
    var factor = 5; 
    var hfactor = 0.2;
    var curve = new ComplexCurve();

    //el derecho
    seg = new Segment(0,h*(1-hfactor));
    seg.rotateZ(-90);
    seg.translateX(0.5*w);
    seg.translateY((1-hfactor)*h);
    curve.add(seg);

    //el de abajo
    var seg = new Segment(0,w);
    seg.rotateZ(180);
    seg.translateX(0.5*w);
    curve.add(seg);


    //el izquierdo
    seg = new Segment(0,h*(1-hfactor));
    seg.rotateZ(90);
    seg.translateX(-w/2);
    
    curve.add(seg);
    

    curve.translateY(-h*(1-hfactor)*0.95);
    return curve;
}

Road.prototype._addSeg = function (path,w,c, m,mat) {
    var g = new SweptSurface(32,50,c, path,true,new VeredaTextureGenerator(true,m));
    var m = new Model(g, mat);   
    m.translateZ(w/2);
    this.add(m);
    return m;

}