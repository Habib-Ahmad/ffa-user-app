import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save, Send } from "lucide-react";
import { projectsApi, applicationsApi, Project } from "@/api";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ApplyToProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const [formData, setFormData] = useState({
    motivation: "",
  });

  const loadProjectAndCheck = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [projectData, appliedStatus] = await Promise.all([
        projectsApi.getProjectById(parseInt(id)),
        applicationsApi.checkIfApplied(parseInt(id)),
      ]);

      setProject(projectData);
      setHasApplied(appliedStatus.applied);

      if (appliedStatus.applied) {
        toast.info("You have already applied to this project");
        setTimeout(() => navigate(`/projects/${id}`), 2000);
        return;
      }

      // Try to load draft application
      const draftApp = await applicationsApi.getDraftApplication(parseInt(id));
      if (draftApp) {
        setFormData({
          motivation: draftApp.motivation || "",
        });
        toast.success("Draft application loaded");
      }
    } catch (error) {
      toast.error("Failed to load project details");
      console.error(error);
      navigate("/projects");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadProjectAndCheck();
  }, [loadProjectAndCheck]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await applicationsApi.saveApplicationStep({
        projectId: parseInt(id),
        motivation: formData.motivation,
      });
      toast.success("Draft saved successfully");
    } catch (error) {
      toast.error("Failed to save draft");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Validation
    if (!formData.motivation) {
      toast.error("Please provide your motivation");
      return;
    }

    setIsSubmitting(true);
    try {
      const application = await applicationsApi.createApplication(
        parseInt(id),
        {
          projectId: parseInt(id),
          motivation: formData.motivation,
        }
      );

      toast.success("Application submitted successfully!");
      navigate(`/applications/${application.id}`);
    } catch (error) {
      toast.error("Failed to submit application");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project || hasApplied) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/projects/${id}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Apply to Project</h1>
          <p className="text-muted-foreground">{project.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="motivation">
                    Motivation <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Explain why you want to apply for this project and what you
                    can contribute
                  </p>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Why are you applying to this project?"
                    rows={8}
                    required
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSaving || isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Draft"}
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isSaving}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Total Budget</p>
                <p className="font-semibold">
                  {formatCurrency(project.totalBudget)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Start Date</p>
                <p className="font-medium">{formatDate(project.startDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  Submission Deadline
                </p>
                <p className="font-medium">
                  {formatDate(project.submissionDate)}
                </p>
              </div>
              {project.location && (
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{project.location.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Provide a clear motivation for your application</p>
              <p>• You can save your application as a draft</p>
              <p>• Review your motivation before submitting</p>
              <p>• Once submitted, the application cannot be modified</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
