import React, { Suspense, useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, CheckCircle, XCircle, ExternalLink, Loader } from 'lucide-react';
import Layout from '@/components/Layout';

interface AnalysisResult {
  description: string;
  domain: string;
  heading_count: {
    [key: string]: number;
  };
  headings: {
    [key: string]: string[];
  };
  images: {
    src: string;
    alt: string;
  }[];
  keywords: [string, number][];
  lang: string;
  links: {
    count: {
      total: number;
      internal: number;
      external: number;
      others: number;
    };
    internal: {
      href: string;
      text: string;
      _type: string;
      url: string;
    }[];
    external: {
      href: string;
      text: string;
      _type: string;
      url: string;
    }[];
    others: {
      href: string;
      text: string;
      url: string;
      _type: string;
    }[];
  };
  readability: {
    flesch_score: number;
    readability: string;
  };
  seo_issues: {
    errors: {
      error_type: string;
      message: string;
    }[];
    warnings: {
      error_type: string;
      message: string;
    }[];
    notices: {
      error_type: string;
      message: string;
      image?: string;
    }[];
  };
  status_code: number;
  structured_data: {
    formats_found: string[];
    data: {
      [key: string]: any;
    };
  };
  title: string;
  url: string;
  word_count: number;
}

export default function SEOAnalysisPage() {
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/page-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': '103f07e5e2msh4ac5b3aa3a94247p19dbd0jsn1a64a7837e66',
          'x-rapidapi-host': 'on-page-seo-audit.p.rapidapi.com'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (data.status_code === 200 && data.data) {
        setResult(data.data);
      } else {
        setError(data.data?.message || 'An error occurred while fetching the data.');
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">SEO Analysis</CardTitle>
            <CardDescription>
              Enter a URL to analyze its SEO performance and get detailed insights
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
                  <Search className="mr-2 h-4 w-4" />
                  {isLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </CardContent>
          </form>
          {error && (
            <CardContent>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            </CardContent>
          )}
          {result && (
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="links">Links</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Title</h3>
                          <p>{result.title}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Description</h3>
                          <p>{result.description}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Readability</h3>
                          <div className="flex items-center space-x-2">
                            <Progress value={result.readability.flesch_score} max={100} color='red' className="w-full"/>
                            <span className="text-sm font-medium">
                              {result.readability.flesch_score.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {result.readability.readability}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">SEO Issues</h3>
                          <div className="flex space-x-2 mt-2">
                            <Badge variant="destructive">
                              {result.seo_issues.errors.length} Errors
                            </Badge>
                            <Badge className='bg-yellow-400'>
                              {result.seo_issues.warnings.length} Warnings
                            </Badge>
                            <Badge variant="default">
                              {result.seo_issues.notices.length} Notices
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="headings">
                          <AccordionTrigger>Headings</AccordionTrigger>
                          <AccordionContent>
                            {Object.entries(result.headings).map(([level, headings]) => (
                              <div key={level} className="mb-4">
                                <h4 className="text-lg font-semibold">{level.toUpperCase()}</h4>
                                <ul className="list-disc pl-5">
                                  {headings.map((heading, index) => (
                                    <li key={index}>{heading}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="keywords">
                          <AccordionTrigger>Top Keywords</AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Keyword</TableHead>
                                  <TableHead>Score</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {result.keywords.slice(0, 10).map(([keyword, score], index) => (
                                  <TableRow key={index}>
                                    <TableCell>{keyword}</TableCell>
                                    <TableCell>{score.toFixed(3)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="technical">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical SEO</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Language</h3>
                          <p>{result.lang}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Word Count</h3>
                          <p>{result.word_count}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Structured Data</h3>
                          <p>Formats found: {result.structured_data.formats_found.join(', ')}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">SEO Issues</h3>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="errors">
                              <AccordionTrigger>
                                <Badge variant="destructive" className="mr-2">
                                  {result.seo_issues.errors.length}
                                </Badge>
                                Errors
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5">
                                  {result.seo_issues.errors.map((error, index) => (
                                    <li key={index} className="text-red-500">{error.message}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="warnings">
                              <AccordionTrigger>
                                <Badge className="mr-2 bg-yellow-400">
                                  {result.seo_issues.warnings.length}
                                </Badge>
                                Warnings
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5">
                                  {result.seo_issues.warnings.map((warning, index) => (
                                    <li key={index} className="text-yellow-500">{warning.message}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="notices">
                              <AccordionTrigger>
                                <Badge variant="default" className="mr-2">
                                  {result.seo_issues.notices.length}
                                </Badge>
                                Notices
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5">
                                  {result.seo_issues.notices.map((notice, index) => (
                                    <li key={index} className="text-blue-500">{notice.message}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="links">
                  <Card>
                    <CardHeader>
                      <CardTitle>Links Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Link Summary</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="font-medium">Total Links</p>
                              <p className="text-2xl">{result.links.count.total}</p>
                            </div>
                            <div>
                              <p className="font-medium">Internal Links</p>
                              <p className="text-2xl">{result.links.count.internal}</p>
                            </div>
                            <div>
                              <p className="font-medium">External Links</p>
                              <p className="text-2xl">{result.links.count.external}</p>
                            </div>
                            <div>
                              <p className="font-medium">Other Links</p>
                              <p className="text-2xl">{result.links.count.others}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">External Links</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead>Text</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {result.links.external.map((link, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                      {link.url}
                                      <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                  </TableCell>
                                  <TableCell>{link.text || 'N/A'}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="images">
                  <Card>
                    <CardHeader>
                      <CardTitle>Images Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Alt Text</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.images.map((image, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Suspense fallback={<Loader className='size-6 animate-spin'/>}>
                                <img src={`${result.url}/${image.src}`} alt={image.alt} className="rounded-md shadow-md size-20 object-cover" />
                                </Suspense>
                              </TableCell>
                              <TableCell>
                                {image.alt ? (
                                  <span className="flex items-center">
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    {image.alt}
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                    No alt text
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
          <CardFooter className="text-sm text-muted-foreground text-center">
            <p>
              Our advanced algorithms analyze the provided URL for SEO performance and provide detailed insights to help improve your website's visibility.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

