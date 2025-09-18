"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Gamepad2, Eye, Code } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error, isAuthenticated } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    linkedinUrl: "",
    email: "",
    password: "", // Kept for login form
  })
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")
    if (isLogin) {
      // Login
      if (!formData.email || !formData.password) {
        setFormError("Please fill in all fields")
        return
      }
      const success = await login(formData.email, formData.password)
      if (success) {
        router.push("/dashboard")
      }
    } else {
      // Register (submit to Formspree)
      if (!formData.firstName || !formData.lastName || !formData.linkedinUrl || !formData.email) {
        setFormError("Please fill in all fields")
        return
      }
      // Basic LinkedIn URL validation
      if (!formData.linkedinUrl.match(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)) {
        setFormError("Please enter a valid LinkedIn URL")
        return
      }
      try {
        await axios.post(
          "https://formspree.io/f/xyzdkoqg",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            linkedinUrl: formData.linkedinUrl,
            email: formData.email,
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        setFormSuccess("Application submitted! We will approve your application and provide access once reviewed.")
        setFormData({ firstName: "", lastName: "", linkedinUrl: "", email: "", password: "" })
      } catch (err) {
        setFormError("Failed to submit application. Please try again.")
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setFormError("")
    setFormSuccess("")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slideInRight">
          <div className="flex items-center justify-center space-x-3 mb-4">
           <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/claw-logo.svg" alt="CLAW Logo" className="h-10 w-10 object-contain rounded-md" />
              <div>
                {/* <span className="text-2xl font-bold text-foreground text-glow">CLAW</span> */}
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to CLAW</h1>
          <p className="text-muted-foreground">AI-powered game development platform</p>
        </div>
        {/* Login/Register Card */}
        <Card className="shadow-glow glass-strong animate-fadeInUp">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">Get Started</CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-lg glass">
              <TabsTrigger value="login" className="text-white hover:bg-secondary hover:text-white">Login</TabsTrigger>
<TabsTrigger value="register" className="text-white hover:bg-secondary hover:text-white">Register</TabsTrigger>

              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full game-button h-10 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl" className="text-foreground">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      placeholder="Enter your LinkedIn URL"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email ID</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={isLoading}
                      className="game-input text-foreground h-10"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full game-button h-10 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                  {formSuccess && (
                    <Alert className="mt-4 border-game-success">
                      <AlertDescription className="text-game-success">
                        {formSuccess}
                      </AlertDescription>
                    </Alert>
                  )}
                </form>
              </TabsContent>
            </Tabs>
            {/* Error Display */}
            {(error || formError) && (
              <Alert className="mt-4 border-game-warning">
                <AlertDescription className="text-game-warning">
                  {error || formError}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card rounded-lg shadow-card glass animate-float">
            <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">AI Game Generation</h3>
            <p className="text-xs text-muted-foreground">Create games with natural language</p>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow-card glass animate-float">
            <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Code Editor</h3>
            <p className="text-xs text-muted-foreground">Edit and customize your games</p>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow-card glass animate-float">
            <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Live Preview</h3>
            <p className="text-xs text-muted-foreground">See your games in action</p>
          </div>
        </div>
      </div>
    </div>
  )
}