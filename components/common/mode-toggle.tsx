"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animateDark, setAnimateDark] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleToggle = () => {
    setAnimateDark(!isDark);

    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
    }, 100);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative size-10 flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleToggle}
    >
      <Sun
        className={`absolute size-6 transition-all duration-500 ease-linear transform ${
          animateDark
            ? "translate-y-full scale-0 rotate-[280deg] opacity-0"
            : "translate-y-0 scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute size-6 transition-all duration-500 ease-in-out transform ${
          animateDark
            ? "translate-y-0 scale-100 rotate-0 opacity-100"
            : "-translate-y-full scale-0 -rotate-[360deg] opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
