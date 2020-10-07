import { useEffect, useCallback, useRef } from 'react';
export function useDebounce(fn, delay) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [current.fn, fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, [current, delay])
}
