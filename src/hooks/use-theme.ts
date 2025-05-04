
// Import the useTheme hook directly from the provider
import { useTheme as useThemeFromProvider } from "../components/ThemeProvider";

// Re-export the hook - this avoids circular dependencies
export const useTheme = useThemeFromProvider;
