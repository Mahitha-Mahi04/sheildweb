import { useState } from "react";
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
import { Shield, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useUser } from "@/context/userContext";
import { Link } from "react-router-dom";

interface SecurityChecks {
  domain_flagged: boolean;
  url_flagged: boolean;
  ai_flagged: boolean;
  new_domain: boolean;
}

interface AnalysisResult {
  url: string;
  risk_score: number;
  security_checks: SecurityChecks;
}

export default function URLSpamDetection() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Fetch from the third-party API
      const res = await fetch("/check-url", {
        headers: {
          Authorization: "Bearer AZgWNHYj7i8lLns5EAWIx0PiHhJc2BF3mVascmkF",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          url,
          follow_redirects: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data); // Store the response data

        // Send data to backend to store in database
        await fetch("/api/user/store-url-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, userId: user?._id }),
        });
      } else {
        console.error("Failed to fetch:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error analyzing URL:", error);
    } finally {
      setIsLoading(false);
    }
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
                <Button type="submit" disabled={isLoading}>
                  <Shield className="mr-2 h-4 w-4" />
                  {isLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </CardContent>
          </form>
          {result && (
            <CardContent>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
                <p>
                  <strong>URL:</strong> {result.url}
                </p>
                <p>
                  <strong>Risk Score:</strong> {result.risk_score}
                </p>
                <h4 className="font-semibold mt-2 mb-1">Security Checks:</h4>
                <ul className="space-y-1">
                  {Object.entries(result.security_checks).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-center">
                        {value ? (
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <Link to={"/history"} className="w-fit flex mx-auto mt-2">See History</Link>
            </CardContent>
          )}
          <CardFooter className="text-sm text-muted-foreground text-center">
            <p>
              Our advanced algorithms will scan the provided URL for potential
              threats and spam indicators.
            </p>
          </CardFooter>
        </Card>
      </section>
    </Layout>
  );
}
