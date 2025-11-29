import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, FileText, Trash2 } from "lucide-react";
import { applicationsApi, Application } from "@/api";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Applications() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await applicationsApi.getApplications();
      setApplications(response.content);
    } catch (error) {
      toast.error("Failed to load applications");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await applicationsApi.deleteApplication(id);
      toast.success(t("applications.applicationDeleted"));
      loadApplications();
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-gray-500";
      case "submitted":
        return "bg-blue-500";
      case "under_review":
        return "bg-yellow-500";
      case "shortlisted":
        return "bg-purple-500";
      case "awarded":
        return "bg-green-500";
      case "declined":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("applications.title")}</h1>
          <p className="text-muted-foreground">
            View and manage your funding applications
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              {t("applications.noApplications")}
            </p>
            <Button onClick={() => navigate("/")}>Browse Projects</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">
                        {application.title}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>
                        {t(
                          `applications.${application.status.toLowerCase()}`
                        ) || application.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {t("applications.project")}:{" "}
                      {application.projectName ||
                        `Project #${application.projectId}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/applications/${application.id}`)
                      }
                    >
                      {t("applications.viewApplication")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(application.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {t("applications.submittedDate")}
                    </p>
                    <p className="font-medium">
                      {formatDate(application.dateApplication)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Budget</p>
                    <p className="font-medium">
                      {formatCurrency(application.budget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Start Date</p>
                    <p className="font-medium">
                      {formatDate(application.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">End Date</p>
                    <p className="font-medium">
                      {formatDate(application.endDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              {t("applications.deleteConfirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
