import {MutableRefObject, useEffect, useRef, useState} from "react";

export const useInView = (ref: MutableRefObject<HTMLElement>): boolean => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    observerRef.current?.observe(ref.current)
    return () => {
      observerRef.current?.disconnect()
    };
  }, [ref])

  return isInView
}
