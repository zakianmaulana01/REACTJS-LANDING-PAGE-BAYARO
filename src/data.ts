export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  optionsAllowed?: {
    temperature?: boolean;
    sugar?: boolean;
    extraShot?: boolean;
    syrup?: boolean;
  };
}

export interface CustomOptions {
  temperature: 'Ice' | 'Hot' | null;
  sugar: 'No Sugar' | 'Less Sugar' | 'Normal Sugar' | 'Extra Sugar' | null;
  extraShot: boolean;
  syrup: 'None' | 'Caramel' | 'Vanilla' | 'Hazelnut';
}

export interface CartItem {
  id: string; // Unique ID for this cart line (combines item ID and selected options)
  menuItem: MenuItem;
  quantity: number;
  customOptions: CustomOptions;
  notes: string;
  lineTotal: number;
}

export interface Transaction {
  id: string; // e.g. "TX-0001"
  customerName: string;
  time: string;
  itemsCount: number;
  items: {
    name: string;
    quantity: number;
    optionsSummary: string;
  }[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  paymentMethod: 'QRIS' | 'Tunai' | 'Debit' | 'Kredit';
  amountPaid: number;
  change: number;
}

export const CATEGORIES = [
  'Semua',
  'Coffee',
  'Non Coffee',
  'Tea',
  'Pastry',
  'Main Course'
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'kopi-susu-gula-aren',
    name: 'Kopi Susu Gula Aren',
    price: 24000,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true, extraShot: true, syrup: true }
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 26000,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true, extraShot: true, syrup: true }
  },
  {
    id: 'cafe-latte',
    name: 'Cafe Latte',
    price: 27000,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true, extraShot: true, syrup: true }
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 20000,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, extraShot: true }
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    price: 28000,
    category: 'Non Coffee',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true, syrup: true }
  },
  {
    id: 'chocolate-cream',
    name: 'Chocolate Cream',
    price: 27000,
    category: 'Non Coffee',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true, syrup: true }
  },
  {
    id: 'strawberry-milk',
    name: 'Strawberry Milk',
    price: 26000,
    category: 'Non Coffee',
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860275?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true }
  },
  {
    id: 'lemon-tea',
    name: 'Lemon Tea',
    price: 18000,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true }
  },
  {
    id: 'lychee-tea',
    name: 'Lychee Tea',
    price: 22000,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: { temperature: true, sugar: true }
  },
  {
    id: 'beef-blackpepper-bowl',
    name: 'Beef Blackpepper Bowl',
    price: 46000,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: {}
  },
  {
    id: 'chicken-katsu-curry',
    name: 'Chicken Katsu Curry',
    price: 42000,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: {}
  },
  {
    id: 'croissant-butter',
    name: 'Croissant Butter',
    price: 25000,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: {}
  },
  {
    id: 'choco-danish',
    name: 'Choco Danish',
    price: 28000,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=400',
    optionsAllowed: {}
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-0001',
    customerName: 'Budi',
    time: '08:12:05',
    itemsCount: 2,
    items: [
      { name: 'Kopi Susu Gula Aren', quantity: 1, optionsSummary: 'Ice, Normal Sugar' },
      { name: 'Croissant Butter', quantity: 1, optionsSummary: '-' }
    ],
    subtotal: 49000,
    tax: 5390,
    serviceFee: 2450,
    total: 56840,
    paymentMethod: 'QRIS',
    amountPaid: 56840,
    change: 0
  },
  {
    id: 'TX-0002',
    customerName: 'Siti',
    time: '08:24:40',
    itemsCount: 1,
    items: [
      { name: 'Cappuccino', quantity: 2, optionsSummary: 'Hot, Less Sugar' }
    ],
    subtotal: 52000,
    tax: 5720,
    serviceFee: 2600,
    total: 60320,
    paymentMethod: 'Tunai',
    amountPaid: 70000,
    change: 9680
  },
  {
    id: 'TX-0003',
    customerName: 'Andi',
    time: '08:31:15',
    itemsCount: 3,
    items: [
      { name: 'Beef Blackpepper Bowl', quantity: 1, optionsSummary: '-' },
      { name: 'Lychee Tea', quantity: 1, optionsSummary: 'Ice, Normal Sugar' },
      { name: 'Lemon Tea', quantity: 1, optionsSummary: 'Ice, Normal Sugar' }
    ],
    subtotal: 86000,
    tax: 9460,
    serviceFee: 4300,
    total: 99760,
    paymentMethod: 'Debit',
    amountPaid: 99760,
    change: 0
  }
];
