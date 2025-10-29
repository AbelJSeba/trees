"use client";

import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const resolveDocumentTheme = (): ToasterProps["theme"] => {
  if (typeof document === "undefined") {
    return "system";
  }

  if (document.documentElement.classList.contains("dark")) {
    return "dark";
  }

  if (document.documentElement.classList.contains("light")) {
    return "light";
  }

  return "system";
};

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<ToasterProps["theme"]>("system");

  useEffect(() => {
    setTheme(resolveDocumentTheme());
    const observer = new MutationObserver(() => {
      setTheme(resolveDocumentTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
