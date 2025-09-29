# Star Parking Website Development Guide

## 📁 Project Structure

```
star-parking/
├── components/           # Reusable HTML components
│   ├── navbar.html      # Navigation bar component
│   ├── sidebar.html     # Sidebar navigation component
│   └── page-template.html # Base template for new pages
├── pages/               # Individual page files
│   ├── home2.html
│   ├── driver-profile.html
│   ├── activities.html
│   ├── analysis.html
│   ├── budget.html
│   ├── history.html
│   ├── notification.html
│   ├── payout.html
│   ├── salary.html
│   ├── salary2.html
│   ├── export.html
│   ├── salary-deduction.html
│   ├── salary-deduction2.html
│   ├── id.html
│   └── details.html
├── js/                  # JavaScript files
│   ├── components.js    # Component loading system
│   └── script.js        # Page-specific JavaScript
├── css/                 # Stylesheets
│   └── styles.css       # Main stylesheet
├── assets/              # Images and other assets
│   └── map.png
└── index.html           # Main dashboard page
```

## 🚀 Getting Started

1. **Open the project**: Open the root folder in VS Code or your preferred editor
2. **Start a local server**: Use VS Code Live Server extension or any local server
3. **Access the website**: Navigate to `http://localhost:5500` (or your server's URL)

## 🧩 Component System

### How It Works

The website uses a component-based architecture where:

- Navigation and sidebar are loaded dynamically
- Each page automatically loads common components
- Active navigation states are managed automatically
- All functionality is shared across pages

### Key Files:

- **`js/components.js`**: Handles component loading and navigation
- **`components/navbar.html`**: Reusable navigation bar
- **`components/sidebar.html`**: Reusable sidebar navigation

## 📄 Adding New Pages

### Method 1: Copy Existing Page

1. Copy any existing page from `pages/` folder
2. Rename it to your new page name
3. Update the `<title>` tag
4. Modify the dashboard header `<h1>`
5. Replace the content inside `.page-content`

### Method 2: Use Template

1. Copy `components/page-template.html`
2. Replace placeholders:
   - `{{PAGE_TITLE}}` → Your page title
   - `{{PAGE_CONTENT}}` → Your page content HTML
   - `{{ADDITIONAL_SCRIPTS}}` → Any extra script tags (optional)

### Example New Page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Page Name - Star Parking Ltd.</title>
    <link rel="stylesheet" href="../css/styles.css" />
    <!-- ... other head content ... -->
  </head>
  <body>
    <div id="navbar-container"></div>
    <div id="sidebar-container"></div>
    <main class="main-content">
      <div class="dashboard-header">
        <h1>Your Page Name</h1>
      </div>
      <div class="page-content">
        <div class="content-card">
          <h2>Your Content Title</h2>
          <p>Your content here...</p>
        </div>
      </div>
    </main>
    <script src="../js/components.js"></script>
    <script src="../js/script.js"></script>
  </body>
</html>
```

## 🔗 Adding Navigation Links

### Sidebar Navigation

Edit `components/sidebar.html`:

```html
<a
  href="pages/your-new-page.html"
  class="sidebar-link"
  data-page="your-new-page"
>
  <i class="fas fa-your-icon"></i>
  <span>Your Page Name</span>
</a>
```

### Top Navigation

Edit `components/navbar.html`:

```html
<a href="pages/your-new-page.html" class="nav-link" data-page="your-new-page"
  >Your Page</a
>
```

**Important**: The `data-page` attribute should match your page filename (without .html)

## 🎨 Styling Guidelines

### CSS Classes Available:

- `.content-card`: White card container for content
- `.stats-container`: Grid container for stats cards
- `.stat-card`: Individual stat card
- `.profile-container`: Profile layout container
- `.dashboard-header`: Page header styling
- `.page-content`: Main content wrapper

### Adding Custom Styles:

Add your custom CSS to `css/styles.css` at the end of the file.

## 📱 Responsive Design

The website is already responsive with:

- Mobile-first approach
- Flexible grid layouts
- Collapsible navigation
- Touch-friendly buttons

## 🔧 JavaScript Functionality

### Component System Features:

- **Auto-loading**: Components load automatically on page load
- **Active states**: Current page is highlighted in navigation
- **Sidebar toggle**: Mobile-friendly hamburger menu
- **Search functionality**: Built-in search component
- **Error handling**: Graceful fallbacks for missing components

### Adding Page-Specific JavaScript:

1. Add your code to `js/script.js`, or
2. Create a new JS file and include it in your page:

```html
<script src="../js/your-custom-script.js"></script>
```

### Accessing Component Events:

```javascript
// Wait for components to load
window.addEventListener("componentsLoaded", function () {
  // Your code here - components are ready
  console.log("All components loaded!");
});
```

## 🚧 Development Workflow

### Daily Development:

1. **Edit pages**: Modify existing pages in `pages/` folder
2. **Add content**: Use existing CSS classes or add new ones
3. **Test locally**: Use Live Server to test changes
4. **Update navigation**: Add new pages to sidebar/navbar as needed

### Best Practices:

- ✅ Always test on multiple screen sizes
- ✅ Use existing CSS classes when possible
- ✅ Follow the established naming conventions
- ✅ Test navigation between pages
- ✅ Ensure components load properly

### Common Tasks:

#### Adding a Form:

```html
<div class="content-card">
  <h2>Form Title</h2>
  <form class="form-container">
    <div class="form-group">
      <label for="input1">Label:</label>
      <input type="text" id="input1" name="input1" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
```

#### Adding a Data Table:

```html
<div class="content-card">
  <h2>Data Table</h2>
  <div class="table-responsive">
    <table class="data-table">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## 🔍 Troubleshooting

### Components Not Loading:

- Check browser console for errors
- Ensure file paths are correct
- Verify local server is running

### Navigation Not Working:

- Check `data-page` attributes match filenames
- Ensure pages are in the correct folders
- Verify component files exist

### Styling Issues:

- Check CSS file path is correct
- Ensure parent container classes are applied
- Use browser dev tools to debug styles

## 📈 Next Steps

1. **Customize Content**: Replace placeholder content with real data
2. **Add Functionality**: Implement forms, data processing, etc.
3. **Enhance UI**: Add charts, graphs, interactive elements
4. **Add Backend**: Connect to APIs or databases as needed
5. **Optimize**: Minimize CSS/JS, optimize images
6. **Deploy**: Set up hosting and domain

## 🆘 Need Help?

### Quick Fixes:

- **Page not found**: Check file path and spelling
- **Styles not working**: Verify CSS file path
- **Components missing**: Check `components/` folder exists
- **JavaScript errors**: Check browser console

### Resources:

- FontAwesome icons: https://fontawesome.com/icons
- CSS Grid guide: https://css-tricks.com/snippets/css/complete-guide-grid/
- JavaScript events: https://developer.mozilla.org/en-US/docs/Web/Events

---

**Happy Coding! 🚀**

Your Star Parking website is now properly structured and ready for development. Each page will automatically load the navigation components, and you can focus on building the unique content for each page.
