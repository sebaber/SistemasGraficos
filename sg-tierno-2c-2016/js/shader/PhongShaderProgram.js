
var   PhongShaderProgram = function(options) {
  var opts = Utils.isDefined(options) ? options : {};


  

  var binder = new ShaderBinder();
  var these = this;
  
  this.mustinit =[];
  this._commonBindings(binder);


  /*if(Utils.isDefined(opts.customAttributes)) {
    for(var i in opts.customAttributes) {
      var e = opts.customAttributes[i];
      this.mustinit.push(e.name);
      binder.addAttribute(e.name, e.location);
    }
  }*/

  var vertexOptions = {
    lines : [],
    attributes : [],
    varyings: [],
    uniforms: []
  };
  
  var fragmentOptions = {
    textures :  [],
    extras:     [],
    varyings:   [],
    uniforms:   []
  };

  var units = 0;
  //agrego las coordeandas de textura para todos los que usan coordenadas de texturas
  if(opts.useTexture || opts.useNormalMap || opts.waterEffect || opts.grassEffect || opts.beachEffect) {
      this.mustinit.push("vertexTextureCoord");
      binder.addAttribute("vertexTextureCoord", "texture_buffer");
      vertexOptions.attributes.push({type: "vec2", name: "vertexTextureCoord"});
      vertexOptions.varyings.push({type: "vec2", name: "vtextureCoord"});
      vertexOptions.lines.push("vtextureCoord = vertexTextureCoord");
      fragmentOptions.varyings.push({type: "vec2", name: "vtextureCoord"});

  }

  if(opts.useNormalMap || opts.grassEffect || opts.waterEffect) {
      this.mustinit.push("vertexTangent");
      this.mustinit.push("vertexBinormal");
      binder.addAttribute("vertexTangent", "tangent_buffer");
      binder.addAttribute("vertexBinormal", "binormal_buffer");

      vertexOptions.attributes.push({type: "vec3", name: "vertexTangent"});
      vertexOptions.attributes.push({type: "vec3", name: "vertexBinormal"});
      
      vertexOptions.varyings.push({type: "vec3", name: "vtangent"});
      vertexOptions.varyings.push({type: "vec3", name: "vbinormal"});
      fragmentOptions.varyings.push({type: "vec3", name: "vtangent"});
      fragmentOptions.varyings.push({type: "vec3", name: "vbinormal"});
      
      vertexOptions.lines.push("vbinormal = normalize(normalMatrix * vertexBinormal)");
      vertexOptions.lines.push("vtangent = normalize(normalMatrix * vertexTangent)");
  }

  if(opts.useTexture) {
      units++;
      fragmentOptions.uniforms.push({type: "sampler2D", name: "sampler"});
      fragmentOptions.textures.push("computedDiffuseColor = texture2D(sampler, vtextureCoord)");
      fragmentOptions.textures.push("computedAmbientColor = ambientColor  * computedDiffuseColor.rgb");
      fragmentOptions.textures.push("computedDiffuseColor = vec4(diffuseColor, 1.) * computedDiffuseColor");
      fragmentOptions.textures.push("computedDiffuseColor.w = alphaMat");

      binder.addUniform("sampler", "getMaterial", function (hndlr, material) {
        var GLtexture = material.getTexture();
        these.glContext.activeTexture(these.glContext.TEXTURE0);
        these.glContext.bindTexture(these.glContext.TEXTURE_2D, GLtexture);
        //el cero es porque la bindeo a la unit 0 de texturas.
        these.glContext.uniform1i(hndlr, 0);
      });
  }

  if(opts.useNormalMap) {
      units++;
      fragmentOptions.uniforms.push({type: "sampler2D", name: "sampler_1"});

      fragmentOptions.uniforms.push({type: "mat3", name: "normalMatrix"} );  

      
      fragmentOptions.extras.push("vec3 rgbNormal = 2.0 * texture2D(sampler_1, vtextureCoord).rgb - vec3(1.0,1.0,1.0)" );
      fragmentOptions.extras.push("mat3 TBN = mat3(normalize(vtangent), normalize(vbinormal),normalize(vnormal))");
      fragmentOptions.extras.push("N = normalize(TBN * rgbNormal)");

      // esto porque asumo que tengo una textura ya
      binder.addUniform("sampler_1", "getMaterial", function (hndlr, material) {
        var GLtexture = material.getNormalTexture();
        these.glContext.activeTexture(these.glContext.TEXTURE1);
        these.glContext.bindTexture(these.glContext.TEXTURE_2D, GLtexture);
        //el cero es porque la bindeo a la unit 1 de texturas.
        these.glContext.uniform1i(hndlr, 1);
      });
  }

  if(opts.waterEffect) {
    units+=4;
    this._addWaterWeffect(vertexOptions, fragmentOptions, binder);
  }

  if(opts.grassEffect){
    this._addGrassEffect(vertexOptions, fragmentOptions, binder);
  }


  if(opts.beachEffect) {
    this._addbBeachEffects(vertexOptions, fragmentOptions, binder);
  }
  if(opts.reflectionEfect) {
    this._addReflection (vertexOptions, fragmentOptions, binder, units);
  }
  ShaderProgram.call(this, new PhongVertexSource(vertexOptions), new PhongFragmentSource(fragmentOptions));
  this._setBinder(binder);
}







