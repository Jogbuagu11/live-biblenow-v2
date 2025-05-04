
import * as React from "react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "@/components/ui/switch";

interface ThemeToggleProps {
  className?: string;
  onChange?: (isDark: boolean) => void;
}

export function ThemeToggle({ className, onChange }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  
  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    onChange?.(checked);
  };
  
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleToggle}
      className={className}
    />
  );
}
