import type { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@/styles/globals.css';
const App = ({ Component, pageProps }: AppProps) => (
  <MotionConfig reducedMotion="user">
    <Component {...pageProps} />
  </MotionConfig>
);
export default App;
