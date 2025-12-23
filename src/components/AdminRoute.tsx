import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// REPLACE THIS WITH YOUR EXACT EMAIL USED IN SUPABASE
const ADMIN_EMAIL = "sj657382@gmail.com";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 1. Not Logged In -> Go to Auth
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Logged In but NOT Admin -> Kick to Home
  if (!isAdmin) {
    toast.error("Access Denied: Admins Only");
    return <Navigate to="/" replace />;
  }

  // 3. Is Admin -> Show Dashboard
  return <>{children}</>;
};

export default AdminRoute;
