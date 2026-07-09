import type { Config } from "tailwindcss";

function withOpacity(variableName: string): any {
  return ({ opacityValue }: { opacityValue?: number | string }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in oklch, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: withOpacity("--ring"),
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: withOpacity("--primary"),
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: withOpacity("--secondary"),
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: withOpacity("--destructive"),
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: withOpacity("--muted"),
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
