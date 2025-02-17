import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    hieght: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({ width: window.innerWidth, hieght: innerHeight });
    });
  }, []);
  return size;
}
