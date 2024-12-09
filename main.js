const shape = document.getElementById('shape');
const curs = document.getElementById('curs');
const scores = document.getElementById('score');

let score = 0;

const win = document.getElementById('win');

// Initial position of the shape
let shapeX = 200;
let shapeY = 200;
shape.style.left = `${shapeX}px`;
shape.style.top = `${shapeY}px`;

let cursX = 50;
let cursY = 50;
curs.style.left = `${cursX}px`;
curs.style.top = `${cursY}px`;

// Speed of the shape's movement
const speed = 10;

// Center and radius of the circular safe zone
const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;
const safeZoneRadius = window.innerHeight / 2;




document.addEventListener('mousemove', (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;



    // Get the current position of the shape
    const shapeRect = shape.getBoundingClientRect();
    const shapeCenterX = shapeRect.left + shapeRect.width / 2;
    const shapeCenterY = shapeRect.top + shapeRect.height / 2;

    // Calculate the distance between the cursor and the shape's center
    const dx = shapeCenterX - cursorX;
    const dy = shapeCenterY - cursorY;
    const distanceToCursor = Math.sqrt(dx * dx + dy * dy);

    // Move the shape away if the cursor gets too close
    const threshold = 100; // Distance threshold for moving the shape
    if (distanceToCursor < threshold) {
        // Calculate the direction to move the shape
        const angle = Math.atan2(dy, dx);
        shapeX += Math.cos(angle) * speed;
        shapeY += Math.sin(angle) * speed;
    }

    // Ensure the shape stays within the circular safe zone
    const distanceToCenter = Math.sqrt(
        Math.pow(shapeX - screenCenterX, 2) + Math.pow(shapeY - screenCenterY, 2)
    );
    if (distanceToCenter > safeZoneRadius) {
        // Push the shape back inside the circle
        const angle = Math.atan2(shapeY - screenCenterY, shapeX - screenCenterX);
        shapeX = screenCenterX + Math.cos(angle) * safeZoneRadius;
        shapeY = screenCenterY + Math.sin(angle) * safeZoneRadius;
    }

    // Update the shape's position
    shape.style.left = `${shapeX}px`;
    shape.style.top = `${shapeY}px`;

    curs.style.left = `${cursorX - 10}px`;
    curs.style.top = `${cursorY - 10}px`;

    scores.innerText = `Mice Caught: ${score}`;
});

win.addEventListener('click', () => {
    console.log('Button was clicked!');
    alert('You caught the mouse!!');
    score++;
});
