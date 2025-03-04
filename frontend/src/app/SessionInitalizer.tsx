import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

const SessionInitializer = () => {
  const { data: session, status } = useSession();
  const { setSession } = useUserStore(state => state);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setSession(
        {
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        },
      );
    } else if (status === "unauthenticated") {
      setSession({
        id: null,
        name: null,
        email: null,
        image: null,
      }); 
    }
  }, [session, status, setSession]);

  return null;
};

export default SessionInitializer;
