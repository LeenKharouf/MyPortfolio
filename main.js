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

  //loop through each layer and draw it to the canvas
  layer_list.forEach(function (layer, index) {
  	if(layer.blend){
  		context.globalCompositeOperation = layer.blend;
  	}
  	else{
  	  	context.globalCompositeOperation = 'normal';
  	}
  	context.globalAlpha = layer.opacity;
    context.drawImage(layer.image, layer.position.x, layer.position.y);
  }); // <-- Missing closing parenthesis
  requestAnimationFrame(drawCanvas); //runs through this 60times per second

}


