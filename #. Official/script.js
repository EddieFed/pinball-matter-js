/**

 ## Company B
 |      Pinball Game

 ## Reference Tools:
 |      https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 |      https://codepen.io/lonekorean/pen/KXLrVX

 ## Contributors:
 |      Andrew Milas
 |      Viraj Sule
 |      Brenden Mitra
 |      Sam Lundstrum
 |      Eddie Federmeyer
 |      Dominic Laskero

 ## Physics Engine:
 |      matter.js
 |      http://brm.io/matter-js/

 **/

var c;
var game = {};

var paddleLeft = {};
var paddleRight = {};


var defaultCategory = 0x0001;
var paddleCategory = 0x0004;


// Wait until window finishes loading!
window.addEventListener("load", () => {
    c = document.getElementById("ca");

    // Matter.js setup
    game.engine = Matter.Engine.create();
    game.world = game.engine.world;
    game.world.bounds = {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: 750,
            y: 750
        }
    };

    // **!!REMEMBER!!** Set Renderer to match Canvas
    game.render = Matter.Render.create({
        canvas: c,
        engine: game.engine,
        options: {
            width: c.width,
            height: c.height,
            background: c.style.backgroundColor,
            wireframes: false,
            showAngleIndicator: false
        }
    });

    // Game object creation
    paddleLeft = makePaddle(100, 600);
    paddleRight = makePaddle(500, 600);

    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint(),

        Matter.Bodies.circle(550, 20, 10, {
            density: 0.1,
            friction: 0.008,
            frictionAir: 0.00032,
            restitution: 1,
            
            inertia: Infinity,
            slop: 0,
            render: {
                fillStyle: "#F35e66",
                strokeStyle: "#000000",
                lineWidth: 1
            },
            collisionFilter: {
                category: defaultCategory,
                mask: defaultCategory
            }
        }),


        paddleLeft.ball,
        paddleLeft.paddle,
        paddleLeft.constrainter,

        paddleRight.ball,
        paddleRight.paddle,
        paddleRight.constrainter,

        staticCircle(paddleLeft.ball.position.x + 20, paddleLeft.ball.position.y + 45, 10, "#FFFFFF"),
        staticCircle(paddleLeft.ball.position.x + 60, paddleLeft.ball.position.y - 20, 10, "#FFFFFF"),

        staticCircle(paddleRight.ball.position.x + 20, paddleRight.ball.position.y + 45, 10, "#FFFFFF"),
        staticCircle(paddleRight.ball.position.x + 60, paddleRight.ball.position.y - 20, 10, "#FFFFFF"),

        // Window edges (top, bottom, left, right)
        border(200, -5, 1500, 10),
        border(200, 755, 1500, 10),
        border(-5, 200, 10, 1500),
        border(755, 200, 10, 1500)
    ]);



    // Basic render
    Matter.Engine.run(game.engine);
    Matter.Render.run(game.render);

});




window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.code;
    if (key === "ArrowLeft") {
        Matter.Body.applyForce(paddleLeft.paddle, {
            x: paddleLeft.paddle.position.x,
            y: paddleLeft.paddle.position.y
        }, Matter.Vector.create(0, -100));
    } else if (key === "ArrowRight") {
        Matter.Body.applyForce(paddleRight.paddle, {
            x: paddleRight.paddle.position.x,
            y: paddleRight.paddle.position.y
        }, Matter.Vector.create(0, -100));
    }
});


// <- Creation functions ->


function border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
            lineWidth: 1
        }
    });
}


function mouseConstraint() {
    return Matter.MouseConstraint.create(game.engine, {
        element: c,
        constraint: {
            render: {
                visible: true
            }
        },
        stiffness: 0.8

    });
}


function makePaddle(x, y) {
    var paddleTemp= {};
    paddleTemp.paddle = Matter.Bodies.rectangle(x, y, 100, 15,  {
        label: "paddle",
        density: 2/3,
        collisionFilter: {
            category: defaultCategory,
            mask: paddleCategory | defaultCategory
        },
        render: {
            fillStyle: "#000000",
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });

    paddleTemp.ball = Matter.Bodies.circle(x, y, 5, {
        isStatic: true,
        render: {
            visible: false,
            fillStyle: "#F35e66",
            strokeStyle: "#000000",
            lineWidth: 1
        },
        slop: 0
    });

    let paddleGroup = Matter.Body.nextGroup(true);

    Object.values(paddleTemp).forEach((p) => {
        p.collisionFilter.group = paddleGroup;
    });

    paddleTemp.constrainter = Matter.Constraint.create({
        bodyA: paddleTemp.paddle,
        pointA: { x: -35, y: 0},
        bodyB: paddleTemp.ball,
        length: 0.01,
        stiffness: 0,
        render: {
            visible: false
        }
    });
    return paddleTemp;

}


function staticCircle(x, y, radius, colorHex) {
    return Matter.Bodies.circle(x, y, radius, {
        isStatic: true,
        inertia: Infinity,
        restitution: 0,
        collisionFilter: {
            category: paddleCategory,
            mask: defaultCategory, paddleCategory
        },
        render: {
            visible: true,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}