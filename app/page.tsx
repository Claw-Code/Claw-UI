"use client";

import { useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gamepad2, Code, Rocket, Zap, Star, Play, ArrowRight, Brain, Globe, Users, Trophy, Check, MonitorPlay, Smartphone, ChevronRight, Shield, Database, Cpu, Clock, GitBranch, Key, Server, Layers, Infinity, ChartBar, Terminal, Lock, Cloud, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const heroInterface = "/claw-logo.png";
const gamePlatformer = "/claw-logo.png";
const gamePuzzle = "/claw-logo.png";
const gameShooter = "/claw-logo.png";
const gameRacing = "/claw-logo.png";
const stepChat = "/claw-logo.png";
const stepGeneration = "/claw-logo.png";
const stepLive = "/claw-logo.png";

export default function Homepage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize scrollYProgress with a fallback motion value
  const scrollYProgress = useMotionValue(0);
  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    if (containerRef.current) {
      console.log("containerRef is hydrated:", containerRef.current);
      const { scrollYProgress: progress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
      });
      progress.onChange((value) => scrollYProgress.set(value));
    } else {
      console.error("containerRef is not hydrated");
    }

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Creation",
      description: "Transform ideas into games with natural language",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Compatibility",
      description: "Play anywhere - desktop, mobile, VR browsers",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Publishing",
      description: "Share creations worldwide in seconds",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const gameScreenshots = [
    { title: "Platformer Adventure", category: "Action", players: "12K+", image: gamePlatformer },
    { title: "Puzzle Master", category: "Puzzle", players: "8K+", image: gamePuzzle },
    { title: "Space Shooter", category: "Arcade", players: "15K+", image: gameShooter },
    { title: "Racing Circuit", category: "Racing", players: "9K+", image: gameRacing },
  ];

  const stats = [
    { number: "50K+", label: "Games Created" },
    { number: "2M+", label: "Players Worldwide" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "<30s", label: "Creation Time" },
  ];

  const techStack = [
    { name: "WebGL", desc: "Hardware acceleration", icon: Cpu },
    { name: "TypeScript", desc: "Type-safe development", icon: Code },
    { name: "React", desc: "Modern UI framework", icon: Layers },
    { name: "WebAssembly", desc: "Near-native performance", icon: Zap },
    { name: "Cloud Infrastructure", desc: "99.9% uptime", icon: Cloud },
    { name: "AI/ML", desc: "Groq-powered intelligence", icon: Brain },
  ];

  const pricingFeatures = [
    "Unlimited game creation",
    "Real-time AI assistance",
    "Instant deployment",
    "Community sharing",
    "Mobile optimization",
    "Version control",
    "Asset library access",
    "Export source code",
  ];

  const performanceMetrics = [
    { metric: "99.9%", label: "Uptime SLA", icon: Server },
    { metric: "<50ms", label: "AI Response Time", icon: Clock },
    { metric: "500M+", label: "API Calls/Month", icon: ChartBar },
    { metric: "Global", label: "Edge Network", icon: Globe },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Indie Game Developer",
      company: "Former Riot Games",
      quote: "Claw transformed my workflow. What used to take weeks now takes minutes.",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      title: "Creative Director",
      company: "Ex-Blizzard Entertainment",
      quote: "The AI understands game mechanics better than most junior developers.",
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      title: "Technical Artist",
      company: "Former Unity Technologies",
      quote: "Finally, an AI tool that speaks our language. It's like having a senior dev on-demand.",
      avatar: "ET",
    },
  ];

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 glass border-b border-border/50"
        style={{
          backdropFilter: scrollY > 50 ? "blur(20px)" : "blur(12px)",
          backgroundColor: scrollY > 50 ? "hsla(var(--background) / 0.95)" : "hsla(var(--background) / 0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Claw</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors relative group">
              Technology
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#games" className="text-muted-foreground hover:text-foreground transition-colors relative group">
              Games
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <Button className="game-button">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 px-6 min-h-screen flex items-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: 999999,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10 relative"
            >
              <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Free to Create • No Coding Required</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Create Games with
                <span className="text-glow block mt-2">AI Magic</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Transform your wildest game ideas into reality with AI. No coding, no complexity—just pure creative power at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="game-button group">
                  <Play className="w-5 h-5 mr-2" />
                  Try Claw Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-card">
                  <MonitorPlay className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background"
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">50,000+</span> creators worldwide
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative game-card p-2 group">
                <div className="aspect-[4/3] bg-game-surface rounded-lg overflow-hidden relative">
                  <motion.img
                    src={heroInterface}
                    alt="Claw game creation interface showcasing professional development environment"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: 999999 }}
                className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg"
              >
                <Star className="w-6 h-6 text-yellow-500" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  x: [0, -4, 0],
                }}
                transition={{ duration: 5, repeat: 999999, delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-3 shadow-lg"
              >
                <Code className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: 999999, delay: 2 }}
                className="absolute top-1/2 -right-8 bg-card border border-border rounded-lg p-2 shadow-lg"
              >
                <Zap className="w-4 h-4 text-yellow-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-card/30 to-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-glow mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section id="technology" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built with enterprise-grade technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging the same infrastructure and methodologies trusted by Fortune 500 companies
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="game-card p-6 group hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                    <tech.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-primary">
                  <metric.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-2">{metric.metric}</div>
                <div className="text-muted-foreground text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to create
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful AI tools designed to turn anyone into a game developer, regardless of technical background.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: "Natural Language Creation",
                description: "Describe your game in plain English. Our AI understands context, mechanics, and visual style to build exactly what you envision.",
                features: ["Story-driven prompts", "Visual style detection", "Gameplay mechanics", "Character development"],
              },
              {
                icon: <Code className="w-12 h-12" />,
                title: "Instant Code Generation",
                description: "Advanced AI generates optimized game code, handles complex logic, and creates responsive mechanics automatically.",
                features: ["Clean, optimized code", "Cross-platform compatibility", "Performance optimization", "Bug-free generation"],
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Global Publishing",
                description: "Share your games instantly with players worldwide. No app stores, no downloads - just click and play in any browser.",
                features: ["Instant sharing", "Global CDN", "Mobile responsive", "Social features"],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="game-card p-8 space-y-6"
              >
                <div className="text-primary">{feature.icon}</div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Showcase Section */}
      <section id="games" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Games created with Claw
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has built with just a few prompts
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameScreenshots.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group game-card overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/3] bg-game-surface-elevated relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={`${game.title} gameplay screenshot`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-background/80 px-2 py-1 rounded">{game.category}</span>
                      <span className="text-muted-foreground">{game.players} plays</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{game.title}</h3>
                  <p className="text-sm text-muted-foreground">{game.category} • {game.players} players</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-border hover:bg-card">
              View All Games
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-card/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Use Claw completely free with your own Groq API keys. No hidden costs, no subscriptions.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="game-card p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
                  <Key className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">Bring Your Own API</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  Free Forever
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect your own Groq API key and enjoy unlimited access to Claw's game creation platform.
                  Pay only for what you use directly to Groq.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {pricingFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Rate Limits
                    </h4>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>• Based on your Groq API tier</p>
                      <p>• Free tier: 14,400 requests/day</p>
                      <p>• Pay-as-you-go: No daily limits</p>
                      <p>• Enterprise: Custom quotas</p>
                      <a href="https://console.groq.com" className="text-primary hover:underline block mt-2">
                        Check Groq pricing →
                      </a>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="game-button group">
                  <Play className="w-5 h-5 mr-2" />
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  No credit card required • Set up in under 2 minutes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by industry professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what leading developers are saying about Claw
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="game-card p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  <div className="text-xs text-primary">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Three steps to your dream game
            </h2>
            <p className="text-xl text-muted-foreground">
              From idea to playable game in under a minute
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Vision",
                description: "Tell Claw what you want to create using natural language. Be as detailed or simple as you like.",
                image: stepChat,
              },
              {
                step: "02",
                title: "AI Creates Your Game",
                description: "Our advanced AI generates code, assets, and mechanics based on your description in seconds.",
                image: stepGeneration,
              },
              {
                step: "03",
                title: "Play & Share Instantly",
                description: "Your game is ready to play in any browser. Share it with friends or publish to our community.",
                image: stepLive,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="game-card p-8 text-center group-hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl font-bold text-muted-foreground/20 mb-4 group-hover:text-muted-foreground/30 transition-colors">
                    {item.step}
                  </div>
                  <div className="aspect-video bg-game-surface rounded-lg mb-6 relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={`Step ${item.step}: ${item.title}`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built for developers, by developers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade tools with the simplicity you'd expect from world-class platforms
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Terminal,
                  title: "CLI Integration",
                  description: "Deploy directly from your terminal with our developer CLI",
                },
                {
                  icon: GitBranch,
                  title: "Version Control",
                  description: "Built-in Git integration with automatic branching and merging",
                },
                {
                  icon: Lock,
                  title: "Enterprise Security",
                  description: "SOC 2 compliant with end-to-end encryption",
                },
                {
                  icon: Database,
                  title: "Real-time Analytics",
                  description: "Monitor performance and player behavior in real-time",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <div className="text-primary flex-shrink-0 mt-1">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="game-card p-6 bg-game-surface"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2">claw-cli v2.1.0</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-muted-foreground">$ claw create platformer-adventure</div>
                  <div className="text-primary">✓ Game initialized successfully</div>
                  <div className="text-muted-foreground">$ claw deploy --env production</div>
                  <div className="text-primary">✓ Deployed to claw.codes/platformer-adventure</div>
                  <div className="text-muted-foreground">$ claw analytics --live</div>
                  <div className="text-primary">📊 125 players online</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: 999999,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to build the next
              <motion.span
                className="text-glow block"
                animate={{
                  textShadow: [
                    "0 0 10px hsla(var(--primary), 0.5)",
                    "0 0 20px hsla(var(--primary), 0.8)",
                    "0 0 10px hsla(var(--primary), 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: 999999 }}
              >
                gaming revolution?
              </motion.span>
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who are already building amazing games with AI. Your next masterpiece is just one prompt away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="game-button group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-border hover:bg-card">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Check className="w-4 h-4 text-green-500" />
                Always free to create
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Check className="w-4 h-4 text-green-500" />
                No credit card required
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Check className="w-4 h-4 text-green-500" />
                Enterprise-grade security
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Gamepad2 className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">Claw</span>
              </motion.div>
              <p className="text-muted-foreground">
                Empowering creators worldwide with enterprise-grade AI game development tools.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">SOC 2 Compliant</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#games" className="hover:text-foreground transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">CLI Tools</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">SDKs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Webhooks</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status Page</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left text-muted-foreground">
                <p>&copy; 2025 Claw. Built with ❤️ for the gaming community.</p>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All systems operational
                </span>
                <a href="https://console.groq.com" className="hover:text-foreground transition-colors">
                  Powered by Groq
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}