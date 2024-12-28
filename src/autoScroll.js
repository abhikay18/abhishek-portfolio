// autoScroll.js
function createAutoScroll(contactInfoElement, options = {}) {
    const defaultOptions = {
        scrollSpeed: 0.5,
        pauseOnHover: true
    };

    const settings = { ...defaultOptions, ...options };
    let scrollPosition = 0;
    let isPaused = false;
    let animationFrameId;

    // Create wrapper for the list content
    const contentWrapper = document.createElement('div');
    // Move the ul element to the wrapper
    const ulElement = contactInfoElement.querySelector('ul');
    contentWrapper.appendChild(ulElement);
    contactInfoElement.appendChild(contentWrapper);

    // Set container styles
    contactInfoElement.style.overflow = 'hidden';
    contactInfoElement.style.height = '300px'; // Adjust this value as needed

    function scroll() {
        if (!isPaused) {
            // Reset scroll position when reaching the bottom
            if (scrollPosition >= contentWrapper.scrollHeight - contactInfoElement.clientHeight) {
                scrollPosition = 0;
            }
            
            scrollPosition += settings.scrollSpeed;
            contactInfoElement.scrollTop = scrollPosition;
        }
        animationFrameId = requestAnimationFrame(scroll);
    }

    function handleMouseEnter() {
        if (settings.pauseOnHover) {
            isPaused = true;
        }
    }

    function handleMouseLeave() {
        if (settings.pauseOnHover) {
            isPaused = false;
        }
    }

    // Add event listeners
    if (settings.pauseOnHover) {
        contactInfoElement.addEventListener('mouseenter', handleMouseEnter);
        contactInfoElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Start scrolling
    scroll();

    // Return cleanup function
    return function cleanup() {
        if (settings.pauseOnHover) {
            contactInfoElement.removeEventListener('mouseenter', handleMouseEnter);
            contactInfoElement.removeEventListener('mouseleave', handleMouseLeave);
        }
        cancelAnimationFrame(animationFrameId);
    };
}

export { createAutoScroll };