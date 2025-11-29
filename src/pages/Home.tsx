import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, FileText, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          {t("home.welcome")}, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground text-lg">{t("home.description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate("/projects")}
        >
          <CardHeader>
            <FolderOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Browse Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore available funding opportunities and find projects that
              match your interests.
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate("/applications")}
        >
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View and manage your submitted applications and track their
              status.
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate("/messages")}
        >
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Check your messages and notifications about your applications.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
