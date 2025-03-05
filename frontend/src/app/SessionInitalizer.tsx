import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/user/UserStore";

const SessionInitializer = () => {
  const { data: session, status } = useSession();
  const { setSession, user: storedSession } = useUserStore((state) => state);

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (
        !storedSession ||
        storedSession.id !== session.user?.id ||
        storedSession.name !== session.user?.name ||
        storedSession.email !== session.user?.email ||
        storedSession.image !== session.user?.image
      ) {
        setSession({
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        });
      }
    } else if (status === "unauthenticated" && storedSession?.id) {
      setSession({
        id: null,
        name: null,
        email: null,
        image: null,
      });
    }
  }, [session, status, storedSession, setSession]);

  return null;
};

export default SessionInitializer;
