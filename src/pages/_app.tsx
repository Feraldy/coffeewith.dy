import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local';

const digital7 = localFont({
  src: [
    {
      path: './fonts/digital-7.ttf', 
      weight: '400', 
      style: 'normal',
    },
  ],
  variable: '--font-digital-7',
});

const poppins = localFont({
  src: [
    { path: './fonts/Poppins-Thin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/Poppins-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/Poppins-Black.ttf', weight: '900', style: 'normal' },
    { path: './fonts/Poppins-ThinItalic.ttf', weight: '100', style: 'italic' },
    { path: './fonts/Poppins-ExtraLightItalic.ttf', weight: '200', style: 'italic' },
    { path: './fonts/Poppins-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: './fonts/Poppins-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/Poppins-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: './fonts/Poppins-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: './fonts/Poppins-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: './fonts/Poppins-ExtraBoldItalic.ttf', weight: '800', style: 'italic' },
    { path: './fonts/Poppins-BlackItalic.ttf', weight: '900', style: 'italic' },
  ],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  return (<main className={`${poppins.variable} ${digital7.className}`}>
  <Component {...pageProps} />
</main>);
}
