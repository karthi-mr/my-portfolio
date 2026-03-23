import { useEffect, type ReactElement } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop(): ReactElement | null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
