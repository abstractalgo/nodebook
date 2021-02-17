import { Node } from '../core/types';

const NodeComp: React.FC<Node> = ({ content, cx, cy, w, h, style }) => {
  return (
    <rect
      x={cx - w * 0.5}
      y={cy - h * 0.5}
      width={w}
      height={h}
      fill={style.background}
      stroke={style.border}
      strokeWidth={style.borderWidth}
    />
  );
};

export default NodeComp;
