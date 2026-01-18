import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "@/services/api";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const handleLogin = async (data) => {
    setServerError(null); // Clear previous errors

    const { data: responseData, error } = await api.post("/auth/login", data);

    if (error) {
      // Show error to user
      setServerError(typeof error === "string" ? error : error.message || "Login failed");
      return;
    }

    // Store token and redirect to dashboard
    localStorage.setItem("token", responseData.access_token);
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-md border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Enter your credentials to access your account
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

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
              placeholder="john@example.com"
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:underline transition-all"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              type="password"
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/30"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {serverError && (
          <p className="text-red-500 text-sm font-medium">{serverError}</p>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
