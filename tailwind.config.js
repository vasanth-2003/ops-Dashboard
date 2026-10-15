/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#F6F7F9',
        surface: '#FFFFFF',
        subtle: '#F2F4F7',
        border: '#E4E7EC',
        fg: '#101828',
        'fg-secondary': '#475467',
        'fg-tertiary': '#667085',
        'on-brand': '#FFFFFF',
        brand: '#4F46E5',
        'brand-subtle': '#EEF2FF',
        'brand-on-subtle': '#3730A3',
      },
      // Overrides Tailwind's default 6px so `rounded-md` matches Figma's radius/md.
      borderRadius: {
        md: '8px',
      },
      fontSize: {
        h3: ['16px', { lineHeight: '24px' }],
        body: ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '18px' }],
        overline: ['11px', { lineHeight: '16px', letterSpacing: '0.6px' }],
      },
    },
  },
  plugins: [],
}
