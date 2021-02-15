import { strict } from 'assert';
import { NodebookPageProps, NodebookPageInfo } from './types';

export const transformInfo = ({ layers, links, nodebook, nodes, stickers }: NodebookPageInfo): NodebookPageProps => {
  return {
    nodebook,
    links: links.map((link) => ({
      id: link.id,
      fromId: link.fromId,
      toId: link.toId,
      content: link.content,
      style: {
        color: link.color,
        shape: link.shape,
        width: link.width,
      },
    })),
    layers: layers.map((layer) => ({
      id: layer.id,
      name: layer.name,
      visible: true,
      stickers: stickers
        .filter((sticker) => sticker.layerId === layer.id)
        .map((sticker) => ({
          id: sticker.id,
          type: sticker.type,
          style: {
            background: sticker.background,
            border: sticker.border,
            borderWidth: sticker.borderWidth,
          },
          cx: sticker.cx,
          cy: sticker.cy,
          w: sticker.w,
          h: sticker.h,
        })),
      nodes: nodes
        .filter((node) => node.layerId === layer.id)
        .map((node) => ({
          id: node.id,
          content: node.content,
          style: {
            background: node.background,
            border: node.border,
            icon: node.icon,
            borderWidth: node.borderWidth,
          },
          cx: node.cx,
          cy: node.cy,
          w: node.w,
          h: node.h,
          files: node.files,
        })),
    })),
  };
};
