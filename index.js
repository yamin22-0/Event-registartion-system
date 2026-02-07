const API_URL = 'http://localhost:3000/registrations';

let editMode = false;
let currentEditId = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchRegistrations();
    
    document.getElementById('registrationForm').addEventListener('submit', handleSubmit);
});

async function fetchRegistrations() {
    try {
        const response = await fetch(API_URL);
        const registrations = await response.json();
        displayRegistrationsTable(registrations);
        displayRegistrationsCards(registrations);
    } catch (error) {
        console.error('Error fetching registrations:', error);
    }
}

function displayRegistrationsTable(registrations) {
    const tableBody = document.getElementById('registrationsTable');
    tableBody.innerHTML = '';
    
    registrations.forEach(registration => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="align-middle">${registration.eventName}</td>
            <td class="align-middle">${registration.category}</td>
            <td class="align-middle">${formatDate(registration.date)}</td>
            <td class="align-middle">${getStatusBadge(registration.status)}</td>
            <td class="align-middle">
                <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${registration.id}">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${registration.id}">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    attachEventListeners();
}

function displayRegistrationsCards(registrations) {
    const cardsContainer = document.getElementById('registrationsCards');
    cardsContainer.innerHTML = '';
    
    const recentRegistrations = registrations.slice(0, 6);
    
    recentRegistrations.forEach(registration => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-md rounded-4">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold mb-3">${registration.eventName}</h5>
                    <p class="card-text mb-2">
                        <i class="bi bi-tag-fill me-2 text-dark"></i>
                        <span class="fw-semibold">Category:</span> ${registration.category}
                    </p>
                    <p class="card-text mb-3">
                        <i class="bi bi-calendar-date me-2 text-dark"></i>
                        <span class="fw-semibold">Date:</span> ${formatDate(registration.date)}
                    </p>
                    <div class="mb-3">${getStatusBadge(registration.status)}</div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(col);
    });
}

function getStatusBadge(status) {
    let badgeClass = '';
    switch(status) {
        case 'Attended':
            badgeClass = 'bg-success';
            break;
        case 'Registered':
            badgeClass = 'bg-primary';
            break;
        case 'Cancelled':
            badgeClass = 'bg-danger';
            break;
        default:
            badgeClass = 'bg-secondary';
    }
    return `<span class="badge ${badgeClass} rounded-pill px-3 py-2">${status}</span>`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const registration = {
        eventName: document.getElementById('eventName').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        status: document.getElementById('status').value
    };
    
    if (editMode) {
        await updateRegistration(currentEditId, registration);
    } else {
        await createRegistration(registration);
    }
}

async function createRegistration(registration) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration)
        });
        
        if (response.ok) {
            resetForm();
            fetchRegistrations();
        }
    } catch (error) {
        console.error('Error creating registration:', error);
    }
}

async function updateRegistration(id, registration) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration)
        });
        
        if (response.ok) {
            resetForm();
            fetchRegistrations();
        }
    } catch (error) {
        console.error('Error updating registration:', error);
    }
}

async function editRegistration(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const registration = await response.json();
        
        document.getElementById('eventName').value = registration.eventName;
        document.getElementById('category').value = registration.category;
        document.getElementById('date').value = registration.date;
        document.getElementById('status').value = registration.status;
        
        editMode = true;
        currentEditId = id;
        
        document.getElementById('formTitle').textContent = 'Update Registration';
        document.getElementById('submitBtn').textContent = 'Update Registration';
        document.getElementById('submitBtn').classList.remove('btn-dark');
        document.getElementById('submitBtn').classList.add('btn-warning');
        
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching registration for edit:', error);
    }
}

async function deleteRegistration(id) {
    if (confirm('Are you sure you want to delete this registration?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                fetchRegistrations();
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    }
}

function resetForm() {
    document.getElementById('registrationForm').reset();
    editMode = false;
    currentEditId = null;
    
    document.getElementById('formTitle').textContent = 'Add New Registration';
    document.getElementById('submitBtn').textContent = 'Add Registration';
    document.getElementById('submitBtn').classList.remove('btn-warning');
    document.getElementById('submitBtn').classList.add('btn-dark');
}

function attachEventListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            editRegistration(id);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            deleteRegistration(id);
        });
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#b0c4b1';
        e.target.style.borderRadius = '8px';
        e.target.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = 'transparent';
    });
});

const featureCards = document.querySelectorAll('#features .card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        e.currentTarget.style.backgroundColor = '#b0c4b1';
        e.currentTarget.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', (e) => {
        e.currentTarget.style.backgroundColor = 'white';
    });
});