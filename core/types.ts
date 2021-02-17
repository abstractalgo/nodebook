import { IconName } from '@blueprintjs/icons';

export type NodebookPageInfo = {
  nodebook: NodebookInfo;
  nodes: NodeInfo[];
  links: LinkInfo[];
  layers: LayerInfo[];
  stickers: StickerInfo[];
};

export type NodebookPageProps = {
  nodebook: NodebookInfo;
  layers: Layer[];
  links: Link[];
};

export type Maybe<T> = T | null;

export interface Rect {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

export interface AABB {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type NodebookInfo = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  createdAt: number;
  modifiedAt: number;
  privacy: 'private' | 'public';
  // author: id
};

export type LayerInfo = {
  id: string;
  name: string;
};

export type FileInfo = {
  id: string;
  name: string;
  uploadedAt: number;
  url: string;
  size: number;
};

export type NodeInfo = Rect & {
  id: string;
  createdAt: number;
  content: string;
  layerId: string;
  // parentId: string
  autosize: boolean;
  background: string;
  border: string;
  icon: Maybe<IconName>;
  borderWidth: number;
  files: FileInfo[];
  // no comments, since it's not social
};

export type LinkShape = 'zigzag-v' | 'zigzag-h' | 'straight' | 'bezier-v' | 'bezier-h' | 'elbow-1' | 'elbow-2';

export type LinkInfo = {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  shape: LinkShape;
  color: string;
  width: number;
};

export type StickerType = 'circle' | 'rect';

export type StickerInfo = Rect & {
  id: string;
  layerId: string;
  type: StickerType;
  background: string;
  border: string;
  borderWidth: number;
};

// -----------------------------------------------------------------------------\

export type File = FileInfo;

export type Sticker = Rect & {
  id: string;
  type: StickerType;
  style: {
    background: string;
    border: string;
    borderWidth: number;
  };
};

export type Node = Rect & {
  id: string;
  createdAt: number;
  content: string;
  autosize: boolean;
  style: {
    background: string;
    border: string;
    borderWidth: number;
    icon: Maybe<IconName>;
  };
  files: File[];
};

export type Link = {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  style: {
    shape: LinkShape;
    color: string;
    width: number;
  };
};

export type Layer = {
  id: string;
  name: string;
  nodes: Node[];
  stickers: Sticker[];
  visible: boolean;
};

// -----------------------------------------------------------------------------

export type NodebookPageState = {
  nodebook: NodebookInfo;
  // layers: Layer[];
  nodes: Node[];
  stickers: Sticker[];
  links: Link[];
  sidebar: {
    visible: boolean;
    width: number;
  };
  selection: {
    links: Link[];
    nodes: Node[];
  };
};
