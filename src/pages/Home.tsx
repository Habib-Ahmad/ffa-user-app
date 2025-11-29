import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 py-12">
        <div className="flex justify-center">
          <Sparkles className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">{t("home.welcome")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("home.description")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("home.feature1.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("home.feature1.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("home.feature2.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("home.feature2.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("home.feature3.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("home.feature3.description")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button size="lg">{t("home.getStarted")}</Button>
      </div>
    </div>
  );
}
