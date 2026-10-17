// DOM Elements
const navLoginBtn = document.getElementById('navLoginBtn');
const navUserMenu = document.getElementById('navUserMenu');
const navUsername = document.getElementById('navUsername');
const accountDropdown = document.getElementById('accountDropdown');
const loginModal = document.getElementById('loginModal');
const loginError = document.getElementById('loginError');
const accountUserDisplay = document.getElementById('accountUserDisplay');
const toastEl = document.getElementById('toast');

// Initialize State
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

// Update UI based on session
function updateAuthUI() {
    const user = Auth.getCurrentUser();
    if (user) {
        navLoginBtn.style.display = 'none';
        navUserMenu.style.display = 'block';
        navUsername.textContent = user;
        if (accountUserDisplay) {
            accountUserDisplay.textContent = user;
        }
    } else {
        navLoginBtn.style.display = 'block';
        navUserMenu.style.display = 'none';
        // If logged out and on account page, switch to home
        const activeTab = document.querySelector('.tab-pane.active');
        if (activeTab && activeTab.id === 'section-account') {
            switchTab('home');
        }
    }
}

// Tab Switching
function switchTab(tabId) {
    if (tabId === 'account' && !Auth.isLoggedIn()) {
        openLoginModal();
        showToast("Please login to access account downloads.");
        return;
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === tabId) {
            btn.classList.add('active');
        }
    });

    // Hide dropdown if open
    closeDropdown();

    // Show tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    const target = document.getElementById('section-' + tabId);
    if (target) {
        target.classList.add('active');
    }
}

// Dropdown
function toggleDropdown() {
    accountDropdown.classList.toggle('show');
}

function closeDropdown() {
    if (accountDropdown.classList.contains('show')) {
        accountDropdown.classList.remove('show');
    }
}

// Window click listener to close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        closeDropdown();
    }
});

// Modal Actions
function openLoginModal() {
    loginError.textContent = '';
    loginModal.classList.add('active');
    setTimeout(() => document.getElementById('loginUser').focus(), 100);
}

function closeLoginModal() {
    loginModal.classList.remove('active');
    document.getElementById('loginForm').reset();
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    const res = Auth.login(user, pass);
    if (res.success) {
        closeLoginModal();
        updateAuthUI();
        showToast("Welcome back, " + res.user + "!");
        switchTab('account');
    } else {
        loginError.textContent = res.message;
    }
}

// Logout Handler
function logout() {
    Auth.logout();
    updateAuthUI();
    closeDropdown();
    showToast("Successfully logged out.");
    switchTab('home');
}

// Hero button behavior
function handleHeroDownload() {
    if (Auth.isLoggedIn()) {
        switchTab('account');
    } else {
        openLoginModal();
    }
}

// Toast
function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3500);
}
