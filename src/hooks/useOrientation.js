import { useState, useEffect } from "react";

const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  useEffect(() => {
    const listener = window.addEventListener(
      "orientationchange",
      function (event) {
        setOrientation(event.target.screen.orientation.type);
      }
    );
    return () => {
      window.removeEventListener("orientationchange", listener);
    };
  }, []);

  const getOrientationValue = (landscape, portrait) => {
    return orientation === "landscape-primary" ? landscape : portrait;
  };

  return { orientation, getOrientationValue };
};

export default useOrientation;
