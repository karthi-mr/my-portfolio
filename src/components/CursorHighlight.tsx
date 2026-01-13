import { type ReactElement, useEffect, useState } from "react";

type PositionType = {
  x: number;
  y: number;
}

function CursorHighlight(): ReactElement {
  const [position, setPosition] = useState<PositionType>({x: 0, y: 0});

  useEffect(() => {
    const updateFn = (e: MouseEvent) => {
      setPosition({x: e.clientX, y: e.clientY});
    };

    window.addEventListener("mousemove", updateFn);

    return () => {
      window.removeEventListener("mousemove", updateFn);
    }
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-8 h-8 bg-blue-500 dark:bg-indigo-400
      rounded-full mix-blend-screen blur-xl transition-colors"
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
      }}
    />
  );
}

export default CursorHighlight;
