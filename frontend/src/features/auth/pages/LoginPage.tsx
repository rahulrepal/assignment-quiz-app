import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks"

export interface LoginPageProps {}

export function LoginPage({}: LoginPageProps) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    login
  } = useLogin();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="min-h-screen w-full flex items-center justify-center">
        <Card className="min-w-[350px] md:min-w-[400px] h-full">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
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
          <CardFooter>
            <Button type="submit" className="w-full" onClick={login}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
};