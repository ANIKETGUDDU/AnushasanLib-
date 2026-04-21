import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Battery, 
  Droplet, 
  UserRound, 
  Wind, 
  Phone, 
  MapPin, 
  Mail, 
  ChevronRight,
  Sparkles,
  Instagram,
  Facebook
} from 'lucide-react';

const IMAGES = [
  'IMG-20260421-WA0005.jpg',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
  'https://github.com/ANIKETGUDDU/AnushasanLib-/blob/668e8aa0e2d3ea25a78aa252a166b96ef2073b91/IMG-20260421-WA0001.jpg?w=1200&q=80'
];

const FACILITIES = [
  { icon: Wifi, text: "300 Mbps High Speed Wi-Fi" },
  { icon: Battery, text: "24/7 Power Backup (Inverter/Gen)" },
  { icon: Droplet, text: "Unlimited RO Water & Washrooms" },
  { icon: UserRound, text: "Wide Desks & Ergonomic Chairs" },
  { icon: Wind, text: "Fully Air Conditioned (AC)" },
];

const PLANS = [
  {
    name: "Morning",
    price: "600",
    time: "08:00 AM - 02:00 PM",
    shift: "Morning (8 AM - 2 PM)",
    highlight: false
  },
  {
    name: "Evening",
    price: "700",
    time: "02:00 PM - 09:00 PM",
    shift: "Evening (2 PM - 9 PM)",
    highlight: false
  },
  {
    name: "Full Day",
    price: "1200",
    time: "08:00 AM - 09:00 PM",
    shift: "Full Day (8 AM - 9 PM)",
    highlight: true
  }
];

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shift: 'Morning (8 AM - 2 PM)'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const selectShift = (shift: string) => {
    setFormData(prev => ({ ...prev, shift }));
    const bookingSection = document.getElementById('booking-section');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppRedirect = (e: FormEvent) => {
    e.preventDefault();
    const { name, phone, shift } = formData;
    const message = `*Admission Query - Anushashan Lib*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Shift:* ${shift}%0A%0APlease confirm seat availability.`;
    window.open(`https://wa.me/917033239457?text=${message}`, '_blank');
  };

  const facilityColors = ['bg-blue-50', 'bg-amber-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50'];

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-white">
      {/* Navigation */}
      <nav className="h-20 px-10 border-b flex items-center justify-between bg-white shrink-0 sticky top-0 z-50">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tighter uppercase">Anushashan</span>
          <span className="text-2xl font-black text-gold">LIB.</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Meerut Road, Ghaziabad</span>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold">Seats Available</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto min-h-[calc(100vh-80px)] grid lg:grid-cols-12 divide-x divide-gray-100">
        {/* Left Column: Hero & Facilities */}
        <section className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-between space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="geometric-divider mb-6"></div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                Premium Study <br/>
                <span className="text-gold">Sanctuary.</span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Designed for JEE, NEET, and UPSC aspirants. A high-discipline environment featuring zero-noise zones and premium comfort.
            </p>

            {/* Facilities Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {FACILITIES.map((facility, index) => (
                <div key={index} className="p-5 border border-gray-100 rounded-3xl flex items-center gap-4 bg-white hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-full ${facilityColors[index % facilityColors.length]} flex items-center justify-center text-xl`}>
                    <facility.icon size={24} className="text-navy/70" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Feature {index + 1}</p>
                    <p className="font-bold text-sm md:text-base">{facility.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Slider Container */}
          <div className="relative h-64 md:h-80 w-full rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={IMAGES[currentImage]}
                alt="Library Interior"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1 }}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {IMAGES.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/40'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Plans & Booking */}
        <section className="lg:col-span-5 navy-gradient p-8 md:p-16 text-white flex flex-col justify-between space-y-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-px bg-gold"></span> 
                Membership Plans
              </h2>
              
              <div className="space-y-4">
                {PLANS.map((plan) => (
                  <div 
                    key={plan.name}
                    onClick={() => selectShift(plan.shift)}
                    className={`
                      flex justify-between items-center p-5 rounded-2xl border transition-all cursor-pointer group
                      ${plan.highlight 
                        ? 'gold-gradient text-navy border-transparent shadow-xl scale-[1.02]' 
                        : 'border-white/10 hover:border-gold/50 bg-white/5'
                      }
                    `}
                  >
                    <div className="flex flex-col">
                      <span className={`font-bold text-lg ${plan.highlight ? 'font-black' : ''}`}>{plan.name} Shift</span>
                      <span className={`text-[10px] uppercase tracking-widest opacity-60 font-bold`}>{plan.time}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl font-bold ${plan.highlight ? 'font-black' : ''}`}>₹{plan.price}</span>
                      <span className="text-[10px] opacity-60 ml-2 font-bold">/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form Integration */}
            <div id="booking-section" className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-6">Instant Reservation</h3>
              <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm outline-none focus:border-gold transition-all text-white placeholder:text-white/40"
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm outline-none focus:border-gold transition-all text-white placeholder:text-white/40"
                />
                <select 
                  value={formData.shift}
                  onChange={(e) => setFormData(prev => ({ ...prev, shift: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm outline-none focus:border-gold transition-all text-white cursor-pointer appearance-none"
                >
                  {PLANS.map(p => <option key={p.shift} value={p.shift} className="text-navy">{p.shift}</option>)}
                </select>
                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1fb355] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 active:scale-95">
                  BOOK VIA WHATSAPP 📱
                </button>
              </form>
            </div>
          </div>

          {/* Footer Info inside Sidebar */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-6">
            <div className="text-[11px] font-medium opacity-60 space-y-1">
              <p className="flex items-center gap-2 italic"> <Phone size={10} /> +91 70332 39457</p>
              <p className="flex items-center gap-2 italic"> <MapPin size={10} /> Sihani Chungi, Ghaziabad</p>
              <p className="flex items-center gap-2 italic"> <Mail size={10} /> contact@anushashanlib.com</p>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-xs font-black hover:bg-gold hover:border-transparent transition-all">IG</a>
              <a href="#" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-xs font-black hover:bg-gold hover:border-transparent transition-all">FB</a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Visual Quote / Footer */}
      <footer className="bg-white py-12 px-10 text-center border-t border-gray-50 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 blur-[100px]" />
        <div className="relative z-10">
          <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">A legacy of focus</p>
          <div className="text-2xl font-black italic mb-2 tracking-tighter uppercase">
            Anushashan<span className="text-gold">LIB.</span>
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase opacity-60 mt-4">© 2024 Ghaziabad Hub • Established for Excellence</p>
        </div>
      </footer>
    </div>
  );
}
