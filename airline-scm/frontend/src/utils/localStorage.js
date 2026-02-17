// Local Storage utility functions
const STORAGE_KEYS = {
  USER: 'airline_scm_user',
  TOKEN: 'airline_scm_token',
  THEME: 'airline_scm_theme',
  INVENTORY: 'airline_scm_inventory',
  ORDERS: 'airline_scm_orders',
  SUPPLIERS: 'airline_scm_suppliers',
};

export const storage = {
  // User data
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null'),
  removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

  // Token
  setToken: (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
  removeToken: () => localStorage.removeItem(STORAGE_KEYS.TOKEN),

  // Theme
  setTheme: (theme) => localStorage.setItem(STORAGE_KEYS.THEME, theme),
  getTheme: () => localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',

  // Inventory
  setInventory: (inventory) => localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory)),
  getInventory: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY) || '[]'),

  // Orders
  setOrders: (orders) => localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)),
  getOrders: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),

  // Suppliers
  setSuppliers: (suppliers) => localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers)),
  getSuppliers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SUPPLIERS) || '[]'),

  // Clear all
  clearAll: () => localStorage.clear(),
};
