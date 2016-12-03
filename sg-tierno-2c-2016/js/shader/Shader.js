var Shader = function(shaderSrc) {
     this.glContext= GLContext.getContext();;
     this.gl_shader = this._getShader(shaderSrc);     
}


   // SHADERS FUNCTION
Shader.prototype._getShader = function(shaderSrc) {
      

      // Obtenemos el elemento <script> que contiene el código fuente del shader.

      // Extraemos el contenido de texto del <script>.
      var resulr = shaderSrc.build();

      // Creamos un shader WebGL según el atributo type del <script>.
      /*if (shaderScript.getT == "x-shader/x-fragment") {
          shader = this.glContext.createShader(this.glContext.FRAGMENT_SHADER);
      } else if (shaderScript.type == "x-shader/x-vertex") {
          shader = this.glContext.createShader(this.glContext.VERTEX_SHADER);
      } else {
          return null;
      }

      // Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
      this.glContext.shaderSource(shader, src);

      // Compilamos el shader.
      this.glContext.compileShader(shader);  
        */
      // Chequeamos y reportamos si hubo algún error.
      if (!this.glContext.getShaderParameter(resulr.sh, this.glContext.COMPILE_STATUS)) {  
        alert("An error occurred compiling the shaders: " + 
              this.glContext.getShaderInfoLog(resulr.sh));  
        return null;  
      }
      this.src = resulr.sr; 

      return resulr.sh;
}


Shader.prototype.attach = function (program) {
     this.glContext.attachShader(program, this.gl_shader);
}


