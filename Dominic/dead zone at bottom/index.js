/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/
var z = 1;
var c;
var engine;
var world;
var render;
var mouseConstraint;


// Wait until window finishes loading!
window.addEventListener("load", () => {

    // Canvas reference
    c = document.getElementById("ca");

    // Tracks mouse movement
    c.addEventListener('dblclick', (event) => {//need to WORK ON THE COLLSION IF THE BALL GOES THROUGH THE BOTTOM OR FIND A WAY TO DETECT IT, REMOVE IT , THEN SPAWN ANOTHER BALL.
        if(Matter.detector.){

        }

    }, false);






        // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: 1000, y: 800 }
    };

    mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: c,
        constraint: {
            render: {
                visible: true
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);


    // Add all bodies to the world
    Matter.World.add(world, [

        staticBox2(500, 780, 50, 50, "#000000"),
        staticBox3(100, 500, 1000, 50, "#000000", 1, true),//turned box
        staticBox3(199, 750, 450, 50, "#000000", 0, true),//left small box
        staticBox3(800, 750, 450, 50, "#000000", 0, true),//right small box
        staticBox3(500, 850, 1000, 50, "#990000", 0, false),//bottom box
        staticBox3(400, 800, 100, 50, "#990000", 80.1, false),//80.1 is straight up and down
        staticBox3(600, 800, 100, 50, "#990000", 80.1, false),//^^ left and right up and down box
        ball(900, 100, 25),//ball size

        // Window edges (top, bottom, left, right)
        border(500, -5, 1000, 10),//top
        border(500, 1000, 1000, 10),//bottom
        border(-5, 400, 10, 800),//left
        border(1005, 400, 10, 800)//right
    ]);


// **!!REMEMBER!!** Set Renderer to match Canvas
    render = Matter.Render.create({
        canvas: c,
        engine: engine,
        options: {
            width: c.width,
            height: c.height,
            background: c.style.backgroundColor,
            wireframes: false,
            showAngleIndicator: false
        }
    });


    // Basic render
    Matter.Engine.run(engine);
    Matter.Render.run(render);

});



// ** Body Functions!! ** //

function border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
            // strokeStyle: "black",
            lineWidth: 1
        }
    });
}


function ball(x, y, r) {
    return Matter.Bodies.circle(x, y, r, {
        density: 0.05,
        friction: 0.0005, //affects friction so when it hits wall or ground slows down,
        frictionAir: 0.003, // affects gravity speed
        restitution: 1,
        render: {
            fillStyle: "#F35e66",
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}




    function staticBox(x, y, width, height, colorHex) {
        return Matter.Bodies.rectangle(x, y, width, height, {
                isStatic: true,
                angle: 0,
                render: {
                    fillStyle: colorHex,
                    strokeStyle: "black",
                    lineWidth: 1
                }
            });
    }
    function staticBox2(x, y, width, height, colorHex) {
        return Matter.Bodies.rectangle(900, 500, 1000, height, {
            isStatic: true,
            angle: 2,
            render: {
                fillStyle: colorHex,
                strokeStyle: "black",
                lineWidth: 1
            }
        });
    }
    function staticBox3(x, y, width, height, colorHex, angles, visible) {
        return Matter.Bodies.rectangle(x, y, width, height, {
            isStatic: true,

            angle: angles,
            render: {
                fillStyle: colorHex,
                strokeStyle: "black",
                lineWidth: 1
            }
        });
}
