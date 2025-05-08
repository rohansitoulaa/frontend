import { useEffect } from "react";
import gsap from "gsap";

const useBorderColorAnimation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
    });

    const borderColors = [
      "#9d4edd",
      "#7b2cbf",
      "#5a189a",
      "#0066ff",
      "#8b006f",
    ];

    borderColors.forEach((color) => {
      tl.to(el, { borderColor: color, duration: 1, ease: "linear" });
    });

    return () => {
      tl.kill();
    };
  }, [ref]);
};

export default useBorderColorAnimation;
