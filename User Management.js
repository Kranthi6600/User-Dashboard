class User {

    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    getDetails() {

        return `${this.name} (${this.role})`;
    }
}


class Admin extends User {
    constructor(name) {
        super(name, 'Admin');
    }
}

class RegisteredUser extends User {
    constructor(name) {
        super(name, 'Registered User');
    }
}

class GuestUser extends User {
    constructor(name) {
        super(name, 'Guest');
    }
}

const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const roleSelect = document.getElementById('role');
const userList = document.getElementById('user-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const role = roleSelect.value;

    if (!name) return;

    let user;

    switch (role) {
        case 'Admin':
            user = new Admin(name);
            break;
        case 'RegisteredUser':
            user = new RegisteredUser(name);
            break;
        case 'GuestUser':
            user = new GuestUser(name);
            break;
        default:
            user = new User(name, role);
    }

    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
  <div class="card-info">
    <strong>${user.name}</strong><br />
    <span class="user-role">${user.role}</span>
  </div>
  <div class="card-actions">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </div>
`;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
    card.remove();
});

    const editBtn = card.querySelector('.edit-btn');
editBtn.addEventListener('click', () => {
  const newName = prompt('Enter new name:', user.name);
  if (!newName) return;

  const newRole = prompt('Enter new role (Admin, RegisteredUser, GuestUser):', user.role);
  if (!['Admin', 'RegisteredUser', 'GuestUser'].includes(newRole)) return alert('Invalid role');

  // Update object (basic version)
  user.name = newName;
  user.role = newRole;

  // Update UI
  card.querySelector('strong').textContent = newName;
  card.querySelector('.user-role').textContent = newRole;
});


    userList.appendChild(card);

    form.reset();
});