

var GLContext = (function () {
    var textures = [];
    var context;
    var canvasID = "my-canvas";
    var canvas;
    var pMatrix;
    var drawMode =[];
    var activeDrawMode;
    var view_matrix = mat4.create();
    var t = 0;
    var viewPos = [];
    var light = new Light();
    var pointOfView = [];
    var cubeMap = null;
    function createInstance() {
                canvas = document.getElementById(canvasID);
                try{
                    var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");  
                     drawMode.push(ctx.TRIANGLE_STRIP);
                     drawMode.push(ctx.POINTS);
                     drawMode.push(ctx.LINE_STRIP);
                     activeDrawMode=0;
                    return ctx;
                }catch(e){
                }
    };


    function createProjectionMatrix () {
        pMatrix = mat4.create();;
        mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 1600);

        return pMatrix;
    };
    return {
        getContext: function () {
            if (!context) {
               context = createInstance();
            }
            return context;
        },
        init: function (id) {
            if (!context) {
                canvasID = id;
                return this.getContext();
            } else {
                throw new Error("Context Initialized");
            }
        },
        resize : function () {
          // Lookup the size the browser is displaying the canvas.
          var displayWidth  = canvas.clientWidth;
          var displayHeight = canvas.clientHeight;
         
          // Check if the canvas is not the same size.
          if (canvas.width  != displayWidth ||
              canvas.height != displayHeight) {
         
            // Make the canvas the same size
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
            pMatrix = null;
            context.viewport(0, 0, context.canvas.width, context.canvas.height);
          }
        },
        getProjectionMatrix : function (){
            if(!Utils.isDefined(pMatrix)) {
                return createProjectionMatrix();
                window.onresize = function (e) {
                    console.log(canvas.clientWidth, canvas.clientWidth);
                }
            }
            return pMatrix;
        },
        getDrawMode: function () {
            if(drawMode){
                return drawMode[activeDrawMode];
            }

        },
        nextDrawMode: function(){
            if(drawMode){
                activeDrawMode = (activeDrawMode +1) % drawMode.length;
            }
        },
        setViewMatrix : function(m) {
            view_matrix = m;
        },
        getViewMatrix: function () {
            return view_matrix;
        },
        getTime : function () {
            return t;
        },

        tick : function(time) {
            t += time;
        },

        setViewPosition : function (pos) {
            viewPos = pos;
        },

        getViewPosition : function () {
            return viewPos;
        },

        getTexture : function (textureFile) {
          if (textures[textureFile] != undefined){
             return textures[textureFile];
          }
          else {
            var high = textureFile == "tramo-doblemarilla.jpg" ? true : false;
            textures[textureFile] = new Texture("textures/" +textureFile,high);
            return textures[textureFile];            
          }
        },
        getLight : function () {
            return light;
        },

        getCubeMap: function (){
            if(!Utils.isDefined(cubeMap)) {
                cubeMap = new CubeMap();
            }
            return cubeMap;
        }
    };

})();
