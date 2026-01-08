import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Github, Mail } from 'lucide-react';

const LoginForm = ({ isRegister = false }) => {
  // TODO: Implement form state management (useState)
  // TODO: Add form validation logic
  // TODO: Handle form submission for login/register
  
  return (
    <Card className="w-full max-w-md border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          {isRegister ? 'Create an account' : 'Welcome back'}
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          {isRegister 
            ? 'Enter your details below to create your account' 
            : 'Enter your credentials to access your account'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full backdrop-blur-sm hover:bg-muted/50 transition-all group">
            <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Github
          </Button>
          <Button variant="outline" className="w-full backdrop-blur-sm hover:bg-muted/50 transition-all group">
            <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Google
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="bg-muted/30 border-border/50 focus-visible:ring-primary/30" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="bg-muted/30 border-border/50 focus-visible:ring-primary/30" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isRegister && (
                <a href="#" className="text-xs text-primary hover:underline transition-all">
                  Forgot password?
                </a>
              )}
            </div>
            <Input id="password" type="password" className="bg-muted/30 border-border/50 focus-visible:ring-primary/30" />
          </div>
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" className="bg-muted/30 border-border/50 focus-visible:ring-primary/30" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full h-11 text-base font-semibold bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
          {isRegister ? 'Sign Up' : 'Log In'}
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Log in
              </a>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;