import { useState, useRef, useEffect, useId } from 'react';
import { Coffee, MapPin, Clock, Phone, Mail, ArrowRight, ExternalLink, MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Welcome to CafeBot Roastery! Feel free to ask about our single-origin coffees, brewing methods, or seasonal pastries.',
      timestamp: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatTitleId = useId();

  // Scroll to bottom when new messages arrive or window opens
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isChatOpen]);

  // Focus input on widget open
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  // Close chat on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Fixed mock reply required by user brief
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Hi! I’m CafeBot. My AI brain isn’t connected yet.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const menuItems = [
    {
      id: 'item-1',
      name: 'Honey Cinnamon Flat White',
      category: 'Espresso Specialty',
      badge: 'House Favorite',
      price: '$5.75',
      description: 'Double ristretto pulled over raw wildflower honey, steamed velvety oat milk, and freshly ground Ceylon cinnamon bark.',
      specs: '8 oz · Light Roast · Oat Milk',
      image: '/src/assets/images/menu_signature_latte_1794308227684.jpg',
      alt: 'Honey Cinnamon Flat White with rosetta latte art'
    },
    {
      id: 'item-2',
      name: 'Single-Origin Slow Cold Brew',
      category: 'Cold Coffee',
      badge: 'Slow Drip',
      price: '$5.25',
      description: 'Steeped cold for 20 hours using washed Ethiopian Yirgacheffe beans. Crisp notes of bergamot, candied peach, and dark cocoa nibs.',
      specs: '12 oz · Bright Citrus · Over Clear Ice',
      image: '/src/assets/images/menu_cold_brew_1794308229028.jpg',
      alt: 'Single-Origin Slow Cold Brew in fluted glass'
    },
    {
      id: 'item-3',
      name: 'Cardamom Morning Bun & Croissant',
      category: 'Bakery',
      badge: 'Fresh Daily',
      price: '$4.85',
      description: 'Laminated French butter pastry dough twisted with fragrant crushed cardamom seeds, vanilla bean sugar, and caramelized edges.',
      specs: 'Baked 6:00 AM · AOP Normandy Butter',
      image: '/src/assets/images/menu_artisan_pastry_1794308229196.jpg',
      alt: 'Golden flaky artisan croissant and cardamom morning bun'
    },
    {
      id: 'item-4',
      name: 'Kalita Wave Geisha Pour-Over',
      category: 'Filter Pour-Over',
      badge: 'Single-Lot',
      price: '$6.50',
      description: 'Panama Boquete Geisha variety, carefully hand-dripped at 93°C. Jasmine blossom fragrance, lemongrass, and sweet clover honey finish.',
      specs: '10 oz · Pour-to-Order · Floral Profile',
      image: '/src/assets/images/about_coffee_craft_1794308226409.jpg',
      alt: 'Hand-poured single origin filter brew'
    },
    {
      id: 'item-5',
      name: 'Madagascar Vanilla Cortado',
      category: 'Espresso Specialty',
      badge: 'Classic Ratio',
      price: '$4.95',
      description: 'Equal parts concentrated espresso and lightly textured whole milk, infused with house-cured organic Bourbon vanilla bean syrup.',
      specs: '4.5 oz · Balanced 1:1 · Low Acidity',
      image: '/src/assets/images/menu_signature_latte_1794308227684.jpg',
      alt: 'Madagascar vanilla cortado'
    },
    {
      id: 'item-6',
      name: 'Brown Butter Almond Brioche',
      category: 'Bakery',
      badge: 'Warm Pastry',
      price: '$5.10',
      description: 'Rich brioche soaked in roasted almond frangipane cream, topped with toasted sliced almonds, sea salt crystals, and orange zest.',
      specs: 'Artisan Baked · Vegetarian',
      image: '/src/assets/images/menu_artisan_pastry_1794308229196.jpg',
      alt: 'Brown butter almond brioche pastry'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#241c15] selection:bg-[#f6eee8] selection:text-[#8b5435] relative">
      {/* 1. Header (Strict Top Bar Contract: Brand title, nav links, 1 primary action) */}
      <header className="sticky top-0 z-40 bg-[#fcfaf7]/90 backdrop-blur-md border-b border-[#2b2118]/8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Zone */}
          <a href="#top" className="flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241c15] whitespace-nowrap shrink-0">
            <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b5435]" />
            <span>CafeBot</span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6e6459]">
            <a href="#about" className="hover:text-[#241c15] transition-colors whitespace-nowrap">About</a>
            <a href="#menu" className="hover:text-[#241c15] transition-colors whitespace-nowrap">Menu</a>
            <a href="#hours" className="hover:text-[#241c15] transition-colors whitespace-nowrap">Hours & Location</a>
            <a href="#sourcing" className="hover:text-[#241c15] transition-colors whitespace-nowrap">Sourcing</a>
          </nav>

          {/* Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#menu"
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#241c15] hover:bg-[#8b5435] rounded-md transition-all duration-200 shadow-xs whitespace-nowrap"
            >
              View Offerings
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* 2. Hero Section */}
        <section className="py-12 sm:py-16 md:py-24 border-b border-[#2b2118]/8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8b5435]">
                  Micro-Roastery & Café
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#241c15] leading-[1.15] text-balance">
                  Handcrafted coffee brewed with intention.
                </h1>
                <p className="text-base sm:text-lg text-[#6e6459] leading-relaxed max-w-xl">
                  Direct-trade single origin beans roasted in small batches weekly. Experience thoughtfully calibrated pour-overs, velvety espresso, and warm botanical infusions.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#241c15] hover:bg-[#8b5435] rounded-md transition-all duration-200 shadow-xs"
                  >
                    <span>Explore Daily Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#8b5435] bg-[#8b5435]/10 hover:bg-[#8b5435]/15 border border-[#8b5435]/20 rounded-md transition-all duration-200 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask CafeBot Assistant</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-[#2b2118]/8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#6e6459]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5435]" />
                    <span>100% Single-Origin Lots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5435]" />
                    <span>Roasted Fresh Weekly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5435]" />
                    <span>Direct-Trade Certified</span>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#2b2118]/5 border border-[#2b2118]/8 aspect-[16/10] bg-[#f5efe6]">
                <img
                  src="/src/assets/images/hero_cafe_ambiance_1794308226014.jpg"
                  alt="Sunlit modern CafeBot coffee shop interior with natural oak counter and espresso equipment"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. About Section */}
        <section id="about" className="py-16 sm:py-20 md:py-28 bg-[#f5efe6] border-b border-[#2b2118]/8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative rounded-xl overflow-hidden shadow-lg shadow-[#2b2118]/5 border border-[#2b2118]/8 aspect-[4/3] bg-white order-2 lg:order-1">
                <img
                  src="/src/assets/images/about_coffee_craft_1794308226409.jpg"
                  alt="Barista precision pour-over brewing technique with ceramic dripper and gooseneck kettle"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col gap-6 order-1 lg:order-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8b5435]">
                  Our Craft & Heritage
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#241c15] leading-snug text-balance">
                  Rooted in precision, committed to origin.
                </h2>
                <p className="text-sm sm:text-base text-[#6e6459] leading-relaxed">
                  At CafeBot, coffee is not just a morning ritual; it is a celebration of agricultural craftsmanship. We collaborate directly with high-elevation farming cooperatives in Huehuetenango, Yirgacheffe, and Huila to source seasonal green coffees with distinctive flavor signatures.
                </p>
                <p className="text-sm sm:text-base text-[#6e6459] leading-relaxed">
                  Each bean profile is roasted in small 12-kilogram batches, monitored second-by-second to unlock delicate floral aromatics, lively fruit acidity, and deep caramelized undertones.
                </p>

                <div id="sourcing" className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#2b2118]/8">
                  <div>
                    <h3 className="font-semibold text-sm text-[#241c15] mb-1">Transparent Sourcing</h3>
                    <p className="text-xs text-[#6e6459] leading-relaxed">Guaranteed living wages and ethical premiums paid directly to smallholder farming families.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#241c15] mb-1">Micro-Batch Calibrations</h3>
                    <p className="text-xs text-[#6e6459] leading-relaxed">Daily espresso dial-in adjustments for water mineralization, barometric shifts, and roast curves.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Menu Section (Product Cards: Name, Price, Description) */}
        <section id="menu" className="py-16 sm:py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 flex flex-col items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8b5435]">
                Curated Offerings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#241c15]">
                Seasonal Drinks & Pastries
              </h2>
              <p className="text-[#6e6459] text-sm sm:text-base leading-relaxed">
                Every beverage is hand-pulled on our custom pressure-profile machine, paired with organic dairy or house-made oat and almond milks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {menuItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-[#2b2118]/8 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2b2118]/5 hover:border-[#2b2118]/15 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-[#f5efe6] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Zero-Pill metadata: Clean unboxed text */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#8b5435] mb-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.badge}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241c15] leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base sm:text-lg font-medium text-[#241c15] tabular-nums shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6e6459] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-[#2b2118]/6 flex items-center justify-between text-xs text-[#998d80]">
                      <span>{item.specs}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Hours and Location Section */}
        <section id="hours" className="py-16 sm:py-20 md:py-28 bg-[#f5efe6] border-t border-b border-[#2b2118]/8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 flex flex-col items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8b5435]">
                Find Us
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#241c15]">
                Roastery, Tasting Room & Hours
              </h2>
              <p className="text-[#6e6459] text-sm sm:text-base leading-relaxed">
                Located in the historic arts district. Drop in for quiet morning work, espresso flights, or fresh roasted beans to go.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Location Card */}
              <div className="bg-white rounded-xl border border-[#2b2118]/8 p-5 sm:p-8 flex flex-col gap-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#8b5435]/10 text-[#8b5435] shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241c15]">Roastery & Tasting Room</h3>
                    <p className="text-xs sm:text-sm text-[#6e6459]">Historic Mill District</p>
                  </div>
                </div>

                <div className="space-y-1 text-sm sm:text-base text-[#241c15]">
                  <p className="font-medium">CafeBot Roastery</p>
                  <p className="text-[#6e6459]">428 Roaster&apos;s Way, Suite 102</p>
                  <p className="text-[#6e6459]">Portland, OR 97209</p>
                </div>

                <div className="pt-4 border-t border-[#2b2118]/8 space-y-2 text-xs sm:text-sm text-[#6e6459]">
                  <p><strong className="text-[#241c15]">Transit:</strong> 2 blocks east of Central Streetcar Station (Line B)</p>
                  <p><strong className="text-[#241c15]">Parking:</strong> Dedicated bicycle parking racks and 2-hour street parking on 4th Ave</p>
                  <div className="pt-2 flex flex-col gap-1.5">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#8b5435] shrink-0" />
                      <span>hello@cafebot.coffee</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#8b5435] shrink-0" />
                      <span>(503) 555-0192</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8b5435] hover:text-[#704126] transition-colors"
                  >
                    <span>Get Directions via Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-xl border border-[#2b2118]/8 p-5 sm:p-8 flex flex-col gap-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#8b5435]/10 text-[#8b5435] shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241c15]">Operating Schedule</h3>
                    <p className="text-xs sm:text-sm text-[#6e6459]">Fresh drip brewed all day</p>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center justify-between pb-3 border-b border-dashed border-[#2b2118]/15 text-xs sm:text-sm gap-2">
                    <span className="font-medium text-[#241c15] whitespace-nowrap">Monday – Thursday</span>
                    <span className="font-mono text-[#6e6459] tabular-nums whitespace-nowrap">07:00 – 18:00</span>
                  </li>
                  <li className="flex items-center justify-between pb-3 border-b border-dashed border-[#2b2118]/15 text-xs sm:text-sm gap-2">
                    <span className="font-medium text-[#241c15] whitespace-nowrap">Friday</span>
                    <span className="font-mono text-[#6e6459] tabular-nums whitespace-nowrap">07:00 – 19:00</span>
                  </li>
                  <li className="flex items-center justify-between pb-3 border-b border-dashed border-[#2b2118]/15 text-xs sm:text-sm gap-2">
                    <span className="font-medium text-[#241c15] whitespace-nowrap">Saturday</span>
                    <span className="font-mono text-[#6e6459] tabular-nums whitespace-nowrap">08:00 – 19:00</span>
                  </li>
                  <li className="flex items-center justify-between pb-3 border-b border-dashed border-[#2b2118]/15 text-xs sm:text-sm gap-2">
                    <span className="font-medium text-[#241c15] whitespace-nowrap">Sunday</span>
                    <span className="font-mono text-[#6e6459] tabular-nums whitespace-nowrap">08:00 – 17:00</span>
                  </li>
                </ul>

                <p className="text-xs text-[#8b5435] font-medium leading-relaxed bg-[#8b5435]/5 p-3 rounded-lg border border-[#8b5435]/10">
                  Kitchen and fresh pastry service runs until 15:00 daily. Espresso bar and retail bean counter remain open until closing.
                </p>

                <div className="text-xs text-[#998d80] font-mono">
                  * Roastery tours conducted Saturdays at 10:00 AM
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="bg-[#241c15] text-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-[#2b2118]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#8b5435]" />
                <span>CafeBot</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
                Dedicated to small-batch specialty coffee roasting, seasonal farm partnerships, and warm neighborhood hospitality.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 sm:mb-4">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Daily Menu</a></li>
                <li><a href="#hours" className="hover:text-white transition-colors">Hours & Location</a></li>
                <li><a href="#top" className="hover:text-white transition-colors">Back to Top</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 sm:mb-4">
                Offerings
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li><a href="#menu" className="hover:text-white transition-colors">Espresso Classics</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Pour-Over Bar</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Cold Brews</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Morning Bakery</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 sm:mb-4">
                Visit & Contact
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li><a href="mailto:hello@cafebot.coffee" className="hover:text-white transition-colors">hello@cafebot.coffee</a></li>
                <li><a href="tel:5035550192" className="hover:text-white transition-colors">(503) 555-0192</a></li>
                <li className="text-stone-400 text-xs leading-relaxed">428 Roaster&apos;s Way, Suite 102, Portland</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-stone-500 text-center sm:text-left">
            <p>&copy; 2026 CafeBot Roastery Co. All rights reserved.</p>
            <p>Handcrafted with care · Single-origin direct trade</p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING CAFEBOT CHAT WIDGET
          - Bottom-right button
          - Slide-up window (Header, message history, input, send)
          - Immediate customer bubble + fixed mock reply
          - Fully responsive for mobile and desktop
         ===================================================================== */}
      
      {/* Slide-Up Chat Window */}
      {isChatOpen && (
        <section
          aria-labelledby={chatTitleId}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[480px] sm:h-[500px] max-h-[calc(100dvh-6rem)] sm:max-h-[calc(100dvh-7.5rem)] bg-[#fcfaf7] border border-[#2b2118]/12 rounded-2xl shadow-2xl shadow-[#2b2118]/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Widget Header */}
          <div className="bg-[#241c15] text-white px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#2b2118] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8b5435] text-white flex items-center justify-center shadow-xs shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 id={chatTitleId} className="font-serif text-sm sm:text-base font-semibold text-white tracking-tight leading-tight">CafeBot</h2>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-stone-300">Concierge</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-400">Artisan Café Assistant</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close CafeBot chat"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick starter chips */}
          <div className="px-3 sm:px-4 py-2 bg-[#f5efe6] border-b border-[#2b2118]/8 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-none shrink-0">
            <span className="text-stone-500 shrink-0 font-medium text-[11px]">Ask:</span>
            <button
              type="button"
              onClick={() => handleSendMessage("What's your freshest roast today?")}
              className="px-2.5 py-1 bg-white hover:bg-[#8b5435]/10 text-stone-700 hover:text-[#8b5435] rounded-full border border-[#2b2118]/10 transition-colors shrink-0 text-[11px] cursor-pointer"
            >
              Today&apos;s Roast
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("Tell me about the cold brew")}
              className="px-2.5 py-1 bg-white hover:bg-[#8b5435]/10 text-stone-700 hover:text-[#8b5435] rounded-full border border-[#2b2118]/10 transition-colors shrink-0 text-[11px] cursor-pointer"
            >
              Cold Brew
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("What are your hours?")}
              className="px-2.5 py-1 bg-white hover:bg-[#8b5435]/10 text-stone-700 hover:text-[#8b5435] rounded-full border border-[#2b2118]/10 transition-colors shrink-0 text-[11px] cursor-pointer"
            >
              Store Hours
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#241c15] text-white rounded-br-xs'
                        : 'bg-white border border-[#2b2118]/8 text-[#241c15] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input & Send */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 sm:p-3 bg-white border-t border-[#2b2118]/8 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask CafeBot about coffee, hours..."
              className="flex-1 bg-[#fcfaf7] border border-[#2b2118]/15 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#241c15] placeholder:text-stone-400 focus:outline-none focus:border-[#8b5435] focus:ring-1 focus:ring-[#8b5435] transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Send message"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#241c15] text-white hover:bg-[#8b5435] disabled:opacity-40 disabled:hover:bg-[#241c15] disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
        </section>
      )}

      {/* Floating Toggle Button (Bottom-Right) */}
      <aside aria-label="CafeBot chat launcher" className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          aria-label={isChatOpen ? 'Close CafeBot chat' : 'Open CafeBot chat'}
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[#241c15] text-white hover:bg-[#8b5435] shadow-xl shadow-[#2b2118]/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isChatOpen ? (
            <>
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs font-semibold tracking-wide">Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <span className="text-xs font-semibold tracking-wide">Chat with CafeBot</span>
            </>
          )}
        </button>
      </aside>
    </div>
  );
}
