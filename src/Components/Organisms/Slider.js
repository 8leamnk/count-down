import { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import useSlider from '../../hooks/useSlider';

// style
const S = {};

S.Container = styled.div`
  width: 100%;
  height: ${({ $height }) => $height}px;
  overflow-x: hidden;
  background-color: #fff;
`;

S.Slider = styled(motion.ul)`
  display: flex;
  justify-content: center;
`;

S.Item = styled.li`
  height: ${({ $height }) => $height}px;
  flex: 1 0 100%;

  & > * {
    height: ${({ $height }) => $height}px;
  }
`;

const DEFAULT_DATA = [
  { to: '/', contents: <div style={{ backgroundColor: 'pink' }}>A</div> },
  { to: '/', contents: <div style={{ backgroundColor: 'skyblue' }}>B</div> },
  { to: '/', contents: <div style={{ backgroundColor: 'palegreen' }}>C</div> },
  { to: '/', contents: <div style={{ backgroundColor: 'peachpuff' }}>D</div> },
  { to: '/', contents: <div style={{ backgroundColor: 'plum' }}>E</div> },
  { to: '/', contents: <div style={{ backgroundColor: 'lightcoral' }}>F</div> },
];

function Slider({
  data = DEFAULT_DATA,
  height = 40,
  rate = 30,
  autoTimer = false,
  timer = 5000,
}) {
  const ref = useRef();
  const { animation, index, handleDragEnd } = useSlider({
    ref,
    size: data.length,
    rate,
    autoTimer,
    timer,
  });
  const VARIANTS = {
    toLeft: { x: '-100%', pointerEvents: 'none' },
    toRight: { x: '100%', pointerEvents: 'none' },
    center: { x: 0, pointerEvents: 'initial' },
  };

  return (
    <S.Container>
      <S.Slider
        key={index.curr}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        variants={VARIANTS}
        animate={animation}
        dragMomentum={false}
        transition={{
          x: { type: 'spring', mass: 0.5, stiffness: 500, damping: 50 },
        }}
      >
        <S.Item ref={null} key={1} $height={height}>
          {data[index.prev].contents}
        </S.Item>

        <S.Item ref={ref} key={2} $height={height}>
          {data[index.curr].contents}
        </S.Item>

        <S.Item ref={null} key={3} $height={height}>
          {data[index.next].contents}
        </S.Item>
      </S.Slider>
    </S.Container>
  );
}

export default Slider;
