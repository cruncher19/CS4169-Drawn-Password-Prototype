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
    this.startTime = undefined;
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
    drawGrid();
    addCanvasListeners(divId);    



    // Add mouse event listeners to the canvas
    function addCanvasListeners(divId) {
        console.log('#'+divId+' > #canvas');
        $('#'+divId+' > #canvas').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            if(!self.startTime) {                
                self.startTime = new Date();
            }
                
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

        var defaultStrokeStyle   = self.context.strokeStyle;
        var defaultLineJoin      = self.context.lineJoin;
        var defaultLineWidth     = self.context.lineWidth;
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
        self.context.strokeStyle = defaultStrokeStyle;
        self.context.lineJoin    = defaultLineJoin;
        self.context.lineWidth   = defaultLineWidth;
        drawGrid();
    }

    function drawGrid(){
        var width = self.canvas.width;
        var height = self.canvas.height;
        
        for(var i=1; i<5; i++) {
            // draw some vertical lines
            self.context.beginPath();
            self.context.moveTo(i*(width/5), 0);
            self.context.lineTo(i*(width/5), height);
            self.context.closePath();
            self.context.stroke();

            // draw some horizontal lines
            self.context.beginPath();
            self.context.moveTo(0, i*(height/5));
            self.context.lineTo(width, i*(height/5));
            self.context.closePath();
            self.context.stroke();
        }
    }
}

drawingCanvas.prototype.clearDrawing = function() {
    this.startTime = undefined;
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickTime = [];
    this.paint = false;
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas

    var defaultStrokeStyle   = this.context.strokeStyle;
    var defaultLineJoin      = this.context.lineJoin;
    var defaultLineWidth     = this.context.lineWidth;
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin    = "round";
    this.context.lineWidth   = 5;
        
    for(var i=0; i < this.clickX.length; i++) {        
        this.context.beginPath();
        if(this.clickDrag[i] && i){
            this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
        }else{
            this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
        }
        this.context.lineTo(this.clickX[i], this.clickY[i]);
        this.context.closePath();
        this.context.stroke();
    }
    this.context.strokeStyle = defaultStrokeStyle;
    this.context.lineJoin    = defaultLineJoin;
    this.context.lineWidth   = defaultLineWidth;
    var width = this.canvas.width;
    var height = this.canvas.height;
    
    for(var i=1; i<5; i++) {
        // draw some vertical lines
        this.context.beginPath();
        this.context.moveTo(i*(width/5), 0);
        this.context.lineTo(i*(width/5), height);
        this.context.closePath();
        this.context.stroke();

        // draw some horizontal lines
        this.context.beginPath();
        this.context.moveTo(0, i*(height/5));
        this.context.lineTo(width, i*(height/5));
        this.context.closePath();
        this.context.stroke();
    }
}

// Returns the time between the start of the drawing and the current time
// IN MILLISECONDS
drawingCanvas.prototype.getDrawingDuration = function() {
    return Math.abs(new Date() - this.startTime);
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

// Function to generate a password given the drawing coordinates on the grid
drawingCanvas.prototype.generatePassword = function() {
    var width = this.canvas.width;
    var height = this.canvas.height;

    var password = "";

	// As ClickX and ClickY should both have the same number of items, either array could have
	// been used to count
    for (var i = 0; i < this.clickX.length; i+=10)
    {
		// Determines the quadrant of the current (X, Y) coordinate. Returns a 2-element array containing
		// the vertical quadrant and horizontal quadrant
        var currentQuadrant = this.calculateQuadrant(width, height, this.clickX[i], this.clickY[i]);

        console.log(currentQuadrant);
		
		// The actual quadrant is simply the X quadrant * the Y quadrant
        var passwordChar = (currentQuadrant[0] * currentQuadrant[1]).toString();

        console.log(passwordChar);

		// Checks to see if a coordinate from this quadrant has already been added to the password
        if(password.indexOf(passwordChar) == -1) {
			// Concatenates the new quadrant onto the password. Each quadrant is separated by a "/"
			// but this can be changed later on in some fashion.
            password = password.concat("/", passwordChar);
        }
    }

	// The final password should look something like "/1/3/4/11/14/8/22/17" where each number
	// corresponds to a quadrant in the grid.
    console.log(password);

    //alert("Password generated is: " + password);

    return password;
}

// Function to determine with quadrant a given coordinate is in
drawingCanvas.prototype.calculateQuadrant = function(width, height, x, y) {
    
	// Generates the boundaries for each quadrant in the horizontal axis
	// This array should look something like {100, 200, 300, 400} for a grid
	// of size 500x500. i.e. less than 100 is quad 1, 100 to 200 is quad 2 and 
	// so on for 5 quadrants.
	var quadrantsX = new Array();
    for(var i = 0; i < 4; i ++) {
        quadrantsX[i] = (width / 5) * (i + 1);
    }

    console.log(quadrantsX);

	// Generates the boundaries for each quadrant in the vertical axis
    var quadrantsY = new Array();
    for(var i = 0; i < 4; i ++) {
        quadrantsY[i] = (height / 5) * (i + 1);
    }

    console.log(quadrantsY);

	// variables for the calculated quadrants for the X and Y coordinates.
    var pointQuadX;
    var pointQuadY;

	// Calculates X quad
    for (var i = 0; i < 4; i ++) {
        if(i == 0)
        {
            if(x < quadrantsX[i])
            {
                pointQuadX = 1;
                break;
            }
        }

        else if(x > quadrantsX[i]) {
            if(i == 3) {
                pointQuadX = i + 2;
            }
            continue
        }
        
        else {
            pointQuadX = i + 1;
            break;
        }
    }

	// Calculates Y quad
    for (var i = 0; i < 4; i ++) {
        if(i == 0)
        {
            if(y < quadrantsY[i])
            {
                pointQuadY = 1;
                break;
            }
        }

        else if(y > quadrantsY[i]) {
            if(i == 3) {
                pointQuadY = i + 2;
            }
            continue
        }
        
        else {
            pointQuadY = i + 1;
            break;
        }
    }

    console.log(x + " " + y);

    var jointQuadrant = [pointQuadX, pointQuadY];

    return jointQuadrant;
}
