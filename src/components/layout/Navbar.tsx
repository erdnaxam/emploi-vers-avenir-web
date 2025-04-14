
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, BookOpen, File, LifeBuoy, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Always include Home in navigation
  const navLinks = [
    { name: 'Accueil', path: '/', icon: <Home className="h-5 w-5 mr-1" /> },
  ];
  
  // Add authenticated links only if user is logged in
  if (isAuthenticated) {
    navLinks.push(
      { name: 'Mon parcours', path: '/dashboard', icon: <BookOpen className="h-5 w-5 mr-1" /> },
      { name: 'Documents', path: '/documents', icon: <File className="h-5 w-5 mr-1" /> }
    );
  }
  
  // Always include help
  navLinks.push({ name: 'Aide', path: '/aide', icon: <LifeBuoy className="h-5 w-5 mr-1" /> });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Emploi<span className="text-accent">Avenir</span></span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={cn(
                  "text-foreground hover:text-primary transition-colors duration-200",
                  location.pathname === link.path && "bg-primary/10 text-primary font-medium"
                )}
              >
                <Link to={link.path} className="flex items-center">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </Button>
            ))}
            {isAuthenticated && (
              <Button variant="ghost" asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span>Compte</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-2 space-y-1 animate-slide-in">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={cn(
                  "w-full justify-start text-foreground hover:text-primary transition-colors duration-200",
                  location.pathname === link.path && "bg-primary/10"
                )}
              >
                <Link to={link.path} onClick={() => setIsOpen(false)} className="flex items-center">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </Button>
            ))}
            {isAuthenticated && (
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span>Compte</span>
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
