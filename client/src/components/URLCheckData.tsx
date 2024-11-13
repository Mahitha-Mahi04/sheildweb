import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, LoaderCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface SecurityChecks {
  domain_flagged: boolean;
  url_flagged: boolean;
  ai_flagged: boolean;
  new_domain: boolean;
}

interface RequestedUser {
  _id: string;
  name: string;
  email: string;
}

interface UrlCheck {
  _id: string;
  url: string;
  risk_score: number;
  security_checks: SecurityChecks;
  requested_user: RequestedUser;
  createdAt: string;
  updatedAt: string;
}

export default function UrlChecksPage() {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [urlCheckData, setUrlCheckData] = useState<UrlCheck[]>([]);

  useEffect(() => {
    const fetchUrlCheckData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/all-url-checks");
        const data = await res.json();
        if (!res.ok) {
          toast({
            title: "Error fetching URL check data",
            description: data.message,
            variant: "destructive",
          });
          return;
        }
        setUrlCheckData(data.urlChecks);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchUrlCheckData();
  }, []);

  return loading ? (
    <div className="size-full flex justify-center items-center">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">URL Security Checks</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {urlCheckData.map((check) => (
          <Card key={check._id}>
            <CardHeader>
              <CardTitle className="text-lg">{check.url}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Checked on: {new Date(check.createdAt).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge
                  variant={check.risk_score > 5 ? "destructive" : "secondary"}
                >
                  Risk Score: {check.risk_score}
                </Badge>
                <p className="text-sm">
                  Requested by:{" "}
                  <span className="font-semibold">
                    {check.requested_user.name}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(check.security_checks).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    {value ? (
                      <XCircle className="h-4 w-4 text-destructive mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    )}
                    <span className="text-sm capitalize">
                      {key.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
