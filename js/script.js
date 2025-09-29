// Global variables
let currentDate = new Date();
let currentMonth = 8; // September (0-indexed)
let currentYear = 2025;

// Sample data for the data table
const userData = [
    {
        id: 1,
        name: "Malinga Darshana",
        username: "mali201",
        date: "Mon 13 Sep",
        checkIn: "09:34 AM",
        checkOut: "-",
        totalHours: "17.3 h",
        status: "active",
        role: "Admin",
        amount: "£20.50",
        hourlyRating: "£08.50",
        avatar: "MD"
    },
    {
        id: 2,
        name: "Alex Jay",
        username: "alex#21",
        date: "Mon 13 Sep",
        checkIn: "-",
        checkOut: "-",
        totalHours: "27.3 h",
        status: "inactive",
        role: "User",
        amount: "£10.50",
        hourlyRating: "£07.90",
        avatar: "AJ"
    },
    {
        id: 3,
        name: "Nipun Lakmal",
        username: "nipun200",
        date: "Mon 14 Sep",
        checkIn: "09:34 AM",
        checkOut: "-",
        totalHours: "13.3 h",
        status: "active",
        role: "User",
        amount: "£33.00",
        hourlyRating: "£08.50",
        avatar: "NL"
    },
    {
        id: 4,
        name: "Nipun Lakmal",
        username: "mali201",
        date: "Mon 14 Sep",
        checkIn: "-",
        checkOut: "-",
        totalHours: "15.3 h",
        status: "pending",
        role: "User",
        amount: "£13.00",
        hourlyRating: "£07.50",
        avatar: "NL"
    },
    {
        id: 5,
        name: "Malinga Darshana",
        username: "mali201",
        date: "Mon 13 Sep",
        checkIn: "09:34 AM",
        checkOut: "-",
        totalHours: "17.3 h",
        status: "active",
        role: "Admin",
        amount: "£20.50",
        hourlyRating: "£08.50",
        avatar: "MD"
    },
    {
        id: 6,
        name: "Alex Jay",
        username: "alex#21",
        date: "Mon 13 Sep",
        checkIn: "-",
        checkOut: "-",
        totalHours: "27.3 h",
        status: "inactive",
        role: "User",
        amount: "£10.50",
        hourlyRating: "£07.90",
        avatar: "AJ"
    },
    {
        id: 7,
        name: "Nipun Lakmal",
        username: "nipun200",
        date: "Mon 14 Sep",
        checkIn: "09:34 AM",
        checkOut: "-",
        totalHours: "13.3 h",
        status: "active",
        role: "User",
        amount: "£33.00",
        hourlyRating: "£08.50",
        avatar: "NL"
    },
    {
        id: 8,
        name: "Nipun Lakmal",
        username: "mali201",
        date: "Mon 14 Sep",
        checkIn: "-",
        checkOut: "-",
        totalHours: "15.3 h",
        status: "pending",
        role: "User",
        amount: "£13.00",
        hourlyRating: "£07.50",
        avatar: "NL"
    },
    {
        id: 9,
        name: "Malinga Darshana",
        username: "mali201",
        date: "Mon 13 Sep",
        checkIn: "09:34 AM",
        checkOut: "-",
        totalHours: "17.3 h",
        status: "active",
        role: "Admin",
        amount: "£20.50",
        hourlyRating: "£08.50",
        avatar: "MD"
    },
    {
        id: 10,
        name: "Alex Jay",
        username: "alex#21",
        date: "Mon 13 Sep",
        checkIn: "-",
        checkOut: "-",
        totalHours: "27.3 h",
        status: "inactive",
        role: "User",
        amount: "£10.50",
        hourlyRating: "£07.90",
        avatar: "AJ"
    }
];

// Pagination and filtering variables
let currentPage = 1;
let itemsPerPage = 10;
let filteredData = [...userData];
let filters = {
    search: '',
    role: '',
    status: '',
    date: ''
};

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
    initializeDataTable();
    addEventListeners();
    
    // Only initialize calendar if on main page
    if (document.getElementById('calendarDays')) {
        generateCalendar();
        initializeStats();
    }
});

// Data table initialization
function initializeDataTable() {
    if (!document.getElementById('tableBody')) return;
    
    renderTable();
    updatePagination();
}

// Render table with current data
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    pageData.forEach(user => {
        const row = createTableRow(user);
        tableBody.appendChild(row);
    });
}

// Create table row
function createTableRow(user) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <div class="user-profile">
                <div class="user-avatar">
                    <span>${user.avatar}</span>
                </div>
                <span class="user-name">${user.name}</span>
            </div>
        </td>
        <td>${user.username}</td>
        <td>${user.date}</td>
        <td>
            <div class="time-container">
                <span class="time-display ${user.checkIn !== '-' ? 'has-time' : ''}">${user.checkIn}</span>
                ${user.checkIn !== '-' ? '<img src="../assets/clock.png" alt="Clock" class="clock-icon">' : ''}
            </div>
        </td>
        <td>
            <span class="time-display ${user.checkOut !== '-' ? 'has-time' : ''}">${user.checkOut}</span>
        </td>
        <td>
            <span class="hours-display">${user.totalHours}</span>
        </td>
        <td>
            <span class="status-badge ${user.status}">${user.status}</span>
        </td>
        <td>
            <span class="role-display">${user.role}</span>
        </td>
        <td>
            <span class="amount-display">${user.amount}</span>
        </td>
        <td>
            <span class="rating-display">${user.hourlyRating}</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view-btn" title="View Details">
                    <img src="../assets/view details.png" alt="View Details" class="action-icon">
                </button>
                <button class="action-btn chart-btn" title="View Chart">
                    <i class="fas fa-chart-line"></i>
                </button>
                <button class="action-btn location-btn" title="View Location">
                    <img src="../assets/map-pin-line.svg" alt="View Location" class="action-icon">
                </button>
                <button class="action-btn message-btn" title="Send Message">
                    <i class="far fa-comment"></i>
                </button>
                <button class="action-btn edit-btn" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="action-btn delete-btn" title="Delete" onclick="deleteUser(${user.id})">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Apply filters
