/**
 * Star Parking Component System
 * Handles loading and managing reusable components
 */
class ComponentManager {
    constructor() {
        this.loadedComponents = new Map();
        this.currentPage = this.getCurrentPageName();
        this.initializeComponents();
    }

    /**
     * Initialize components with inline HTML to avoid fetch issues
     */
    initializeComponents() {
        // Navbar component HTML
        this.loadedComponents.set('navbar', `
            <nav class="navbar">
                <div class="nav-left">
                    <button class="hamburger-menu" id="hamburgerMenu">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="logo" onclick="window.location.href='${this.getBasePath()}index.html'" style="cursor: pointer;">Star Parking Ltd.</div>
                </div>
                <div class="nav-center">
                    <div class="search-container">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search" class="search-input">
                    </div>
                </div>
                <div class="nav-right">
                    <a href="${this.getBasePath()}pages/home.html" class="nav-link" data-page="home">Home</a>
                    <a href="${this.getBasePath()}pages/activities.html" class="nav-link" data-page="activities">Activities</a>
                    <a href="${this.getBasePath()}pages/history.html" class="nav-link" data-page="history">History</a>
                    <a href="${this.getBasePath()}pages/payout.html" class="nav-link" data-page="payout">Payout</a>
                    <a href="#" class="nav-link">Contact us</a>
                    <button class="export-btn-nav">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
                <button class="close-btn" id="closeBtn">
                    <i class="fas fa-times"></i>
                </button>
            </nav>
        `);

        // Sidebar component HTML
        this.loadedComponents.set('sidebar', `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h3>Star Parking Ltd.</h3>
                </div>
                <nav class="sidebar-nav">
                    <a href="${this.getBasePath()}index.html" class="sidebar-link" data-page="home">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="${this.getBasePath()}pages/home2.html" class="sidebar-link" data-page="home2">
                        <i class="fas fa-home"></i>
                        <span>Home2</span>
                    </a>
                    <a href="${this.getBasePath()}pages/driver-profile.html" class="sidebar-link" data-page="driver-profile">
                        <i class="fas fa-user"></i>
                        <span>Driver Profile</span>
                    </a>
                    <a href="${this.getBasePath()}pages/activities.html" class="sidebar-link" data-page="activities">
                        <i class="fas fa-chart-line"></i>
                        <span>Activities</span>
                    </a>
                    <a href="${this.getBasePath()}pages/analysis.html" class="sidebar-link" data-page="analysis">
                        <i class="fas fa-analytics"></i>
                        <span>Analysis</span>
                    </a>
                    <a href="${this.getBasePath()}pages/budget.html" class="sidebar-link" data-page="budget">
                        <i class="fas fa-wallet"></i>
                        <span>Budget</span>
                    </a>
                    <a href="${this.getBasePath()}pages/history.html" class="sidebar-link" data-page="history">
                        <i class="fas fa-history"></i>
                        <span>History</span>
                    </a>
                    <a href="${this.getBasePath()}pages/notification.html" class="sidebar-link" data-page="notification">
                        <i class="fas fa-bell"></i>
                        <span>Notifications</span>
                    </a>
                    <a href="${this.getBasePath()}pages/payout.html" class="sidebar-link" data-page="payout">
                        <i class="fas fa-money-bill"></i>
                        <span>Payout</span>
                    </a>
                    <a href="${this.getBasePath()}pages/salary.html" class="sidebar-link" data-page="salary">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Salary</span>
                    </a>
                    <a href="${this.getBasePath()}pages/salary2.html" class="sidebar-link" data-page="salary2">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Salary 2</span>
                    </a>
                    <a href="${this.getBasePath()}pages/export.html" class="sidebar-link" data-page="export">
                        <i class="fas fa-download"></i>
                        <span>Export</span>
                    </a>
                    <a href="${this.getBasePath()}pages/salary-deduction.html" class="sidebar-link" data-page="salary-deduction">
                        <i class="fas fa-minus-circle"></i>
                        <span>Salary Deduction</span>
                    </a>
                    <a href="${this.getBasePath()}pages/salary-deduction2.html" class="sidebar-link" data-page="salary-deduction2">
                        <i class="fas fa-minus-circle"></i>
                        <span>Salary Deduction 2</span>
                    </a>
                    <a href="${this.getBasePath()}pages/id.html" class="sidebar-link" data-page="id">
                        <i class="fas fa-id-card"></i>
                        <span>ID</span>
                    </a>
                    <a href="${this.getBasePath()}pages/details.html" class="sidebar-link" data-page="details">
                        <i class="fas fa-info-circle"></i>
                        <span>Details</span>
                    </a>
                    <a href="#" class="sidebar-link">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>
        `);
    }

