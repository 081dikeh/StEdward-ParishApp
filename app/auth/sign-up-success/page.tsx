import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-900">Welcome to St Edwards Parish!</CardTitle>
              <CardDescription className="text-emerald-700">Your account has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-emerald-900">
                Please check your email to confirm your account before you can access the parish services. Once you
                confirm your email, you'll be able to register for various parish programs.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/auth/login">Return to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
