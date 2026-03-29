import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#18181b" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var b=document.body,t=localStorage.getItem('theme-preference')||'system',hcStored=localStorage.getItem('high-contrast'),hc=hcStored!==null?hcStored==='true':matchMedia('(prefers-contrast:more)').matches,p=localStorage.getItem('theme-palette');if(!p){var m=document.querySelector('meta[name="default-palette"]');if(m)p=m.getAttribute('content')}if(t!=='system')b.dataset.colorScheme=t;if(hc)b.dataset.highContrast='';if(p&&p!=='default')b.dataset.theme=p;var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);b.style.colorScheme=dark?'dark':'light'}catch(e){}})()` }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
