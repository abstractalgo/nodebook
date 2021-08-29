import { Node } from '../core/types';

const NodeComp: React.FC<Node> = ({ content, cx, cy, w, h, style }) => {
  return (
    <g>
      <rect
        x={cx - w * 0.5}
        y={cy - h * 0.5}
        width={w}
        height={h}
        fill={style.background || '#394B59'}
        stroke={style.border}
        strokeWidth={style.borderWidth}
      />
      <text color="red" x={cx - w * 0.5} y={cy - h * 0.5}>
        {content}
      </text>
    </g>
  );
};

export default NodeComp;
