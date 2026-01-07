import React, { useState } from 'react';
import { Button } from "./button"
import { Key } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const pageLinks = ['Product', 'Features'];
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tight text-blue-600">
              MANAGE
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {pageLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <Button>
                <Key className="mr-2 h-4 w-4" />
                Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1">
          {['Product', 'Features', 'Marketplace', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              {item}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;