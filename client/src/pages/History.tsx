import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, RotateCw } from "lucide-react";

type SecurityChecks = {
  domain_flagged: boolean;
  url_flagged: boolean;
  ai_flagged: boolean;
  new_domain: boolean;
};

type URLCheck = {
  url: string;
  risk_score: number;
  security_checks: SecurityChecks;
};

interface Error {
  success: boolean;
  message: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<URLCheck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/user/url-checks");
      const data: URLCheck[] | Error = await response.json();

      if (!response.ok) {
        throw new Error((data as Error).message || "Error fetching URL history");
      }

      setHistory(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCircle size={50} className="animate-spin" />
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md text-center">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
            <button
              onClick={fetchHistory}
              className="flex items-center justify-center mt-2 mx-auto text-blue-600 hover:text-blue-800"
            >
              Retry <RotateCw className="ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <section className="w-full">
          <h1 className="text-4xl text-center font-semibold my-3">
            Your URL Check History
          </h1>
          {history.length === 0 ? (
            <p className="text-center">No history found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">URL</th>
                    <th className="px-4 py-2 text-left">Risk Score</th>
                    <th className="px-4 py-2 text-left">Security Checks</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{item.url}</td>
                      <td className="px-4 py-2">{item.risk_score}</td>
                      <td className="px-4 py-2">
                        <ul>
                          <li>Domain Flagged: {item.security_checks.domain_flagged ? "Yes" : "No"}</li>
                          <li>URL Flagged: {item.security_checks.url_flagged ? "Yes" : "No"}</li>
                          <li>AI Flagged: {item.security_checks.ai_flagged ? "Yes" : "No"}</li>
                          <li>New Domain: {item.security_checks.new_domain ? "Yes" : "No"}</li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="my-5">
            <Link to="/url-spam-detection">
              <Button className="flex mx-auto">Check Another URL</Button>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default History;
