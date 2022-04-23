import {useEffect, useRef, useState} from "react";

export function useInView(ref) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
        setIsInView(entry.isIntersecting),
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      }
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current)
    return () => {
      observerRef.current.disconnect()
    };
  }, [ref])

  return isInView
}
