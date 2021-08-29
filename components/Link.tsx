import { Link, LinkShape, Rect } from '../core/types';

const generatePath = (from: Rect, to: Rect, shape: LinkShape): string => {
  return '';
};

const LinkComp: React.FC<{ link: Link }> = ({ link }) => {
  return (
    <line
      x1={link.fromNode.cx}
      y1={link.fromNode.cy}
      x2={link.toNode.cx}
      y2={link.toNode.cy}
      stroke={link.style.color}
      strokeWidth={link.style.width}
    />
  );
};

export default LinkComp;
