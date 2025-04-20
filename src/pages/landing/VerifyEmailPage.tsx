import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader } from "lucide-react";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        navigate("/signup");
        return;
      }
      try {
        await verifyEmail(token);
        navigate("/login");
      } catch {
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      {loading && (
        <div className="flex flex-col items-center space-y-2">
          <Loader className="animate-spin text-yellow-500 w-8 h-8" />
          <p className="text-sm">Verifying your email...</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
