import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("nav.messages")}</h1>
        <p className="text-muted-foreground">
          View your messages and notifications
        </p>
      </div>

      <Card className="p-12">
        <div className="text-center space-y-4">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-muted-foreground">
              You'll receive notifications here when there are updates on your
              applications
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
