import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const HiddenInView = () => {
  const [inView, ref] = useInView({
    triggerOnce: true, // 한 번만 감지하도록 설정
  });

  const elementRef = useRef(null);

  useEffect(() => {
    if (inView) {
      // 감지되면 실행할 이벤트 로직을 추가
      console.log("Element is in view!");
    }
  }, [inView]);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: 0, // 시각적으로 감춤
        visibility: inView ? "visible" : "hidden", // 레이아웃에서 감춤
      }}
    >
      감시할 요소
    </div>
  );
};

export default HiddenInView;
