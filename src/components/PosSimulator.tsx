import React, { useState, useMemo, useEffect } from 'react';
import {
  MENU_ITEMS,
  INITIAL_TRANSACTIONS,
  CATEGORIES,
  MenuItem,
  CartItem,
  Transaction,
  CustomOptions
} from '../data';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  RotateCcw,
  PlusCircle,
  TrendingUp,
  BarChart3,
  CheckCircle,
  HelpCircle,
  Check,
  CreditCard,
  QrCode,
  DollarSign,
  User,
  Clock,
  Briefcase,
  Sliders,
  Sparkles,
  ShoppingBag,
  Table2
} from 'lucide-react';

export default function PosSimulator() {
  // Active Tab: 'kasir' | 'meja' | 'riwayat' | 'laporan'
  const [activeTab, setActiveTab] = useState<'kasir' | 'meja' | 'riwayat' | 'laporan'>('kasir');

  // Table management state
  const [selectedTable, setSelectedTable] = useState<string>('Meja 03');
  const [tables, setTables] = useState([
    { id: 'Meja 01', status: 'Occupied', customer: 'Budi', total: 48000 },
    { id: 'Meja 02', status: 'Available', customer: '', total: 0 },
    { id: 'Meja 03', status: 'Occupied', customer: 'Zaki (Sesuai Banner)', total: 55680 },
    { id: 'Meja 04', status: 'Available', customer: '', total: 0 },
    { id: 'Meja 05', status: 'Billed', customer: 'Andi', total: 94000 },
    { id: 'Meja 06', status: 'Available', customer: '', total: 0 },
    { id: 'Meja 07', status: 'Occupied', customer: 'Rudi', total: 112000 },
    { id: 'Meja 08', status: 'Available', customer: '', total: 0 },
    { id: 'Meja 09', status: 'Available', customer: '', total: 0 }
  ]);

  // Search & Categories state
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [isHolding, setIsHolding] = useState(false);
  const [holdMessage, setHoldMessage] = useState('');

  // Transactions list (pre-populated)
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Customization Modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedTemp, setSelectedTemp] = useState<'Ice' | 'Hot'>('Ice');
  const [selectedSugar, setSelectedSugar] = useState<'No Sugar' | 'Less Sugar' | 'Normal Sugar' | 'Extra Sugar'>('Normal Sugar');
  const [extraShot, setExtraShot] = useState(false);
  const [selectedSyrup, setSelectedSyrup] = useState<'None' | 'Caramel' | 'Vanilla' | 'Hazelnut'>('None');
  const [itemNote, setItemNote] = useState('');

  // Checkout Modal state
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Tunai' | 'Debit' | 'Kredit'>('QRIS');
  const [cashReceived, setCashReceived] = useState<number | ''>('');
  const [checkoutError, setCheckoutError] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  // Receipt Modal state (for viewing historical receipts)
  const [viewingReceipt, setViewingReceipt] = useState<Transaction | null>(null);

  // Simulated Time Indicator
  const [currentTime, setCurrentTime] = useState('Rabu, 01 Jul 2026 22:08:18');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as: Hari, Tanggal Bulan Tahun Jam
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = days[now.getDay()];
      const date = String(now.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();
      const time = now.toTimeString().split(' ')[0];
      setCurrentTime(`${dayName}, ${date} ${monthName} ${year} ${time}`);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter Menu Items based on category and search
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Helper to open customization modal or add immediately
  const handleItemClick = (item: MenuItem) => {
    // Check if customization is allowed for this item
    const hasOptions = item.optionsAllowed && Object.values(item.optionsAllowed).some(v => v === true);

    if (hasOptions) {
      setCustomizingItem(item);
      // Reset customization options
      setSelectedTemp('Ice');
      setSelectedSugar('Normal Sugar');
      setExtraShot(false);
      setSelectedSyrup('None');
      setItemNote('');
    } else {
      // Add immediately to cart without options
      addDirectToCart(item);
    }
  };

  // Add directly (no custom options)
  const addDirectToCart = (item: MenuItem) => {
    const defaultOptions: CustomOptions = {
      temperature: null,
      sugar: null,
      extraShot: false,
      syrup: 'None'
    };
    const cartId = `${item.id}-default`;

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === cartId);
      if (existing) {
        return prevCart.map((i) =>
          i.id === cartId ? { ...i, quantity: i.quantity + 1, lineTotal: (i.quantity + 1) * item.price } : i
        );
      }
      return [
        ...prevCart,
        {
          id: cartId,
          menuItem: item,
          quantity: 1,
          customOptions: defaultOptions,
          notes: '',
          lineTotal: item.price
        }
      ];
    });
  };

  // Add customized item from modal
  const handleAddCustomizedItem = () => {
    if (!customizingItem) return;

    // Calculate dynamic additions price
    let finalItemPrice = customizingItem.price;
    if (extraShot) finalItemPrice += 6000;
    if (selectedSyrup !== 'None') finalItemPrice += 5000;

    const customOptions: CustomOptions = {
      temperature: customizingItem.optionsAllowed?.temperature ? selectedTemp : null,
      sugar: customizingItem.optionsAllowed?.sugar ? selectedSugar : null,
      extraShot: customizingItem.optionsAllowed?.extraShot ? extraShot : false,
      syrup: customizingItem.optionsAllowed?.syrup ? selectedSyrup : 'None'
    };

    // Create a unique cart line ID representing this exact customization
    const cartId = `${customizingItem.id}-${selectedTemp}-${selectedSugar}-${extraShot}-${selectedSyrup}`;

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === cartId);
      if (existing) {
        return prevCart.map((i) =>
          i.id === cartId ? { ...i, quantity: i.quantity + 1, lineTotal: (i.quantity + 1) * finalItemPrice } : i
        );
      }
      return [
        ...prevCart,
        {
          id: cartId,
          menuItem: { ...customizingItem, price: finalItemPrice }, // Price is embedded with syrup & shots additions
          quantity: 1,
          customOptions,
          notes: itemNote,
          lineTotal: finalItemPrice
        }
      ];
    });

    setCustomizingItem(null);
  };

  // Adjust cart quantity
  const handleAdjustQuantity = (cartId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === cartId) {
            const newQty = item.quantity + delta;
            return {
              ...item,
              quantity: newQty,
              lineTotal: newQty * item.menuItem.price
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Delete cart line
  const handleDeleteCartLine = (cartId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
  };

  // Cart calculations
  const cartCalculations = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const tax = Math.round(subtotal * 0.11); // PPN 11%
    const serviceFee = Math.round(subtotal * 0.05); // Layanan 5%
    const total = subtotal + tax + serviceFee;
    return { subtotal, tax, serviceFee, total };
  }, [cart]);

  // Hold Pesanan trigger
  const handleHoldOrder = () => {
    if (cart.length === 0) return;
    setIsHolding(true);
    setHoldMessage('Draft antrean pesanan berhasil ditahan ("Hold").');
    setTimeout(() => {
      setIsHolding(false);
    }, 3000);
  };

  // Open checkout process
  const handleOpenCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutTotal(cartCalculations.total);
    setPaymentMethod('QRIS');
    setCashReceived('');
    setCheckoutError('');
    setIsCheckoutOpen(true);
  };

  // Complete Payment and generate transaction
  const handleCompleteCheckout = () => {
    if (paymentMethod === 'Tunai') {
      const amt = Number(cashReceived);
      if (!cashReceived || isNaN(amt)) {
        setCheckoutError('Uang tunai wajib diisi');
        return;
      }
      if (amt < checkoutTotal) {
        setCheckoutError('Jumlah uang tunai kurang dari total pembayaran');
        return;
      }
    }

    const txId = `TX-${String(transactions.length + 1).padStart(4, '0')}`;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    // Map cart items to transaction items list
    const transactionItems = cart.map((item) => {
      const optionsArray: string[] = [];
      if (item.customOptions.temperature) optionsArray.push(item.customOptions.temperature);
      if (item.customOptions.sugar) optionsArray.push(item.customOptions.sugar);
      if (item.customOptions.extraShot) optionsArray.push('Extra Shot (+6k)');
      if (item.customOptions.syrup !== 'None') optionsArray.push(`${item.customOptions.syrup} Syrup (+5k)`);

      return {
        name: item.menuItem.name,
        quantity: item.quantity,
        optionsSummary: optionsArray.length > 0 ? optionsArray.join(', ') : '-'
      };
    });

    const receivedAmt = paymentMethod === 'Tunai' ? Number(cashReceived) : checkoutTotal;
    const changeAmt = receivedAmt - checkoutTotal;

    const newTransaction: Transaction = {
      id: txId,
      customerName: customerName.trim() || 'Pelanggan Umum',
      time: timeString,
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      items: transactionItems,
      subtotal: cartCalculations.subtotal,
      tax: cartCalculations.tax,
      serviceFee: cartCalculations.serviceFee,
      total: checkoutTotal,
      paymentMethod,
      amountPaid: receivedAmt,
      change: changeAmt
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setLastTransaction(newTransaction);
    setShowSuccessScreen(true);
  };

  // Final Close Success Screen
  const handleCloseSuccessAndReset = () => {
    // Reset state
    setCart([]);
    setCustomerName('');
    setIsCheckoutOpen(false);
    setShowSuccessScreen(false);
    setLastTransaction(null);
    // Switch to Reports tab automatically to demonstrate real-time report updating!
    setActiveTab('laporan');
  };

  // Report calculations (Real-time updates!)
  const reportStats = useMemo(() => {
    const totalRev = transactions.reduce((sum, tx) => sum + tx.total, 0);
    const count = transactions.length;
    const avg = count > 0 ? Math.round(totalRev / count) : 0;

    // Calculate payment method count
    const methods: Record<string, number> = { QRIS: 0, Tunai: 0, Debit: 0, Kredit: 0 };
    transactions.forEach((tx) => {
      methods[tx.paymentMethod] = (methods[tx.paymentMethod] || 0) + 1;
    });

    let topMethod = 'Tunai';
    let maxCount = -1;
    Object.entries(methods).forEach(([m, val]) => {
      if (val > maxCount) {
        maxCount = val;
        topMethod = m;
      }
    });

    // Top selling items count calculation
    const itemSells: Record<string, number> = {};
    transactions.forEach((tx) => {
      tx.items.forEach((it) => {
        itemSells[it.name] = (itemSells[it.name] || 0) + it.quantity;
      });
    });

    const sortedSells = Object.entries(itemSells)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty);

    return { totalRev, count, avg, topMethod, sortedSells, methods };
  }, [transactions]);

  return (
    <section id="demo" className="py-20 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-3">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            SIMULASI INTERAKTIF LANGSUNG
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">
            Uji Coba Langsung Sistem BAYARO POS
          </h2>
          <p className="text-slate-500 text-xs md:text-sm">
            Coba tambahkan produk, kustomisasi minuman, dan bayar. Klik tab <strong>Laporan</strong> di atas untuk melihat grafik analitik laba terupdate secara real-time!
          </p>
        </div>

        {/* Master Tablet Container */}
        <div id="pos-tablet-frame" className="bg-white border-8 border-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[780px] relative max-w-6xl mx-auto">

          {/* Tablet Status Indicator Ticker */}
          <div className="bg-slate-900 text-slate-300 px-6 py-2.5 flex items-center justify-between text-[11px] md:text-xs font-semibold border-b border-white/5 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-white">ONLINE DEMO</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400">Terkoneksi Server Utama BAYARO POS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono hidden md:inline">{currentTime}</span>
              <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/20 font-bold">
                Laporan Real-Time Aktif
              </span>
            </div>
          </div>

          {/* iPad styled Header Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 md:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">

            {/* Left: Brand Identity & Tabs Selector */}
            <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-6">
              <img src="/assets/bayaro-logo-transparent.png" alt="Bayaro" className="h-7" />

              {/* Central Tab Controls */}
              <div className="bg-slate-200/60 p-1 rounded-xl flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('kasir')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'kasir'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Kasir
                </button>
                <button
                  onClick={() => setActiveTab('meja')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'meja'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <Table2 className="h-3.5 w-3.5" /> Meja
                </button>
                <button
                  onClick={() => setActiveTab('riwayat')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'riwayat'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <Receipt className="h-3.5 w-3.5" /> Riwayat
                </button>
                <button
                  onClick={() => setActiveTab('laporan')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'laporan'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5 animate-pulse" /> Laporan
                </button>
              </div>
            </div>

            {/* Right: Cashier / User Shift details */}
            <div className="flex items-center gap-4 text-right">
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-slate-800">Rifan Hardiyan</p>
                <p className="text-[10px] text-slate-400 font-medium">Supervisor • Shift: Bambang</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                <User className="h-4 w-4 text-indigo-600" />
              </div>
            </div>

          </div>

          {/* Main Working Space Content */}
          <div className="flex-1 flex overflow-hidden bg-slate-100">

            {/* TAB 1: KASIR */}
            {activeTab === 'kasir' && (
              <>
                {/* Left Area: Categories & Items Grid */}
                <div className="flex-1 flex flex-col p-4 overflow-hidden space-y-4">
                  {/* Search and Category Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    {/* Search Field */}
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                      />
                    </div>

                    {/* Category Scroll List */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar pb-1">
                      {CATEGORIES.map((cat, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            selectedCategory === cat
                              ? 'bg-[#001233] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menu Items Grid scrollbox */}
                  <div className="flex-1 overflow-y-auto pr-1">
                    {filteredItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                        <ShoppingBag className="h-10 w-10 stroke-1" />
                        <p className="text-sm">Tidak ada menu ditemukan</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pb-4">
                        {filteredItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                          >
                            <div className="space-y-2">
                              {/* Item Thumbnail */}
                              <div className="w-full h-24 rounded-xl overflow-hidden relative bg-slate-100">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute top-2 left-2 text-[8px] font-extrabold uppercase bg-[#001233]/70 text-white px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                                  {item.category}
                                </span>
                              </div>

                              {/* Info details */}
                              <div>
                                <h4 className="font-bold text-slate-800 text-xs line-clamp-1 group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                                  Rp {item.price.toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>

                            {/* Floating add visual indicator */}
                            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-50">
                              <span className="text-[9px] text-slate-400 font-semibold uppercase">
                                {(item.optionsAllowed && Object.values(item.optionsAllowed).some(v => v === true)) ? 'Opsi+' : 'Instan'}
                              </span>
                              <div className="bg-blue-50 text-blue-600 p-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Plus className="h-3.5 w-3.5" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Area: Checkout Pesanan Panel (Cart Sidebar) */}
                <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shrink-0">

                  {/* Cart Header */}
                  <div className="p-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#001233] text-sm md:text-base flex items-center gap-1.5">
                        Pesanan Aktif
                      </h3>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                        Tanpa Meja #9328
                      </span>
                    </div>

                    {/* Customer Name input */}
                    <div className="mt-3 relative">
                      <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Nama pelanggan (opsional)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Cart Items Scroll list */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-10">
                        <ShoppingBag className="h-8 w-8 stroke-1" />
                        <p className="text-xs text-center leading-relaxed">
                          Pesanan masih kosong.<br />Silakan pilih menu di kiri.
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => {
                        const hasCustomOptions = item.customOptions.temperature || item.customOptions.sugar;
                        return (
                          <div
                            key={item.id}
                            className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className="font-bold text-xs text-slate-800">{item.menuItem.name}</h5>

                                {/* Options summary */}
                                {hasCustomOptions && (
                                  <p className="text-[10px] text-slate-400 font-medium leading-normal mt-0.5">
                                    {[
                                      item.customOptions.temperature,
                                      item.customOptions.sugar,
                                      item.customOptions.extraShot ? 'Extra Shot' : null,
                                      item.customOptions.syrup !== 'None' ? `${item.customOptions.syrup} Syrup` : null
                                    ]
                                      .filter(Boolean)
                                      .join(', ')}
                                  </p>
                                )}

                                {/* Customer Notes summary */}
                                {item.notes && (
                                  <p className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 inline-block mt-1 font-medium">
                                    Catatan: "{item.notes}"
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => handleDeleteCartLine(item.id)}
                                className="text-slate-300 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Adjust Qty and Prices row */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/40">
                              <span className="text-xs font-bold text-indigo-600">
                                Rp {item.lineTotal.toLocaleString('id-ID')}
                              </span>

                              <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-1.5 py-0.5">
                                <button
                                  onClick={() => handleAdjustQuantity(item.id, -1)}
                                  className="text-slate-500 hover:text-indigo-600 p-0.5 cursor-pointer"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-xs font-bold font-mono text-slate-700 w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleAdjustQuantity(item.id, 1)}
                                  className="text-slate-500 hover:text-indigo-600 p-0.5 cursor-pointer"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Calculations & Checkout action buttons */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 space-y-3">
                    <div className="space-y-1.5 text-xs text-slate-500 font-medium">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="text-slate-700 font-bold">
                          Rp {cartCalculations.subtotal.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>PPN (11%):</span>
                        <span className="text-slate-700 font-bold">
                          Rp {cartCalculations.tax.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya Layanan (5%):</span>
                        <span className="text-slate-700 font-bold">
                          Rp {cartCalculations.serviceFee.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-1.5 text-slate-800 font-bold text-sm">
                        <span>Total:</span>
                        <span className="text-indigo-600 font-black">
                          Rp {cartCalculations.total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Notification about order holding */}
                    {isHolding && (
                      <div className="bg-amber-100 border border-amber-200 text-amber-800 rounded-xl p-2.5 text-center text-[10px] md:text-xs font-bold animate-pulse">
                        💾 Draft Pesanan ditahan ("Hold") sukses!
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleHoldOrder}
                        disabled={cart.length === 0}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl transition-colors text-xs cursor-pointer disabled:opacity-50"
                      >
                        Hold Pesanan
                      </button>
                      <button
                        onClick={handleOpenCheckout}
                        disabled={cart.length === 0}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-500/10 text-xs cursor-pointer disabled:opacity-50"
                      >
                        Bayar Sekarang
                      </button>
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* TAB: MANAJEMEN MEJA */}
            {activeTab === 'meja' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black font-display text-slate-900">Manajemen Meja</h3>
                    <p className="text-xs text-slate-400 font-medium">Status denah meja makan & pesanan aktif di tempat (Dine-in)</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-extrabold px-2.5 text-slate-500">MEJA KASIR AKTIF:</span>
                    <span className="text-[10px] font-black bg-indigo-600 text-white px-2.5 py-1 rounded-lg shadow-sm">{selectedTable}</span>
                  </div>
                </div>

                {/* Grid layout of tables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      className={`relative bg-white border-2 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-48 ${
                        selectedTable === table.id ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        {/* Table Header Details */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-base font-black font-display text-slate-900">{table.id}</span>
                            {table.status !== 'Available' && (
                              <p className="text-[10px] text-indigo-600 font-bold mt-0.5">An. {table.customer}</p>
                            )}
                          </div>
                          {/* Badge Status */}
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            table.status === 'Available'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : table.status === 'Billed'
                              ? 'bg-amber-50 text-amber-600 border border-amber-100'
                              : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          }`}>
                            {table.status === 'Available' ? 'Kosong' : table.status === 'Billed' ? 'Billed' : 'Terisi'}
                          </span>
                        </div>

                        {/* Visual Table & Chairs icon depiction */}
                        <div className="flex items-center justify-center my-3">
                          <div className="relative flex items-center justify-center">
                            {/* Visual Chairs around table */}
                            <div className="absolute -top-2 w-4 h-2 rounded bg-slate-300"></div>
                            <div className="absolute -bottom-2 w-4 h-2 rounded bg-slate-300"></div>
                            <div className="absolute -left-2 w-2 h-4 rounded bg-slate-300"></div>
                            <div className="absolute -right-2 w-2 h-4 rounded bg-slate-300"></div>
                            {/* Central Table */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-black shadow-inner ${
                              table.status === 'Available'
                                ? 'bg-emerald-500'
                                : table.status === 'Billed'
                                ? 'bg-amber-500 animate-pulse'
                                : 'bg-indigo-600'
                            }`}>
                              {table.id.split(' ')[1]}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Info or Button triggers */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        {table.status !== 'Available' ? (
                          <div className="text-left">
                            <span className="text-[9px] text-slate-400 block leading-none">Total Tagihan</span>
                            <span className="text-xs font-black text-slate-800">Rp {table.total.toLocaleString('id-ID')}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium italic">Siap ditempati</span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTable(table.id);
                            if (table.status === 'Occupied' || table.status === 'Billed') {
                              setCustomerName(table.customer);
                              // Populate cart with specific mock products to match the banner exactly!
                              if (table.id === 'Meja 03') {
                                const defaultCart = [
                                  {
                                    id: '1-default',
                                    menuItem: MENU_ITEMS.find(m => m.name.includes('Susu')) || MENU_ITEMS[0],
                                    quantity: 1,
                                    customOptions: { temperature: null, sugar: null, extraShot: false, syrup: 'None' },
                                    notes: '',
                                    lineTotal: 18000
                                  },
                                  {
                                    id: '2-default',
                                    menuItem: MENU_ITEMS.find(m => m.name.includes('Goreng')) || MENU_ITEMS[1],
                                    quantity: 1,
                                    customOptions: { temperature: null, sugar: null, extraShot: false, syrup: 'None' },
                                    notes: '',
                                    lineTotal: 20000
                                  },
                                  {
                                    id: '3-default',
                                    menuItem: MENU_ITEMS.find(m => m.name.includes('Lemon')) || MENU_ITEMS[2],
                                    quantity: 1,
                                    customOptions: { temperature: null, sugar: null, extraShot: false, syrup: 'None' },
                                    notes: 'Tolong es batu sedikit saja',
                                    lineTotal: 10000
                                  }
                                ];
                                setCart(defaultCart);
                              }
                            } else {
                              // If Available, reset cart and customer name
                              setCart([]);
                              const nameInput = prompt('Masukkan nama pelanggan untuk ' + table.id + ':', 'Pelanggan Baru');
                              if (nameInput) {
                                setCustomerName(nameInput);
                                // Update tables state to occupy
                                setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: 'Occupied', customer: nameInput, total: 38000 } : t));
                              }
                            }
                            setActiveTab('kasir');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-colors cursor-pointer ${
                            table.status === 'Available'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {table.status === 'Available' ? 'Buka Meja' : 'Buka Kasir'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: RIWAYAT TRANSAKSI */}
            {activeTab === 'riwayat' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-lg font-black font-display text-slate-900">Riwayat Struk Penjualan</h3>
                    <p className="text-xs text-slate-400">Daftar transaksi yang diselesaikan hari ini (Urutan Terbaru)</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Atur ulang data transaksi simulator kembali ke awal?')) {
                        setTransactions(INITIAL_TRANSACTIONS);
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 font-bold border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset Data Demo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div>
                            <span className="font-mono text-xs font-bold text-slate-400">{tx.id}</span>
                            <h4 className="font-bold text-sm text-slate-900 mt-0.5">Toko: {tx.customerName}</h4>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                            tx.paymentMethod === 'QRIS'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : tx.paymentMethod === 'Tunai'
                              ? 'bg-amber-50 text-amber-600 border-amber-100'
                              : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                          }`}>
                            {tx.paymentMethod}
                          </span>
                        </div>

                        {/* Items breakdown summary */}
                        <div className="space-y-1">
                          {tx.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-slate-500 font-medium">
                              <span>{it.quantity}x {it.name}</span>
                              <span className="text-[10px] text-slate-400 italic">({it.optionsSummary})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium uppercase leading-none">Total Struk</p>
                          <p className="text-sm font-bold text-indigo-600 mt-0.5">Rp {tx.total.toLocaleString('id-ID')}</p>
                        </div>
                        <button
                          onClick={() => setViewingReceipt(tx)}
                          className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Lihat Struk 🧾
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LAPORAN ANALITIK REAL-TIME */}
            {activeTab === 'laporan' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">

                {/* Header Laporan */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-3.5">
                  <div>
                    <h3 className="text-lg font-black font-display text-slate-900 flex items-center gap-1.5">
                      <BarChart3 className="h-5 w-5 text-indigo-600 animate-bounce" /> Real-Time Analytics
                    </h3>
                    <p className="text-xs text-slate-400">Dashboard laporan laba/rugi yang terupdate instan setiap ada kasir transaksi baru!</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                      Live Sinkronisasi Aktif
                    </span>
                  </div>
                </div>

                {/* Key Cards Stats widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Total Omset</p>
                    <p className="text-lg md:text-xl font-black text-slate-800 font-display mt-2">
                      Rp {reportStats.totalRev.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-bold mt-1.5">↑ Up 100% (Simulator Live)</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Jumlah Transaksi</p>
                    <p className="text-lg md:text-xl font-black text-slate-800 font-display mt-2">
                      {reportStats.count} Trx
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1.5">Rata-rata penjualan aktif</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Rata-rata Struk (Ticket)</p>
                    <p className="text-lg md:text-xl font-black text-slate-800 font-display mt-2">
                      Rp {reportStats.avg.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[9px] text-indigo-500 font-bold mt-1.5">Per transaksi terselesaikan</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Metode Populer</p>
                    <p className="text-lg md:text-xl font-black text-indigo-600 font-display mt-2 uppercase">
                      {reportStats.topMethod}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1.5">Metode pembayaran favorit</p>
                  </div>
                </div>

                {/* Live Graphics Row (Line / Bar chart representation in custom responsive vector SVGs!) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Chart A: Omset timeline */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center justify-between">
                      <span>Timeline Omset Penjualan</span>
                      <span className="text-[10px] text-slate-400 font-mono">Berdasarkan 5 Transaksi Terakhir</span>
                    </h4>

                    {/* Responsive Line Chart using custom inline SVG */}
                    <div className="h-44 w-full flex items-center justify-center bg-slate-50 rounded-2xl relative overflow-hidden p-2">
                      <svg viewBox="0 0 500 150" className="w-full h-full">
                        {/* Grid Lines */}
                        <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="50" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="50" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="50" y1="125" x2="480" y2="125" stroke="#cbd5e1" strokeWidth="1.5" />

                        {/* Chart path calculations - using reverse transaction data */}
                        {(() => {
                          const points = [...transactions].reverse().map((tx, idx, arr) => {
                            const steps = arr.length > 1 ? arr.length - 1 : 1;
                            const x = 50 + (idx * 400) / steps;
                            // Map total range to 20-125
                            // Find max total to scale
                            const max = Math.max(...arr.map(t => t.total), 100000);
                            const y = 125 - (tx.total * 90) / max;
                            return { x, y, val: tx.total, id: tx.id };
                          });

                          const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                          return (
                            <>
                              {/* Draw gradient area fill below line */}
                              {points.length > 0 && (
                                <path
                                  d={`${pathD} L ${points[points.length - 1].x} 125 L ${points[0].x} 125 Z`}
                                  fill="url(#grad)"
                                  opacity="0.15"
                                />
                              )}

                              {/* Draw line path */}
                              <path
                                  d={pathD}
                                  fill="none"
                                  stroke="#4f46e5"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              />

                              {/* Draw tooltip dots & value tags */}
                              {points.map((p, idx) => (
                                <g key={idx}>
                                  <circle cx={p.x} cy={p.y} r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />
                                  <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[10px] font-extrabold font-mono" fill="#0f172a">
                                    {(p.val / 1000).toFixed(0)}k
                                  </text>
                                  <text x={p.x} y="140" textAnchor="middle" className="text-[8px] font-bold" fill="#94a3b8">
                                    {p.id}
                                  </text>
                                </g>
                              ))}

                              {/* Linear Gradient Definition */}
                              <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#4f46e5" />
                                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>

                  {/* Chart B: Best Sellers item products */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center justify-between">
                      <span>Menu Makanan / Minuman Terlaris</span>
                      <span className="text-[10px] text-slate-400 font-mono">Berdasarkan Jumlah Quantity Terjual</span>
                    </h4>

                    {/* Progress bars representations */}
                    <div className="h-44 overflow-y-auto space-y-3 pr-1">
                      {reportStats.sortedSells.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-10">Selesaikan transaksi kasir untuk mengupdate data produk terlaris.</p>
                      ) : (
                        reportStats.sortedSells.slice(0, 5).map((sell, idx) => {
                          const maxQty = reportStats.sortedSells[0]?.qty || 1;
                          const pct = (sell.qty / maxQty) * 100;
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-slate-700">{sell.name}</span>
                                <span className="font-mono font-extrabold text-indigo-600">{sell.qty} Pcs</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

                {/* Row: Payment methods share progress bar */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider border-b border-slate-50 pb-2.5 mb-4">
                    Metode Pembayaran Distribusi Share
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(reportStats.methods).map(([method, val]) => {
                      const totalCount = reportStats.count || 1;
                      const percentage = Math.round((Number(val) / totalCount) * 100);
                      return (
                        <div key={method} className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center space-y-1">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{method}</p>
                          <h5 className="text-xl font-black text-slate-700 font-display">{val} trx</h5>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-slate-400 font-medium pt-1">{percentage}% dari total</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* TABLET BEZEL BOTTOM */}
          <div className="bg-slate-900 py-3 shrink-0 flex justify-center border-t border-slate-800">
            <button
              onClick={() => {
                setActiveTab('kasir');
                setCart([]);
                setCustomerName('');
              }}
              className="w-12 h-1.5 bg-slate-700 rounded-full hover:bg-slate-500 transition-colors cursor-pointer focus:outline-none"
              title="Home Bezel Button"
            ></button>
          </div>

        </div>

      </div>

      {/* MODAL A: ITEM OPTIONS CUSTOMIZATION POPUP */}
      {customizingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-wider">KUSTOMISASI PESANAN</span>
                <h3 className="text-base font-black font-display mt-0.5">{customizingItem.name}</h3>
              </div>
              <span className="font-bold text-slate-300 text-xs">
                Base: Rp {customizingItem.price.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Modal Scroll Body content */}
            <div className="p-5 space-y-5 max-h-[380px] overflow-y-auto">

              {/* Temperature option */}
              {customizingItem.optionsAllowed?.temperature && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Temperatur</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedTemp('Ice')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        selectedTemp === 'Ice'
                          ? 'bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      ❄️ Ice (Dingin)
                    </button>
                    <button
                      onClick={() => setSelectedTemp('Hot')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        selectedTemp === 'Hot'
                          ? 'bg-amber-50 border-amber-500 text-amber-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      🔥 Hot (Panas)
                    </button>
                  </div>
                </div>
              )}

              {/* Sugar Levels option */}
              {customizingItem.optionsAllowed?.sugar && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Tingkat Gula</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['No Sugar', 'Less Sugar', 'Normal Sugar', 'Extra Sugar'] as const).map((sugar) => (
                      <button
                        key={sugar}
                        onClick={() => setSelectedSugar(sugar)}
                        className={`py-2 px-1 rounded-xl font-semibold border transition-colors cursor-pointer ${
                          selectedSugar === sugar
                            ? 'bg-[#001233] border-[#001233] text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {sugar === 'No Sugar' && '🚫 Tanpa Gula'}
                        {sugar === 'Less Sugar' && '🥛 Sedikit Gula'}
                        {sugar === 'Normal Sugar' && '🍯 Normal Gula'}
                        {sugar === 'Extra Sugar' && '🥞 Banyak Gula'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Espresso Shots */}
              {customizingItem.optionsAllowed?.extraShot && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Add-On Shot</label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
                    <span className="text-xs text-slate-700 font-medium">Extra Espresso Shot (+Rp 6.000)</span>
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={(e) => setExtraShot(e.target.checked)}
                      className="h-4.5 w-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                  </label>
                </div>
              )}

              {/* Syrups Addition */}
              {customizingItem.optionsAllowed?.syrup && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Perasa Sirup (+Rp 5.000)</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['None', 'Caramel', 'Vanilla', 'Hazelnut'] as const).map((syrup) => (
                      <button
                        key={syrup}
                        onClick={() => setSelectedSyrup(syrup)}
                        className={`py-2 rounded-xl font-semibold border transition-colors cursor-pointer ${
                          selectedSyrup === syrup
                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {syrup === 'None' && '🚫 Tanpa Sirup'}
                        {syrup === 'Caramel' && '🍮 Caramel'}
                        {syrup === 'Vanilla' && '🍦 Vanilla'}
                        {syrup === 'Hazelnut' && '🌰 Hazelnut'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation note input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Catatan Tambahan</label>
                <input
                  type="text"
                  placeholder="Misal: Tolong es batu sedikit saja"
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs md:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                />
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setCustomizingItem(null)}
                className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleAddCustomizedItem}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                Simpan ke Pesanan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL B: CHECKOUT & PAYMENT METHOD DRAWER */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">

            {!showSuccessScreen ? (
              /* ACTIVE CHECKOUT INPUT STATE */
              <>
                <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">Kasir Kas Kasir</span>
                    <h3 className="text-base font-black font-display mt-0.5">Selesaikan Pembayaran</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 leading-none">TOTAL TAGIHAN</p>
                    <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 font-mono mt-1">
                      Rp {checkoutTotal.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Payment method selector tab-buttons */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Metode Pembayaran</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => { setPaymentMethod('QRIS'); setCheckoutError(''); }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'QRIS'
                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <QrCode className="h-5 w-5" />
                        <span className="text-[10px] font-bold">QRIS (Otomatis)</span>
                      </button>
                      <button
                        onClick={() => { setPaymentMethod('Tunai'); setCheckoutError(''); }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'Tunai'
                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <DollarSign className="h-5 w-5" />
                        <span className="text-[10px] font-bold">Tunai (Cash)</span>
                      </button>
                      <button
                        onClick={() => { setPaymentMethod('Debit'); setCheckoutError(''); }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'Debit'
                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span className="text-[10px] font-bold">Kartu Debit</span>
                      </button>
                      <button
                        onClick={() => { setPaymentMethod('Kredit'); setCheckoutError(''); }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          paymentMethod === 'Kredit'
                            ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span className="text-[10px] font-bold">Kartu Kredit</span>
                      </button>
                    </div>
                  </div>

                  {/* QRIS details displaying a stylized mockup QR */}
                  {paymentMethod === 'QRIS' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                      <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-100 flex items-center justify-center">
                        {/* Stylized custom SVG QR Code */}
                        <svg className="h-32 w-32" viewBox="0 0 100 100">
                          {/* Outer frame */}
                          <rect x="2" y="2" width="22" height="22" fill="#0f172a" stroke="white" strokeWidth="2" />
                          <rect x="6" y="6" width="14" height="14" fill="white" />
                          <rect x="10" y="10" width="6" height="6" fill="#0f172a" />

                          <rect x="76" y="2" width="22" height="22" fill="#0f172a" stroke="white" strokeWidth="2" />
                          <rect x="80" y="6" width="14" height="14" fill="white" />
                          <rect x="84" y="10" width="6" height="6" fill="#0f172a" />

                          <rect x="2" y="76" width="22" height="22" fill="#0f172a" stroke="white" strokeWidth="2" />
                          <rect x="6" y="80" width="14" height="14" fill="white" />
                          <rect x="10" y="84" width="6" height="6" fill="#0f172a" />

                          {/* Center logo anchor */}
                          <rect x="42" y="42" width="16" height="16" fill="#4f46e5" rx="3" />
                          <circle cx="50" cy="50" r="4" fill="white" />

                          {/* Random dot matrices */}
                          <rect x="30" y="10" width="6" height="6" fill="#0f172a" />
                          <rect x="40" y="4" width="10" height="4" fill="#0f172a" />
                          <rect x="60" y="16" width="10" height="8" fill="#0f172a" />
                          <rect x="14" y="30" width="8" height="6" fill="#0f172a" />
                          <rect x="4" y="44" width="12" height="4" fill="#0f172a" />
                          <rect x="34" y="60" width="8" height="10" fill="#0f172a" />
                          <rect x="62" y="74" width="12" height="6" fill="#0f172a" />
                          <rect x="80" y="46" width="8" height="10" fill="#0f172a" />
                          <rect x="74" y="30" width="14" height="4" fill="#0f172a" />
                          <rect x="46" y="84" width="10" height="10" fill="#0f172a" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Simulasi Pembayaran QRIS BAYARO</p>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-xs leading-normal">
                          Laporan real-time akan langsung mengupdate omset Anda sesaat setelah Anda klik konfirmasi pembayaran di bawah.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cash/Tunai details input */}
                  {paymentMethod === 'Tunai' && (
                    <div className="space-y-4">
                      {/* Text Input received cash */}
                      <div className="space-y-1.5">
                        <label htmlFor="cashReceived" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Uang Tunai Diterima</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 font-bold text-xs text-slate-400">Rp</span>
                          <input
                            type="number"
                            id="cashReceived"
                            value={cashReceived}
                            onChange={(e) => {
                              const val = e.target.value === '' ? '' : Number(e.target.value);
                              setCashReceived(val);
                              setCheckoutError('');
                            }}
                            placeholder="Masukkan jumlah uang tunai"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-mono font-bold"
                          />
                        </div>
                        {checkoutError && (
                          <p className="text-rose-500 text-xs font-semibold">{checkoutError}</p>
                        )}
                      </div>

                      {/* Quick Cash Buttons */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Uang Pas & Rekomendasi:</span>
                        <div className="grid grid-cols-4 gap-2 text-[11px] font-bold font-mono">
                          <button
                            onClick={() => { setCashReceived(checkoutTotal); setCheckoutError(''); }}
                            className="py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            Uang Pas
                          </button>
                          {[50000, 100000, 150000, 200000].map((cashVal) => (
                            <button
                              key={cashVal}
                              onClick={() => { setCashReceived(cashVal); setCheckoutError(''); }}
                              className="py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              Rp {cashVal.toLocaleString('id-ID')}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Real-time Change calculation representation */}
                      {cashReceived !== '' && Number(cashReceived) >= checkoutTotal && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">Kembalian Kasir:</span>
                          <span className="text-base font-black font-mono text-emerald-600">
                            Rp {(Number(cashReceived) - checkoutTotal).toLocaleString('id-ID')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card payment instructions */}
                  {(paymentMethod === 'Debit' || paymentMethod === 'Kredit') && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500 space-y-1 leading-normal">
                      <CreditCard className="h-8 w-8 text-indigo-600 mx-auto mb-1 animate-bounce" />
                      <p className="font-bold text-slate-700">Hubungkan Mesin EDC Simulasi</p>
                      <p>Sistem BAYARO POS otomatis mendeteksi transaksi melalui kartu Debit/Kredit EDC secara real-time.</p>
                    </div>
                  )}

                </div>

                {/* Footer Modal Actions */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleCompleteCheckout}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Konfirmasi Pembayaran <Check className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              /* SUCCESS CHECKOUT receipt presentation state */
              <div className="p-6 text-center space-y-6">

                {/* Visual success splash */}
                <div className="space-y-2">
                  <div className="inline-flex p-2.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full animate-bounce">
                    <CheckCircle className="h-10 w-10 fill-emerald-500 text-white" />
                  </div>
                  <h3 className="text-xl font-black font-display text-slate-800">
                    TRANSAKSI BERHASIL!
                  </h3>
                  <p className="text-xs text-slate-400">
                    Struk berhasil disimpan & laporan real-time otomatis terupdate!
                  </p>
                </div>

                {/* Stylized Thermal Receipt (Struk Penjualan) */}
                <div className="border border-dashed border-slate-300 bg-amber-50/20 rounded-2xl p-5 text-left font-mono text-[10px] md:text-xs text-slate-700 max-w-sm mx-auto shadow-inner relative overflow-hidden">

                  {/* Visual Receipt Header */}
                  <div className="text-center space-y-1 pb-3 border-b border-dashed border-slate-300">
                    <p className="font-bold uppercase tracking-wider text-slate-800">☕ KAFE BAYARO POS</p>
                    <p className="text-[9px] text-slate-400">Ruko Sentra Bisnis Blok B No. 9</p>
                    <p className="text-[9px] text-slate-400">WhatsApp: 0851-7416-0310</p>
                  </div>

                  {/* Transaction Metadata */}
                  <div className="py-2.5 space-y-0.5 text-slate-500 border-b border-dashed border-slate-300 text-[9px]">
                    <div className="flex justify-between">
                      <span>No Struk:</span>
                      <span className="font-bold text-slate-700">{lastTransaction?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pelanggan:</span>
                      <span className="font-bold text-slate-700">{lastTransaction?.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waktu:</span>
                      <span className="font-bold text-slate-700">Rabu, 01 Jul 2026 {lastTransaction?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kasir:</span>
                      <span className="font-bold text-slate-700">Rifan Hardiyan</span>
                    </div>
                  </div>

                  {/* Item List entries */}
                  <div className="py-3 border-b border-dashed border-slate-300 space-y-2">
                    {lastTransaction?.items.map((it, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{it.quantity}x {it.name}</span>
                        </div>
                        {it.optionsSummary !== '-' && (
                          <p className="text-[9px] text-slate-400 italic">Varian: {it.optionsSummary}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations breakdown */}
                  <div className="py-3 text-slate-500 space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Subtotal:</span>
                      <span className="text-slate-800 font-bold">Rp {lastTransaction?.subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>PPN (11%):</span>
                      <span className="text-slate-800 font-bold">Rp {lastTransaction?.tax.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Layanan (5%):</span>
                      <span className="text-slate-800 font-bold">Rp {lastTransaction?.serviceFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 border-t border-dashed border-slate-300 pt-2 text-xs">
                      <span>GRAND TOTAL:</span>
                      <span>Rp {lastTransaction?.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="border-t border-dashed border-slate-300 pt-2.5 text-[9px] space-y-0.5 text-slate-400">
                    <div className="flex justify-between text-slate-600 font-bold">
                      <span>Metode Pembayaran:</span>
                      <span>{lastTransaction?.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uang Diterima:</span>
                      <span className="text-slate-700">Rp {lastTransaction?.amountPaid.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Uang Kembalian:</span>
                      <span>Rp {lastTransaction?.change.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Visual Footer stamp */}
                  <div className="text-center pt-4 text-[8px] text-slate-400">
                    <p>Powered by BAYARO POS</p>
                    <p>-- Terima Kasih & Selamat Belanja Kembali --</p>
                  </div>

                </div>

                {/* Confirm dismiss and reset button */}
                <div className="max-w-sm mx-auto">
                  <button
                    onClick={handleCloseSuccessAndReset}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-lg shadow-indigo-500/15 cursor-pointer"
                  >
                    Tutup & Lihat Update Laporan Real-Time!
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL C: HISTORICAL STRUK VIEWER MODAL */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150 space-y-4">

            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold text-slate-400">SALINAN STRUK PEMBAYARAN</span>
              <button
                onClick={() => setViewingReceipt(null)}
                className="text-slate-300 hover:text-slate-600 font-bold text-sm"
              >
                Tutup ✕
              </button>
            </div>

            {/* Thermal Receipt clone */}
            <div className="border border-dashed border-slate-300 bg-amber-50/20 rounded-xl p-4 text-left font-mono text-[10px] md:text-xs text-slate-700 shadow-inner">
              <div className="text-center space-y-1 pb-2 border-b border-dashed border-slate-300">
                <p className="font-bold uppercase text-slate-800">☕ KAFE BAYARO POS</p>
                <p className="text-[8px] text-slate-400">Ruko Sentra Bisnis Blok B No. 9</p>
              </div>

              <div className="py-2 border-b border-dashed border-slate-300 space-y-0.5 text-slate-500 text-[8px] md:text-[10px]">
                <div className="flex justify-between">
                  <span>No Struk:</span>
                  <span className="font-bold text-slate-700">{viewingReceipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pelanggan:</span>
                  <span className="font-bold text-slate-700">{viewingReceipt.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu:</span>
                  <span className="font-bold text-slate-700">Rabu, 01 Jul 2026 {viewingReceipt.time}</span>
                </div>
              </div>

              <div className="py-2.5 border-b border-dashed border-slate-300 space-y-1">
                {viewingReceipt.items.map((it, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{it.quantity}x {it.name}</span>
                    </div>
                    {it.optionsSummary !== '-' && (
                      <p className="text-[8px] text-slate-400 italic">Varian: {it.optionsSummary}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="py-2.5 text-slate-500 space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>Subtotal:</span>
                  <span className="text-slate-800 font-bold">Rp {viewingReceipt.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>PPN (11%):</span>
                  <span className="text-slate-800 font-bold">Rp {viewingReceipt.tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Layanan (5%):</span>
                  <span className="text-slate-800 font-bold">Rp {viewingReceipt.serviceFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-dashed border-slate-300 pt-1.5 text-[11px] md:text-xs">
                  <span>GRAND TOTAL:</span>
                  <span>Rp {viewingReceipt.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-300 pt-2 text-[8px] md:text-[10px] space-y-0.5">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Pembayaran:</span>
                  <span>{viewingReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diterima:</span>
                  <span>Rp {viewingReceipt.amountPaid.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Kembalian:</span>
                  <span>Rp {viewingReceipt.change.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewingReceipt(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
