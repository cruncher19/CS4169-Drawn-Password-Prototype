// Credit to: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
//            for the basic drawing code
var canvasWidth  = "800px";
var canvasHeight = "600px";  


// This is our main source of information about the password drawing
// We'll likely need to do some kind of smoothing to make the algorithm more tolerant
// This data is probably too high resolution to go straight into the password generation algorithm
// clickX[i], clickY[i] and clickTime[i] give the x,y and time for point i on the drawing
// Can use change in clickTime to find acceleration
var clickX    = new Array();
var clickY    = new Array();
var clickDrag = new Array();
var clickTime = new Array();
var paint;

window.onload = function() {



    var canvas = setupCanvas();
    context = canvas.getContext("2d");
    addCanvasListeners();
    

    // add a canvas element to #canvasDiv, return the canvas element
    function setupCanvas() {
        var canvasDiv = document.getElementById('canvasDiv');
        if(!canvasDiv) {
            throw "Error: #canvasDiv not found";
        }
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.setAttribute('id', 'canvas');
        canvasDiv.appendChild(canvas);
        if(typeof G_vmlCanvasManager != 'undefined') {
            canvas = G_vmlCanvasManager.initElement(canvas);
        }
        
        return canvas;
    }

    // Add mouse event listeners to the canvas
    function addCanvasListeners() {
        $('#canvas').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
                
            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });

        // mouse moves, push the change onto the click arrays
        $('#canvas').mousemove(function(e){
            if(paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });

        // mouse up, stop painting
        $('#canvas').mouseup(function(e){
            paint = false;
        });

        // mouse leaves the canvas, stop painting
        $('#canvas').mouseleave(function(e){
          paint = false;
        });
    }

    function addClick(x, y, dragging) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      var d = new Date();
      clickTime.push(d.getTime());
    }

    function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#df4b26";
        context.lineJoin    = "round";
        context.lineWidth   = 5;
            
        for(var i=0; i < clickX.length; i++) {        
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            }else{
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }

}
