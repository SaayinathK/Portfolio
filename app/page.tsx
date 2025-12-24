"use client";
import Image from "next/image";

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
            {!about ? (
              <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
                <div className="w-80 h-80 rounded-3xl bg-gray-800 animate-pulse" />
                <div className="space-y-4 flex-1">
                  <div className="h-12 w-3/4 bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-1/2 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <>
                {/* Animated Floating Code Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{
                        y: [null, window.innerHeight + 100],
                        opacity: [0, 0.8, 0],
                        x: Math.sin(i * 0.5) * 50
                      }}
                      transition={{
                        duration: 20 + Math.random() * 10,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                      className="absolute text-xs text-green-400/30 font-mono whitespace-nowrap"
                      style={{ left: `${(i * 8) % 100}%` }}
                    >
                      {['<div>', 'const', 'function()', 'export', 'import', 'return', '=>', '{}', '[]', '();'][i % 10]}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
                  {/* Profile Image - clean layout */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="relative w-50 h-50 sm:w-100 sm:h-80 md:w-120 md:h-[50rem] lg:w-250 lg:h-[40rem] rounded-3xl overflow-hidden">
                      {about.profileImageUrl ? (
                        <Image
                          src={about.profileImageUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={400}
                          height={400}
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <User size={120} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-4 -right-4 bg-gray-900/90 text-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-800">
                      <span className="animate-pulse">❤️</span> Available for opportunities
                    </div>
                  </motion.div>

                  {/* Info & CTA - Right Side with typing animation */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-6 relative"
                  >
                    {/* Name & Title with typewriter effect */}
                    <div className="relative">
                      <motion.p
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-600"
                      />
                      
                      <p className="text-sm text-gray-400 font-mono mb-2 flex items-center gap-2">
                        <span className="animate-pulse">▶ // about_me.js</span> 
                        <span className="text-green-400 text-xs ml-auto">running...</span>
                      </p>
                      
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                      >
                        Saayinath
                        <h2>Kanesamoorthy</h2>
                      </motion.h1>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="inline-block mb-4"
                      >
                        <p className="text-xl text-gray-400 font-mono bg-gray-900/50 px-4 py-3 rounded-lg border-l-4 border-gray-600">
                          <span className="text-gray-300">&lt;</span>
                          <Typewriter
                            text={about.title || "React Native / Flutter Developer"}
                            delay={50}
                            className="text-gray-200"
                          />
                          <span className="text-gray-300">/&gt;</span>
                          <span className="ml-2 animate-pulse">|</span>
                        </p>
                      </motion.div>
                      
                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-400 text-sm leading-relaxed"
                      >
                        {about.shortBio}
                      </motion.div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-3"
                    >
                      <div className="flex flex-wrap gap-3">
                        {about.location && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <MapPin size={18} />
                            <span>{about.location}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">📍</span>
                          </motion.div>
                        )}
                        
                        {about.phone && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(about.phone || '');
                              setCopiedField && setCopiedField('aboutPhone');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <Phone size={18} />
                            <span className="font-mono flex items-center gap-2">
                              {about.phone}
                              {copiedField === 'aboutPhone' && (
                                <span className="text-xs text-blue-300 ml-2 animate-pulse">Copied!</span>
                              )}
                            </span>
                            <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        )}
                        
                        {about.email && (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(about.email);
                              setCopiedField && setCopiedField('aboutEmail');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-gray-300 group cursor-pointer"
                          >
                            <Mail size={18} />
                            <span className="font-mono text-sm flex items-center gap-2">
                              {about.email}
                              {copiedField === 'aboutEmail' && (
                                <span className="text-xs text-cyan-300 ml-2 animate-pulse">Copied!</span>
                              )}
                            </span>
                            <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Social Media Icons */}
                      {contacts.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="flex gap-3"
                        >
                          {contacts[0].linkedin && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contacts[0].linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                            >
                              <Linkedin size={20} />
                            </motion.a>
                          )}
                          
                          {contacts[0].github && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contacts[0].github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500/50 transition-all"
                            >
                              <Github size={20} />
                            </motion.a>
                          )}
                          
                          {contacts[0].instagram && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contacts[0].instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-pink-400 hover:border-pink-500/50 transition-all"
                            >
                              <Instagram size={20} />
                            </motion.a>
                          )}
                          
                          {contacts[0].facebook && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              href={contacts[0].facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-blue-500 hover:border-blue-600/50 transition-all"
                            >
                              <Facebook size={20} />
                            </motion.a>
                          )}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* CTA Buttons with enhanced effects - Responsive for mobile */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="flex flex-col md:flex-row gap-4 pt-6 flex-wrap w-full"
                    >
                      <motion.a
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group overflow-hidden backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Code2 size={18} />
                        View My Work
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>

                      {/* Attractive Resume Button - Responsive */}
                      <motion.a
                        whileHover={{ scale: 1.07, rotate: [0, -2, 2, 0] }}
                        whileTap={{ scale: 0.97 }}
                        href={about?.resumeUrl?.startsWith("data:") 
                          ? about.resumeUrl 
                          : `data:application/pdf;base64,${about?.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white font-bold shadow-lg border-2 border-blue-500/30 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-3 group overflow-hidden backdrop-blur-sm"
                        style={{ boxShadow: "0 4px 24px 0 rgba(34,211,238,0.15)" }}
                        aria-label="View Resume"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Download size={20} className="text-white drop-shadow" />
                        </motion.div>
                        <span className="relative z-10">View Resume</span>
                      </motion.a>

                      <motion.a
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className="relative w-full md:w-auto px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Download size={18} />
                        </motion.div>
                        Contact Me
                        <span className="ml-1 group-hover:scale-125 transition-transform">→</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </>
            )}
            
            {/* Bio & Skills Cards Below */}
            {about && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-24 space-y-12 relative"
              >
                {/* Animated binary rain background */}
                <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{
                        y: [null, 600],
                        opacity: [0, 0.4, 0]
                      }}
                      transition={{
                        duration: 10 + Math.random() * 10,
                        delay: i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                      className="absolute text-xs text-gray-400/20 font-mono whitespace-nowrap"
                      style={{ left: `${(i * 5) % 100}%` }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </motion.div>
                  ))}
                </div>

                {/* Two-column layout: Left = Bio, Right = Motto + Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left: Bio Section with Interactive Code Editor */}
                  <div className="space-y-4">
                    <div className="bg-black border border-gray-800 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText size={20} className="text-gray-400" />
                          <span className="text-gray-300 font-mono">bio.ad</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {about.longBio.split(/[.!?]+/).filter(Boolean).length} lines | {(about.longBio.length / 500).toFixed(1)}KB
                        </div>
                      </div>

                      {about.longBio
                        .split(/[.!?]+/)
                        .filter(s => s.trim())
                        .map((line, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-gray-300 pl-4 border-l-2 border-gray-600/50 hover:border-gray-600/90 transition-all group"
                          >
                            <span className="text-gray-500 mr-2 font-mono">{index + 1}</span>
                            {line.trim()}.
                            {/* ✓ */}
                            <span className="opacity-0 group-hover:opacity-100 text-gray-400 ml-2 transition-opacity">✓</span>
                          </motion.p>
                        ))}
                    </div>
                  </div>

                  {/* Right: Motto terminal + Skill cards stacked */}
                  <div className="space-y-8">
                    {/* Interactive Code Motto Terminal */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-black border border-gray-800 rounded-2xl p-6 font-mono text-sm backdrop-blur-sm overflow-hidden group"
                    >
                      {/* Terminal header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500/70" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                          <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-gray-400 text-xs">terminal — motto.js</span>
                        <div className="ml-auto flex items-center gap-2">
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            className="w-2 h-2 rounded-full bg-green-500"
                          />
                          <span className="text-green-400 text-xs">● LIVE</span>
                        </div>
                      </div>

                      {/* Typing animation for motto */}
                      <div className="space-y-2">
                        <p className="text-gray-500">$ node motto.js</p>

                        <div className="flex items-start gap-2">
                          <span className="text-green-400">▶</span>
                          <Typewriter
                            text={`const motto = "${about.motto || 'Code with purpose, design with passion'}";`}
                            delay={30}
                            className="text-gray-300"
                          />
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                            className="ml-1"
                          >
                            _
                          </motion.span>
                        </div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          className="text-gray-200"
                        >
                          $ Output: Executing with passion and precision... 🚀
                        </motion.p>
                      </div>

                      {/* Animated cursor */}
                      <motion.div
                        animate={{
                          top: ["10%", "30%", "50%", "70%", "90%", "10%"],
                          left: ["10%", "80%", "40%", "20%", "60%", "10%"]
                        }}
                        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute w-6 h-6 rounded-full bg-gray-500/10 border border-gray-600/30 pointer-events-none"
                      />
                    </motion.div>

                    {/* Animated Skill Cards with Hover Effects */}
                    <div className="relative">
                      {/* Edge fades for nicer scroll affordance */}
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black via-black/70 to-transparent z-10" />

                      {/* Scroll arrows (fixed, not scrolling) */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const container = document.getElementById("highlights-scroll");
                          if (container) {
                            container.scrollBy({ left: -320, behavior: "smooth" });
                          }
                        }}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/20 opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const container = document.getElementById("highlights-scroll");
                          if (container) {
                            container.scrollBy({ left: 320, behavior: "smooth" });
                          }
                        }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/20 opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        id="highlights-scroll"
                        className="group overflow-x-auto pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none" }}
                      >
                        <div className="flex gap-4 min-w-full whitespace-nowrap pr-6 snap-x snap-mandatory">
                          {(() => {
                            const defaultSkills = [
                              { icon: <Code2 size={32} />, title: "Full-Stack Development", color: "purple", emoji: "⚛️" },
                              { icon: <Palette size={32} />, title: "UI/UX Design", color: "pink", emoji: "🎨" },
                              { icon: <Brain size={32} />, title: "AI & Machine Learning", color: "cyan", emoji: "🤖" },
                              { icon: <Shield size={32} />, title: "Network Security", color: "green", emoji: "🔒" }
                            ];


                            const palette = {
                              icons: [
                                <Code2 size={32} key="code2" />, 
                                <Palette size={32} key="palette" />, 
                                <Brain size={32} key="brain" />, 
                                <Shield size={32} key="shield" />
                              ],
                              colors: ["purple", "pink", "cyan", "green"],
                              emojis: ["⚛️", "🎨", "🤖", "🔒"],
                            };

                            const highlightSkills = (about?.highlights || [])
                              .filter((h) => h && h.trim())
                              .map((title, index) => ({
                                icon: palette.icons[index % palette.icons.length],
                                title: title.trim(),
                                color: palette.colors[index % palette.colors.length],
                                emoji: palette.emojis[index % palette.emojis.length],
                                key: `highlight-skill-${index}`
                              }));

                            const skillsToShow = highlightSkills.length > 0 ? highlightSkills : defaultSkills;

                            return skillsToShow.map((skill, index) => (
                              <motion.div
                                key={skill.title + index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                  y: -10,
                                  scale: 1.05,
                                  transition: { type: "spring", stiffness: 300 }
                                }}
                                className="relative p-6 rounded-2xl border border-gray-800 bg-black backdrop-blur-sm group overflow-hidden cursor-pointer min-w-[260px] snap-start"
                              >
                                {/* Animated gradient border */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-gray-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Hover shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                <div className="relative">
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                                    className={`text-${skill.color}-400 mb-4 inline-block`}
                                  >
                                    {skill.icon}
                                  </motion.div>
                                  
                                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                    {skill.title}
                                    <motion.span
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                                      className="text-lg"
                                    >
                                      {skill.emoji}
                                    </motion.span>
                                  </h4>
                                  
                                  <div className="flex items-center gap-2">
                                    <div className={`h-1 flex-1 bg-${skill.color}-500/20 rounded-full overflow-hidden`}>
                                      <motion.div
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: `${70 + index * 10}%` }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                        className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-300`}
                                      />
                                    </div>
                                    <span className={`text-xs text-${skill.color}-400 font-mono`}>
                                      {70 + index * 10}%
                                    </span>
                                  </div>
                                </div>
                                
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute -bottom-2 -right-2 text-4xl opacity-20"
                                >
                                  {skill.emoji}
                                </motion.div>
                              </motion.div>
                              ));
                            })()}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
          </motion.section>
          {/* Skills Section */}
          <motion.section 
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
                        
            {skills.length === 0 ? (
              <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (() => {
              // Group Technical Skills by subtype
              const technicalSkills = skills.filter((skill: any) => skill.type === "Technical Skills");
              const groupedTechnicalSkills = technicalSkills.reduce(
                (acc, skill) => {
                  const subtype = skill.subtype || "Other";
                  if (!acc[subtype]) acc[subtype] = [];
                  (acc[subtype] as typeof skills).push(skill);
                  return acc;
                },
                {} as Record<string, any>
              );

              // Get Languages Spoken
              const languagesSpoken = skills.filter((skill: any) => skill.type === "Languages Spoken");

              const categoryMeta: Record<string, { icon: React.ReactNode; classes: { border: string; chip: string; iconBg: string; gradient: string } }> = {
                "Mobile Development": {
                  icon: <Smartphone className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Web Development": {
                  icon: <Globe className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Frameworks": {
                  icon: <Zap className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Programming Languages": {
                  icon: <Code2 className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Databases": {
                  icon: <Database className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Tools & Platforms": {
                  icon: <Wrench className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                "Cybersecurity": {
                  icon: <Shield className="w-6 h-6" />,
                  classes: { 
                    border: "border-gray-700/50", 
                    chip: "bg-gray-800/50 text-blue-500 border-gray-700/30", 
                    iconBg: "bg-gradient-to-br from-gray-800/30 to-gray-900/30 text-gray-300",
                    gradient: "from-gray-800/10 via-black-800/20 to-transparent"
                  },
                },
                Other: {
                  icon: <Package className="w-6 h-6" />,
                  classes: { 
                    border: "border-slate-500/30", 
                    chip: "bg-slate-500/10 text-slate-200 border-slate-500/20", 
                    iconBg: "bg-gradient-to-br from-slate-500/20 to-slate-600/20 text-slate-300",
                    gradient: "from-slate-500/5 via-black-500/10 to-transparent"
                  },
                },
              };

              return (
                <div className="space-y-20">
                  {/* Languages Spoken Section - MOVED TO TOP */}
{languagesSpoken.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative"
  >
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
          <Globe className="w-5 h-5 text-blue-400" />
          {/* languages.spoken */}
          <span className="font-mono text-sm text-blue-400/90">languages.spoken</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Languages I Speak
        </h3>
        <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
          Communication across cultures and communities
        </p>
      </motion.div>

      {/* Languages Grid - horizontally scrollable on mobile */}
      <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
        {languagesSpoken.map((lang: any, idx: number) => (
          <motion.div
            key={lang._id || idx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="group relative rounded-2xl p-6 min-w-[260px] border border-gray-800/60 bg-black/70 backdrop-blur-lg transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:border-blue-400"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-black/30 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="w-14 h-14 rounded-xl inline-flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-white/10 shadow-lg group-hover:shadow-blue-400/30 transition-shadow"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="w-7 h-7 text-blue-400" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-xl group-hover:text-blue-400 transition-colors">
                    {lang.language}
                  </h4>
                </div>
              </div>

              {/* Proficiency Badge */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width:
                        lang.languageProficiency === "Native or bilingual proficiency"
                          ? "100%"
                          : lang.languageProficiency === "Full professional proficiency"
                          ? "90%"
                          : lang.languageProficiency === "Professional working proficiency"
                          ? "75%"
                          : lang.languageProficiency === "Limited working proficiency"
                          ? "55%"
                          : lang.languageProficiency === "Elementary proficiency"
                          ? "35%"
                          : "45%",
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {lang.languageProficiency || "Not specified"}
                </span>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)}

 

                  {/* Technical Skills Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Section Header */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center mb-12"
                    >
                      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                        <Code2 className="w-5 h-5 text-blue-400" />
                        {/* skills.technical */}
                        <span className="font-mono text-sm text-blue-400/90">skills.technical</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-extrabold bg-white bg-clip-text text-transparent tracking-tight">
                        Technical Arsenal
                      </h3>
                      <p className="text-gray-400 text-lg mt-3 max-w-xl mx-auto">
                        Technologies and tools I work with to build amazing solutions
                      </p>
                    </motion.div>

                    {/* Technical Skills Grid - horizontally scrollable on mobile */}
                    <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
                      {Object.entries(groupedTechnicalSkills).map(([subtype, subtypeSkills], idx) => {
                        const meta = categoryMeta[subtype] || categoryMeta.Other;
                        
                        return (
                          <motion.div
                            key={subtype}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.5, 
                              delay: idx * 0.08,
                              type: "spring",
                              stiffness: 100
                            }}
                            whileHover={{ 
                              y: -8,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className={`group relative rounded-2xl p-6 min-w-[260px] border ${meta.classes.border} bg-gradient-to-br ${meta.classes.gradient} to-transparent backdrop-blur-xl hover:border-opacity-60 transition-all overflow-hidden`}
                          >
                            {/* Animated Background Glow */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              animate={{
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                              }}
                            />

                            {/* Content */}
                            <div className="relative">
                              {/* Header */}
                              <div className="flex items-center gap-3 mb-6">
                                <motion.div 
                                  className={`w-12 h-12 rounded-xl inline-flex items-center justify-center ${meta.classes.iconBg} shadow-lg`}
                                  whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {meta.icon}
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-bold text-white group-hover:scale-105 transition-transform">
                                  {subtype}
                                </h3>
                              </div>

                              {/* Skills Tags */}
                              <div className="flex flex-wrap gap-2">
                                {(subtypeSkills as typeof skills).map((skill: any, skillIdx: number) => (
                                  <motion.span
                                    key={skill._id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${meta.classes.chip} hover:bg-opacity-20 transition-all cursor-default`}
                                  >
                                    {skill.name}
                                  </motion.span>
                                ))}
                              </div>                              
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl" />
                            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-br-3xl" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </motion.section>
          
          {/* Projects Section */}
          <motion.section 
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <SectionHeader 
              title="Projects"
              subtitle="A collection of my best work and creative solutions"
              codeComment="// projects[]"
            />
            
            {projects.length === 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex-shrink-0 w-96 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative group">
                {/* Left Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("projects-scroll");
                    if (container) {
                      container.scrollBy({
                        left: -420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Scrollable Projects */}
                <div
                  id="projects-scroll"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(59, 130, 246, 0.3) transparent",
                  }}
                >
                  {projects.map((p, i) => {
                    const title = p.title || p.name || "Untitled";
                    const desc = p.description || p.summary || "";
                    const github = p.github || p.repoUrl || p.githubLink || "";
                    const liveLink = p.liveLink || p.link || "";
                    const imageUrl = p.imageUrl || "";
                    const tags: string[] = p.tags || p.tech || [];
                    
                    const filename = title.toLowerCase().replace(/\s+/g, '-');
                    
                    return (
                      <motion.article
                        key={p._id || title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="flex-shrink-0 w-96 group relative rounded-2xl border-2 border-gray-800 bg-black backdrop-blur-sm overflow-hidden hover:border-gray-700 transition-all flex flex-col"
                      >
                        {/* Terminal header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-slate-900/50">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs text-gray-400 font-mono ml-2">{filename}.tsx</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {liveLink && (
                              <a href={liveLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Globe size={30} />
                              </a>
                            )}
                            {github && (
                              <a href={github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Github size={30} />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Project Image / Placeholder */}
                        <div className="relative h-48 overflow-hidden bg-slate-800/50">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              width={384}
                              height={192}
                              priority={i === 0}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800/40">
                              <ImageIcon className="text-slate-500" size={32} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1">
                          {/* Title with Icon */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex-shrink-0">
                              <Terminal size={18} className="text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">
                                {title}
                              </h3>
                              <p className="text-xs text-gray-500 font-mono">{p.type || 'Web Application'}</p>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {desc}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 3).map((t: string, idx: number) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 border border-blue-500/20"
                              >
                                {t}
                              </span>
                            ))}
                            {tags.length > 3 && (
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 border border-blue-500/20">
                                +{tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("projects-scroll");
                    if (container) {
                      container.scrollBy({
                        left: 420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}
          </motion.section>

          {/* Education Section - Vertical Timeline */}
          <motion.section 
            id="education"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <SectionHeader 
              title="Education"
              subtitle="My academic journey and learning achievements"
              codeComment="// education[]"
            />
            
            {education.length === 0 ? (
              <div className="space-y-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative pl-12">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu._id || i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group mb-8 last:mb-0"
                  >
                    {/* Timeline Line Segment - connects to next dot */}
                    {i < education.length - 1 && (
                      <div 
                        className="absolute w-0.5 bg-gradient-to-b from-blue-500 to-blue-600"
                        style={{ 
                          left: '-39.5px',
                          top: '45px',
                          bottom: '-45px'
                        }}
                      />
                    )}
                    
                    {/* Timeline Dot */}
                    <div className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-500 group-hover:bg-blue-400 group-hover:border-blue-400 transition-colors z-10" style={{ left: '-44px', top: '24px' }} />

                    {/* Card */}
                    <div className="rounded-2xl border border-gray-800/50 bg-black/50 backdrop-blur-sm p-6 transition-all group-hover:bg-black/70 hover:border-blue-500/40 hover:shadow-[0_12px_45px_rgba(59,130,246,0.25)] hover:-translate-y-1">
                      {/* Line 1: Logo on left, Degree + Field on right */}
                      <div className="flex items-start gap-4 mb-3">
                        {edu.logo && (
                          <Image
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            className="w-16 h-16 object-contain rounded-lg border border-blue-400/30 bg-blue-500/10 p-2 flex-shrink-0"
                            width={64}
                            height={64}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white">
                              {edu.field}
                            </h3>
                            {edu.isCurrentlyEnrolled && (
                              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold whitespace-nowrap">
                                Current
                              </span>
                            )}
                          </div>
                          {/* Line 2: Institution */}
                          <p className="text-blue-400 text-sm font-semibold mb-3">
                            {edu.institution || edu.school || "University"}
                          </p>
                        </div>
                      </div>

                      {/* Line 3: Date */}
                      {edu.startDate && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                          <Calendar size={16} />
                          <span>
                            {new Date(edu.startDate).getFullYear()} {edu.endDate ? `- ${new Date(edu.endDate).getFullYear()}` : "- Present"}
                          </span>
                        </div>
                      )}

                      {/* Line 4: GPA */}
                      {edu.gpa && (
                        <div className="mb-3">
                          <span className="px-2.5 py-1 rounded-md text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}

                      {/* Line 5: Description */}
                      {edu.description && (
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {edu.description}
                        </p>
                      )}

                      {/* Line 6: Activities */}
                      {edu.activities && edu.activities.length > 0 && (
                        <div className="mb-3 pb-3 border-b border-gray-700/30">
                          <p className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">Activities</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.activities.map((activity: string, idx: number) => (
                              <span key={idx} className="px-2.5 py-1 rounded-md text-xs bg-blue-500/15 text-blue-300 border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Experience Section */}
          <motion.section 
            id="experience"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <SectionHeader 
              title="Professional Experience"
              subtitle="My career journey and professional achievements"
              codeComment="// experience[]"
            />
            
            {experience.length === 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex-shrink-0 w-96 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative group">
                {/* Left Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("experience-scroll");
                    if (container) {
                      container.scrollBy({
                        left: -420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-gray-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Scrollable Experience */}
                <div
                  id="experience-scroll"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(107, 114, 128, 0.3) transparent",
                  }}
                >
                  {experience.map((exp, i) => (
                    <motion.div
                      key={exp._id || i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="flex-shrink-0 w-96 group relative rounded-2xl border border-gray-800 bg-black backdrop-blur-sm overflow-hidden hover:border-gray-700 transition-all p-6 flex flex-col"
                    >
                      {/* Position, Company, and Logo */}
                      <div className="mb-4 flex items-start gap-3">
                        {exp.logo && (
                          <Image
                            src={exp.logo}
                            alt={`${exp.company || exp.organization || "Company"} logo`}
                            className="w-10 h-10 object-contain rounded-lg border border-gray-800 bg-black/40 p-1 shadow-sm"
                            width={40}
                            height={40}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                            {exp.position || exp.title || "Position"}
                          </h3>
                          <p className="text-blue-500 text-sm font-semibold">{exp.company || exp.organization || "Company"}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4 flex-1">
                        {exp.type && <p className="text-gray-400 text-sm">💼 {exp.type}</p>}
                        {exp.startDate && (
                          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <Calendar size={16} />
                            <span>
                              {new Date(exp.startDate).getFullYear()} {exp.endDate ? `- ${new Date(exp.endDate).getFullYear()}` : "- Present"}
                            </span>
                          </div>
                        )}
                        {exp.location && <p className="text-gray-400 text-sm">📍 {exp.location}</p>}
                        {exp.description && <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>}
                      </div>

                      {/* Skills Used */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.slice(0, 3).map((skill: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 3 && (
                            <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                              +{exp.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Right Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("experience-scroll");
                    if (container) {
                      container.scrollBy({
                        left: 420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-gray-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}
          </motion.section>

          {/* Achievements Section - Updated Colors */}
          <motion.section 
            id="achievements"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <SectionHeader 
              title="Achievements & Awards"
              subtitle="Milestones and recognitions earned along the journey"
              codeComment="// achievements[]"
            />
            
            {achievements.length === 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex-shrink-0 w-80 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative group">
                {/* Left Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("achievements-scroll");
                    if (container) {
                      container.scrollBy({
                        left: -420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Scrollable Achievements */}
                <div
                  id="achievements-scroll"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(59, 130, 246, 0.3) transparent",
                  }}
                >
                  {achievements
                    .sort((a, b) => {
                      const yearA = parseInt(a.year || a.date?.split('-')[0] || '0');
                      const yearB = parseInt(b.year || b.date?.split('-')[0] || '0');
                      return yearB - yearA;
                    })
                    .map((a, i) => {
                    const Icon = i % 3 === 0 ? Trophy : i % 3 === 1 ? Award : Medal;
                    const colorScheme = { border: "border-gray-500/30", bg: "from-blue-500/10", iconBg: "from-blue-500/20 to-cyan-500/20", glow: "from-blue-600/20 to-cyan-600/20", icon: "text-blue-400" };

                    return (
                      <motion.article
                        key={a._id || a.title}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{ 
                          y: -12,
                          scale: 1.02,
                          rotateY: 5,
                          transition: { duration: 0.3 }
                        }}
                        className={`flex-shrink-0 w-80 group/card relative rounded-3xl border-2 ${colorScheme.border} bg-gradient-to-br ${colorScheme.bg} to-transparent backdrop-blur-md p-8 overflow-hidden cursor-pointer`}
                      >

                        {/* Achievement Image */}
                        {a.imageUrl && (
                          <div className="mb-4 -mx-4 -mt-4">
                            <Image
                              src={a.imageUrl}
                              alt={a.title}
                              className="w-full h-80 object-cover rounded-2xl border border-blue-500/10 shadow"
                              width={320}
                              height={320}
                            />
                          </div>
                        )}

                        {/* Animated background glow */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${colorScheme.glow} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Icon with pulsing effect */}
                        {/* Icon with pulsing effect */}
                        <motion.div 
                          className="relative mb-6 inline-flex"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >

                          <motion.div 
                            className={`absolute inset-0 rounded-2xl blur-xl`}
                            style={{ background: `radial-gradient(circle, ${colorScheme.icon.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : colorScheme.icon.includes('cyan') ? 'rgba(34, 211, 238, 0.3)' : 'rgba(14, 165, 233, 0.3)'})` }}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover/card:text-blue-300 transition-colors line-clamp-2">
                            {a.title || a.name || "Achievement"}
                          </h3>
                          {/* Organization (if available) */}
                          {a.organization && (
                            <div className="text-sm text-blue-200 mb-3 font-medium truncate">
                              {a.organization}
                            </div>
                          )}
                          
                          {/* Date badge */}
                          {(a.year || a.date) && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.2 }}
                              className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 w-fit"
                            >
                              <Calendar size={14} className="text-blue-400" />
                              <span className="text-xs font-semibold text-blue-300">{a.year || a.date}</span>
                            </motion.div>
                          )}
                          
                          {/* Description */}
                          {a.description && (
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                              {a.description}
                            </p>
                          )}

                          {/* Bottom accent line */}
                          <motion.div 
                            className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 rounded-full mt-6"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                          />
                        </div>
                        
                        {/* Enhanced floating particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          {[...Array(5)].map((_, idx) => (
                            <motion.div
                              key={idx}
                              className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/40"
                              initial={{ 
                                x: Math.random() * 100 + '%',
                                y: '100%',
                                opacity: 0
                              }}
                              animate={{ 
                                y: '-20%',
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                              }}
                              transition={{
                                duration: 3,
                                delay: idx * 0.4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("achievements-scroll");
                    if (container) {
                      container.scrollBy({
                        left: 420,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}
          </motion.section>

          {/* Gallery Section */}
          <motion.section 
            id="gallery"  
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <SectionHeader 
              title="Gallery"
              subtitle="Explore snapshots from projects and moments across my journey"
              codeComment="// await loadImages();"
            />

            {gallery.length === 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="flex-shrink-0 w-80 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="relative group">
                {/* Left Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("gallery-scroll");
                    if (container) {
                      container.scrollBy({
                        left: -400,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Scrollable Gallery */}
                <div
                  id="gallery-scroll"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(59, 130, 246, 0.3) transparent",
                  }}
                >
                  {gallery.map((g, i) => {
                    const src = g.images?.[0] || g.image || g.url || g.imageUrl || g.src;
                    const alt = g.title || "Gallery item";
                    const imageCount = g.images?.length || 1;

                    const galleryColorSchemes = [
                      { glow: "from-blue-600/20 to-cyan-600/20" },
                      { glow: "from-sky-600/20 to-blue-600/20" },
                      { glow: "from-cyan-600/20 to-sky-600/20" },
                    ];
                    const galleryColorScheme = galleryColorSchemes[i % 3];

                    return (
                      <motion.figure
                        key={g._id || src}
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 80,
                          damping: 15
                        }}
                        whileHover={{ 
                          y: -12,
                          scale: 1.03,
                          rotateY: 3,
                          transition: { duration: 0.3 }
                        }}
                        className="flex-shrink-0 w-80 group/item relative overflow-hidden rounded-3xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-md cursor-pointer shadow-xl hover:shadow-blue-500/20"
                        onClick={() => {
                          // If the album has multiple images, open the modal gallery
                          if (imageCount > 1) {
                            setSelectedAlbumItem(g);
                            setCurrentImageIndex(0);
                            setIsAlbumModalOpen(true);
                          } else {
                            // Otherwise just update the featured display
                            const featuredImg = document.getElementById("featured-gallery-image");
                            const featuredTitle = document.getElementById("featured-gallery-title");
                            const featuredDesc = document.getElementById("featured-gallery-desc");
                            const featuredCount = document.getElementById("featured-gallery-count");
                            
                            if (featuredImg && src) {
                              (featuredImg as HTMLImageElement).src = src;
                            }
                            if (featuredTitle) {
                              featuredTitle.textContent = g.title || "Featured";
                            }
                            if (featuredDesc) {
                              featuredDesc.textContent = g.description || "Click any gallery to preview";
                            }
                            if (featuredCount) {
                              featuredCount.textContent = imageCount;
                            }
                          }
                        }}
                      >
                        {/* Animated border glow */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${galleryColorScheme.glow} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                          }}
                        />

                        {/* Thumbnail Image */}
                        {src ? (
                          <div className="relative h-96 w-full overflow-hidden rounded-3xl">
                            <Image
                              src={src}
                              alt={alt}
                              className="h-full w-full object-cover transition-all duration-700 group-hover/item:scale-125 group-hover/item:rotate-2"
                              width={320}
                              height={384}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/item:opacity-90 transition-opacity duration-500" />
                            
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>
                        ) : (
                          <div className="h-96 w-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-3xl">
                            <ImageIcon size={56} className="text-blue-400/50" />
                          </div>
                        )}

                        {/* Image Count Badge */}
                        {imageCount > 1 && (
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                            <ImageIcon size={14} />
                            +{imageCount - 1} more
                          </div>
                        )}

                        {/* Enhanced Caption Overlay */}
                        {g.title && (
                          <motion.figcaption 
                            initial={{ y: "100%" }}
                            whileHover={{ y: 0 }}
                            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent"
                          >
                            <motion.h4 
                              className="text-white font-bold text-lg mb-2 line-clamp-2"
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              {g.title}
                            </motion.h4>
                            {g.description && (
                              <motion.p 
                                className="text-gray-300 text-sm line-clamp-2"
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                              >
                                {g.description}
                              </motion.p>
                            )}
                            
                            {/* View indicator */}
                            <motion.div
                              className="mt-3 flex items-center gap-2 text-blue-400 text-xs font-semibold"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Eye size={14} />
                              <span>Click to view</span>
                            </motion.div>
                          </motion.figcaption>
                        )}

                        {/* Floating indicator badge */}
                        <motion.div
                          className="absolute top-4 left-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-md shadow-lg opacity-0 group-hover:item:opacity-100 transition-opacity">
                            <Eye size={18} className="text-white" />
                          </div>
                        </motion.div>

                        {/* Particle effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                          {[...Array(4)].map((_, idx) => (
                            <motion.div
                              key={idx}
                              className="absolute h-1 w-1 rounded-full bg-blue-400/60"
                              initial={{ 
                                x: Math.random() * 100 + '%',
                                y: '100%',
                                opacity: 0
                              }}
                              animate={{ 
                                y: '-10%',
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                              }}
                              transition={{
                                duration: 2.5,
                                delay: idx * 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1.5,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </div>

                        {/* Index number */}
                        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
                        </div>
                      </motion.figure>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const container = document.getElementById("gallery-scroll");
                    if (container) {
                      container.scrollBy({
                        left: 400,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-blue-600/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                  {gallery.slice(0, Math.min(gallery.length, 8)).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-blue-500/30" />
                  ))}
                </div>
              </div>
            )}
          </motion.section>

          {/* Album Modal - View All Images */}
          <AnimatePresence>
            {isAlbumModalOpen && selectedAlbumItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAlbumModalOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-black/95 to-black/85 border-2 border-blue-500/30 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col relative"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-blue-500/20 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{selectedAlbumItem.title || "Album"}</h3>
                      <p className="text-gray-400 text-sm">{selectedAlbumItem.images?.length || 1} images</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAlbumModalOpen(false)}
                      className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-white transition-all"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Main Image Display */}
                  <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/50 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={selectedAlbumItem.images?.[currentImageIndex] || selectedAlbumItem.image}
                          alt={`${selectedAlbumItem.title} - Image ${currentImageIndex + 1}`}
                          className="max-w-full max-h-full object-contain"
                          width={800}
                          height={600}
                        />
                        
                        {/* Image Counter */}
                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-blue-500/30">
                          <span className="text-blue-300 font-semibold text-sm">{currentImageIndex + 1} / {selectedAlbumItem.images?.length || 1}</span>
                        </div>

                        {/* Navigation Arrows */}
                        {selectedAlbumItem.images && selectedAlbumItem.images.length > 1 && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedAlbumItem.images.length) % selectedAlbumItem.images.length)}
                              className="absolute left-4 p-3 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white transition-all shadow-lg"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedAlbumItem.images.length)}
                              className="absolute right-4 p-3 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white transition-all shadow-lg"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </motion.button>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedAlbumItem.images && selectedAlbumItem.images.length > 1 && (
                    <div className="p-4 border-t border-blue-500/20 bg-black/50 overflow-x-auto max-h-32">
                      <div className="flex gap-3">
                        {selectedAlbumItem.images.map((img: string, idx: number) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx
                                ? "border-blue-400 shadow-lg shadow-blue-500/50"
                                : "border-blue-500/20 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                              width={80}
                              height={80}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyboard Navigation Hint */}
                  <div className="px-6 py-3 text-center text-gray-400 text-xs border-t border-blue-500/10">
                    <span className="inline-block">Use arrow buttons or arrow keys to navigate • ESC to close</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Section */}
          <motion.section 
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="scroll-mt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mb-16"
            >
              <SectionHeader 
                title="Contact"
                subtitle="Have a project in mind? Let's collaborate and create something amazing together"
                codeComment="// contact[]"
              />    
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border-2 border-gray-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent backdrop-blur-xl p-8 overflow-hidden relative shadow-2xl"
            >
              {/* Animated background orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    x: [0, 100, 0], 
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ 
                    x: [0, -80, 0], 
                    y: [0, 80, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
                />
              </div>

              {contacts.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
                  <div className="animate-pulse">Loading contact information...</div>
                </div>
              ) : (
                (() => {
                  const c = contacts[0];
                  return (
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Left - Contact Info */}
                      <div className="space-y-6">
                        <motion.h3 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent mb-6"
                        >
                          Get In Touch
                        </motion.h3>

                        <div className="space-y-4">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ x: 8, scale: 1.02 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(c.email);
                              setCopiedField && setCopiedField('email');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-gray-500/20 hover:border-cyan-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-3 rounded-xl bg-gradient-to-br from-cyan-500/30 to-teal-500/30 shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
                              <Mail size={22} className="text-cyan-300" />
                            </div>
                            <div className="relative flex-1">
                              <p className="text-xs text-cyan-400/80 font-semibold mb-1 uppercase tracking-wider">Email</p>
                              <p className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                {c.email}
                                {copiedField === 'email' && (
                                  <span className="text-xs text-cyan-300 ml-2 animate-pulse">Copied!</span>
                                )}
                              </p>
                            </div>
                          </motion.div>

                          {c.studentEmail && (
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 }}
                              whileHover={{ x: 8, scale: 1.02 }}
                              onClick={async (e) => {
                                e.stopPropagation();
                                await navigator.clipboard.writeText(c.studentEmail);
                                setCopiedField && setCopiedField('studentEmail');
                                setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                              }}
                              className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20 hover:border-teal-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative p-3 rounded-xl bg-gradient-to-br from-teal-500/30 to-cyan-500/30 shadow-lg group-hover:shadow-teal-500/20 transition-shadow">
                                <Mail size={22} className="text-teal-300" />
                              </div>
                              <div className="relative flex-1">
                                <p className="text-xs text-teal-400/80 font-semibold mb-1 uppercase tracking-wider">Student Email</p>
                                <p className="font-bold text-white text-lg group-hover:text-teal-300 transition-colors flex items-center gap-2">
                                  {c.studentEmail}
                                  {copiedField === 'studentEmail' && (
                                    <span className="text-xs text-teal-300 ml-2 animate-pulse">Copied!</span>
                                  )}
                                </p>
                              </div>
                            </motion.div>
                          )}

                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ x: 8, scale: 1.02 }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await navigator.clipboard.writeText(c.phone);
                              setCopiedField && setCopiedField('phone');
                              setTimeout(() => setCopiedField && setCopiedField(null), 1200);
                            }}
                            className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 shadow-lg group-hover:shadow-blue-500/20 transition-shadow">
                              <Phone size={22} className="text-blue-300" />
                            </div>
                            <div className="relative flex-1">
                              <p className="text-xs text-blue-400/80 font-semibold mb-1 uppercase tracking-wider">Phone</p>
                              <p className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors flex items-center gap-2">
                                {c.phone}
                                {copiedField === 'phone' && (
                                  <span className="text-xs text-blue-300 ml-2 animate-pulse">Copied!</span>
                                )}
                              </p>
                            </div>
                          </motion.div>

                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 }}
                            whileHover={{ x: 8, scale: 1.02 }}
                            onClick={() => {
                              navigator.clipboard.writeText(c.location);
                              alert('Location copied to clipboard!');
                            }}
                            className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-gray-500/20 hover:border-gray-500/40 transition-all backdrop-blur-sm overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 shadow-lg group-hover:shadow-purple-500/20 transition-shadow">
                              <MapPin size={22} className="text-purple-300" />
                            </div>
                            <div className="relative flex-1">
                              <p className="text-xs text-purple-400/80 font-semibold mb-1 uppercase tracking-wider">Location</p>
                              <p className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">{c.location}</p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Social Links */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="pt-6"
                        >
                          <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Connect on Social</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {c.github && (
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={c.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-gray-500 transition-all group shadow-lg hover:shadow-gray-700/50"
                              >
                                <Github size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                              </motion.a>
                            )}

                            {c.linkedin && (
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={c.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-700/80 to-blue-800/80 border border-blue-600/50 hover:border-blue-400 transition-all group shadow-lg hover:shadow-blue-600/50"
                              >
                                <Linkedin size={18} className="text-blue-300 group-hover:text-white transition-colors" />
                                <span className="text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">LinkedIn</span>
                              </motion.a>
                            )}

                            {c.facebook && (
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={c.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-600/80 to-blue-700/80 border border-blue-500/50 hover:border-blue-300 transition-all group shadow-lg hover:shadow-blue-500/50"
                              >
                                <Facebook size={18} className="text-blue-300 group-hover:text-white transition-colors" />
                                <span className="text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">Facebook</span>
                              </motion.a>
                            )}

                            {c.instagram && (
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={c.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-pink-600/80 to-rose-700/80 border border-pink-500/50 hover:border-pink-300 transition-all group shadow-lg hover:shadow-pink-500/50"
                              >
                                <Instagram size={18} className="text-pink-300 group-hover:text-white transition-colors" />
                                <span className="text-sm font-semibold text-pink-300 group-hover:text-white transition-colors">Instagram</span>
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Right - Message Form */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                      >
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent mb-6">
                          Send a Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name</label>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
                              required
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                          >
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Your Email</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john@example.com"
                              className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm"
                              required
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Your Message</label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Tell me about your project..."
                              rows={5}
                              className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none backdrop-blur-sm"
                              required
                            />
                          </motion.div>

                          {error && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-red-400 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                              {error}
                            </motion.p>
                          )}
                          
                          {submitted && !error && (
                            <motion.p 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-sm text-green-400 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              Thanks! Your message is on its way.
                            </motion.p>
                          )}

                          <motion.button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                            <Send size={18} className="relative z-10" />
                            <span className="relative z-10">
                              {submitting ? "Opening Mail..." : "Send Message"}
                            </span>
                          </motion.button>

                        </form>
                      </motion.div>
                    </div>
                  );
                })()
              )}
            </motion.div>
          </motion.section>
        </div>
      </main>
    );
  }