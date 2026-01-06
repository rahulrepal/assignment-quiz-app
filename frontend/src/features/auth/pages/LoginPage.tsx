import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface LoginPageProps {}

export function LoginPage({}: LoginPageProps) {
  const navigate = useNavigate();
  const { username, setUsername, password, setPassword, login } = useLogin();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        actions={[
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quizzes
          </Button>,
        ]}
        hideTitle
      />
      <main className="flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md h-full">
          <CardHeader className="space-y-1">
            <CardTitle>Login to your account</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="xyz"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" onClick={login}>
              Login <ArrowRight />
            </Button>
            <span className="text-xs text-center text-muted-foreground flex gap-2 items-start">
              <Lock className="w-4 h-4" /> Only admins can access this panel
            </span>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
