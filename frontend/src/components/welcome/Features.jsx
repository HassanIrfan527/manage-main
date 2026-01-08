import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Layout, Zap, Shield, BarChart3, Globe, Command } from 'lucide-react';

const features = [
  {
    title: 'Intuitive Design',
    description: 'Beautifully crafted interface that stays out of your way and lets you focus.',
    icon: Layout,
  },
  {
    title: 'Blazing Fast',
    description: 'Powered by FastAPI and React for near-instant responses and transitions.',
    icon: Zap,
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security features to keep your project data safe.',
    icon: Shield,
  },
  {
    title: 'Insightful Analytics',
    description: 'Understand your progress with deep data insights and visualizations.',
    icon: BarChart3,
  },
  {
    title: 'Global Scale',
    description: 'Deploy anywhere and scale effortlessly with our modern architecture.',
    icon: Globe,
  },
  {
    title: 'Keyboard First',
    description: 'Full command palette support for power users who love efficiency.',
    icon: Command,
  },
];

const Features = () => {
  // TODO: Add scroll reveal animations for cards
  // TODO: Implement interactive hover states for each card
  
  return (
    <section className="py-24 bg-card/30 backdrop-blur-sm border-y border-border/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive suite of tools designed to help you build, scale, and manage 
            your projects with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/80 border-border/50 hover:border-primary/50 transition-colors group cursor-default">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                 {/* TODO: Add 'Learn More' link or interactive tooltip */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
