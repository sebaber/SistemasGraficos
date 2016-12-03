
var Utils = Utils || {};




(function(){
    
    function inheritPrototype (child, parent) {

        // basicamente, child copia a su prototype todas las propiedades del prototype de parent, pero conserva su propio constructor
        // esta funcion debe ser aplicada sobre "funciones" contructoras, NO sobre instancias de objetos
        

        var copyOfParent = Object.create(parent.prototype); 
        // Object.create, devuelve un objeto con las propiedades de aquel pasado por parámetro
        // Se copiaron todas las propiedades de parent.prototype ---> a ---> copyOfParent
        
        copyOfParent.constructor = child;                   
        // pero nosotros queremos heredar todas las propiedades conservando el constructor original
        

        child.prototype = copyOfParent;                     
        // finalmente este es el nuevo prototype de child

    }

    function degToRad(deg) {
            return Math.PI * deg / 180; 
    }


    function isDefined  (val) {
        return typeof val !== 'undefined' && val !== null;
    };



    function cycleAngle (angle) {
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      } else if (angle < 0) {
        angle += 2 * Math.PI;
      }

      return angle;
    };

    function clampAngle (angle) {
      if (angle >= Math.PI / 2) {
        angle = Math.PI / 2;
      } else if (angle <= -Math.PI / 2) {
        angle = -Math.PI / 2;
      }

      return angle;
    };
    
    function calculateNormalMatrix(matrix) {
        var normal_m = mat4.create(); 
        mat4.invert(normal_m, matrix);
        mat4.transpose(normal_m, normal_m);
        return normal_m;

    }

    function calculateNormalMatrix3(matrix) {
        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, matrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        return normalMatrix;

    }
    function throttle(func, interval) {
    var lastCall = 0;
        return function() {
            var now = Date.now();
            if (lastCall + interval < now) {
                lastCall = now;
                return func.apply(this, arguments);
            }
        };
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function extend(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }
    Utils.inheritPrototype= inheritPrototype;
    Utils.degToRad = degToRad;
    Utils.isDefined = isDefined;
    Utils.cycleAngle = cycleAngle;
    Utils.clampAngle = clampAngle;
    Utils.calculateNormalMatrix = calculateNormalMatrix;
    Utils.calculateNormalMatrix3 = calculateNormalMatrix3;
    Utils.throttle = throttle;
    Utils.debounce = debounce;
    Utils.extend = extend;
}());




