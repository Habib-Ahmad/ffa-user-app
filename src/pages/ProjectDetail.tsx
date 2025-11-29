import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  ArrowLeft,
  Send,
} from "lucide-react";
import { projectsApi, Project } from "@/api";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProject = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await projectsApi.getProjectById(parseInt(id));
      setProject(data);
    } catch (error) {
      toast.error("Failed to load project details");
      console.error(error);
      navigate("/projects");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <FileText className="h-16 w-16 text-muted-foreground" />
        <p className="text-muted-foreground">Project not found</p>
        <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{t("projects.projectDetails")}</h1>
        </div>
        <Button onClick={() => navigate(`/apply/${project.id}`)} size="lg">
          <Send className="h-4 w-4 mr-2" />
          Apply to Project
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <Badge
                  variant={project.status === "DRAFT" ? "secondary" : "default"}
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Total Budget
                    </h4>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-semibold">
                        {formatCurrency(project.totalBudget)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Start Date
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(project.startDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Submission Deadline
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(project.submissionDate)}</span>
                    </div>
                  </div>

                  {project.location && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Location
                      </h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{project.location.name}</span>
                      </div>
                      {project.location.postalCode && (
                        <p className="text-sm text-muted-foreground ml-6">
                          Postal Code: {project.location.postalCode}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  Project ID
                </h4>
                <p className="font-mono text-sm">{project.id}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  Created On
                </h4>
                <p className="text-sm">{formatDate(project.creationDate)}</p>
              </div>

              {project.location?.department && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Department
                    </h4>
                    <p className="text-sm">{project.location.department}</p>
                  </div>
                </>
              )}

              <Separator />

              <div className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(`/apply/${project.id}`)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Have questions about this project? Contact our support team for
                assistance.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/messages")}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
