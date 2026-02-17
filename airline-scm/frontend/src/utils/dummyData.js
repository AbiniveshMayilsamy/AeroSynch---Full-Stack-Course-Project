// Dummy pre-populated data for the application

export const dummyInventory = [
  {
    id: '1',
    name: 'Boeing 737 Engine Parts',
    quantity: '150',
    category: 'Engine Components',
    location: 'Warehouse A',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Hydraulic Fluid Type IV',
    quantity: '85',
    category: 'Fluids & Lubricants',
    location: 'Warehouse B',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Landing Gear Assembly',
    quantity: '25',
    category: 'Landing Systems',
    location: 'Warehouse A',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Avionics Display Units',
    quantity: '60',
    category: 'Electronics',
    location: 'Warehouse C',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '5',
    name: 'Cabin Air Filters',
    quantity: '200',
    category: 'Cabin Equipment',
    location: 'Warehouse B',
    createdAt: new Date('2024-02-15')
  }
];

export const dummySuppliers = [
  {
    id: '1',
    name: 'AeroTech Solutions',
    email: 'contact@aerotech.com',
    phone: '+1-555-0101',
    category: 'Engine Components',
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'SkyParts International',
    email: 'sales@skyparts.com',
    phone: '+1-555-0202',
    category: 'Landing Systems',
    createdAt: new Date('2023-07-20')
  },
  {
    id: '3',
    name: 'Aviation Supplies Co.',
    email: 'info@aviationsupplies.com',
    phone: '+1-555-0303',
    category: 'Fluids & Lubricants',
    createdAt: new Date('2023-08-10')
  },
  {
    id: '4',
    name: 'Global Avionics Ltd.',
    email: 'support@globalavionics.com',
    phone: '+1-555-0404',
    category: 'Electronics',
    createdAt: new Date('2023-09-05')
  },
  {
    id: '5',
    name: 'Cabin Systems Pro',
    email: 'orders@cabinsystems.com',
    phone: '+1-555-0505',
    category: 'Cabin Equipment',
    createdAt: new Date('2023-10-12')
  }
];

export const dummyOrders = [
  {
    id: '1',
    orderNumber: 'PO-2024-001',
    supplier: 'AeroTech Solutions',
    items: 'Engine Turbine Blades',
    quantity: '50',
    deliveryDate: '2024-03-15',
    status: 'Pending',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '2',
    orderNumber: 'PO-2024-002',
    supplier: 'SkyParts International',
    items: 'Landing Gear Components',
    quantity: '30',
    deliveryDate: '2024-03-20',
    status: 'In Transit',
    createdAt: new Date('2024-02-22')
  },
  {
    id: '3',
    orderNumber: 'PO-2024-003',
    supplier: 'Aviation Supplies Co.',
    items: 'Hydraulic Fluid',
    quantity: '100',
    deliveryDate: '2024-03-10',
    status: 'Delivered',
    createdAt: new Date('2024-02-18')
  },
  {
    id: '4',
    orderNumber: 'PO-2024-004',
    supplier: 'Global Avionics Ltd.',
    items: 'Navigation Systems',
    quantity: '20',
    deliveryDate: '2024-03-25',
    status: 'Pending',
    createdAt: new Date('2024-02-25')
  },
  {
    id: '5',
    orderNumber: 'PO-2024-005',
    supplier: 'Cabin Systems Pro',
    items: 'Passenger Seats',
    quantity: '150',
    deliveryDate: '2024-04-01',
    status: 'Processing',
    createdAt: new Date('2024-02-28')
  }
];

// Function to initialize dummy data in localStorage
export const initializeDummyData = () => {
  const existingInventory = localStorage.getItem('inventory');
  const existingSuppliers = localStorage.getItem('suppliers');
  const existingOrders = localStorage.getItem('orders');

  if (!existingInventory || JSON.parse(existingInventory).length === 0) {
    localStorage.setItem('inventory', JSON.stringify(dummyInventory));
  }

  if (!existingSuppliers || JSON.parse(existingSuppliers).length === 0) {
    localStorage.setItem('suppliers', JSON.stringify(dummySuppliers));
  }

  if (!existingOrders || JSON.parse(existingOrders).length === 0) {
    localStorage.setItem('orders', JSON.stringify(dummyOrders));
  }
};
