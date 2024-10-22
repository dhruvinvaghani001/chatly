import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ReactNode } from "react";
import Home from "./pages/Home";
import { ModeToggle } from "./components/ui/mode-toggle";
import NavBar from "./components/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import AuthProvider from "./components/auth/AuthProvider";
import { Github } from "lucide-react";

function AuthThemeButtonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <>{children}</>
      <ModeToggle className="bottom-8 right-4  fixed md:bottom-20 md:right-20"></ModeToggle>
    </>
  );
}

function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        {children}
        <footer className="bg-slate-950 border-t border-violet-900/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">
                © 2024 Chatly. All rights reserved.
              </p>
              <a
                href="https://github.com/dhruvinvaghani001"
                className="text-slate-400 hover:text-violet-300 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      index: true,
      element: (
        <NavBarLayout>
          <Home />
        </NavBarLayout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthProvider authentication={true}>
          <Dashboard />
        </AuthProvider>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthProvider authentication={false}>
          <AuthThemeButtonLayout>
            <Login />
          </AuthThemeButtonLayout>
        </AuthProvider>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthProvider authentication={false}>
          <AuthThemeButtonLayout>
            <Signup />
          </AuthThemeButtonLayout>
        </AuthProvider>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
