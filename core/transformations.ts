import { NodebookPageProps, NodebookPageInfo } from './types';

export const transformInfo = ({ groups, links, nodebook, nodes, stickers }: NodebookPageInfo): NodebookPageProps => {
  const data: NodebookPageProps = {
    nodebook,
    // links: links.map((link) => ({
    //   id: link.id,
    //   fromId: link.fromId,
    //   toId: link.toId,
    //   content: link.content,
    //   style: {
    //     color: link.color,
    //     shape: link.shape,
    //     width: link.width,
    //   },
    // })),
    links: [],
    nodes: nodes.map((node) => ({
      id: node.id,
      createdAt: node.createdAt,
      content: node.content,
      style: {
        autosize: node.autosize,
        background: node.background,
        border: node.border,
        borderWidth: node.borderWidth,
      },
      cx: node.cx,
      cy: node.cy,
      w: node.w,
      h: node.h,
      group: groups.find((group) => group.id === node.groupId),
    })),
    stickers: stickers.map((sticker) => ({
      id: sticker.id,
      title: sticker.title,
      style: {
        background: sticker.background,
        border: sticker.border,
        borderWidth: sticker.borderWidth,
      },
      type: {
        cx: sticker.cx,
        cy: sticker.cy,
        width: sticker.w,
        height: sticker.h,
        path: sticker.path,
        r: sticker.w,
        shape: sticker.shape,
      },
      group: groups.find((group) => group.id === sticker.groupId),
    })),
    groups,
  };

  data.links = links.map((link) => ({
    id: link.id,
    content: link.content,
    style: {
      color: link.color,
      shape: link.shape,
      width: link.width,
    },
    fromNode: data.nodes.find((node) => node.id === link.fromId),
    toNode: data.nodes.find((node) => node.id === link.toId),
  }));

  return data;
};
