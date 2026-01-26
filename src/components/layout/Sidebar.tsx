import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Home, FolderOpen, FileText } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { t } = useLanguage();

  const links = [
    { to: "/", icon: Home, label: t("nav.home"), end: true },
    { to: "/projects", icon: FolderOpen, label: t("nav.projects"), end: false },
    {
      to: "/applications",
      icon: FileText,
      label: t("nav.myApplications"),
      end: false,
    },
  ];

  return (
    <aside className={cn("w-64 border-r bg-card flex flex-col", className)}>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
