import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: '~/home', href: '#hero' },
    { name: './skills', href: '#skills' },
    { name: './projects', href: '#projects' },
    { name: './contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-mr-black/90 backdrop-blur-sm border-b border-mr-gray/30 font-mono text-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo area */}
        <div className="flex items-center gap-2 text-mr-white">
          <Terminal size={18} className="text-mr-red" />
          <span className="font-bold tracking-widest">PAVLO_SYSTEM</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-400 hover:text-mr-red hover:underline decoration-mr-red underline-offset-4 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="border border-mr-green text-mr-green px-2 py-0.5 text-xs animate-pulse">
            [CONNECTED]
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-mr-white hover:text-mr-red"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-mr-black border-b border-mr-gray absolute w-full px-6 py-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-mr-red block py-2 border-l-2 border-transparent hover:border-mr-red pl-4 transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="text-mr-green text-xs mt-4 pt-4 border-t border-mr-gray/30">
            STATUS: ENCRYPTED CONNECTION
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;