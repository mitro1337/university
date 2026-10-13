/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'var(--bg-canvas)',
          subtle: 'var(--bg-surface-sunken)',
        },
        surface: {
          DEFAULT: 'var(--bg-surface)',
          base: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          sunken: 'var(--bg-surface-sunken)',
        },
        border: {
          DEFAULT: 'var(--border-subtle)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        primary: {
          DEFAULT: 'var(--text-primary)',
          hover: 'var(--text-secondary)',
          contrast: 'var(--bg-canvas)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          500: '#00d2ff',
          600: '#0284c7',
          700: '#0369a1',
        },
        cyber: {
          cyan: '#00d2ff',
          emerald: '#00ff9d',
          amber: '#ffb020',
          ruby: '#ff3366',
          violet: '#7c3aed',
          klarna: '#ff80a5'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Rajdhani"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px'
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'panel': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        'overlay': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        '3d-btn': '0 4px 0 #02668c, 0 8px 18px rgba(0, 210, 255, 0.35)',
        '3d-card': '0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 -1px 0 rgba(0, 0, 0, 0.6) inset, 0 12px 30px -8px rgba(0, 0, 0, 0.7)',
        '3d-raised': '0 3px 0 var(--border-strong), 0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        '3d-sunken': 'inset 0 2px 5px rgba(0, 0, 0, 0.7), inset 0 -1px 0 rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        DEFAULT: 'var(--border-subtle)',
        subtle: 'var(--border-subtle)',
        strong: 'var(--border-strong)',
      }
    },
  },
  plugins: [],
}
