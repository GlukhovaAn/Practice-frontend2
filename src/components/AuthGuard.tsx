"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Проверяем наличие токена в LocalStorage
      const token = localStorage.getItem("auth_token");
      const timestamp = localStorage.getItem("auth_timestamp");

      if (!token || !timestamp) {
        setIsAuthenticated(false);
        return;
      }

      // Проверяем срок действия токена (например, 24 часа)
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 часа

      if (tokenAge > maxAge) {
        // Токен устарел
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("auth_timestamp");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated === false && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Проверка авторизации...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
