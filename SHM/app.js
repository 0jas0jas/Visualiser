

//canvas
const matterContainer = document.querySelector("#matter-container")

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Constraint = Matter.Constraint
    Composite = Matter.Composite;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "#003049",
        wireframes: false,
        showVelocity: true
    }
});

// create runner
let runner = Runner.create();

let damp;

Matter.Events.on(runner, "tick", () => {
    damp = document.querySelector('#damp').value;
    boxB.friction = damp;
})

// create two boxes and a ground
const frict = 0
Matter.Resolver._restingThresh = 0.0001;

let boxA = Bodies.rectangle(150, 100, 80, 80, { isStatic: true, inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0 });
let boxB = Bodies.rectangle(400, 100, 80, 80, { inertia: Infinity, restitution: 1, friction: damp, frictionAir: 0, frictionStatic: 0});
let boxC = Bodies.rectangle(650, 100, 80, 80, { isStatic: true, inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0 });
let roof = Bodies.rectangle(400, 30, 810, 60, { isStatic: true, inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0 });
let ground = Bodies.rectangle(400, 170, 810, 60, { isStatic: true, inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0 });

boxB.render.fillStyle = '#F77F00';
boxA.render.fillStyle = '#D62828';
boxC.render.fillStyle = '#D62828';
roof.render.fillStyle = '#003049';
ground.render.fillStyle = 'transparent';

// create Contraint
const stiffity = 0.00001;
const len = 500;
const type = 'spring'

let contraintAB = Constraint.create({
    
    bodyA: boxA,
    bodyB: boxB,
    length: len,
    stiffness: stiffity,
    damping: 0,
    type: 'spring',
    inertia: Infinity, 
    restitution: 1, 
    friction: 0, 
    frictionAir: 0, 
    frictionStatic: 0
})

let contraintCB = Constraint.create({
    bodyA: boxB,
    bodyB: boxC,
    length: len,
    stiffness: stiffity,
    damping: 0,
    type: 'spring',
    inertia: Infinity, 
    restitution: 1, 
    friction: 0, 
    frictionAir: 0, 
    frictionStatic: 0
})

//Create Mouse Constraint
let canvasMouse = Mouse.create(matterContainer)
let MConstraint = MouseConstraint.create(engine, {
    mouse: canvasMouse,
})


// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, ground, roof, contraintAB, contraintCB, MConstraint]);

// run the renderer
Render.run(render);

// run the engine
Runner.run(runner, engine);