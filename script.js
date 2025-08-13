// Global variables
let currentDate = new Date();
let currentMonth = 8; // September (0-indexed)
let currentYear = 2025;


// FullCalendar events data
const fullCalendarEvents = [
    { title: 'Tim David', start: '2025-09-30', color: '#4f46e5' },
    { title: 'Alex Jay', start: '2025-09-08', color: '#4f46e5' },
    { title: 'James S', start: '2025-09-11', color: '#4f46e5' },
    { title: 'D.Jhon', start: '2025-09-17', color: '#4f46e5' },
    { title: 'Vikey Ballard', start: '2025-09-21', color: '#4f46e5' },
    { title: 'Alex Jay', start: '2025-09-24', color: '#4f46e5' },
    { title: 'Alex Jay', start: '2025-09-24', color: '#4f46e5' }
];

// Initialize the application

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFullCalendar();
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


// FullCalendar initialization
function initializeFullCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: false,
        events: fullCalendarEvents,
        firstDay: 1, // Monday
        height: 'auto',
        fixedWeekCount: false,
        displayEventTime: false,
        eventDisplay: 'block',
        dayMaxEvents: true,
        datesSet: function(info) {
            // Update custom month label
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            document.getElementById('fcCurrentMonth').textContent = `${monthNames[info.start.getMonth()]} ${info.start.getFullYear()}`;
        },
        eventContent: function(arg) {
            // Custom event rendering to match design
            return {
                html: `<div class="fc-event-custom">${arg.event.title}</div>`
            };
        }
    });
    calendar.render();
    // Store instance for modal event addition
    calendarEl._fullCalendarInstance = calendar;

    // Custom view buttons
    document.getElementById('fcMonthBtn').onclick = function() {
        calendar.changeView('dayGridMonth');
        setActiveViewBtn(this);
    };
    document.getElementById('fcWeekBtn').onclick = function() {
        calendar.changeView('timeGridWeek');
        setActiveViewBtn(this);
    };
    document.getElementById('fcDayBtn').onclick = function() {
        calendar.changeView('timeGridDay');
        setActiveViewBtn(this);
    };
    document.getElementById('fcListBtn').onclick = function() {
        calendar.changeView('listMonth');
        setActiveViewBtn(this);
    };
}

function setActiveViewBtn(activeBtn) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
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


// Modal for adding events to FullCalendar
function showAddEventModal() {
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
        // Add event to FullCalendar
        const calendarEl = document.getElementById('calendar');
        const calendar = calendarEl._fullCalendarInstance;
        if (calendar) {
            calendar.addEvent({
                title: eventName,
                start: eventDate,
                color: '#4f46e5'
            });
        }
        document.body.removeChild(modalOverlay);
    });

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
