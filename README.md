# EventHub - Event Registration Management System

A modern, responsive event registration management system with full CRUD functionality built with Bootstrap 5 and vanilla JavaScript.

## Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **CRUD Operations** - Create, Read, Update, and Delete event registrations
- **Real-time Updates** - Instant updates to the UI when managing registrations
- **Status Tracking** - Track event status (Registered, Attended, Cancelled)
- **Modern UI** - Clean, professional design with Bootstrap 5
- **Interactive Dashboard** - Manage all registrations from a single interface

## Color Scheme

- Primary Color: `#ffd60a` (Yellow) - Navbar, Footer, Sections
- Secondary Color: `#b0c4b1` (Sage Green) - Hover effects, Accents
- Background: White for cards and content areas
- Text: Dark/Black for optimal readability

## File Structure

```
event-registration-system/
├── index.html          # Main HTML file with all sections
├── app.js             # JavaScript file with CRUD operations
├── db.json            # JSON Server database file
└── README.md          # This file
```

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) installed (v14 or higher)
- npm (comes with Node.js)

## Installation & Setup

### Step 1: Install JSON Server

Open your terminal and install JSON Server globally:

```bash
npm install -g json-server
```

### Step 2: Navigate to Project Directory

```bash
cd path/to/event-registration-system
```

### Step 3: Start JSON Server

Run the following command to start the JSON Server:

```bash
json-server --watch db.json --port 3000
```

You should see output similar to:

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3000/registrations

Home
http://localhost:3000
```

### Step 4: Open the Application

Open `index.html` in your web browser. You can:

- Double-click the `index.html` file, or
- Use a local development server like Live Server (VS Code extension), or
- Simply drag and drop the file into your browser

## Usage Guide

### Adding a Registration

1. Navigate to the Dashboard section
2. Fill in the registration form:
   - Event Name (e.g., "Tech Conference 2026")
   - Category (e.g., "Conference", "Workshop", "Webinar", "Seminar")
   - Date (select from date picker)
   - Status (select from dropdown)
3. Click "Add Registration"

### Editing a Registration

1. In the "All Registrations" table, click the "Edit" button on any registration
2. The form will populate with the registration data
3. Modify the desired fields
4. Click "Update Registration"

### Deleting a Registration

1. In the "All Registrations" table, click the "Delete" button
2. Confirm the deletion in the popup dialog
3. The registration will be removed immediately

### Viewing Registrations

- **Recent Registrations Section**: Displays the 6 most recent registrations as cards
- **Dashboard Table**: Shows all registrations in a sortable table format

## API Endpoints

The application uses the following API endpoint:

- **GET** `/registrations` - Fetch all registrations
- **POST** `/registrations` - Create a new registration
- **PUT** `/registrations/:id` - Update a registration
- **DELETE** `/registrations/:id` - Delete a registration

Base URL: `http://localhost:3000`

## Technologies Used

- **HTML5** - Semantic markup
- **Bootstrap 5.3.0** - CSS framework (no custom CSS)
- **Bootstrap Icons** - Icon library
- **Vanilla JavaScript** - Client-side functionality
- **JSON Server** - RESTful API backend
- **Fetch API** - HTTP requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### JSON Server not starting

- Make sure Node.js is installed: `node --version`
- Reinstall JSON Server: `npm install -g json-server`
- Check if port 3000 is already in use

### Data not loading

- Verify JSON Server is running on port 3000
- Check browser console for errors (F12)
- Ensure `db.json` exists in the project directory

### Form not submitting

- Check that all required fields are filled
- Verify JSON Server is running
- Check network tab in browser developer tools

## Customization

### Changing Colors

Update the inline styles in `index.html`:
- Navbar background: `style="background-color: #ffd60a;"`
- Hover effects are handled in `app.js`

### Adding More Fields

1. Add input fields to the form in `index.html`
2. Update the `handleSubmit` function in `app.js`
3. Modify the `displayRegistrationsTable` function to show new fields
4. Update `db.json` structure with new fields

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check:
- Browser console for JavaScript errors
- JSON Server terminal output for API errors
- Network tab in browser DevTools for failed requests

---

**EventHub** - Seamless Event Registration Management