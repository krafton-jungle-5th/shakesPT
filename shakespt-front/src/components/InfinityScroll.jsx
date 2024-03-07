import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CardForm, { WrapVertical } from "./StoryBox";
import { Inner } from "./InnerContainer";

const HiddenInView = () => {
  const [inView, ref] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -300px 0px",
  });

  const elementRef = useRef(null);
  const [showWrapVertical, setShowWrapVertical] = useState(false);

  useEffect(() => {
    if (inView) {
      // 감지되면 WrapVertical을 추가할 수 있도록 상태 변경
      <WrapVertical />;
    }
  }, [inView]);

  return (
    <div
      ref={(el) => {
        elementRef.current = el;
        if (el) {
          el.style.minHeight = showWrapVertical
            ? `${el.clientHeight}px`
            : "auto";
        }
      }}
    >
      {/* 기존 내용 */}
      <div
        style={{
          opacity: 0,
          visibility: inView ? "visible" : "hidden",
        }}
      >
        감시할 요소
      </div>

      {/* WrapVertical을 추가할지 여부에 따라 렌더링 */}
      {showWrapVertical && <WrapVertical />}
    </div>
  );
};

export default HiddenInView;
