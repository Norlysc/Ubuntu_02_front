/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

export default function useOutsideClick(callback) {
  const ref = useRef();

  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback]);

  return ref;
}
