import React, { useState } from 'react';
import { Button } from "./button"
import { Link } from 'react-router-dom';
import { Key, Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pageLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            MANAGE
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 mr-4">
            {pageLinks.map((link) => (
              <Link
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-3">
             <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3">
               Log in
             </Link>
             <Button className="rounded-full px-5 bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
               Get Started
             </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            {pageLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border/40 flex flex-col gap-3">
               <a href="/login" className="text-center py-2 font-medium text-muted-foreground">
                 Log in
               </a>
               <Button className="w-full rounded-xl bg-linear-to-r from-primary to-blue-600">
                 Get Started Free
               </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;