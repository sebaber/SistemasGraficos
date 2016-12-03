




var CurveController = function(elementId) {
	this.canvas = document.getElementById(elementId);
    
    this.ctx = this.canvas.getContext("2d");
    this.scale = this.canvas.width;
    this.fixedPoints = [[0.5, 0], [0.5, 1]];	
    //this.defaultEditorPoints = [[130, 40], [170, 80],[130, 100],[170, 140],[130, 160]];
    this.defaultEditorPoints = [[0.34, 0.19], [0.683, 0.433],[0.3, 0.6],[0.7, 0.837]];
    //this.defaultEditorPoints = [[130, 40]];
    this._init();

    //puntos iniciales.
    
}

CurveController.prototype._init = function() {
		this.dragging = false;
		this.selected = null;
        this.selectedIndex = null;
		this.dirty = true;
        this.editorRadius = 10;
        this._initEditorPoints();

		this.constraints = [[0,1], [0,1]];

        // default styles
        this.style = {
            curve: {
                width: 3,
                color: "#88A"
            },
            cpline: {
                width: 2,
                color: "#0F0"
            },
            fixedPoint: {
                radius: 0.016,
                width: 15,
                sideWidth: 10,
                color: "#F00"
            },
            spoint: {
                radius: 0.023,
                width: 3,
                color: "#FFF",
                fill: "rgba(255,0,0,1)",
                arc1: 0,
                arc2: 2 * Math.PI
            },
            marginc: {
                radius: 0.167,
                width: 1,
                color: "#FAF",
                fill: "rgba(255,0,0,0.5)",
                arc1: 0,
                arc2: 2 * Math.PI
            },
            cppoint: {
                radius: 0.0167,
                width: 3,
                color: "#0F0",
                fill: "rgba(255,255,255,1)",
                arc1: 0,
                arc2: 2 * Math.PI
            }
        };
        this.selectionRadius = this.style.cppoint.radius * 1.5;
        
        // line style defaults
        this.ctx.lineCap = "round";
        this.lineJoin = "round";

        // event handlers
		that = this;
		this.canvas.onmousedown  = function (e) {
            
			that._startDrag(e);
		}
        this.canvas.onmouseup  = function (e) {
            that._endDrag(e);
        }

		this.canvas.onmousemove  = Utils.throttle(function (e) {
            that._drag(e);
        },1/30);
		this.canvas.onmouseout  = function (e) {
			that._endDrag(e);
		}
    }

CurveController.prototype._startDrag = function(event) {
	var e = this._mousePos(event);
	var dx,dy;
	for(var i in this.editorPoints) {
		dx = this.editorPoints[i][0]*this.scale - e.x;
        dy = this.editorPoints[i][1]*this.scale - e.y;
        if(dx*dx + dy*dy < this.selectionRadius * this.selectionRadius * this.scale * this.scale) {
        	this.selected = this.editorPoints[i];
            this.selectedIndex = i;
        	this.dragging = true;
            this.dirty = true;
        }

	}
	
};

CurveController.prototype._drag = function(event) {
		
	if(!this.dragging) {
		return ;
	}

	var pos = this._mousePos(event);
    var np = [];
	np[0] =  pos.x;
	np[1] = pos.y;

    var dx = this.defaultEditorPoints[this.selectedIndex][0]*this.scale - np[0];
    var dy = this.defaultEditorPoints[this.selectedIndex][1]*this.scale - np[1];
    var r = this.style.marginc.radius*this.scale - this.style.cppoint.radius*this.scale;
    if(dx*dx + dy*dy < r*r) {
        this.selected[0] = np[0]/this.scale;
        this.selected[1] = np[1]/this.scale;
        this.dirty = true;
    }
	
	
};

CurveController.prototype._endDrag = function(e) {
    console.log("end");
    if(this.dragging) {
        this.dragging = false;
        this.selected = null;
    }
    this.dirty = true;
};


