import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

export default function UsersPage() {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/all-users");
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          toast({
            title: "Error fetching user data",
            description: data.message,
            variant: "destructive",
          });
          return;
        }
        setUserData(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return loading ? (
    <div className="size-full flex justify-center items-center">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.map((user) => (
          <Card key={user._id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Role: {user.isAdmin ? "Admin" : "User"}</p>
              <p className="text-sm text-muted-foreground mt-2">
                ID: {user._id}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
