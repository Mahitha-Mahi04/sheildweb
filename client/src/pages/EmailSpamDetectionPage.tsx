import { useState } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';

interface SpamDetectionResponse {
  success: boolean;
  result: 'ham' | 'spam';
  confidence: string;
}

const EmailSpamDetectionPage = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<SpamDetectionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/user/spam-detection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch spam detection result');
      }

      const data: SpamDetectionResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred while analyzing the email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className='flex-col'>
      <h1 className="text-center text-3xl font-bold my-4">AI Email Spam Detection</h1>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Paste your email content below to check if it's likely to be spam. Our advanced AI algorithm will analyze the text and provide a result along with a confidence score.
      </p>
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Email Content Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 mb-2">
            Enter the full text of the email you want to analyze:
          </p>
          <Textarea 
            className="min-h-32 max-h-64" 
            placeholder="Paste your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {result && (
            <Alert variant={result.result === 'spam' ? 'destructive' : 'default'}>
              <AlertTitle>
                {result.result === 'spam' ? 'Spam Detected' : 'Not Spam'}
              </AlertTitle>
              <AlertDescription>
                Confidence: {result.confidence}%
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={loading || email.trim().length === 0}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Check for Spam'
            )}
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}

export default EmailSpamDetectionPage;

