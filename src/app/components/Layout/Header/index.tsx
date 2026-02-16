"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import Signin from "@/app/components/Auth/SignIn";
import SignUp from "@/app/components/Auth/SignUp";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HeaderItem } from "@/app/types/menu";
import { useLocale } from "next-intl";
import { getNavigationData } from "@/data/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AccessModal from "@/app/components/PrivateBook/AccessModal";
import { AuthStatus } from "@/app/components/Auth/AuthStatus";
import { ThemeSwitcher } from "../../Theme/ThemeSwitcher";

interface HeaderProps {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const locale = useLocale();
  const [headerData, setHeaderData] = useState<HeaderItem[]>([]);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [isBookAccessOpen, setIsBookAccessOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use navigation data instead of API
    const navData = getNavigationData(locale as 'ar' | 'en' | 'fr');
    setHeaderData(navData);
  }, [locale]);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  }, [navbarOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen, handleClickOutside]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <>
      <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        sticky 
          ? "bg-white/90 dark:bg-brand-navy-dark/95 backdrop-blur-md py-4 border-b border-brand-sky/20 dark:border-white/10 shadow-soft-sm" 
          : "bg-white py-2 dark:bg-brand-navy-dark/0"
      }`}
      role="banner"
    >
      <div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          <Logo />
          <nav 
            className={`hidden lg:flex grow items-center gap-2 justify-center ${
    locale === "ar" ? "text-[2rem]" : "text-[2rem]"
  }`}
            role="navigation"
            aria-label="Main navigation"
          >
            {headerData.map((item, index) => {
               // Intercept "Book Access" item in submenu
               // Since HeaderLink renders submenus, we might need to modify HeaderLink OR modify the data.
               // However, HeaderLink is a separate component. 
               // Easiest way: If we can't change HeaderLink easily here, we should pass a prop or use a context.
               // BUT: HeaderLink likely uses <Link>. 
               
               // Better approach for this specific codebase:
               // Create a handler that checks the href in the Link component.
               // Since `HeaderLink` is imported, let's see if we can pass an `onClick` or intercept via a custom updated `headerData`.
               
               // NOTE: If HeaderLink just renders links, we might need to REPLACE the href with '#' and add an onClick.
               // But HeaderLink might not accept onClick for sub-items easily if it maps them internally.
               
               // LET'S MODIFY THE DATA TO TRIGGER THE MODAL
               // We can't pass functions in serializable data easily if it's strictly typed as HeaderItem without functions.
               // Let's modify HeaderLink to accept a special "action" or handle specific hrefs.
               
               // Actually, simpler: 
               // We will modify `HeaderLink.tsx` to accept an `onBookAccessClick` prop, 
               // OR we verify if `HeaderLink` exposes a way to handle clicks.
               
               // Seeing `HeaderLink` usage: <HeaderLink key={...} item={item} />.
               // I need to modify HeaderLink to support this.
               // For now, I will modify HeaderLink in the NEXT step.
               // Here I will pass the handler if I update HeaderLink signature.
               
               return (
                  <HeaderLink 
                    key={`${item.href}-${index}`} 
                    item={item} 
                    onBookAccessClick={() => setIsBookAccessOpen(true)}
                  />
               );
            })}
          </nav>
          <div className="flex items-center gap-3 lg:gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            <div className="hidden lg:flex items-center gap-3">
              <AuthStatus user={user || null} />
            </div>

            {isSignInOpen && (
              <div 
                className="fixed inset-0 bg-brand-navy-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setIsSignInOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="signin-title"
              >
                <div
                  ref={signInRef}
                  className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl px-8 pt-14 pb-8 text-center bg-white dark:bg-brand-navy-dark backdrop-blur-xl border border-white/20 shadow-soft-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsSignInOpen(false)}
                    className="absolute top-4 end-4 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sky/10 text-brand-navy dark:text-white hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <Icon icon="material-symbols:close-rounded" width={24} height={24} />
                  </button>
                  <Signin />
                </div>
              </div>
            )}

            {isSignUpOpen && (
              <div 
                className="fixed inset-0 bg-brand-navy-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setIsSignUpOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="signup-title"
              >
                <div
                  ref={signUpRef}
                  className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl px-8 pt-14 pb-8 text-center bg-white dark:bg-brand-navy-dark backdrop-blur-xl border border-white/20 shadow-soft-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsSignUpOpen(false)}
                    className="absolute top-4 end-4 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sky/10 text-brand-navy dark:text-white hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <Icon icon="material-symbols:close-rounded" width={24} height={24} />
                  </button>
                  <SignUp />
                </div>
              </div>
            )}

            <AccessModal 
                isOpen={isBookAccessOpen} 
                closeModal={() => setIsBookAccessOpen(false)} 
                locale={locale}
            />
            
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-brand-sky/10 dark:bg-brand-sky/5 text-brand-navy dark:text-white hover:bg-brand-sky/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Toggle mobile menu"
              aria-expanded={navbarOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${navbarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ${navbarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${navbarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {navbarOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNavbarOpen(false)}
            className="fixed inset-0 bg-brand-navy-dark/80 backdrop-blur-sm z-50" 
            aria-hidden="true"
          />
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ x: locale === 'ar' ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed inset-y-0 h-dvh w-full bg-white dark:bg-brand-navy-dark backdrop-blur-xl border-s border-brand-sky/20 dark:border-white/10 shadow-soft-lg max-w-sm z-60 end-0 flex flex-col`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-sky/20 dark:border-white/10">
              <button
                onClick={() => setNavbarOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sky/10 text-brand-navy dark:text-white hover:bg-brand-orange hover:text-white transition-colors"
              >
                <Icon icon="material-symbols:close-rounded" width={24} height={24} />
              </button>
              <Logo />
            </div>
            <nav 
              className="flex flex-col items-start p-6 overflow-y-auto grow"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="w-full space-y-1 mb-8 text-brand-navy dark:text-white">
                {headerData.map((item, index) => (
                  <MobileHeaderLink 
                    key={`${item.href}-${index}`} 
                    item={item} 
                    onClick={() => setNavbarOpen(false)} 
                    onBookAccessClick={() => setIsBookAccessOpen(true)}
                  />
                ))}
              </div>
              
              <div className="mt-auto w-full space-y-4 pt-6 border-t border-brand-sky/20 dark:border-white/10">
                <div className="p-4 bg-brand-sky/5 dark:bg-white/5 rounded-2xl text-brand-navy dark:text-white flex items-center justify-between">
                   <LanguageSwitcher />
                   <ThemeSwitcher />
                </div>
                <div className="pt-4 border-t border-brand-sky/20 dark:border-white/10">
                   <AuthStatus user={user || null} />
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
};

export default Header;