CurveController.prototype.draw = function() {
	
    var displayWidth  = this.canvas.clientWidth;
    var displayHeight = this.canvas.clientHeight;
     
          // Check if the canvas is not the same size.
    if (this.canvas.width  != displayWidth ||
          this.canvas.height != displayHeight) {
     
        // Make the canvas the same size
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
        this.scale = this.ctx.canvas.width;
        this.dirty = true;
    }

    if(!this.dirty){
		return ;
	}

    this.ctx.fillStyle = "#001236";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	var curve = this._defineCurve();
	var steps = 150;
	var step = 1/(steps);

    //LINEAS DE DERIVADAS.
    this.ctx.lineWidth = this.style.cpline.width;
    this.ctx.strokeStyle = this.style.cpline.color;
    for (var i in this.segments){
             var seg = this.segments[i];
            this.ctx.beginPath();
            this.ctx.moveTo(seg.start[0]*this.scale, seg.start[1]*this.scale);
            this.ctx.lineTo(seg.end[0]*this.scale, seg.end[1]*this.scale);
            this.ctx.stroke();
    }

    this.ctx.lineWidth = this.style.curve.width;
    this.ctx.strokeStyle = this.style.curve.color;
	for(var i = 0; i< steps; i++) {
		var curPos = curve.getPosition(i*step);
		var nextPos = curve.getPosition((i+1)*step);
        this.ctx.beginPath();
    	this.ctx.moveTo(curPos[0], curPos[1]);
        this.ctx.lineTo(nextPos[0], nextPos[1]);
        this.ctx.stroke();
	}
    


	//PUNTOS MOVILES.
	for (var p in this.editorPoints) {

	 		var point = this.editorPoints[p];
            if(point == this.selected) {

                    var defp = this.defaultEditorPoints[p];

                    this.ctx.lineWidth = this.style.marginc.width;
                    this.ctx.strokeStyle = this.style.marginc.color;
                    this.ctx.fillStyle = this.style.marginc.fill;
                    //dibujo la constraint.
                    this.ctx.beginPath();
                    this.ctx.arc(defp[0]*this.scale, defp[1]*this.scale, this.style.marginc.radius * this.scale, this.style.marginc.arc1, this.style.marginc.arc2, true);
                    this.ctx.fill();
                    this.ctx.stroke();

                    this.ctx.lineWidth = this.style.spoint.width;
                    this.ctx.strokeStyle = this.style.spoint.color;
                    this.ctx.fillStyle = this.style.spoint.fill;
            } else {
                    this.ctx.lineWidth = this.style.cppoint.width;
                    this.ctx.strokeStyle = this.style.cppoint.color;
                    this.ctx.fillStyle = this.style.cppoint.fill;
            }
            this.ctx.beginPath();
            this.ctx.arc(point[0]*this.scale, point[1]*this.scale, this.style.cppoint.radius * this.scale, this.style.cppoint.arc1, this.style.cppoint.arc2, true);
            this.ctx.fill();
            this.ctx.stroke();
	}

	//PUNTOS FIJOS.
    this.ctx.lineWidth = this.style.fixedPoint.width;
    this.ctx.fillStyle = this.style.fixedPoint.color;
	for (var p in this.fixedPoints) {
	 		var point = this.fixedPoints[p];
            this.ctx.beginPath();
            var width = this.style.fixedPoint.sideWidth/2;
            this.ctx.fillRect(point[0]* this.scale - width , point[1]* this.scale - width, 
            	width*2 , width*2);
            this.ctx.fill();
            this.ctx.stroke();
	}



	this.dirty = false;
};


CurveController.prototype._mousePos = function (event) {
        event = (event ? event : window.event);
        var rect = this.canvas.getBoundingClientRect(), // abs. size of element
        scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = this.canvas.height / rect.height;  // relationship bitmap vs. element for Y
        
        var e =  {
            x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
        e.x =  e.x > this.constraints[0][0]*this.scale ? e.x : this.constraints[0][0]*this.scale;
        e.x =  e.x < this.constraints[0][1]*this.scale ? e.x : this.constraints[0][1]*this.scale;
        e.y =  e.y > this.constraints[1][0]*this.scale ? e.y : this.constraints[1][0]*this.scale;
        e.y =  e.y < this.constraints[1][1]*this.scale ? e.y : this.constraints[1][1]*this.scale;
        return e;
}



CurveController.prototype._defineCurve = function () {
		var curve = new CubicBSpline();
        var p1=this.fixedPoints[0];
		curve.addControlPoint(p1);
		curve.addControlPoint(p1);
        curve.addControlPoint(p1);
		for(var i in this.editorPoints) {
			curve.addControlPoint(this.editorPoints[i]);
		}

        var p2=this.fixedPoints[1];

        curve.addControlPoint(p2);
        curve.addControlPoint(p2);
        curve.addControlPoint(p2);
        curve.addControlPoint(p2);
        
        
		curve.scale(this.scale);
        


        return curve;
}





CurveController.prototype._underScale = function(point) {
	return [point[0]/300, point[1]/300];
};


CurveController.prototype.reset = function () {
        this._initEditorPoints();
        this.dirty = true;
}
CurveController.prototype.getNormalizedPoints = function() {
    var points = [];
    points.push(this._normalize(this.fixedPoints[0]));
    for(var i in this.editorPoints) {
        points.push(this._normalize(this.editorPoints[i]));
    }
    points.push(this._normalize(this.fixedPoints[1]));
    return points;
};

CurveController.prototype._normalize = function (point) {
    return [point[0] - 0.5, point[1]];
}
CurveController.prototype._initEditorPoints = function () {
        this.editorPoints = [];
        for(var i in this.defaultEditorPoints) {
            this.editorPoints.push ([this.defaultEditorPoints[i][0], 
                this.defaultEditorPoints[i][1]]);
        }
        this.segments = [];
        this.segments.push({start: this.fixedPoints[0], end: this.editorPoints[0]});
        this.segments.push({start: this.fixedPoints[1], end: this.editorPoints[this.editorPoints.length -1]});

        for(var i = 0; i < this.editorPoints.length-1; i++){
            this.segments.push({start: this.editorPoints[i], end: this.editorPoints[i+1]});
        }
}
