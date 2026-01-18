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
import api from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const handleSumbission = async (data) => {
    console.log("Form Data:", data);

    // Using the api utility - it handles headers and JSON parsing for us
    const { data: responseData, error } = await api.post("/auth/register", data);

    if (error) {
      // TODO: Display this error to the user (we can add state for this later)
      console.log("Registration failed:", error);
      return;
    }

    // Store token and redirect
    localStorage.setItem("token", responseData.access_token);
    navigate("/dashboard");
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
          <form onSubmit={handleSubmit(handleSumbission)}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name", {
                  required: "Full name is required",
                })}
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  watch,
                })}
                id="password"
                type="password"
                name="password"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  // 3. Custom validation logic
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                id="confirm-password"
                type="password"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-base font-semibold bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Registering..." : "Register"}
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
