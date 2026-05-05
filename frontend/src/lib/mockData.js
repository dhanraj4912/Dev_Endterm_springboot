export const mockProducts = [
  {
    id: 'PREM-WT-01',
    name: 'Titan Precision Chronograph',
    category: 'Electronics',
    basePrice: 12400,
    moq: 10,
    availableStock: 1240,
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { minQty: 10, maxQty: 50, price: 12400 },
      { minQty: 51, maxQty: 100, price: 11800 },
      { minQty: 101, maxQty: null, price: 11200 },
    ],
  },
  {
    id: 'ECO-SP-44',
    name: 'Eco‑Pulse Wireless Hub',
    category: 'Lifestyle',
    basePrice: 4200,
    moq: 50,
    availableStock: 42,
    imageUrl:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { minQty: 50, maxQty: 200, price: 4200 },
      { minQty: 201, maxQty: 500, price: 3950 },
      { minQty: 501, maxQty: null, price: 3600 },
    ],
  },
  {
    id: 'SNR-PRO-88',
    name: 'Sonic‑Pro ANC Headphones',
    category: 'Audio',
    basePrice: 18500,
    moq: 5,
    availableStock: 450,
    imageUrl:
      'https://images.unsplash.com/photo-1518441902117-f0a3f8d0d2a8?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { minQty: 5, maxQty: 15, price: 18500 },
      { minQty: 16, maxQty: 50, price: 17200 },
      { minQty: 51, maxQty: null, price: 15900 },
    ],
  },
  {
    id: 'KB-MECH-G1',
    name: 'Forge Mechanical Interface',
    category: 'Peripherals',
    basePrice: 7500,
    moq: 25,
    availableStock: 3000,
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { minQty: 25, maxQty: 100, price: 7500 },
      { minQty: 101, maxQty: 250, price: 6900 },
      { minQty: 251, maxQty: null, price: 6400 },
    ],
  },
]

export const mockRetailers = [
  {
    id: 'r_1',
    name: 'Apex Mart Solutions',
    gst: '27AAACR1234A1Z5',
    status: 'PENDING',
    creditLimit: 0,
    currentDue: 0,
  },
  {
    id: 'r_2',
    name: 'Global Trade Hub',
    gst: '07BBCD5678B2Z9',
    status: 'APPROVED',
    creditLimit: 50000,
    currentDue: 45210,
  },
  {
    id: 'r_3',
    name: 'City Wholesale Depot',
    gst: '19CCCEF9012C3Z1',
    status: 'APPROVED',
    creditLimit: 25000,
    currentDue: 26500,
  },
  {
    id: 'r_4',
    name: 'Quick Stop Retail',
    gst: '33DDDHG3456D4Z7',
    status: 'REJECTED',
    creditLimit: 0,
    currentDue: 0,
  },
  {
    id: 'r_5',
    name: 'Modern Grocers Inc',
    gst: '12EEEJK7890E5Z3',
    status: 'APPROVED',
    creditLimit: 80000,
    currentDue: 12450,
  },
]

export const mockOrders = [
  {
    id: 'ORD-90124',
    date: '2023-10-18',
    status: 'IN_TRANSIT',
    retailer: 'Apex Industrial Supply',
    items: 24,
    total: 4290,
  },
  {
    id: 'ORD-88921',
    date: '2023-10-12',
    status: 'DELIVERED',
    retailer: 'BuildRight Centers',
    items: 15,
    total: 1850.5,
  },
  {
    id: 'ORD-88102',
    date: '2023-10-05',
    status: 'DELIVERED',
    retailer: 'Metro Hardware Grp',
    items: 102,
    total: 12400,
  },
  {
    id: 'ORD-87654',
    date: '2023-09-28',
    status: 'ARCHIVED',
    retailer: 'Apex Industrial Supply',
    items: 8,
    total: 940,
  },
]

