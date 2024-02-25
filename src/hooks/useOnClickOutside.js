import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => { // 컴포넌트가 더 이상 사용되지 않을 때 삭제 작업
      document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
    }
  }, [ref, handler])
  
}