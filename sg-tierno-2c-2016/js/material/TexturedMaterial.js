
TexturedMaterial = function (options) {
  var defaults = {
      texture : "notf.jpg",
      enableLight : true,
      normalMap : null
  }
 
  var opts = Utils.extend(defaults,options);


  this.texture = GLContext.getTexture(opts.texture);
  if(Utils.isDefined(opts.normalMap))	{
    this.normalMap =  GLContext.getTexture(opts.normalMap); 
  }

  this._defineShader(opts);
  PhongMaterial.call(this,opts);
}

Utils.inheritPrototype(TexturedMaterial, PhongMaterial);


TexturedMaterial.shaders = {};


TexturedMaterial.prototype.getTexture = function () {
     return this.texture.getGLTexture();
}


TexturedMaterial.prototype.getNormalTexture = function () {
    if(Utils.isDefined(this.normalMap)) { 
     return this.normalMap.getGLTexture();
    }
    return null;
}


TexturedMaterial.prototype._defineShader = function (opts){

    //si esta definido no hay nada que hacer.
    if(Utils.isDefined(opts.shader)) {
      return;
    }


    //si hay normal map chequeo el shader con normal map.
    if(Utils.isDefined(opts.normalMap)) {
      if(!Utils.isDefined(TexturedMaterial.shaders["normals"])){
         TexturedMaterial.shaders["normals"] = new PhongShaderProgram({
            useTexture: true,
            useNormalMap : true
          });
         
      }
      opts.shader = TexturedMaterial.shaders["normals"];
      return;
    }

    //sino voy por el de normales
    if(!Utils.isDefined(TexturedMaterial.shaders["textured"])){
         TexturedMaterial.shaders["textured"] = new PhongShaderProgram({
            useTexture: true,
          });
    }
    opts.shader = TexturedMaterial.shaders["textured"];

}




WaterMaterial = function (options) {


  var defaults = {
      textures : ["water1-normalmap.jpg","water2-normalmap.jpg","water1.jpg", "water2.jpg"],
      enableLight : true,
      alpha: 0.9,
      specularColor : [0.6,0.6,0.6]
  }
   this.textures = [];

  var opts = Utils.extend(defaults,options);

  for(var i in opts.textures) {
    this.textures.push(GLContext.getTexture(opts.textures[i]));
  }

  
  if(!Utils.isDefined(opts.shader)) {
    if(!Utils.isDefined(WaterMaterial.shader)) {
      WaterMaterial.shader = new PhongShaderProgram({
            waterEffect : true,
            reflectionEfect: true
        });
    }
    opts.shader = WaterMaterial.shader;
  }

  PhongMaterial.call(this,opts);
}

Utils.inheritPrototype(WaterMaterial, PhongMaterial);



WaterMaterial.prototype.getReflexitivy = function() {
    return 0.6;
};


WaterMaterial.prototype.getTextures = function() {
  return this.textures;
};



MixinMaterial = function (options) {


  var defaults = {
      
      

      enableLight : true,
      textures : []
  }
  var opts = Utils.extend(defaults,options);

  this.textures = [];

  for(var i in opts.textures) {
    this.textures.push(GLContext.getTexture(opts.textures[i]));
  }

  if(!Utils.isDefined(opts.shader)) {
    if(!Utils.isDefined(MixinMaterial.shader) ) {
      MixinMaterial.shader = new PhongShaderProgram({
            grassEffect : true
      });
      
    }
    opts.shader = MixinMaterial.shader;
  }

  PhongMaterial.call(this,opts);
}


Utils.inheritPrototype(MixinMaterial, PhongMaterial);

MixinMaterial.prototype.getTextures = function() {
  return this.textures;
};




BeachMaterial = function (options) {


  var defaults = {

      
      enableLight : true,
      textures : [],
      delimiter : 2
  }
  var opts = Utils.extend(defaults,options);

  this.textures = [];
  this.delimiter = opts.delimiter;
  for(var i in opts.textures) {
    this.textures.push(GLContext.getTexture(opts.textures[i]));
  }

  if(!Utils.isDefined(opts.shader)) {
    if(!Utils.isDefined(BeachMaterial.shader) ) {
      BeachMaterial.shader = new PhongShaderProgram({
            beachEffect : true
      });
      
    }
    opts.shader = BeachMaterial.shader;
  }

  PhongMaterial.call(this,opts);
}


Utils.inheritPrototype(BeachMaterial, PhongMaterial);

BeachMaterial.prototype.getTextures = function() {
  return this.textures;
};
BeachMaterial.prototype.getDelimiter = function() {
    return this.delimiter;
};



WiresMaterial = function (options) {
  var defaults = {
      
      enableLight : true
  }
 
  var opts = Utils.extend(defaults,options);
  if(!Utils.isDefined(opts.shader)) {
    if(!Utils.isDefined(WiresMaterial.shader)) {
      WiresMaterial.shader = new PhongShaderProgram({
            useTexture: true,
            useNormalMap : true,
            reflectionEfect: true
        });
    }
    opts.shader = WiresMaterial.shader;
  }

  TexturedMaterial.call(this,opts);
}

Utils.inheritPrototype(WiresMaterial, TexturedMaterial);

WiresMaterial.prototype.getReflexitivy = function() {
    return 0.5;
};
