console.log("javascript linked!");

//variables
const player = new Plyr('video');



document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});


// Recents

const gravity = 0.1;
const bounceFactor = 0.5; // Lower bounce factor for gentler bounce

const circles = document.querySelectorAll('.cursor-fx-object');
const container = document.getElementById('boxx3'); // Use #boxx3 as the container

// Create an array to store circle objects with physics properties
let objects = [];

circles.forEach(circle => {
  const circleObj = {
    el: circle,
    x: Math.random() * (container.clientWidth - 50),
    y: Math.random() * (container.clientHeight - 50),
    vx: (Math.random() - 0.5) * 2,
    vy: 0,
    radius: 25,
  };
  objects.push(circleObj);
});

const avoidRadius = 100;

function handleWallCollisions(obj) {
  if (obj.x < 0) {
    obj.vx = Math.abs(obj.vx);
  } else if (obj.x + 2 * obj.radius > container.clientWidth) {
    obj.vx = -Math.abs(obj.vx);
  }

  if (obj.y + 2 * obj.radius > container.clientHeight) {
    obj.y = container.clientHeight - 2 * obj.radius;
    obj.vy = -obj.vy * bounceFactor; // Apply the reduced bounce factor
  } else if (obj.y < 0) {
    obj.vy = Math.abs(obj.vy);
  }
}

function handleCircleCollisions() {
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const objA = objects[i];
      const objB = objects[j];
      const distX = objA.x - objB.x;
      const distY = objA.y - objB.y;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const minDist = objA.radius + objB.radius;

      if (distance < minDist) {
        const angle = Math.atan2(distY, distX);
        const totalVx = objA.vx - objB.vx;
        const totalVy = objA.vy - objB.vy;

        objA.vx -= totalVx * Math.cos(angle) * 0.5;
        objA.vy -= totalVy * Math.sin(angle) * 0.5;
        objB.vx += totalVx * Math.cos(angle) * 0.5;
        objB.vy += totalVy * Math.sin(angle) * 0.5;

        const overlap = (minDist - distance) / 2;
        objA.x += Math.cos(angle) * overlap;
        objA.y += Math.sin(angle) * overlap;
        objB.x -= Math.cos(angle) * overlap;
        objB.y -= Math.sin(angle) * overlap;
      }
    }
  }
}

function moveCircles() {
  objects.forEach(obj => {
    obj.vx *= 0.99; // Friction to slow horizontal movement
    obj.vy += gravity; // Apply gravity to vertical velocity

    obj.x += obj.vx;
    obj.y += obj.vy;

    handleWallCollisions(obj);

    obj.el.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
  });
}

// Function to handle mouse movement and clicks within the box
function interactWithBalls(mouseX, mouseY) {
  objects.forEach(obj => {
    const distX = mouseX - (obj.x + obj.radius);
    const distY = mouseY - (obj.y + obj.radius);
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < avoidRadius) {
      const angle = Math.atan2(distY, distX);
      obj.vx += -Math.cos(angle) * 1.5;
      obj.vy += -Math.sin(angle) * 1.5;
    }
  });
}

// Listen for mouse movement and clicks within the #boxx3 container
container.addEventListener('mousemove', function(event) {
  const rect = container.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; // Mouse position relative to the container
  const mouseY = event.clientY - rect.top;

  interactWithBalls(mouseX, mouseY);
});

// Optional: Handle mouse clicks within the container
container.addEventListener('click', function(event) {
  const rect = container.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; // Mouse position relative to the container
  const mouseY = event.clientY - rect.top;

  interactWithBalls(mouseX, mouseY);
});

function animate() {
  handleCircleCollisions();
  moveCircles();
  requestAnimationFrame(animate);
}

animate();



// slideshow

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change slide every 2 seconds
}


// scroll effect for the nav bars

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link'); // Desktop nav buttons
  const mobileOptions = document.querySelectorAll('.option'); // Mobile nav buttons

  // Function to handle scrolling
  function smoothScrollToSection(targetId) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
          targetSection.scrollIntoView({
              behavior: 'smooth', // Smooth scroll
              block: 'start'      // Align to the top of the viewport
          });
      }
  }

  // Desktop navigation scroll
  navLinks.forEach(link => {
      link.addEventListener('click', function () {
          const targetId = this.getAttribute('data-target');
          smoothScrollToSection(targetId);
      });
  });

  // Mobile navigation scroll
  mobileOptions.forEach(option => {
      option.addEventListener('click', function () {
          const targetId = this.getAttribute('data-target');
          smoothScrollToSection(targetId);

          // Optionally close the menu after clicking (assuming you have a checkbox to toggle menu visibility)
          const checkbox = document.querySelector('.checkbox');
          if (checkbox.checked) {
              checkbox.checked = false; // Close the mobile menu
          }
      });
  });
});

