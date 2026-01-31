// Get the buttons
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

// Track how many times the No button has escaped
let escapeCount = 0;

// Maximum scale for the Yes button (2x original size)
const maxScale = 2;

// Function to move the No button to a random position
function escapeNoButton() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate safe boundaries (keep button fully visible)
    const maxX = viewportWidth - btnWidth - 20;
    const maxY = viewportHeight - btnHeight - 20;
    
    // Generate random position
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    // Apply fixed positioning and move the button
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
    
    // Increment escape count and grow the Yes button
    escapeCount++;
    growYesButton();
}

// Function to make the Yes button grow
function growYesButton() {
    // Calculate new scale (grow by 0.15 each time, max at 2x)
    const newScale = Math.min(1 + (escapeCount * 0.15), maxScale);
    
    // Apply the scale transform
    yesBtn.style.transform = `scale(${newScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';
    
    // Optional: Add a little bounce effect
    yesBtn.style.animation = 'none';
    setTimeout(() => {
        yesBtn.style.animation = '';
    }, 10);
}

// Desktop: Move on hover
noBtn.addEventListener('mouseover', escapeNoButton);

// Mobile: Move on touch attempt
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent the touch from triggering a click
    escapeNoButton();
}, { passive: false });

// Prevent the No button from being clicked
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    escapeNoButton();
});

// Add some fun messages when the No button escapes (optional enhancement)
const messages = [
    "Not so fast! 💨",
    "You can't catch me! 🏃",
    "Think again! 💕",
    "Just say yes! 🥺",
    "Come on... 💖",
    "Wrong button! ❤️"
];

// Change the No button text occasionally
let messageIndex = 0;
noBtn.addEventListener('mouseover', function() {
    if (escapeCount > 2 && escapeCount % 2 === 0) {
        noBtn.textContent = messages[messageIndex % messages.length];
        messageIndex++;
        
        // Reset text after a short delay
        setTimeout(() => {
            noBtn.textContent = 'No';
        }, 1000);
    }
});

// Handle window resize to keep button in bounds
window.addEventListener('resize', function() {
    if (noBtn.style.position === 'fixed') {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        let currentX = parseInt(noBtn.style.left);
        let currentY = parseInt(noBtn.style.top);
        
        // Adjust position if button is outside viewport
        if (currentX + btnWidth > viewportWidth) {
            noBtn.style.left = (viewportWidth - btnWidth - 20) + 'px';
        }
        if (currentY + btnHeight > viewportHeight) {
            noBtn.style.top = (viewportHeight - btnHeight - 20) + 'px';
        }
    }
});
