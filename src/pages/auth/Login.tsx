import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Globe } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const loginSchema = Yup.object({
  login: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleSubmit = async (values: { login: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(values);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);

      toast.success(t("auth.loginSuccess") || "Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          {language.toUpperCase()}
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("auth.welcomeBack") || "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.loginDescription") ||
              "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ login: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login">{t("auth.email") || "Email"}</Label>
                  <Field
                    as={Input}
                    id="login"
                    name="login"
                    type="email"
                    placeholder="john.doe@example.com"
                    className={
                      errors.login && touched.login ? "border-red-500" : ""
                    }
                  />
                  <ErrorMessage
                    name="login"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t("auth.password") || "Password"}
                  </Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={
                        errors.password && touched.password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? t("common.loading") || "Loading..."
                    : t("auth.login") || "Login"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            {t("auth.noAccount") || "Don't have an account?"}{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              {t("auth.register") || "Register"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
