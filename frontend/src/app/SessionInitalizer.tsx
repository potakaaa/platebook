import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

const SessionInitializer = () => {
  const { data: session, status } = useSession();
  const { setSession } = useUserStore(state => state);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setSession(session);
    } else if (status === "unauthenticated") {
      setSession(null); 
    }
  }, [session, status, setSession]);

  return null;
};

export default SessionInitializer;
