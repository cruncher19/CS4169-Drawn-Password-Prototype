CS4169-Drawn-Password-Prototype
===============================

Homework Project

drawingCanvas usage:

<script type="text/javascript" src="js/script.js"></script> to include the library(should probably rename this file to something sensible)
it can be found in graphical password/js/

create a div like this:
```html
<div id="canvasDiv"></div>
```

instantiate a drawingCanvas object like this:
```javascript
var dc = new drawingCanvas("canvasDiv", 600, 400);
```

When the user is finished drawing capture the drawing information like this:
var drawingInfo = dc.getPositions();

the data is an array of assosciative arrays, like so:
```
0:[
	x: number,
	y: number,
	time: number
],

1:[
	x: number,
	y: number,
	time: number
],

2: [
	x: number,
	y: number,
	time: number
],

etc...
```

so to acces the x position for point zero you would do:
```javascript
xpos = dc[0]['x'];
```
y:
```javascript
ypos = dc[0]['y'];
```
time:
```javascript
time = dc[0]['time'];
```