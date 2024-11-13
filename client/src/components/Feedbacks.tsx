import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Feedback = {
  _id: string;
  feedback: string;
  rating: Number;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
};

export default function FeedbackSection() {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/feedbacks");
        const data = await res.json();

        if (!res.ok) {
          toast({
            title: "Error fetching feedback data",
            description: data.message || "An error occurred",
            variant: "destructive",
          });
          return;
        }

        setFeedbackData(data.feedbacks);
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          title: "Network Error",
          description: "Unable to fetch feedback data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Feedback</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbackData.map((feedback) => (
          <Card key={feedback._id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{feedback.user.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(feedback.createdAt).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{feedback.feedback}</p>
            </CardContent>
            <CardFooter>
              {feedback.rating && <p>Rating : <span className="text-lg font-semibold text-blue-600">{feedback.rating.toString()}</span></p>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
