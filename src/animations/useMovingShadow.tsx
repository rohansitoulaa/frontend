import { useEffect } from "react";
import gsap from "gsap";

const useMovingShadow = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
    });

    const shadows = [
      "0px 0px 20px #9d4edd",
      "0px 0px 20px #7b2cbf", // rgba(0, 102, 255, 0.6)
      "0px 0px 20px #5a189a", // rgba(139, 0, 111, 0.6)
      "0px 0px 20px #0066ff99",
      "0px 0px 20px #8b006f99",
    ];
    
    shadows.forEach((shadow) => {
      tl.to(el, { boxShadow: shadow, duration: 1, ease: "linear" });
    });

    return () => {
      tl.kill();
    };
  }, [ref]);
};

export default useMovingShadow;