    /**
     * Load a component by name
     * @param {string} componentName - Name of the component
     * @param {string} targetSelector - CSS selector where to inject the component
     */
    loadComponent(componentName, targetSelector) {
        try {
            const component = this.loadedComponents.get(componentName);
            if (!component) {
                throw new Error(`Component '${componentName}' not found`);
            }
            
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = component;
                console.log(`Component '${componentName}' loaded successfully`);
            } else {
                console.error(`Target element '${targetSelector}' not found`);
            }
        } catch (error) {
            console.error(`Error loading component '${componentName}':`, error);
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = `<div class="component-error">Failed to load ${componentName}</div>`;
            }
        }
    }

    /**
     * Load multiple components
     * @param {Array} components - Array of {name, target} objects
     */
    loadComponents(components) {
        components.forEach(component => {
            this.loadComponent(component.name, component.target);
        });
        
        // Initialize navigation after components are loaded
        setTimeout(() => {
            this.initializeNavigation();
        }, 100);
    }

    /**
     * Get current page name from URL
     */
    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        
        if (fileName === '' || fileName === 'index.html') {
            return 'home';
        }
        
        return fileName.replace('.html', '');
    }

    /**
     * Get the base path for navigation links
     */
    getBasePath() {
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        return isInPagesFolder ? '../' : '';
    }

    /**
     * Initialize navigation and active states
     */
    initializeNavigation() {
        // Set active states for navigation links
        this.setActiveNavigation();
        
        // Initialize sidebar toggle
        this.initializeSidebarToggle();
        
        // Initialize search functionality
        this.initializeSearch();
    }

    /**
     * Set active states for navigation based on current page
     */
    setActiveNavigation() {
        // Remove all active classes
        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page links
        document.querySelectorAll(`[data-page="${this.currentPage}"]`).forEach(link => {
            link.classList.add('active');
        });
    }

    /**
     * Initialize sidebar toggle functionality
     */
    initializeSidebarToggle() {
        // Use a small delay to ensure elements are rendered
        setTimeout(() => {
            const hamburgerMenu = document.getElementById('hamburgerMenu');
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.querySelector('.main-content');
            const closeBtn = document.getElementById('closeBtn');

            if (hamburgerMenu && sidebar) {
                hamburgerMenu.addEventListener('click', (e) => {
                    e.preventDefault();
                    sidebar.classList.toggle('open');
                    if (mainContent) {
                        mainContent.classList.toggle('sidebar-open');
                    }
                });
            }

            if (closeBtn && sidebar) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    sidebar.classList.remove('open');
                    if (mainContent) {
                        mainContent.classList.remove('sidebar-open');
                    }
                });
            }

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (sidebar && sidebar.classList.contains('open')) {
                    if (!sidebar.contains(e.target) && 
                        !hamburgerMenu?.contains(e.target)) {
                        sidebar.classList.remove('open');
                        if (mainContent) {
                            mainContent.classList.remove('sidebar-open');
                        }
                    }
                }
            });
        }, 100);
    }

    /**
     * Initialize search functionality
     */
    initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                console.log('Search query:', query);
                // Implement search functionality here
            });
        }
    }

    /**
     * Show loading state
     */
    showLoading(targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = '<div class="loading">Loading...</div>';
        }
    }

    /**
     * Utility method to update page title
     */
    updatePageTitle(title) {
        document.title = `${title} - Star Parking Ltd.`;
    }
}

// Global instance
window.componentManager = new ComponentManager();

// Auto-load common components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const commonComponents = [
        { name: 'navbar', target: '#navbar-container' },
        { name: 'sidebar', target: '#sidebar-container' }
    ];
    
    window.componentManager.loadComponents(commonComponents);
    
    // Trigger custom event to notify page-specific scripts
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('componentsLoaded', {
            detail: { success: true, components: commonComponents }
        }));
    }, 200);
});