Utils.inheritPrototype(PhongShaderProgram, ShaderProgram);

PhongShaderProgram.prototype._initAttributes = function () {
    for(var i in this.mustinit) {
      this._initAttribute(this.mustinit[i]);  
    }
}



PhongShaderProgram.prototype._commonBindings = function(binder) {
  var these = this;
  ////////////////////////UN_MATRIX////////////
  binder.addUniform("viewMatrix", "getVMatrix", function (hndlr, attribute) {
      these.glContext.uniformMatrix4fv(hndlr, false, attribute);
  });

  binder.addUniform("modelMatrix", "getMMatrix", function (hndlr, attribute) {
      these.glContext.uniformMatrix4fv(hndlr, false, attribute);
  });

  binder.addUniform("proyMatrix", "getPMatrix", function (hndlr, attribute) {
      these.glContext.uniformMatrix4fv(hndlr, false, attribute);
  });
  binder.addUniform("normalMatrix", "getNMatrix", function (hndlr, attribute) {
      these.glContext.uniformMatrix3fv(hndlr, false, attribute);
  });
///////////////////////////////////////////////

////////////////UN_LIGHT///////////////////////
  binder.addUniform("La", null, function (hndlr, l) {
      var light = GLContext.getLight();
      these.glContext.uniform1f(hndlr, light.getAmbientColor());
  });

  binder.addUniform("Ld", null, function (hndlr, l) {
    var light = GLContext.getLight();
      these.glContext.uniform1f(hndlr, light.getDiffuseColor());
  });

  binder.addUniform("Ls", null, function (hndlr, l) {
      var light = GLContext.getLight();
      these.glContext.uniform1f(hndlr, light.getSpecularColor());
  });


  binder.addUniform("lightPos", null, function (hndlr, l) {
      var light = GLContext.getLight();
      these.glContext.uniform3fv(hndlr, light.getPosition());
  });

  binder.addUniform("viewPosition", null, function (hndlr, l) {
      var viewerPos = GLContext.getViewPosition();
      these.glContext.uniform3fv(hndlr, viewerPos);
  });

  binder.addUniform("shininessVal", null, function (hndlr, l) {
      var light = GLContext.getLight();
      these.glContext.uniform1f(hndlr, light.getShininess());
  });

  binder.addUniform("ambientColor", "getMaterial", function (hndlr, material) {
      these.glContext.uniform3fv(hndlr, material.getAmbientColor());
  });

  binder.addUniform("diffuseColor", "getMaterial", function (hndlr, material) {
    
      these.glContext.uniform3fv(hndlr, material.getDiffuseColor());
  });

  binder.addUniform("specularColor", "getMaterial", function (hndlr, material) {
      
      these.glContext.uniform3fv(hndlr, material.getSpecularColor());
  });


  binder.addUniform("enableLight", "getMaterial", function (hndlr, material) {
      these.glContext.uniform1i(hndlr, material.getEnableLight());
  });


    binder.addUniform("alphaMat", "getMaterial", function (hndlr, material) {
      these.glContext.uniform1f(hndlr, material.getAlpha());
  });

///////////////////////////////////////////////

  binder.addAttribute("vertexPosition", "position_buffer");
  binder.addAttribute("vertexNormal", "normal_buffer");

  this.mustinit.push("vertexPosition");
  this.mustinit.push("vertexNormal");
};


