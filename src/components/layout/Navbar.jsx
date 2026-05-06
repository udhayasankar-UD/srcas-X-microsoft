import React, { useState, useRef, useEffect } from "react";
import {
  House,
  Handshake,
  Trophy,
  Star,
  Calendar,
  Users,
  Info,
  Phone,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home",      label: "Home",      icon: House,     href: "#home" },
  { id: "about",     label: "About",     icon: Users,     href: "#about" },
  { id: "problems",  label: "Problems",  icon: Handshake, href: "#problems" },
  { id: "prizes",    label: "Prizes",    icon: Trophy,    href: "#prizes" },
  { id: "finalists", label: "Finalists", icon: Star,      href: "#finalists" },
  { id: "timeline",  label: "Timeline",  icon: Calendar,  href: "#timeline" },
  { id: "faq",       label: "FAQs",      icon: Info,      href: "#faq" },
  { id: "contact",   label: "Contact",   icon: Phone,     href: "#contact" },
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 80) setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}

// Desktop Navbar
const DesktopNavBar = () => {
  const activeSection = useActiveSection();
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="fixed hidden sm:block top-8 left-10 z-50">
      <nav className="flex flex-col gap-4">
        {NAV_ITEMS.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          const isHovered = hoveredTab === item.id;
          const LucideIcon = item.icon;

          return (
            <a
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={[
                "relative flex items-center h-12 rounded-full",
                "transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
                "overflow-hidden backdrop-blur-xl border",
                isActive
                  ? "bg-[#005CAA] text-white border-[#005CAA] shadow-lg shadow-blue-900/20"
                  : "bg-white/70 text-gray-600 border-white/40 hover:bg-white/90 hover:border-white/60 shadow-sm",
              ].join(" ")}
              style={{
                width: isHovered || isActive ? "auto" : "48px",
                paddingRight: isHovered || isActive ? "20px" : "0",
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <LucideIcon size={22} strokeWidth={2} />
              </div>
              <span
                className={[
                  "whitespace-nowrap font-medium text-sm transition-all duration-300",
                  isHovered || isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 w-0",
                ].join(" ")}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

// Mobile Navbar
const MobileNavBar = () => {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = () => {
    if (isOpen) {
      setShowLabels(false);
      setTimeout(() => setIsOpen(false), 200);
    } else {
      setIsOpen(true);
      setTimeout(() => setShowLabels(true), 300);
    }
  };

  const handleLinkClick = () => {
    setShowLabels(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowLabels(false);
        setTimeout(() => setIsOpen(false), 200);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed sm:hidden top-8 right-4 z-50">
      <div
        ref={menuRef}
        className={[
          "relative flex flex-col rounded-3xl bg-white backdrop-blur-[20px]",
          "border border-[#E2E8F0] shadow-lg transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "p-3 gap-2" : "p-0",
          showLabels ? "w-48" : isOpen ? "w-16" : "w-14",
        ].join(" ")}
      >
        {/* Partial border accent */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <rect
            x="0" y="0"
            width="calc(100% + 0.3px)"
            height="calc(100% + 0.3px)"
            rx="24"
            fill="none"
            stroke="rgba(0, 92, 170, 0.3)"
            strokeWidth="0.6"
            strokeDasharray="90% 80%"
            strokeDashoffset="20%"
          />
        </svg>

        {/* Hamburger / Close */}
        <button
          onClick={handleToggle}
          className={[
            "flex items-center justify-center shrink-0 rounded-2xl bg-[#005CAA]",
            "transition-all duration-300 ease-out active:scale-95",
            isOpen ? "w-10 h-10 self-end" : "w-14 h-14",
          ].join(" ")}
        >
          {isOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        {/* Nav Items */}
        <div
          className={[
            "flex flex-col gap-1 transition-all duration-300 ease-out overflow-hidden",
            isOpen ? "max-h-125 opacity-100 pt-2" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            const LucideIcon = item.icon;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center gap-4 h-10 px-2 rounded-xl transition-all duration-300 ease-out focus:outline-none hover:bg-[#005CAA]/10"
              >
                <div
                  className={[
                    "shrink-0 flex items-center justify-center w-6 h-6 transition-all duration-300",
                    isActive ? "text-[#005CAA]" : "text-[#003366]/60",
                  ].join(" ")}
                >
                  <LucideIcon size={24} strokeWidth={1.5} />
                </div>
                <span
                  className={[
                    "text-base font-medium whitespace-nowrap transition-all duration-300",
                    isActive ? "text-[#005CAA] font-semibold" : "text-[#003366]/80",
                    showLabels
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4 pointer-events-none",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => (
  <>
    {/* <DesktopNavBar />
    <MobileNavBar /> */}
  </>
);

export default Navbar;
