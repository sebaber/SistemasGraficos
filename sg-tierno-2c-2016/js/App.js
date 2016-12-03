
var DefaultConfig = {
    sceneW : 600,
    sceneL : 600,
    sceneH : 90,
    bridgeW : 30,
    bridgeCurvatureC: [1,30],
    towersDeepnessC: [5, 25],
    tensorsSpaceC: [5, 15],
    bridgeHC: [25,40],
    bridgePosC: [0,100],
    freeCamY : [15],
    freeCamX : [150],
    freeCamD : [0,0.1,-1]
}

DefaultConfig.waterW = DefaultConfig.sceneW * 0.40;
DefaultConfig.waterPos = DefaultConfig.sceneW * 0.5;
DefaultConfig.bridgeL = DefaultConfig.waterW * 1.5;


var DefaultParameters = {
    bridgeCurvature: 15,
    towersDeepness: 10,
    towers: 2,
    tensorsSpace: 8,
    bridgeH: 30,
    bridgePos: 20
}



Application = function (canvasId,curveCanvasId, controllersId) {

    this.canvas = document.getElementById(canvasId);
    this.gl = GLContext.init(canvasId);
    this.t = 0;

    this._createControls(controllersId);

    if(this.gl)
    {
        this._setupWebGL();
        this.curveController = new CurveController(curveCanvasId);
        

       this._createScene();
        
        this.eventsController = new EventsController(canvasId,this.scene);

    }else{
        alert(  "Error: Your browser does not appear to support WebGL.");
    }
    Application.instance = this;
    
}

Application.prototype.run = function(){
    requestAnimationFrame(Application.instance.run);

    Application.instance.drawScene();


}

Application.prototype._setupWebGL = function (){
                    //set the clear color
                this.gl.clearColor(0.1, 0.1, 0.2, 1.0);
                this.gl.enable(this.gl.DEPTH_TEST);
                this.gl.depthFunc(this.gl.LEQUAL);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
                this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
}

Application.prototype._createScene = function (){
                var points = this.curveController.getNormalizedPoints();

                this.scene = new Scene (this._createCameras());
                var sp3 = new Model(new Sphere(32,new TextureGenerator(3,3,false)), new WaterMaterial());
                sp3.scale(20);
                sp3.translateX(200);
                sp3.translateY(100);
                sp3.translateZ(300);
                //this.scene.add(sp3);


                var sp2 = new Model(new Sphere(32,new TextureGenerator(3,3,false)), new WaterMaterial());
                sp2.scale(20);
                //this.scene.add(sp2);




                this.field =  new Field(DefaultConfig.sceneW,
                        DefaultConfig.sceneL,
                        DefaultConfig.waterW,
                        DefaultConfig.bridgeW,
                        this.params.towersDeepness,
                        points, this._calculateBridgeXPosition());
                this.field.translateZ(DefaultConfig.sceneW/2);
                var riverPath = this.field.getPath();
                this.scene.add(this.field);
                
                this.bridge = new Bridge(DefaultConfig.bridgeL,DefaultConfig.sceneL, 
                    DefaultConfig.bridgeW,
                    this.params.bridgeH, 
                    this.params.bridgeCurvature,
                    this.params.tensorsSpace,
                    this.params.towers,
                    this.params.towersDeepness,
                    riverPath.getPosition(this._calculateBridgeXPosition(riverPath))[2]);
                
                this.scene.add(this.bridge);

                this._placeBridge(riverPath);



                var axis = new Axis(3)
                axis.scale(10);
                var axis2 = new Axis(3);
                axis2.scale(10);
                axis2.translateX(DefaultConfig.sceneL/2);
                axis2.translateY(DefaultConfig.sceneH/2);
                axis2.translateZ(DefaultConfig.sceneW/2);
                //this.scene.add(axis2);
                //this.scene.add(axis);


                var water = new Water(DefaultConfig.waterW*2, DefaultConfig.sceneL);
                water.translateZ(DefaultConfig.sceneW/2-DefaultConfig.waterW);
                water.translateY(-1);
                var sky = new Sky();
                sky.scale(DefaultConfig.sceneW*1.5);
                sky.translateX(DefaultConfig.sceneL/1.5)
                sky.translateZ(DefaultConfig.sceneW/1.5)
                this.scene.add(sky);
                this.scene.add(water);
                this.scene.apply();

                
}


Application.prototype.drawScene = function () {
    
    //console.log("draw");
    
    GLContext.resize();
    this.curveController.draw(16);
    GLContext.tick(2);
    this.scene.draw(16);
    
    
    //console.log("Modelos dibujados: ",Model.prototype.contador);
    //Model.prototype.contador = 0;
    
}

