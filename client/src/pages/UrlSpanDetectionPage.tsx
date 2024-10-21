"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Layout from "@/components/Layout";

export default function URLSpamDetection() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement URL spam detection logic
    console.log("Detecting spam for URL:", url);
    // Reset the input field after submission
    setUrl("");
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              URL Spam Detection
            </CardTitle>
            <CardDescription>
              Enter a URL to check for potential spam or malicious content
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  type="url"
                  placeholder="Enter URL to analyze"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit">
                  <Shield className="mr-2 h-4 w-4" />
                  Analyze
                </Button>
              </div>
            </CardContent>
          </form>
          <CardFooter className="text-sm text-muted-foreground text-center">
            Our advanced algorithms will scan the provided URL for potential
            threats and spam indicators.
          </CardFooter>
        </Card>
      </section>
    </Layout>
  );
}
