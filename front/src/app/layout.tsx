import './globals.css';
import ThemeRegistry from '../styles/ThemeRegistry';
import ServiceWorker from './ServiceWorker';

import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import HeadMeta from '@/components/meta/HeadMeta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Petdio',
  description:
    '반려동물을 위한 AI 이미지 생성 스튜디오입니다. 반려동물의 이미지를 업로드하고 세부 설정을 완료하면 반려동물이 등장하는 특별한 이미지를 생성해 줍니다.',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
  themeColor: '#8758FF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ServiceWorker />
      <HeadMeta />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4HGPR7ZWG3"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4HGPR7ZWG3');
        `}
      </Script>
      <Script
        id="beusable-heatmap"
        type="text/javascript"
      >
        {`
          (function(w, d, a){
            w.__beusablerumclient__ = {
            load : function(src){
            var b = d.createElement("script");
            b.src = src; b.async=true; b.type = "text/javascript";
            d.getElementsByTagName("head")[0].appendChild(b);
              }
            };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
          })(window, document, "//rum.beusable.net/load/b231106e092340u612");
        `}
      </Script>
      <ThemeRegistry>
        <body
          className={inter.className}
          style={{ backgroundColor: '#f2f2f2' }}
        >
          <Box
            sx={{
              height: '100vh',
              maxWidth: '480px',
              margin: 'auto',
              backgroundColor: '#fff',
            }}
          >
            {children}
          </Box>
        </body>
      </ThemeRegistry>
    </html>
  );
}
