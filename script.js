var w = window.innerWidth;
var h = window.innerHeight;
const numCircles = 60;

let ground;
let wall1;
let wall2;

const content = document.querySelector(".cat-physics");

// Matter.js module aliases
let elements = [];

window.addEventListener("resize", e => {
  w = window.innerWidth;
  h = window.innerHeight;
  engine.render.canvas.width = w;
  engine.render.canvas.height = h;

  Matter.Body.setPosition(wall2, Matter.Vector.create(w + 30, h * 5));
  Matter.Body.setPosition(ground, Matter.Vector.create(w * 0.5, h + 30));
});

// create Matter.js engine
var engine = Matter.Engine.create(content, {
  render: {
    options: {
      width: w,
      height: h,
      wireframes: false,
      background: "#FFFFFF00"
    }
  }
});

window.engine = engine;

var mouseConstraint = Matter.MouseConstraint.create(engine, {
  constraint: {
    render: {
      visible: false
    }
  }
});

// create two boxes and a ground
for (var i = 0; i < numCircles; i++) {
  var x = Math.random() * w;
  var y = Math.random() * -h;
  var base = w / 30;
  if (base < 5) base = 5;
  if (base > 30) base = 30;
  var multiplier = w / 10;
  if (multiplier < 30) miltiplier = 30;
  if (multiplier > 200) multiplier = 200;
  var r = base + Math.random() * multiplier;
  elements.push(
    Matter.Bodies.circle(x, y, r, {
      render: {
        sprite: {
          texture:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/cat-5.png",
          xScale: r / (254 / 2) + 0.2,
          yScale: r / (227 / 2) + 0.2
        }
      }
    })
  );
}
ground = Matter.Bodies.rectangle(w / 2, h + 30, w * 5, 60, { isStatic: true });
wall1 = Matter.Bodies.rectangle(-30, h / 2, 60, h * 2, { isStatic: true });
wall2 = Matter.Bodies.rectangle(w + 30, h / 2, 60, h * 2, { isStatic: true });
window.wall2 = wall2;
elements.push(ground);
elements.push(wall1);
elements.push(wall2);

// add all of the bodies to the world
Matter.World.add(engine.world, elements);
Matter.World.add(engine.world, mouseConstraint);

// run the engine
Matter.Engine.run(engine);
