import { IconName } from '@blueprintjs/icons';

export type NodebookPageInfo = {
  nodebook: NodebookInfo;
  nodes: NodeInfo[];
  links: LinkInfo[];
  groups: GroupInfo[];
  stickers: StickerInfo[];
};

export type NodebookPageProps = {
  nodebook: NodebookInfo;
  nodes: Node[];
  stickers: Sticker[];
  links: Link[];
  groups: Group[];
};

export type Maybe<T> = null | T;

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
  createdAt: number;
  title: string;
  coverUrl: string;
  description: string;
  modifiedAt: number;
  privacy: 'private' | 'public';
  // author: id
};

export type GroupInfo = {
  id: string;
  title: string;
  visible: boolean;
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
  groupId: Maybe<string>;
  // parentId: string
  autosize: boolean;
  background: string;
  border: string;
  borderWidth: number;
  // icon: Maybe<IconName>; // inside the only existing h1
  // files: FileInfo[]; // these are just links that get generated when you drag-n-drop files on nodes or canvas, similar like on Github. same goes for images and videos
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

export type StickerType =
  | {
      shape: 'ellipse';
      cx: number;
      cy: number;
      r: number;
    }
  | { shape: 'rect'; cx: number; cy: number; width: number; height: number }
  | { shape: 'path'; path: string };

export type StickerInfo = Rect & { path: string } & {
  id: string;
  title: string;
  groupId: string;
  shape: StickerType['shape'];
  background: string;
  border: string;
  borderWidth: number;
};

// -----------------------------------------------------------------------------\

export type File = FileInfo;

export type Sticker = {
  id: string;
  title: string;
  type: StickerType;
  style: {
    background: string;
    border: string;
    borderWidth: number;
  };
  group: Group;
};

export type Node = Rect & {
  id: string;
  createdAt: number;
  content: string;
  style: {
    autosize: boolean;
    background: string;
    border: string;
    borderWidth: number;
    // icon: Maybe<IconName>; // inside the only existing h1
  };
  group: Group;
  // files: File[]; // these are just links that get generated when you drag-n-drop files on nodes or canvas, similar like on Github. same goes for images and videos
};

export type Link = {
  id: string;
  fromNode: Node;
  toNode: Node;
  content: string;
  style: {
    shape: LinkShape;
    color: string;
    width: number;
  };
};

export type Group = {
  id: string;
  title: string;
  visible: boolean;
};