PhongShaderProgram.prototype._addTextureMix = function(name, idx,binder,ctx) {
    binder.addUniform(name, "getMaterial", function (hndlr, material) {
        var textures = material.getTextures();
        ctx.glContext.activeTexture(ctx.glContext.TEXTURE0+idx);

        ctx.glContext.bindTexture(ctx.glContext.TEXTURE_2D, textures[idx].getGLTexture());
        ctx.glContext.uniform1i(hndlr, idx);
      });
};



PhongShaderProgram.prototype._addGrassEffect = function (vo, fo, binder) {
   
    //agrego todos los samplers y los uniforms
    for(var i = 0; i<5;i++)  {
      var name = "sampler_"+ i.toString();
      var idx = i+0;
      fo.uniforms.push({type: "sampler2D", name: name });
      this._addTextureMix(name, i,binder,this);
    }

    //la primer textura es como voy a mezclar
    fo.extras.push("vec3 t0 = texture2D(sampler_0, vtextureCoord/17.0).rgb");

    //las siguientes dos son los mapas de normales
    fo.extras.push("vec4 t1 = texture2D(sampler_1, vtextureCoord)");
    fo.extras.push("vec4 t2 = texture2D(sampler_2, vtextureCoord)");

    //cargo las normales de los archivos
    fo.extras.push("vec3 rgbNormal1 = 2.0 * t1.rgb - vec3(1.0,1.0,1.0)" );
    fo.extras.push("vec3 rgbNormal2 = 2.0 * t2.rgb - vec3(1.0,1.0,1.0)" );
    //computo la normal interpolando ambas.
    fo.extras.push("vec3 rgbNormal = mix(rgbNormal1,rgbNormal2,t0.x)" );
    fo.textures.push("if(vertPos.z > 100.0 && vertPos.z < 500.0) {") ;
      fo.textures.push("rgbNormal =  0.7 *rgbNormal + .3 * rgbNormal1");
    fo.textures.push("}");
    fo.extras.push("mat3 TBN = mat3(normalize(vtangent), normalize(vbinormal),normalize(vnormal))");
    fo.extras.push("N = normalize(TBN * rgbNormal)");

    //cargo los colores difusos.
    fo.textures.push("vec4 t3 = texture2D(sampler_3, vtextureCoord/4.0)");
    fo.textures.push("vec4 t4 = texture2D(sampler_4, vtextureCoord/3.0)");
    

    //fo.textures.push("computedDiffuseColor = vec4(t1.r * t0.rgb + (1.0-t1.r) *t2.rgb,alphaMat)");
    fo.textures.push("computedDiffuseColor = vec4(mix(t3.rgb,t4.rgb,t0.x),alphaMat)");
    
    fo.textures.push("if(vertPos.z > 100.0 && vertPos.z < 500.0) {") ;
      fo.textures.push("computedDiffuseColor =  0.7 *computedDiffuseColor + .3 * t3");
    fo.textures.push("}");

    fo.textures.push("computedAmbientColor = ambientColor  * computedDiffuseColor.rgb");
    fo.textures.push("computedDiffuseColor = vec4(diffuseColor, 1.) * computedDiffuseColor");
}


PhongShaderProgram.prototype._addbBeachEffects = function(vo, fo, binder) {
    //agrego todos los samplers y los uniforms
    var these = this;
    for(var i = 0; i<4;i++)  {
      var name = "sampler_"+ i.toString();
      var idx = i+0;
      fo.uniforms.push({type: "sampler2D", name: name });
      this._addTextureMix(name, i,binder,this);
    }

     fo.uniforms.push({type: "float", name: "delimiter"} );  
    //cargo los colores difusos.
    binder.addUniform("delimiter", "getMaterial", function (hndlr, material) {
      these.glContext.uniform1f(hndlr, material.getDelimiter());
    });
    fo.textures.push("vec4 t0");
    fo.textures.push("if(vertPos.y > delimiter){");
        fo.textures.push("t0 = texture2D(sampler_0, vec2(vertPos.x, vertPos.z)/41.0)");  
    fo.textures.push("} else {");  
      fo.textures.push("t0 = texture2D(sampler_2, vec2(vertPos.x, vertPos.z)/43.0)");
    fo.textures.push("}");

    
    fo.textures.push("vec4 t1 = texture2D(sampler_1, vec2(vertPos.x, vertPos.z)/60.0)");
    fo.textures.push("vec4 t2 = texture2D(sampler_3, vtextureCoord)");
    fo.textures.push("computedDiffuseColor = vec4(mix(t0.rgb,t1.rgb,t2.x),alphaMat)");
  
    fo.textures.push("computedAmbientColor = ambientColor  * computedDiffuseColor.rgb");
    fo.textures.push("computedDiffuseColor = vec4(diffuseColor, 1.) * computedDiffuseColor");
  
};


