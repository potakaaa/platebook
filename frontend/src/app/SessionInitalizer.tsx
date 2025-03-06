import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/user/UserStore";
import { set } from "zod";

const SessionInitializer = () => {
  const { data: session, status } = useSession();
  const {
    setSession,
    user: storedSession,
    accessToken,
    setAccessToken,
  } = useUserStore((state) => state);

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (
        !storedSession ||
        storedSession.id !== session.user?.id ||
        storedSession.name !== session.user?.name ||
        storedSession.email !== session.user?.email ||
        storedSession.image !== session.user?.image ||
        accessToken !== session.accessToken
      ) {
        setSession({
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        });

        setAccessToken(session.accessToken);
      }
    } else if (status === "unauthenticated" && storedSession?.id) {
      setSession({
        id: null,
        name: null,
        email: null,
        image: null,
      });

      setAccessToken(null);
    }
  }, [session, status, storedSession, setSession]);

  return null;
};

export default SessionInitializer;