function applyFilters() {
    filteredData = userData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            user.username.toLowerCase().includes(filters.search.toLowerCase());
        const matchesRole = !filters.role || user.role.toLowerCase() === filters.role.toLowerCase();
        const matchesStatus = !filters.status || user.status.toLowerCase() === filters.status.toLowerCase();
        const matchesDate = !filters.date || user.date.includes(filters.date);
        
        return matchesSearch && matchesRole && matchesStatus && matchesDate;
    });
    
    currentPage = 1; // Reset to first page
    renderTable();
    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageInfo = document.querySelector('.page-info');
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (pageInfo) {
        pageInfo.textContent = `${currentPage} of ${totalPages} pages`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

// Delete user function
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(user => user.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            applyFilters(); // Refresh the table
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const closeBtn = document.getElementById('closeBtn');

    if (hamburgerMenu && sidebar && mainContent) {
        hamburgerMenu.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            mainContent.classList.toggle('sidebar-open');
        });
    }

    if (closeBtn && sidebar && mainContent) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar && hamburgerMenu && 
            !sidebar.contains(event.target) && 
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

// Event listeners for data table page
function addEventListeners() {
    // Search filter
    const searchInput = document.querySelector('.filter-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filters.search = this.value;
            applyFilters();
        });
    }
    
    // Role filter
    const roleSelect = document.querySelector('.filter-dropdown:nth-child(1) .filter-select');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            filters.role = this.value;
            applyFilters();
        });
    }
    
    // Status filter
    const statusSelect = document.querySelector('.filter-dropdown:nth-child(2) .filter-select');
    if (statusSelect) {
        statusSelect.addEventListener('change', function() {
            filters.status = this.value;
            applyFilters();
        });
    }
    
    // Date filter
    const dateSelect = document.querySelector('.filter-dropdown:nth-child(3) .filter-select');
    if (dateSelect) {
        dateSelect.addEventListener('change', function() {
            filters.date = this.value;
            applyFilters();
        });
    }
    
    // Per page select
    const perPageSelect = document.querySelector('.per-page-select');
    if (perPageSelect) {
        perPageSelect.addEventListener('change', function() {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderTable();
            updatePagination();
        });
    }
    
    // Pagination buttons
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                updatePagination();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
                updatePagination();
            }
        });
    }
    
    // Action buttons in filters
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('Notifications feature coming soon!');
        });
    }
    
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportTableData();
        });
    }
    
    const addUserBtn = document.querySelector('.add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            showAddUserModal();
        });
    }

    // Calendar-specific event listeners (only if calendar exists)
    if (document.querySelector('.view-btn')) {
        const viewBtns = document.querySelectorAll('.view-btn:not(.action-btn)');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Search functionality for navbar
    const navSearchInput = document.querySelector('.search-input');
    if (navSearchInput) {
        navSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Navbar searching for:', searchTerm);
        });
    }
}

// Export table data
function exportTableData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Username,Date,Check-in,Check-out,Total Hours,Status,Role,Amount,Hourly Rating\n"
        + filteredData.map(user => 
            `"${user.name}","${user.username}","${user.date}","${user.checkIn}","${user.checkOut}","${user.totalHours}","${user.status}","${user.role}","${user.amount}","${user.hourlyRating}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show add user modal
function showAddUserModal() {
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
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        max-height: 80vh;
        overflow-y: auto;
    `;

    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: #111827; font-size: 1.25rem;">Add New User</h3>
        <form id="addUserForm">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Name</label>
                    <input type="text" id="userName" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Username</label>
                    <input type="text" id="userUsername" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Role</label>
                    <select id="userRole" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Status</label>
                    <select id="userStatus" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Amount</label>
                    <input type="text" id="userAmount" placeholder="£0.00" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Hourly Rating</label>
                    <input type="text" id="userHourlyRating" placeholder="£0.00" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem;">
                </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" id="cancelUserBtn" style="padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 0.75rem 1.5rem; border: none; background: #335ae6; color: white; border-radius: 6px; cursor: pointer;">Add User</button>
            </div>
        </form>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Event listeners for modal
    document.getElementById('cancelUserBtn').addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newUser = {
            id: userData.length + 1,
            name: document.getElementById('userName').value,
            username: document.getElementById('userUsername').value,
            date: "Mon " + new Date().getDate() + " Sep",
            checkIn: "-",
            checkOut: "-",
            totalHours: "0.0 h",
            status: document.getElementById('userStatus').value,
            role: document.getElementById('userRole').value,
            amount: document.getElementById('userAmount').value,
            hourlyRating: document.getElementById('userHourlyRating').value,
            avatar: document.getElementById('userName').value.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        
        userData.push(newUser);
        applyFilters(); // Refresh the table
        document.body.removeChild(modalOverlay);
    });

    // Focus on the first input
    document.getElementById('userName').focus();
}

// Calendar generation (for main dashboard)
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Update month display
    const currentMonthElement = document.querySelector('.current-month');
    if (currentMonthElement) {
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

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

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        if (sidebar && mainContent) {
            sidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
        }
    }
});

// Export functions for potential use
window.starParkingApp = {
    userData,
    filteredData,
    applyFilters,
    renderTable,
    deleteUser,
    exportTableData,
    showAddUserModal
};
