var ParametricTextureGenerator = function (sfunction, tfunction, inverted) {
		this.texts = [];
		if(inverted) {
			this.tfunction = sfunction;
			this.sfunction = tfunction;
		} else {
			this.sfunction = sfunction;
			this.tfunction = tfunction;
		}
}

ParametricTextureGenerator.prototype.push = function(s, t, position,tangent,normal) {
	this.texts.push(this.sfunction(s,t,position,tangent,normal));
	this.texts.push(this.tfunction(s,t,position,tangent,normal));
};

ParametricTextureGenerator.prototype.getTextureCoord = function() {
    return this.texts;
};

var TextureGenerator = function(mults, multt,invert) {
	var ms = Utils.isDefined(mults) ? mults : 1;
	var mt = Utils.isDefined(multt) ? multt : 1;
	var inverted = Utils.isDefined(invert) ? invert : false;
	var sf = function (s, t, position,tangent,normal) {
			return ms * s;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return mt * t;
	}

		
	ParametricTextureGenerator.call(this,sf,tf, inverted);	

	
}
Utils.inheritPrototype(TextureGenerator, ParametricTextureGenerator);



var BotomTextureGenerator = function (inverted) {
	var sf = function (s, t, position,tangent,normal) {
			return  position[0]/20;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return  t;
	}
	ParametricTextureGenerator.call(this,sf,tf,inverted);		
}

Utils.inheritPrototype(BotomTextureGenerator, ParametricTextureGenerator);



var GrassTextureGenerator = function (inverted) {
	var sf = function (s, t, position,tangent,normal) {
			return  position[0]/10;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return  position[2]/10;
	}
	ParametricTextureGenerator.call(this,sf,tf,inverted);		
}

Utils.inheritPrototype(GrassTextureGenerator, ParametricTextureGenerator);



var BeachTextureGenerator = function (inverted) {
	var sf = function (s, t, position,tangent,normal) {
			return  s*10;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return  -t;
	}
	ParametricTextureGenerator.call(this,sf,tf,inverted);		
}

Utils.inheritPrototype(BeachTextureGenerator, ParametricTextureGenerator);


var VeredaTextureGenerator = function (inverted, factor) {
	var sf = function (s, t, position,tangent,normal) {
			return  position[0]/6;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return  t*2;
	}
	ParametricTextureGenerator.call(this,sf,tf,inverted);		
}

Utils.inheritPrototype(VeredaTextureGenerator, ParametricTextureGenerator);


var RoadTextureGenerator = function (mult) {
	var sf = function (s, t, position,tangent,normal) {
			return  position[0]/10;
	};
	var tf =  function (s, t, position,tangent,normal) {
			return  t;
	}
	ParametricTextureGenerator.call(this,tf,sf);		
}

Utils.inheritPrototype(RoadTextureGenerator, ParametricTextureGenerator);


