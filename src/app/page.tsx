
'use client';

import Link from 'next/link';
import { Bot, Menu, X, ChevronDown, ArrowRight, Lightbulb, TrendingUp, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Contact } from '@/components/landing/Contact';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';


function PromotionPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative m-4 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Zap className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold font-headline">
                                Unlock Your Potential
                            </h2>
                            <p className="mb-6 text-muted-foreground">
                                Create unlimited questions on unlimited topics and sub-topics for just <span className="font-bold text-primary">₹399 per month</span>.
                            </p>
                            <Button size="lg" className="w-full" asChild>
                                <Link href="/#pricing">
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
        name: 'Features',
        href: '#features',
        hasDropdown: true,
        dropdownItems: [
            { name: 'AI Quiz Generation', href: '#features', description: 'Personalized quizzes on any topic.', icon: <Lightbulb className="h-5 w-5 text-primary" /> },
            { name: 'Performance Analytics', href: '#features', description: 'Track progress and weak spots.', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
            { name: 'Pomodoro Timer', href: '#features', description: 'Stay focused during study sessions.', icon: <Timer className="h-5 w-5 text-primary" /> },
        ]
    },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const headerStyle = {
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      backgroundColor: isScrolled ? 'hsl(var(--background) / 0.8)' : 'transparent',
      borderBottom: isScrolled ? '1px solid hsl(var(--border) / 0.1)' : '1px solid transparent',
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  };

    const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={headerStyle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">WisdomIsFun</span>
          </Link>
          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
               <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                 <a
                  href={item.href}
                  className="text-foreground flex items-center space-x-1 font-medium transition-colors duration-200 hover:text-primary"
                >
                  <span>{item.name}</span>
                   {item.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </a>
                 {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="border-border bg-background/95 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-md overflow-hidden rounded-xl border shadow-xl backdrop-blur-lg"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                      >
                       <div className="p-4 grid grid-cols-1 gap-4">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="hover:bg-muted flex items-start gap-4 rounded-lg p-3 transition-colors duration-200"
                          >
                           <div className="p-2 bg-primary/10 rounded-md mt-1">
                                {dropdownItem.icon}
                            </div>
                            <div>
                                <div className="text-foreground font-semibold">
                                {dropdownItem.name}
                                </div>
                                {dropdownItem.description && (
                                <div className="text-muted-foreground text-sm">
                                    {dropdownItem.description}
                                </div>
                                )}
                            </div>
                          </Link>
                        ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden items-center space-x-4 lg:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          <motion.button
            className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg mb-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="space-y-2 px-4 py-2 border-t border-border">
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}


function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 px-4 md:px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                     <Link href="/" className="flex items-center space-x-2">
                        <Bot className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold font-headline">WisdomIsFun</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">AI-Powered NEET/JEE Practice Quizzes.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
                        <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-primary">Service Delivery</Link></li>
                        <li><Link href="/cancellation-and-refund-policy" className="text-muted-foreground hover:text-primary">Cancellation & Refund</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="text-muted-foreground hover:text-primary">Features</a></li>
                        <li><a href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                        <li><a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Contact</h4>
                     <a href="mailto:hii@support.wisdomis.fun" className="text-sm text-muted-foreground hover:text-primary">hii@support.wisdomis.fun</a>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} WisdomIsFun. All rights reserved.
            </div>
        </footer>
    );
}


export default function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay to not be too intrusive
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
       <PromotionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
       <AppHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