Application.prototype._createCameras = function () {
    var cameras = [];
    cameras.push(new FreeCamera());
    cameras.push(new FixedCenterCamera());
    
    cameras[1].setTarget(
        vec3.fromValues(DefaultConfig.sceneL/2, DefaultConfig.sceneH/2, DefaultConfig.sceneW/2),
        vec3.fromValues(DefaultConfig.sceneL*0.3,DefaultConfig.sceneH/2,DefaultConfig.sceneW/2));
    
    cameras[0].setPosition(
        vec3.fromValues(DefaultConfig.freeCamX - DefaultConfig.bridgeW/2, 
            DefaultConfig.freeCamY,DefaultConfig.sceneW*0.75),
        DefaultConfig.freeCamD);

    return cameras;
}


Application.prototype._createControls = function (id) {
        var that = this;
        this.params = {
            regenerar:function(){
                that._regenerate();
            },
            reset:function(){
              that._setDefaultParams();
              that.curveController.reset();
              for(var j in that.gui.__folders) {
                for (var i in that.gui.__folders[j].__controllers) {
                    that.gui.__folders[j].__controllers[i].updateDisplay();
                }
              }

              that._regenerate();
        }};

        this._setDefaultParams();
        
        this.gui = new dat.GUI({ autoPlace: false });
    

        var f2 = this.gui.addFolder('Parametros Puente');
        f2.add(this.params, 'bridgePos', DefaultConfig.bridgePosC[0], DefaultConfig.bridgePosC[1])
                .name("Pos. Puente").step(5);
        
        f2.add(this.params, 'bridgeCurvature', DefaultConfig.bridgeCurvatureC[0],DefaultConfig.bridgeCurvatureC[1])
        .name("Curv. Puente").step(1);
        f2.add(this.params, 'bridgeH', DefaultConfig.bridgeHC[0],DefaultConfig.bridgeHC[1]).name("Alt. Puente").step(5);
        
        f2.add(this.params, 'tensorsSpace',DefaultConfig.tensorsSpaceC[0] ,DefaultConfig.tensorsSpaceC[1]).name("Esp. Tensores").step(1);
        
        f2.add(this.params, 'towers',{Dos: 0, Tres: 1, Cuatro: 2 }).name("Torres");

        


        var f3 = this.gui.addFolder('Parametros Terreno');
        f3.add(this.params,'towersDeepness',DefaultConfig.towersDeepnessC[0],DefaultConfig.towersDeepnessC[1]).name("Alt. Terreno").step(5);

        var f1 = this.gui.addFolder('Comandos');
        f1.add(this.params, 'regenerar').name("Regenerar");
        f1.add(this.params, 'reset').name("Reset");
        

        f1.open();
        f2.open();
        f3.open();
        
        var customContainer = document.getElementById(id);
        customContainer.appendChild(this.gui.domElement);
}


Application.prototype._setDefaultParams = function (params) {
    this.params.bridgePos = DefaultParameters.bridgePos;
    this.params.towers = DefaultParameters.towers -2;
    this.params.tensorsSpace = DefaultParameters.tensorsSpace;
    this.params.towersDeepness =DefaultParameters.towersDeepness;
    this.params.bridgeCurvature  = DefaultParameters.bridgeCurvature;
    this.params.bridgeH  = DefaultParameters.bridgeH;
} 


Application.prototype._regenerate = function () {
    this.field.regenerate(this._calculateBridgeXPosition(),
                            this.params.towersDeepness, 
                            this.curveController.getNormalizedPoints());
    var riverPath = this.field.getPath();
    this.bridge.regenerate(this.params.bridgeH, 
                    this.params.bridgeCurvature,
                    this.params.tensorsSpace,
                    this.params.towers,
                    this.params.towersDeepness,
                    riverPath.getPosition(this._calculateBridgeXPosition(riverPath))[2]);
    this._placeBridge(riverPath);

    this.scene.apply();
} 



Application.prototype._placeBridge = function (riverPath) {
        var x = this._calculateBridgeXPosition();
        
        var pos = riverPath.getPosition(x);

        this.bridge.reset();
        var bridgeZ = DefaultConfig.sceneW/2-DefaultConfig.bridgeL/2;
        this.bridge.rotateY(-90);
        this.bridge.translateY(this.params.towersDeepness);
        this.bridge.translateX(pos[0] + DefaultConfig.bridgeW/2);
        //this.bridge.translateZ(DefaultConfig.sceneW/2 - DefaultConfig.bridgeL/2 +delta );
        this.bridge.translateZ(DefaultConfig.sceneW/2- DefaultConfig.bridgeL/2 + pos[2]);
        return bridgeZ;
} 

Application.prototype._calculateBridgeXPosition = function() {
    var start = 0.8
    var end = 0.2;
    p = start + this.params.bridgePos * (end - start) / 100;
    return p;
}

Application.prototype._calculateXPercent = function(x) {
    return x / DefaultConfig.sceneL;
};