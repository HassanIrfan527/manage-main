import React from 'react';
import LoginForm from '../components/auth/loginForm';
import Navbar from '../components/ui/navbar';

const RegisterPage = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          <LoginForm isRegister={true} />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
