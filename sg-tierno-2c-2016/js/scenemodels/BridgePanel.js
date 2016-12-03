var BridgePanel = function(length,curve, h,extracols, spaceT,deepness) {
	Model.call(this);
    
    this.wiresMaterial = new WiresMaterial({texture: "alambres.jpg", normalMap:"alambres-mormalmap.jpg", specularColor:[0.4,0.4,0.4]});
    this.colSize= 5;
    this.secColSize= 3.5;
    this.length = length;
    this.tensorsFactor = 0.94;
    this.h = h;
    this.middleColsFactorH = 0.8;
    this.middleColsPosition = 0.4;
    this.generate(curve,extracols,spaceT,deepness);


}
Utils.inheritPrototype(BridgePanel, Model);


//GENERA UNA COLUMNA CON TRES TRAMOS.

BridgePanel.prototype._generateCol = function (h,w,firstSegmentH,deepness){
    //genero los 3 segmentos de la columna
    var commonH = (h - firstSegmentH) /2;
    //la base
    var base = new Column(firstSegmentH+deepness,h*0.03,1,0.6);
    base.scaleX(w);
    base.scaleZ(w);
    base.translateY(-deepness);

    //el tronco
    var middle = new Column(commonH,h*0.03,0.6,0.5);
    middle.scaleX(w);
    middle.scaleZ(w);
    middle.translateY(firstSegmentH);

    //el final
    var top = new Column(commonH,h*0.03,0.5,0.6,true);
    top.scaleX(w);
    top.scaleZ(w);
    top.translateY(firstSegmentH+commonH);

    //el modelo contenedor de las tres
    var col = new Model();
    col.add(base);
    col.add(middle);
    col.add(top);
    return col;
}

//GENERA UN TENSOR HORIZONTAL ENTRE DOS PUNTOS.
BridgePanel.prototype._generateTensor = function (first, second){    
    var path = new QuadraticBezier();
    
    var x = (second[0] + first[0]) /2.0;
    var maxH = first[1] < second[1] ? second[1] : first[1];
    var y = maxH/4 ;

    
    path.addControlPoint(second);
    path.addControlPoint([x, y]);
    path.addControlPoint(first);

    var curve = new Circle(0.35);
    curve.rotateY(90);
    //curve.rotateZ(45);
    var geom = new SweptSurface(30, 30,curve,path, true,new TextureGenerator(0.25,0.25));
    this.add(new Model(geom, this.wiresMaterial));
    path = new QuadraticBezier();
    path.addControlPoint(first);
    path.addControlPoint([x, y]);
    path.addControlPoint(second);
    return path;
}

//GENERA LOS TENSORES VERTICALES ENTRE DOS POSICIONES EN EL EJE X

BridgePanel.prototype._generateVTensors = function (start , end, space, floor, top){    
    
    //todas las cuentas necesarias para saber cuantos tensores poner
    var totalLength =  end - start;
    var length = totalLength - space;
    var count = Math.floor(length / space);
    var padding = (2*totalLength - length - space*count)/2;
    var step = 1/count;

    //genero el tensor genérico.
    var seg = new Segment(0,1);
    var circle = new Circle(0.15);
    circle.rotateY(90);
    var geom = new SweptSurface(2, 8,circle,seg,true,new TextureGenerator(0.5,0.5));
    //hago tantas copias como necesito.
    for(var i = 0 ; i < count; i++) {
        //calculo las posiciones en el segmento y en la longitud total del puente
        var xPos = space *i  + padding;
        var xPosAbs =  xPos + start ;

        //calculo los parámetros con los cuales consoltar las curvas.
        var floorParam = xPosAbs/this.length;
        var roofParam = xPos / totalLength;

        //obtengo las posiciones entre las cuales va a estar el segmento
        var topP = top.getPosition(roofParam)[1];
        var floorP = floor.getPosition(floorParam)[1];

        //armo un modelo auxiliar para poder trasladar y estirar el tensor sin modificar el original.
        var size =  topP -  floorP;
        var tensorGen = new Model(geom,this.wiresMaterial);
        tensorGen.rotateZ(90);
        tensorGen.scaleY(size);
        tensorGen.translateY(floorP);
        tensorGen.translateX(xPosAbs);
        this.add(tensorGen);
    }
    
}


//GENERA LAS COLUMNAS PRINCIPALES (LOS EXTREMOS)

BridgePanel.prototype._generateMainColumns = function (curve,position,h,w,cdeepness){    
    var firstSegmentH = curve.getPosition(position)[1]*0.9;
    
    var col1 = this._generateCol(h,w,firstSegmentH,cdeepness);
    col1.translateX(this.length*position);
    this.add(col1);

    var col2 = this._generateCol(h,w,firstSegmentH,cdeepness);
    col2.translateX(this.length*(1-position));
    this.add(col2);
    var connections = [];
    connections.push([this.length*position, h*this.tensorsFactor]);
    connections.push([this.length*(1-position), h*this.tensorsFactor]);
    return connections;
}


//GENERA UNA COLUMNA EN EL CENTRO DEL PUENTE.

BridgePanel.prototype._generateCentralColumn = function (curve,h,deepness){    

    var firstSegmentH = curve.getPosition(0.5)[1]*0.97;
    var col = this._generateCol(h,this.secColSize,firstSegmentH,deepness);
    col.translateX(this.length*0.5);
    this.add(col);
    return [this.length*0.5, h*this.tensorsFactor];
}


//GENERA TODO EL CONTENIDO DEL PANEL.

BridgePanel.prototype.generate= function (curve,extracols,spaceT,deepness){
        //defino a qué distancia van a estar las columnas principales
    var mainColPercent = extracols == 0 ? 0.3 : 0.3;    

    //Voy generando las columnas y ademas los punto de amarre para los tensores (connections)
    var connections  = [];
    connections.push([0, 0]);
    //creo las columnas principales.
    var mains = this._generateMainColumns(curve,mainColPercent,this.h,this.colSize,deepness);

    connections.push(mains[0]);
    if(extracols == 1) {
        connections.push(this._generateCentralColumn(curve,this.h*this.middleColsFactorH,deepness));
    }

    if(extracols > 1) {
        var cons = this._generateMainColumns(curve,this.middleColsPosition,this.h*this.middleColsFactorH,this.secColSize, deepness);
        connections.push(cons[0]);
        connections.push(cons[1]);
    }
    connections.push(mains[1]);
    connections.push([this.length ,0]);
    for(var i=0; i < connections.length -1; i++) {
        var tensor = this._generateTensor(connections[i], connections[i+1]);
        this._generateVTensors(connections[i][0] , connections[i+1][0], spaceT, curve,tensor);

    }
}