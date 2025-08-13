// Global variables
let currentDate = new Date();
let currentMonth = 8; // September (0-indexed)
let currentYear = 2025;

// Calendar events data
const calendarEvents = {
    '2025-09-01': [{ name: 'Tim David', type: 'tim-david' }],
    '2025-09-08': [{ name: 'Alex Jay', type: 'alex-jay' }],
    '2025-09-11': [{ name: 'James S', type: 'james-s' }],
    '2025-09-17': [{ name: 'D Jhon', type: 'd-jhon' }],
    '2025-09-21': [{ name: 'Vikey Beliard', type: 'vikey-beliard' }],
    '2025-09-24': [
        { name: 'Alex Jay', type: 'alex-jay' },
        { name: 'Alex Jay', type: 'alex-jay' }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    generateCalendar();
    initializeFlightMap();
    initializeStats();
    addEventListeners();
});

// Navigation functionality
function initializeNavigation() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const closeBtn = document.getElementById('closeBtn');

    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('sidebar-open');
    });

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && 
            !hamburgerMenu.contains(event.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
        }
    });

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Calendar generation
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Update month display
    document.querySelector('.current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous calendar
    calendarDays.innerHTML = '';

    // Get first day of the month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Add empty cells for days before the first day of the month
    const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Adjust for Monday start
    for (let i = 0; i < startDay; i++) {
        const prevMonthDay = new Date(currentYear, currentMonth, -startDay + i + 1);
        const dayElement = createDayElement(prevMonthDay.getDate(), true);
        calendarDays.appendChild(dayElement);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayElement = createDayElement(day, false, calendarEvents[dateString]);
        calendarDays.appendChild(dayElement);
    }

    // Fill remaining cells
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const dayElement = createDayElement(i, true);
        calendarDays.appendChild(dayElement);
    }
}

function createDayElement(day, otherMonth = false, events = null) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${otherMonth ? 'other-month' : ''} ${events ? 'has-event' : ''}`;
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayElement.appendChild(dayNumber);

    if (events && events.length > 0) {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `calendar-event ${event.type}`;
            eventElement.textContent = event.name;
            dayElement.appendChild(eventElement);
        });
    }

    return dayElement;
}

// Flight map initialization
function initializeFlightMap() {
    const flightMap = document.getElementById('flightMap');
    
    // Add flight icons
    for (let i = 0; i < 8; i++) {
        const flightIcon = document.createElement('div');
        flightIcon.innerHTML = '✈️';
        flightIcon.className = 'flight-icon';
        flightMap.appendChild(flightIcon);
    }

    // Add location pins
    for (let i = 0; i < 12; i++) {
        const locationPin = document.createElement('div');
        locationPin.innerHTML = '📍';
        locationPin.className = 'location-pin';
        flightMap.appendChild(locationPin);
    }

    // Add some city labels
    const cities = [
        { name: 'London', left: '60%', top: '40%' },
        { name: 'Birmingham', left: '35%', top: '30%' },
        { name: 'Oxford', left: '45%', top: '60%' },
        { name: 'Reading', left: '50%', top: '70%' },
        { name: 'Leicester', left: '45%', top: '25%' },
        { name: 'Peterborough', left: '70%', top: '20%' },
        { name: 'Norwich', left: '85%', top: '15%' },
        { name: 'Ipswich', left: '90%', top: '45%' },
        { name: 'Colchester', left: '85%', top: '60%' },
        { name: 'Southend-on-Sea', left: '90%', top: '75%' }
    ];

    cities.forEach(city => {
        const cityLabel = document.createElement('div');
        cityLabel.textContent = city.name;
        cityLabel.style.position = 'absolute';
        cityLabel.style.left = city.left;
        cityLabel.style.top = city.top;
        cityLabel.style.color = '#e5e7eb';
        cityLabel.style.fontSize = '0.75rem';
        cityLabel.style.fontWeight = '500';
        cityLabel.style.transform = 'translate(-50%, -50%)';
        flightMap.appendChild(cityLabel);
    });
}

// Statistics initialization with animation
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        animateCounter(stat, finalValue);
    });
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 20;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = String(finalValue).padStart(2, '0');
            clearInterval(timer);
        } else {
            element.textContent = String(Math.floor(currentValue)).padStart(2, '0');
        }
    }, 50);
}

// Event listeners
function addEventListeners() {
    // View options for calendar
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Calendar navigation (if you want to add month navigation)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            navigateCalendar(-1);
        } else if (e.key === 'ArrowRight') {
            navigateCalendar(1);
        }
    });

    // Add Event button functionality
    const addEventBtn = document.querySelector('.add-event-btn');
    addEventBtn.addEventListener('click', function() {
        showAddEventModal();
    });

    // Close map functionality
    const closeMapBtn = document.querySelector('.close-map-btn');
    closeMapBtn.addEventListener('click', function() {
        const mapSection = document.querySelector('.map-section');
        mapSection.style.display = 'none';
    });

    // Sort dropdown for alerts
    const sortDropdown = document.querySelector('.sort-dropdown');
    sortDropdown.addEventListener('click', function() {
        // Add sorting functionality here
        console.log('Sort alerts');
    });

    // Make calendar days clickable
    document.addEventListener('click', function(e) {
        if (e.target.closest('.calendar-day')) {
            const dayElement = e.target.closest('.calendar-day');
            const dayNumber = dayElement.querySelector('.day-number').textContent;
            console.log(`Clicked on day ${dayNumber}`);
            // Add day click functionality here
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // Add search functionality here
        console.log('Searching for:', searchTerm);
    });
}

// Calendar navigation
function navigateCalendar(direction) {
    currentMonth += direction;
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    generateCalendar();
}

// Modal for adding events
function showAddEventModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    `;

    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #111827;">Add New Event</h3>
        <form id="addEventForm">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Event Name</label>
                <input type="text" id="eventName" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Date</label>
                <input type="date" id="eventDate" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" id="cancelBtn" style="padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 0.75rem 1.5rem; border: none; background: #4f46e5; color: white; border-radius: 6px; cursor: pointer;">Add Event</button>
            </div>
        </form>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Event listeners for modal
    document.getElementById('cancelBtn').addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    document.getElementById('addEventForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        
        // Add event to calendar
        if (!calendarEvents[eventDate]) {
            calendarEvents[eventDate] = [];
        }
        calendarEvents[eventDate].push({
            name: eventName,
            type: 'custom-event'
        });
        
        generateCalendar();
        document.body.removeChild(modalOverlay);
    });

    // Focus on the first input
    document.getElementById('eventName').focus();
}

// Update real-time data (simulate)
function updateRealTimeData() {
    // Simulate random updates to stats
    const stats = [
        { element: document.querySelectorAll('.stat-number')[0], baseValue: 5 },
        { element: document.querySelectorAll('.stat-number')[1], baseValue: 6 },
        { element: document.querySelectorAll('.stat-number')[2], baseValue: 2 }
    ];

    stats.forEach(stat => {
        if (Math.random() > 0.8) { // 20% chance to update
            const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(0, stat.baseValue + variation);
            stat.element.textContent = String(newValue).padStart(2, '0');
        }
    });
}

// Simulate real-time updates
setInterval(updateRealTimeData, 30000); // Update every 30 seconds

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout if needed
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
    }
});

// Add loading animation for initial load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add fade-in animation to main sections
    const sections = document.querySelectorAll('.stat-card, .calendar-section, .widget, .map-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Export functions for potential use
window.starParkingApp = {
    navigateCalendar,
    generateCalendar,
    showAddEventModal,
    updateRealTimeData
};
