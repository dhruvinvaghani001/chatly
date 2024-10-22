import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import { Logo } from "@/assets";
import { useAuthContext } from "@/context/authSlice";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const NavBar = () => {
  const { status } = useAuthContext();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              {Logo ? (
                <img src={Logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <MessageCircle className="h-8 w-8 text-indigo-400" />
              )}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {status ? (
              <a
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-indigo-400"
              >
                Dashboard
              </a>
            ) : null}

            {/* Auth Buttons */}
            {!status && (
              <div className="flex items-center space-x-4">
                <a href="/login">
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex hover:text-indigo-400"
                  >
                    Login
                  </Button>
                </a>
                <a href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 hidden md:inline-flex">
                    Sign Up
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
