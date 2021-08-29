import { Sticker } from '../core/types';

const StickerComp: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
  if (sticker.type.shape === 'ellipse') {
    return (
      <ellipse
        cx={sticker.type.cx}
        cy={sticker.type.cy}
        rx={sticker.type.r}
        ry={sticker.type.r}
        fill={sticker.style.background}
        stroke={sticker.style.border}
        strokeWidth={sticker.style.borderWidth}
      />
    );
  }
  if (sticker.type.shape === 'rect') {
    return (
      <rect
        cx={sticker.type.cx - sticker.type.width * 0.5}
        cy={sticker.type.cy - sticker.type.height * 0.5}
        width={sticker.type.width}
        height={sticker.type.height}
        fill={sticker.style.background}
        stroke={sticker.style.border}
        strokeWidth={sticker.style.borderWidth}
      />
    );
  }
  if (sticker.type.shape === 'path') {
    return (
      <path
        d={sticker.type.path}
        fill={sticker.style.background}
        stroke={sticker.style.border}
        strokeWidth={sticker.style.borderWidth}
      />
    );
  }

  return null;
};

export default StickerComp;
