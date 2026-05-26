const DEFAULT_ADMIN = {
    email: 'admin@ymmo.fr',
    password: 'Admin1234',
    name: 'Administrateur',
    role: 'admin'
};
const USERS_STORAGE_KEY = 'ymmo_users';
const CURRENT_USER_STORAGE_KEY = 'ymmo_current_user';
function parseJson(value, defaultValue) {
    if (!value)
        return defaultValue;
    try {
        return JSON.parse(value);
    }
    catch {
        return defaultValue;
    }
}
export function getStoredUsers() {
    const users = parseJson(window.localStorage.getItem(USERS_STORAGE_KEY), []);
    const hasAdmin = users.some((user) => user.email.toLowerCase() === DEFAULT_ADMIN.email);
    if (!hasAdmin) {
        const updated = [...users, DEFAULT_ADMIN];
        saveStoredUsers(updated);
        return updated;
    }
    return users.map((user) => ({ ...user, role: user.role ?? 'user' }));
}
export function saveStoredUsers(users) {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}
export function getCurrentUser() {
    return parseJson(window.localStorage.getItem(CURRENT_USER_STORAGE_KEY), null);
}
export function saveCurrentUser(user) {
    if (user) {
        window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    }
    else {
        window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
}
export function registerUser(email, name, password) {
    const users = getStoredUsers();
    if (!email.trim() || !name.trim() || !password) {
        return { success: false, message: 'Tous les champs sont requis.' };
    }
    const normalizedEmail = email.trim().toLowerCase();
    const exists = users.some((item) => item.email.toLowerCase() === normalizedEmail);
    if (exists) {
        return { success: false, message: 'Cet e-mail est déjà utilisé.' };
    }
    const newUser = {
        email: normalizedEmail,
        name: name.trim(),
        password,
        role: 'user',
    };
    users.push(newUser);
    saveStoredUsers(users);
    const authUser = { email: newUser.email, name: newUser.name, role: newUser.role };
    saveCurrentUser(authUser);
    return {
        success: true,
        message: 'Inscription réussie. Vous êtes connecté.',
        user: authUser,
    };
}
export function loginUser(email, password) {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((item) => item.email.toLowerCase() === normalizedEmail && item.password === password);
    if (!user) {
        return { success: false, message: 'E-mail ou mot de passe invalide.' };
    }
    const authUser = { email: user.email, name: user.name, role: user.role ?? 'user' };
    saveCurrentUser(authUser);
    return {
        success: true,
        message: 'Connexion réussie.',
        user: authUser,
    };
}
export function logoutUser() {
    saveCurrentUser(null);
}
