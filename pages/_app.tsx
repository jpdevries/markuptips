import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { initTheme } from '@/lib/theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMDX = router.pathname.startsWith('/rules/') && router.pathname !== '/rules';

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    if (!isMDX) return;
    if ((window as any).Prism) {
      (window as any).Prism.highlightAll();
      return;
    }
    const script = document.createElement('script');
    script.src = '/prism.js';
    script.onload = () => (window as any).Prism?.highlightAll();
    document.head.appendChild(script);
  });

  return (
    <>
      <Nav />
      {isMDX ? (
        <main id="stage" className="px-6 py-10 max-w-3xl mx-auto prose">
          <Component {...pageProps} />
        </main>
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </>
  );
}
