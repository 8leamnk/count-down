/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';

function useSlider({ ref, size, rate, autoTimer, timer }) {
  const animation = useAnimation();
  const intervalId = useRef(null);
  const [rect, setRect] = useState({});
  const [swipeNumber, setSwipeNumber] = useState(0);
  const [index, setIndex] = useState({
    prev: size - 1,
    curr: 0,
    next: 1,
  });

  const calculateIndex = (value, min = 0, max = size) => {
    const rangeSize = max - min;

    // console.log(-1 % 6) // -1
    // console.log(-13 % 6 + 6) // 5
    return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const changeSwipeNumber = (dir) => {
    setSwipeNumber((curState) => curState + dir);
  };

  const swipePower = (offset, absDistance) => (offset / absDistance) * 100;

  const handleDragEnd = async (evt, { offset }) => {
    const power = swipePower(offset.x, rect.width);

    if (power > rate) {
      await animation.start('toRight');
      changeSwipeNumber(-1);
    } else if (power < -rate) {
      await animation.start('toLeft');
      changeSwipeNumber(1);
    }
  };

  const getRefInfo = () => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  };

  const startTimer = () => {
    if (autoTimer) {
      intervalId.current = setInterval(async () => {
        await animation.start('toLeft');
        changeSwipeNumber(1);
      }, timer);
    }
  };

  const clearTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => {
    const prev = calculateIndex(swipeNumber - 1);
    const curr = calculateIndex(swipeNumber);
    const next = calculateIndex(swipeNumber + 1);

    setIndex((curState) => ({ ...curState, prev, curr, next }));
  }, [swipeNumber]);

  useEffect(() => {
    getRefInfo();
    startTimer();

    return () => {
      clearTimer();
    };
  }, []);

  return { animation, index, handleDragEnd };
}

export default useSlider;
