import { useCallback } from "react";

const useSmoothScroll = () => {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    const header = document.querySelector(".header");
    const isMobile = window.innerWidth < 1024;

    if (element) {
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = isMobile
        ? elementPosition - headerHeight - 160
        : elementPosition - headerHeight - 10; // 10px відступ від header

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollTo;
};

export default useSmoothScroll;
