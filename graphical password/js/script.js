// Credit to: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
//            for the basic drawing code

// divId = the ID of the div the canvas will be inserted into
// canvasWidth = the width in pixels of the canvas
// canvasHeight = theheight in pixels of the canvas

function drawingCanvas(divId, canvasWidth, canvasHeight){
    // This is our main source of information about the password drawing
    // We'll likely need to do some kind of smoothing to make the algorithm more tolerant
    // This data is probably too high resolution to go straight into the password generation algorithm
    // clickX[i], clickY[i] and clickTime[i] give the x,y and time for point i on the drawing
    // Can use change in clickTime to find acceleration
    this.clickX    = new Array();
    this.clickY    = new Array();
    this.clickDrag = new Array();
    this.clickTime = new Array();
    this.paint;

    var canvasDiv = document.getElementById(divId);
    if(!canvasDiv) {
        throw "Error: #canvasDiv not found";
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', canvasWidth);
    this.canvas.setAttribute('height', canvasHeight);
    this.canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(this.canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        this.canvas = G_vmlCanvasManager.initElement(this.canvas);
    }

    this.context = this.canvas.getContext("2d");
    var self = this;
    addCanvasListeners(divId);    



    // Add mouse event listeners to the canvas
    function addCanvasListeners(divId) {
        console.log('.'+divId+' > #canvas');
        $('#'+divId+' > #canvas').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
                
            self.paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });

        // mouse moves, push the change onto the click arrays
        $('#'+divId+' > #canvas').mousemove(function(e){
            if(self.paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });

        // mouse up, stop painting
        $('#'+divId+' > #canvas').mouseup(function(e){
            self.paint = false;
        });

        // mouse leaves the canvas, stop painting
        $('#'+divId+' > #canvas').mouseleave(function(e){
          self.paint = false;
        });
    }

    function addClick(x, y, dragging) {
      self.clickX.push(x);
      self.clickY.push(y);
      self.clickDrag.push(dragging);
      var d = new Date();
      self.clickTime.push(d.getTime());
    }

    function redraw(){
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Clears the canvas

        self.context.strokeStyle = "#df4b26";
        self.context.lineJoin    = "round";
        self.context.lineWidth   = 5;
            
        for(var i=0; i < self.clickX.length; i++) {        
            self.context.beginPath();
            if(self.clickDrag[i] && i){
                self.context.moveTo(self.clickX[i-1], self.clickY[i-1]);
            }else{
                self.context.moveTo(self.clickX[i]-1, self.clickY[i]);
            }
            self.context.lineTo(self.clickX[i], self.clickY[i]);
            self.context.closePath();
            self.context.stroke();
        }
    }
}

drawingCanvas.prototype.getPositions = function() {
    var positions = new Array();
    for(var i=0; i < this.clickX.length; i++) {
        var currPos = new Array();
        currPos['x'] = this.clickX[i];
        currPos['y'] = this.clickY[i];
        currPos['time'] = this.clickTime[i];
        positions.push(currPos);
    }
    return positions;
}
