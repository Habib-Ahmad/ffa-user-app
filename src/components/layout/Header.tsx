import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Globe, Menu, Moon, Sun, LogOut, User } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${
      user.lastName?.[0] || ""
    }`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-primary/80" />
          <span className="font-semibold text-lg">FFA User Portal</span>
        </div>

        <div className="flex-1" />

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">{language.toUpperCase()}</span>
        </Button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
