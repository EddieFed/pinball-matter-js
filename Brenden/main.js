var engine, world, render;
var bodies;

window.addEventListener('load', function() {

    //Fetch our canvas
    var canvas = document.getElementById('world');

    //Setup Matter JS
    engine = Matter.Engine.create();
    world = engine.world;
    render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 500,
            height: 500,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });
    bodies = [];
    const COLOR = {
        BUMPER: '#0036f3',
        BUMPER_ALT: '#00e5ff',
    };
    //Add a ball
    var ball = Matter.Bodies.circle(250, 250, 10, {
        radius: 200,
        density: 0.04,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 1,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Matter.Body.setInertia(ball, Infinity);
    // ball.inertia(Infinity);
    world.gravity.y = .75;
    Matter.World.add(world, ball);
    bodies.push(ball);
    // alert(ball.radius)

    //Add a floor
    var floor = Matter.Bodies.rectangle(0, 500, 1000, 40, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, floor);

    //Add a wall
    var wall = Matter.Bodies.rectangle(0, 0, 40, 1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, wall);

    //Add a border
    var wall2 = Matter.Bodies.rectangle(500, 0, 40, 1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, wall2);

    //Add a ceiling
    var ceiling = Matter.Bodies.rectangle(0, 0, 1000, 40, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, ceiling);

    //Add a ball
    var paddle2 = Matter.Bodies.trapezoid(100, 250, 20, 80, .33, {
        angle: 1.57,
        density: 0.04,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        // inertia: Infinity,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Matter.World.add(world, paddle2);
    bodies.push(paddle2);

    let bumper1 = Matter.Bodies.circle(200, 250, 40, {
        angle: 1.57,
        isStatic: true, //An immovable object
        density: 0.4,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 1.5,
        render: {
            fillStyle: '#0036f3',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    bumper1.restitution =1.5;
    Matter.World.add(world, bumper1);
    bodies.push(bumper1);

    Matter.Events.on(engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === bumper1) {
                bumper1.render.fillStyle = COLOR.BUMPER_ALT;
                setTimeout(function() {
                 bumper1.render.fillStyle = COLOR.BUMPER;
                 }, 300);
            }

        }
    });

    //Make interactive
    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

});


window.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;
    // alert(key)

    if (key === "ArrowLeft") {
        bodies.setAngularVelocity(paddle2,23);
        // alert(bodies[0].radius)
        bodies[0].render.circleRadius += 20;
        // alert(bodies[0].radius)
    } else if (key === "ArrowRight") {
        // alert("right")
        // Matter.Body.setAngularVelocity(bodies[1], 1)
        // Matter.Body.applyForce(bodies[1],23,86);
        // Matter.Body.applyForce(bodies[1],{x: bodies[1].position.x, y: bodies[1].position.y}, {x: 0, y: -0.05});

    }
});

// Matter.Events.on(engine, 'beforeUpdate', function(event) {
//     // bumpers can quickly multiply velocity, so keep that in check
//     Matter.Body.setVelocity(pinball, {
//         x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
//         y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
//     });