import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, FolderOpen, Search } from "lucide-react";
import { projectsApi, Project } from "@/api";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Projects() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await projectsApi.getProjects(0, 100);
      setProjects(response.content);
    } catch (error) {
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadProjects();
      return;
    }

    setIsSearching(true);
    try {
      const response = await projectsApi.searchProjects(searchKeyword);
      setProjects(response.content);
    } catch (error) {
      toast.error("Failed to search projects");
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("projects.title")}</h1>
        <p className="text-muted-foreground">
          Browse and apply to available funding opportunities
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("projects.searchPlaceholder")}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
        {searchKeyword && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchKeyword("");
              loadProjects();
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              {searchKeyword
                ? "No projects found matching your search"
                : t("home.noProjects")}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {project.name}
                  </CardTitle>
                  <Badge
                    variant={
                      project.status === "DRAFT" ? "secondary" : "default"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatCurrency(project.totalBudget)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Start: {formatDate(project.startDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  {project.location && (
                    <div className="text-muted-foreground">
                      📍 {project.location.name}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  {t("projects.viewDetails")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
