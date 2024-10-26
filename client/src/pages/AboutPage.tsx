import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Link, Mail, AlertTriangle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Shield Web</h1>
        <p className="text-xl text-muted-foreground">Your first line of defense against online threats</p>
      </header>

      <main className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">What We Do</h2>
          <p className="text-lg mb-4">
            Shield Web is a cutting-edge web application designed to protect you from various online threats. 
            Our advanced algorithms work tirelessly to detect and flag potentially harmful content, keeping you safe online.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="mr-2" />
                  Spam Link Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Identify and block spam links before they reach you, keeping your browsing experience clean and safe.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2" />
                  Phishing Link Prevention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Stay protected from phishing attempts with our advanced link analysis and warning system.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2" />
                  Spam Email Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Keep your inbox clutter-free with our intelligent spam email detection and filtering capabilities.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Shield Web?</h2>
          <p className="text-lg mb-6">
            With the increasing sophistication of online threats, it's crucial to have a reliable defense mechanism. 
            Shield Web offers real-time protection, easy integration, and peace of mind for all your online activities.
          </p>
          <Button size="lg" className="font-semibold">
            <ShieldCheck className="mr-2" />
            Start Protecting Yourself Now
          </Button>
        </section>
      </main>
    </div>
  )
}