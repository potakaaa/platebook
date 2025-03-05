import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavButtonLeft from "../nav/NavButtonsLeft";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch by ensuring consistent render

  return (
    <NavButtonLeft
      name="Toggle Theme"
      icon={theme === "dark" ? IconSun : IconMoon}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default ThemeToggle;
