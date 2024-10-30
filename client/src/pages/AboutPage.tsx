import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Link, Mail, AlertTriangle } from "lucide-react";
import { Link as a } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <section className="my-14 p-10">
        <div>
          <h2 className="text-2xl text-center font-semibold mb-6">
            What We Do
          </h2>
          <p className="text-lg mb-4 text-center">
            Shield Web is a cutting-edge web application designed to protect you
            from various online threats. Our advanced algorithms work tirelessly
            to detect and flag potentially harmful content, keeping you safe
            online.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/home">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link className="mr-2" />
                    Spam Link Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Identify and block spam links before they reach you, keeping
                    your browsing experience clean and safe.
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="/home">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2" />
                    Phishing Link Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay protected from phishing attempts with our advanced link
                    analysis and warning system.
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="/home">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2" />
                    Spam Email Filter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Keep your inbox clutter-free with our intelligent spam email
                    detection and filtering capabilities.
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>

        <div className="text-center mt-5">
          <h2 className="text-2xl font-semibold mb-6">
            Why Choose Shield Web?
          </h2>
          <p className="text-lg mb-6">
            With the increasing sophistication of online threats, it's crucial
            to have a reliable defense mechanism. Shield Web offers real-time
            protection, easy integration, and peace of mind for all your online
            activities.
          </p>
          <a href={"/home"}>
            <Button size="lg" className="font-semibold">
              <ShieldCheck className="mr-2" />
              Start Protecting Yourself Now
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
