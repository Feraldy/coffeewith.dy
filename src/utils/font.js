import localFont from 'next/font/local';

export const digital7 = localFont({
  src: [
    {
      path: '../pages/fonts/digital-7.ttf',
      weight: '400', 
      style: 'normal',
    },
    // Add more variants if needed (e.g., italic, bold)
  ],
  variable: '--font-digital-7', // Create a CSS variable 
});