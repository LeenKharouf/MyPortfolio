var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var load_counter = 0;

var background = new Image();
var floaties3 = new Image();
var floaties2 = new Image();
var floaties1 = new Image();
var mask_shadow = new Image();
var mask = new Image();
var human_shadow = new Image();
var human = new Image();

var layer_list = [
  {
    'image': background,
    'src': '../img/background.png',
    'z_index': -2.25,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  },
  {
    'image': floaties3,
    'src': '../img/floaties3.png',
    'z_index': -2,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  },
  {
    'image': floaties2,
    'src': '../img/floaties2.png',
    'z_index': -1.25,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  }, // <-- Missing comma here
  {
    'image': floaties1,
    'src': '../img/floaties1.png',
    'z_index': -0.5,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  },
  {
    'image': mask_shadow,
    'src': '../img/mask_shadow.png',
    'z_index': -1.5,
    'position': { x: 0, y: 0 },
    'blend': 'multiply',
    'opacity': 1
  },
  {
    'image': mask,
    'src': '../img/mask.png',
    'z_index': 0,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  },
  {
    'image': human_shadow,
    'src': '../img/human_shadow.png',
    'z_index': -1.5,
    'position': { x: 0, y: 0 },
    'blend': 'multiply',
    'opacity': 1
  },
  {
    'image': human,
    'src': '../img/human.png',
    'z_index': 2,
    'position': { x: 0, y: 0 },
    'blend': null,
    'opacity': 1
  }
];

layer_list.forEach(function (layer, index) {
  layer.image.onload = function () {
    load_counter += 1;
    if (load_counter >= layer_list.length) {
      requestAnimationFrame(drawCanvas); //runs through this 60times per second
    }
  };
  layer.image.src = layer.src;
});

function drawCanvas() {
  //clear whatever is on canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate the parallax offset based on mouse position
  var parallax_offset_x = pointer.x * 0.02;
  var parallax_offset_y = pointer.y * 0.02;

  //loop through each layer and draw it to the canvas
  layer_list.forEach(function (layer, index) {
    // Calculate the parallax position for each layer based on its z_index
    var parallax_x = -parallax_offset_x * layer.z_index;
    var parallax_y = -parallax_offset_y * layer.z_index;

    layer.position = {
      x: getOffset(layer).x + parallax_x,
      y: getOffset(layer).y + parallax_y,
    };

    if (layer.blend) {
      context.globalCompositeOperation = layer.blend;
    } else {
      context.globalCompositeOperation = 'normal';
    }
    context.globalAlpha = layer.opacity;
    context.drawImage(layer.image, layer.position.x, layer.position.y);
  });

  requestAnimationFrame(drawCanvas);
}


function getOffset(layer){
var touch_multiplier = 0.3;

	var touch_offset_x = pointer.x * layer.z_index * touch_multiplier;
	var touch_offset_y = pointer.y * layer.z_index * touch_multiplier;

	var offset = {
		x: touch_offset_x,
		y: touch_offset_y
	};
	return offset;
}


////// SO FAR THE IMAGE IS PERFECTLY STILL


//Touch and mouse controls

var moving = false;

var pointer_initial = {
	x:0,
	y:0
}

var pointer = {
	x:0,
	y:0
}

canvas.addEventListener('touchstart', pointerStart);
canvas.addEventListener('mousedown', pointerStart);

function pointerStart(event) {
  moving = true;
  if (event.type == 'touchstart') {
    pointer_initial.x = event.touches[0].clientX;
    pointer_initial.y = event.touches[0].clientY;
  } else if (event.type == 'mousedown') {
    pointer_initial.x = event.clientX;
    pointer_initial.y = event.clientY;
  }
}


window.addEventListener('touchmove', pointerMove);
window.addEventListener('mousedown', pointerMove);

function pointerMove(event) {
  event.preventDefault();
  if (moving == true) {
    var current_x = 0;
    var current_y = 0;
    if (event.type == 'touchmove') {
      current_x = event.touches[0].clientX;
      current_y = event.touches[0].clientY;
    } else if (event.type == 'mousemove') {
      current_x = event.clientX;
      current_y = event.clientY;
    }
    pointer.x = current_x - pointer_initial.x; // Calculate the offset relative to initial position
    pointer.y = current_y - pointer_initial.y; // Calculate the offset relative to initial position
  }
}


canvas.addEventListener('touchmove', function(event){
	event.preventDefault();
});

canvas.addEventListener('mousemove', function(event){
	event.preventDefault();
});

window.addEventListener('touchend', function(event){
	endGesture();
});

window.addEventListener('mouseup', function(event){
	endGesture();
});

function endGesture(){
	moving = false;
	pointer.x = 0;
	pointer.y = 0;
}







