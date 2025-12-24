"use client";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";

// Dynamically import the About section from app/public/about/page.tsx
const AboutSection = dynamic(() => import("./public/about/page"), { ssr: false });
// Dynamically import the Skills section from app/public/skills/page.tsx
const SkillsSection = dynamic(() => import("./public/skills/page"), { ssr: false });
// Dynamically import the Projects section from app/public/projects/page.tsx
const ProjectsSection = dynamic(() => import("./public/projects/page"), { ssr: false });
// Dynamically import the Education section from app/public/education/page.tsx
const EducationSection = dynamic(() => import("./public/education/page"), { ssr: false });
// Dynamically import the Experience section from app/public/experience/page.tsx
const ExperienceSection = dynamic(() => import("./public/experience/page"), { ssr: false });
// Dynamically import the Achievements section from app/public/achievements/page.tsx
const AchievementsSection = dynamic(() => import("./public/achievements/page"), { ssr: false });
// Dynamically import the Gallery section from app/public/gallery/page.tsx
const GallerySection = dynamic(() => import("./public/gallery/page"), { ssr: false });
// Dynamically import the Contact section from app/public/contact/page.tsx
const ContactSection = dynamic(() => import("./public/contact/page"), { ssr: false });

  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import {
    Mail, Phone, MapPin, Download, Github, Linkedin, Facebook, Instagram,
    Code, Terminal, Cpu, Database, Server, Smartphone, Globe,
    Layers, GitBranch, GitCommit, GitPullRequest, Bug, Zap, Rocket,
    Cpu as CPU, Shield, Lock, Unlock, Wifi, WifiOff, Eye, EyeOff,
    Type, Bold, Italic, Underline, Hash, Plus, Minus, Divide, X as Multiply, X,
    CheckCircle, XCircle, AlertCircle, Info, ExternalLink, ChevronRight,
    ArrowRight, TrendingUp, Users, Award, Calendar, Clock, Sparkles,
    Coffee, Heart, Star, Target, Flag, Trophy, Medal, Crown, Brain,
    Microscope, Beaker, Atom, Code2, Brackets, Parentheses, Palette,
    Braces, Slash, Circle, Square, Triangle, Hexagon, Octagon,
    Play, Pause, FastForward, Rewind, SkipBack, SkipForward,
    Volume2, VolumeX, Mic, MicOff, Video, VideoOff, Camera,
    Image as ImageIcon, FileText, FileCode, FileJson, FileType,
    Folder, FolderOpen, HardDrive, Save, Upload, Download as DownloadIcon,
    Trash2, Edit, Copy, Scissors, RotateCcw, RotateCw,
    Maximize, Minimize, Grid, List, Menu, MoreHorizontal,
    Search, Filter, SortAsc, SortDesc, Layout, Sidebar,
    Settings, User, Bell, Inbox, Send, Mail as MailIcon,
    MessageSquare, MessageCircle, ThumbsUp, ThumbsDown,
    Heart as HeartIcon, Bookmark, Share, RefreshCw, RefreshCcw,
    Link as LinkIcon, Unlink, Key, Lock as LockIcon, Unlock as UnlockIcon,
    UserPlus, UserMinus, UserCheck, UserX, Users as UsersIcon,
    Tag, Hash as HashIcon, AtSign, DollarSign, Percent,
    PieChart, BarChart, LineChart, Activity, BarChart2,
    TrendingUp as TrendingUpIcon, TrendingDown, DownloadCloud,
    UploadCloud, Cloud, CloudRain, CloudSnow, CloudLightning,
    Sun, Moon, Sunset, Sunrise, Wind, Thermometer, Droplets,
    Umbrella, Mountain, Navigation, Compass, Map,
    Globe as GlobeIcon, Navigation2, MapPin as MapPinIcon,
    Car, Bike, Bus, Train, Plane, Ship, Truck, Navigation as NavigationIcon,
    Briefcase, Building, Home as HomeIcon, Hotel, Castle,
    Church, School, Factory, Store, ShoppingCart, Package,
    CreditCard, Wallet, Banknote, Coins, Bitcoin, DollarSign as DollarIcon,
    Euro, Currency, ShoppingBag, Tag as TagIcon,
    Percent as PercentIcon, Calculator, Divide as DivideIcon,
    Plus as PlusIcon, Minus as MinusIcon, X as XIcon,
    Equal,
    ChevronDown, ChevronLeft, ChevronRight as ChevronRightIcon,
    ArrowUp, ArrowDown, ArrowLeft, ArrowRight as ArrowRightIcon,
    Move, RotateCw as Rotate, Scale, Crop, PenTool, Type as TypeIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon,
    Strikethrough, Highlighter, Pilcrow, Quote, Code as CodeIcon,
    Terminal as TerminalIcon, Command, Keyboard, Mouse,
    Headphones, Speaker, Tv, Monitor, Smartphone as SmartphoneIcon,
    Tablet, Watch, Camera as CameraIcon, Video as VideoIcon,
    Music, Headphones as HeadphonesIcon, Radio, Mic as MicIcon,
    Volume as VolumeIcon, Volume1, Volume2 as Volume2Icon,
    VolumeX as VolumeXIcon, Play as PlayIcon, Pause as PauseIcon, FastForward as FastForwardIcon,
    Rewind as RewindIcon, SkipBack as SkipBackIcon,
    SkipForward as SkipForwardIcon, Repeat, Shuffle,
    Folder as FolderIcon, FolderPlus, FolderMinus, FolderOpen as FolderOpenIcon,
    File as FileIcon, FilePlus, FileMinus, FileText as FileTextIcon,
    FileCode as FileCodeIcon, FileImage, FileVideo, FileAudio,
    FileArchive, FileSpreadsheet, File as FileTypeIcon,
    Database as DatabaseIcon, Server as ServerIcon, HardDrive as HardDriveIcon,
    Cpu as CpuIcon, Cpu as ChipIcon, MemoryStick, Router, Wifi as WifiIcon,
    Bluetooth, RadioTower, Satellite, Signal, SignalHigh, SignalMedium,
    SignalLow, SignalZero, Battery, BatteryCharging, BatteryFull,
    BatteryMedium, BatteryLow, Power, Zap as ZapIcon,
    Sunrise as SunriseIcon, Sunset as SunsetIcon, Moon as MoonIcon,
    Star as StarIcon, Cloud as CloudIcon, CloudRain as CloudRainIcon,
    CloudSnow as CloudSnowIcon, CloudLightning as CloudLightningIcon,
    Umbrella as UmbrellaIcon, Wind as WindIcon, Thermometer as ThermometerIcon,
    Droplets as DropletsIcon, Flower, Leaf,
    Apple, Banana, Carrot, Coffee as CoffeeIcon, Wine,
    Beer, Pizza, Cake, Cookie, IceCream, Drumstick, Fish,
    Egg, Milk, Salad, Soup, Utensils,
    ChefHat, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
    Truck as TruckIcon, Ship as ShipIcon, Plane as PlaneIcon,
    Train as TrainIcon, Bus as BusIcon, Car as CarIcon, Bike as BikeIcon,
    Navigation as Navigation2Icon, Compass as CompassIcon, Wrench,
    Map as MapIcon, Globe2, Navigation2 as Navigation3Icon,
    MapPin as MapPin2Icon, Flag as FlagIcon, Target as TargetIcon,
    Award as AwardIcon, Trophy as TrophyIcon, Medal as MedalIcon,
    Crown as CrownIcon, Shield as ShieldIcon, Lock as Lock2Icon,
    Unlock as Unlock2Icon, Key as KeyIcon, Eye as EyeIcon,
    EyeOff as EyeOffIcon, User as UserIcon, Users as Users2Icon,
    UserPlus as UserPlusIcon, UserMinus as UserMinusIcon,
    UserCheck as UserCheckIcon, UserX as UserXIcon,
    Mail as Mail2Icon, Mailbox, Inbox as InboxIcon,
    Send as SendIcon, MessageSquare as MessageSquareIcon,
    MessageCircle as MessageCircleIcon, Bell as BellIcon,
    Home as Home2Icon, Building as BuildingIcon,
    Hotel as HotelIcon, Castle as CastleIcon, Church as ChurchIcon,
    School as SchoolIcon, Factory as FactoryIcon, Store as StoreIcon,
    CreditCard as CreditCardIcon,
    Wallet as WalletIcon, Banknote as BanknoteIcon, Coins as CoinsIcon,
    Bitcoin as BitcoinIcon, DollarSign as Dollar2Icon, Euro as EuroIcon,
    ShoppingBag as ShoppingBagIcon, Percent as Percent2Icon,
    Calculator as CalculatorIcon, Hash as Hash2Icon,
    AtSign as AtSignIcon, Asterisk, Infinity, Pi, Sigma,
    Omega,
    Check, X as X2Icon, HelpCircle, AlertTriangle,
    AlertOctagon, AlertCircle as AlertCircleIcon,
    Info as InfoIcon, CheckCircle as CheckCircleIcon,
    XCircle as XCircleIcon, Clock as ClockIcon,
    Calendar as CalendarIcon, Watch as WatchIcon,
    Timer, Hourglass, Moon as Moon2Icon,
    Cloud as Cloud2Icon, CloudRain as CloudRain2Icon,
    CloudSnow as CloudSnow2Icon, CloudLightning as CloudLightning2Icon,
    Wind as Wind2Icon, Thermometer as Thermometer2Icon,
    Droplets as Droplets2Icon,
    Flower as FlowerIcon, Leaf as LeafIcon,
    Coffee as Coffee2Icon, Wine as WineIcon, Beer as BeerIcon,
    Pizza as PizzaIcon, Cake as CakeIcon, Cookie as CookieIcon,
    IceCream as IceCreamIcon, Drumstick as DrumstickIcon,
    Fish as FishIcon, Egg as EggIcon, Milk as MilkIcon,
    Salad as SaladIcon,
    Soup as SoupIcon, Utensils as UtensilsIcon,
    ChefHat as ChefHatIcon, ShoppingCart as ShoppingCart2Icon,
    Package as Package2Icon, Truck as Truck2Icon,
    Ship as Ship2Icon, Plane as Plane2Icon, Train as Train2Icon,
    Bus as Bus2Icon, Car as Car2Icon, Bike as Bike2Icon,
    Navigation as Navigation4Icon, Compass as Compass2Icon,
    Map as Map2Icon, Globe as Globe2Icon, Navigation2 as Navigation5Icon,
    MapPin as MapPin3Icon
  } from "lucide-react";
  import { Graduate } from "next/font/google";

  interface About {
    title: string;
    shortBio: string;
    longBio: string;
    email: string;
    phone?: string;
    location?: string;
    resumeUrl?: string;
    profileImageUrl?: string;
    highlights?: string[];
    motto?: string;
  }

  async function getData<T = any>(url: string): Promise<T | null> {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }

  // Coding icons for software engineering
  const codingIcons = [
    Code, Terminal, Cpu, Database, Server, Cloud, Smartphone, Globe,
    Layers, GitBranch, GitCommit, GitPullRequest, Bug, Zap, Rocket,
    Shield, Lock, Brackets, Parentheses, Braces,
    Code2, FileCode, FileJson, FileType, HardDrive, Command,
    Keyboard, Monitor, MemoryStick,
    Router, Bluetooth, Satellite, Signal, BatteryCharging, Power
  ] as const;

  const Typewriter = ({ text, delay, className }: { text: string; delay: number; className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, delay);

      return () => clearInterval(interval);
    }, [text, delay]);

    return <span className={className}>{displayedText}</span>;
  };

  const GraduationCap = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
  );


    const BriefcaseIcon = ({ size = 24, className = "" }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7v-2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="14" x2="12" y2="14.01" />
      </svg>
    );

  const SectionHeader = ({ title, subtitle, codeComment }: { title: string; subtitle: string; codeComment: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4"
      >
        <Code2 className="w-5 h-5 text-blue-400" />
        <span className="font-mono text-sm text-blue-400/90">{codeComment}</span>
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "96px" }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mx-auto mt-6 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 rounded-full"
      />
    </motion.div>
  );

  export default function Home() {
    const [about, setAbout] = useState<About | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [education, setEducation] = useState<any[]>([]);
    const [experience, setExperience] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState("about");
    const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
    const [floatingIcons, setFloatingIcons] = useState<Array<{
      x: number;
      y: number;
      iconIndex: number;
      size: number;
      speed: number;
      direction: number;
    }>>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedGalleryItem, setSelectedGalleryItem] = useState<any>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
    const [selectedAlbumItem, setSelectedAlbumItem] = useState<any>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
      // Generate floating coding icons
      const icons = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        iconIndex: Math.floor(Math.random() * codingIcons.length),
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1
      }));
      setFloatingIcons(icons);

      const loadData = async () => {
        try {
          const [
            aboutData,
            skillsData,
            projectsData,
            educationData,
            experienceData,
            achievementsData,
            galleryData,
            contactsData,
          ] = await Promise.all([
            getData<About>("/api/about"),
            getData<any[]>("/api/skills"),
            getData<any[]>("/api/projects"),
            getData<any[]>("/api/education"),
            getData<any[]>("/api/experience"),
            getData<any[]>("/api/achievements"),
            getData<any[]>("/api/gallery"),
            getData<any[]>("/api/contact"),
          ]);

          console.log("About data received:", aboutData);
          
          setAbout(aboutData);
          setSkills(skillsData ?? []);
          setProjects(projectsData ?? []);
          setEducation(educationData ?? []);
          setExperience(experienceData ?? []);
          setAchievements(achievementsData ?? []);
          setGallery(galleryData ?? []);
          setContacts(contactsData ?? []);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const sections = ["about", "skills", "projects", "education", "experience", "achievements", "gallery", "contact"];

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(id);
              break;
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Keyboard navigation for album modal
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isAlbumModalOpen || !selectedAlbumItem) return;

        if (e.key === "Escape") {
          setIsAlbumModalOpen(false);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev - 1 + (selectedAlbumItem.images?.length || 1)) % (selectedAlbumItem.images?.length || 1));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev + 1) % (selectedAlbumItem.images?.length || 1));
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isAlbumModalOpen, selectedAlbumItem, currentImageIndex]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!name.trim() || !email.trim() || !message.trim()) {
        setError("Please fill in all fields.");
        return;
      }

      try {
        setSubmitting(true);

        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message, status: "new" }),
        });

        const subject = encodeURIComponent(`New message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:k.saayinath@gmail.com?subject=${subject}&body=${body}`;

        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };

    const navLinks = [
      { id: "about", label: "About", icon: User },
      { id: "skills", label: "Skills", icon: Zap },
      { id: "projects", label: "Projects", icon: Code },
      { id: "education", label: "Education", icon: GraduationCap },
      { id: "experience", label: "Experience", icon: Briefcase },
      { id: "achievements", label: "Achievements", icon: Trophy },
      { id: "gallery", label: "Gallery", icon: ImageIcon },
      { id: "contact", label: "Contact", icon: Mail },  
    ];

    const resumeHref = about?.resumeUrl?.startsWith("data:") 
      ? about?.resumeUrl 
      : `data:application/pdf;base64,${about?.resumeUrl}`;

    return (
      <main className="min-h-screen bg-black text-foreground overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {floatingIcons.map((icon, i) => {
              const IconComponent = codingIcons[icon.iconIndex];
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: `${icon.x}vw`,
                    y: `${icon.y}vh`,
                    opacity: 0.03,
                    rotate: 0
                  }}
                  animate={{
                    x: [`${icon.x}vw`, `${icon.x + 10 * icon.direction}vw`],
                    y: [`${icon.y}vh`, `${icon.y + 5 * icon.direction}vh`],
                    rotate: 360,
                    opacity: [0.03, 0.06, 0.03]
                  }}
                  transition={{
                    x: {
                      duration: 20 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    },
                    y: {
                      duration: 15 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    },
                    rotate: {
                      duration: 40 + i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    },
                    opacity: {
                      duration: 3 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }
                  }}
                >
                  <IconComponent size={icon.size} className="text-gray-500/20" />
                </motion.div>
              );
            })}
          
          {/* Enhanced Gradient Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03]
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-gray-900/30 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.06, 0.03]
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gray-800/30 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-900/20 rounded-full blur-3xl" 
          />
        </div>

        <div className="container mx-auto px-6 py-24 max-w-7xl relative z-10 space-y-40">
          {/* About Section - Hero Layout */}
          <motion.section id="about" className="scroll-mt-24 relative">
            <AboutSection />
          </motion.section>

          {/* Skills Section */}
          <motion.section id="skills" className="scroll-mt-20">
            <SkillsSection />
          </motion.section>

          {/* Projects Section - now calls the moved component */}
          <motion.section id="projects" className="scroll-mt-20">
            <ProjectsSection />
          </motion.section>

          {/* Education Section - Vertical Timeline */}
          <motion.section id="education" className="scroll-mt-20">
            <EducationSection />
          </motion.section>

          {/* Experience Section - now calls the moved component */}
          <motion.section id="experience" className="scroll-mt-20">
            <ExperienceSection />
          </motion.section>

          {/* Achievements Section - now calls the moved component */}
          <motion.section id="achievements" className="scroll-mt-20">
            <AchievementsSection />
          </motion.section>

          {/* Gallery Section - now calls the moved component */}
          <motion.section id="gallery" className="scroll-mt-20">
            <GallerySection />
          </motion.section>

          {/* Contact Section - now calls the moved component */}
          <motion.section id="contact" className="scroll-mt-20">
            <ContactSection />
          </motion.section>
        </div>
        <SpeedInsights />
      </main>
    );
  }