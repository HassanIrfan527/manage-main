import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  // TODO: Add animation logic for hero entry
  // TODO: Handle CTA click tracking
  
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Revolutionizing project management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Manage your work <br />
            <span className="bg-linear-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              with Elegance
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of productivity. A seamless blend of power and simplicity 
            designed for the modern developer. Built with React and FastAPI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg backdrop-blur-sm">
              Live Demo
            </Button>
          </div>
          
          <div className="mt-20 relative">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-2xl blur opacity-25" />
            <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
               <span className="text-muted-foreground italic">Dashboard Preview Placeholder</span>
               {/* TODO: Add actual dashboard screenshot or interactive elements */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
