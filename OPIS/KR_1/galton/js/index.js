
// обьявление используемых обьектов библиотеки Matter.js 
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vector = Matter.Vector;

// переменные для создания характеристик шаров, границ и т.д.
var width = 750,
    height = 650,
    borderWidth = 20,
    hexYOffset = 50,
    hexXOffset = 350,
    hexYSpacing = 38,
    hexXSpacing = 44,
    hexSize = 22,
    boundaryHexSize = 27,
    hexChamfer = 3,
    ballPyramidRows = 18,
    ballPyramidColumns = 24,
    ballSize = 3.25,
    ballFriction = 0,
    ballBounciness = .25;

// обьявление стилей для используемых обьектов(цвет обьекта и цвет границ)
var boundaryStyle = {
  fillStyle: '#F0F0F0',
  strokeStyle: 'transparent'
};
var transparentStyle = {
  fillStyle: '#777',
  strokeStyle: 'transparent'
};
var ballStyle = {
  fillStyle: '#6f71d1',
  strokeStyle: 'transparent'
};
var wallStyle = {
  fillStyle: 'transparent',
  strokeStyle: 'transparent'
};

// создаем физический движок в заданной области(по найденному элементу)
var engine = Engine.create({
  render: {
    element: document.getElementById("player"),
    options: {
      height: height,
      width: width,
      background: 'transparent'
    }
  }
});

// создаем шарики
var balls = Composites.pyramid(0, 0, ballPyramidColumns, ballPyramidRows, 0, 0, function(x, y) {
  return Bodies.circle(x, y, ballSize, {
    render: ballStyle,
    friction: ballFriction,
    restitution: ballBounciness
  });
});

Composite.rotate(balls, Math.PI, Vector.create(225, hexYOffset));

// создаем шестигранники для взаимодействия шаров
var hexes = [];

for (var i = 2; i < 11; i++) {
  for (var j = i; j > 0; j--) {
    var y = hexYOffset + (hexYSpacing * i),
        x = hexXOffset + ((hexXSpacing * j) - ((hexXSpacing / 2) * i)),
        size,
        style;
    if (j == 1 || j == i) {
      var direction = (j == 1) ? -1 : 1;
      x += direction * (boundaryHexSize / 4);
      y -= 4;
      size = boundaryHexSize;
      style = transparentStyle;
    } else {
      size = hexSize;
      style = boundaryStyle;
    }
    hexes.push(Bodies.polygon(x, y, 6, size, {
      isStatic: true,
      render: style,
      chamfer: {
        radius: hexChamfer
      }
    }));
  }
};

// создаем столбики для вертикальных границ
var tubes = [];
for (var i = 0; i < 10; i++) {
  tubes.push(Bodies.rectangle(174 + (i * hexXSpacing), 570, 37, 265, {
    isStatic: true,
    render: transparentStyle
  }));
};

// добавляем все созданные обьекты
World.add(engine.world, balls);
World.add(engine.world, hexes);
World.add(engine.world, tubes);

// добавляем стороны воронки для прохода шаров
World.add(engine.world, Bodies.rectangle(280, 10, 15, 250, {
  isStatic: true,
  angle: Math.PI * -0.2,
  render: transparentStyle
}));
World.add(engine.world, Bodies.rectangle(434, 60, 15, 150, {
  isStatic: true,
  angle: Math.PI * 0.2,
  render: transparentStyle
}));

// добавляем границы доски
World.add(engine.world, [
  // верхняя горизонтальаня граница
  Bodies.rectangle(372, 0, 220, borderWidth, {
    isStatic: true,
    render: transparentStyle
  }),
  // нижняя горизонтальная граница
  Bodies.rectangle(372, height, 430, borderWidth, {
    isStatic: true,
    render: transparentStyle
  })
]);

//отрисовка всех стилей всех обьектов(если убрать то будет черно белое)
var renderOptions = engine.render.options;
renderOptions.wireframes = false;

// запускаем движок
Engine.run(engine);


$('#gravity').change(function(e) {
  engine.world.gravity.y = e.target.value;
});

function stop(){
  Runner.stop(engine);
};

//добавление функции пепеворота на обьект кнопки
function flip() {
  $('canvas').toggleClass('flip');
  engine.world.gravity.y = -1 * engine.world.gravity.y;
};