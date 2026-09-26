const { store } = require('../db/store');

class User {
  static async findByEmail(email) {
    return store.users.find(u => u.email === email) || null;
  }

  static async findById(id) {
    return store.users.find(u => u.id === id) || null;
  }

  static async create(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      email: userData.email,
      full_name: userData.full_name || 'Staff Member',
      role: userData.role || 'inventory_manager',
      created_at: new Date().toISOString()
    };
    store.users.push(newUser);
    return newUser;
  }

  static async findAll() {
    return store.users;
  }
}

module.exports = User;