PhongShaderProgram.prototype._addReflection = function(vo, fo, binder, unit) {
  
  var these = this;
      binder.addUniform("rfSampler", null, function (hndlr) {
        var texture = GLContext.getCubeMap().getTexture();
        these.glContext.activeTexture(these.glContext.TEXTURE0+unit);
        these.glContext.bindTexture(these.glContext.TEXTURE_CUBE_MAP, texture);
        //el 2 es porque la bindeo a la unit 2 de texturas.
        these.glContext.uniform1i(hndlr, unit);
      });



      binder.addUniform("reflex", "getMaterial", function (hndlr, material) {
        these.glContext.uniform1f(hndlr, material.getReflexitivy());
      });

      
      fo.uniforms.push({type: "samplerCube", name: "rfSampler"});
      fo.uniforms.push({type: "float", name: "reflex"});



      fo.textures.push("vec3 R = reflect(-V, N)");
      fo.textures.push("computedDiffuseColor = (1. - reflex) *computedDiffuseColor + (reflex) *textureCube(rfSampler, R  )");
      fo.textures.push("computedAmbientColor = computedDiffuseColor.rgb");
      fo.textures.push("computedDiffuseColor.w = alphaMat");

      fo.textures.push("computedAmbientColor = ambientColor  * computedDiffuseColor.rgb");
      fo.textures.push("computedDiffuseColor = vec4(diffuseColor, 1.) * computedDiffuseColor");

};

PhongShaderProgram.prototype._addWaterWeffect = function(vo, fo, binder) {
    
    var these = this;
    fo.uniforms.push({type: "float", name: "t"});
    
    binder.addUniform("t", "getTime", function (hndlr, attribute) {
      these.glContext.uniform1f(hndlr, attribute);
    });

    for(var i = 0; i<4;i++)  {
      var name = "sampler_"+ i.toString();
      var idx = i+0;
      fo.uniforms.push({type: "sampler2D", name: name });
      this._addTextureMix(name, i,binder,this);

    }



    fo.extras.push("vec2 calcTextureCord0 = vtextureCoord/7. + t/1000.0");
    fo.extras.push("calcTextureCord0.y = vtextureCoord.y/7.");
    fo.extras.push("vec2 calcTextureCord1 = vtextureCoord/13. + t/1051.0");
    fo.extras.push("calcTextureCord1.y = vtextureCoord.y/11.");
    fo.extras.push("vec2 calcTextureCord2 = vtextureCoord/23. + t/2503.0");
    fo.extras.push("calcTextureCord2.y = vtextureCoord.y/23.");

    fo.extras.push("vec3 n0 = 2.0 * texture2D(sampler_0, calcTextureCord0).rgb - vec3(1.0,1.0,1.0)" );
    fo.extras.push("vec3 n1 = 2.0 * texture2D(sampler_0, calcTextureCord1).rgb - vec3(1.0,1.0,1.0)" );
    fo.extras.push("vec3 n2 = 2.0 * texture2D(sampler_1, calcTextureCord2).rgb - vec3(1.0,1.0,1.0)" );
    fo.extras.push("mat3 TBN = mat3(normalize(vtangent), normalize(vbinormal),normalize(vnormal))");
    fo.extras.push("float f = cos(t/400.0)/2. + .5 ");
    fo.extras.push("vec3 rgbNormal = f*n0 + (1. -f)*n1");
    fo.extras.push("rgbNormal = .5*rgbNormal *.5*n2");
    fo.extras.push("N = normalize(TBN * rgbNormal)");

    
    fo.textures.push("vec4 t0 = texture2D(sampler_2, calcTextureCord0)");
    fo.textures.push("vec4 t1 = texture2D(sampler_2, calcTextureCord1)");
    fo.textures.push("vec4 t2= texture2D(sampler_3, calcTextureCord2)");
    fo.textures.push("computedDiffuseColor = f*t0 + (1.-f)*t1");
    
    fo.textures.push("computedDiffuseColor = .5*computedDiffuseColor + .5*t2"); 
    fo.textures.push("computedDiffuseColor.w = alphaMat");

    
    fo.textures.push("computedAmbientColor = ambientColor  * computedDiffuseColor.rgb");
    fo.textures.push("computedDiffuseColor = vec4(diffuseColor, 1.) * computedDiffuseColor");
};