import { useEffect, useState } from 'react';

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  const handleMediaQueryChange = (e) => {
    setIsMobile(e.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    mediaQuery.addListener(handleMediaQueryChange);

    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);
  return isMobile;
}
