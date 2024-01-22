import { useCallback } from "react";

const useSmoothScroll = () => {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    const header = document.querySelector('.header');

    if (element) {
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 10; // 10px відступ від header

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollTo;
};

export default useSmoothScroll;
