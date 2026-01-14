import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Github, Mail } from "lucide-react";
import { ERROR_MESSAGES } from "@/constants/errors";
import { useState } from "react";
import { apiUrl } from "@/constants/config";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // TODO: Add form validation logic

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // TODO: Handle form submission for login/register
  const handleSumbission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear old errors

    // Submission logic
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Redirecting...");
      } else {
        const errorCode = data.detail.code;
        const friendlyMessage =
          ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.DEFAULT;
        setErrors({ server: friendlyMessage });
      }
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full backdrop-blur-sm hover:bg-muted/50 transition-all group"
          >
            <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Github
          </Button>
          <Button
            variant="outline"
            className="w-full backdrop-blur-sm hover:bg-muted/50 transition-all group"
          >
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
          <form onSubmit={handleSumbission}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                onChange={handleChange}
                value={formData.fullName}
                required
                placeholder="John Doe"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                placeholder="john@example.com"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                name="password"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base font-semibold bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
              >
                {loading ? "Registering..." : "Create Account"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {/* Show Error Message if exists */}
        {errors.server && (
          <p className="text-red-500 text-sm font-medium">{errors.server}</p>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
