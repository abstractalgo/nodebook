import { Sticker } from "../core/types"

const StickerComp: React.FC<Sticker> = ({ type, cx, cy, w, h, style }) => {
  // TODO useMemo

  if (type === 'circle') {
    return (
      <ellipse
        cx={cx}
        cy={cy}
        rx={w}
        ry={h}
        fill={style.background}
        stroke={style.border}
        strokeWidth={style.width}
      />
    )
  }
  return (
    <rect
      cx={cx - w * .5}
      cy={cy - h * .5}
      width={w}
      height={h}
      fill={style.background}
      stroke={style.border}
      strokeWidth={style.width}
    />
  )
}

export default StickerComp