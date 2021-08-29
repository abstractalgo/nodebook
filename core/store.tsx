import cuid from 'cuid';
import { useState, createContext, useContext, FC } from 'react';
import { NodebookInfo, Node, Group, Sticker, Link } from './types';

type AppState = {
  nodebook: NodebookInfo;
  groups: Group[];
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

export type AppContext = AppState & {
  init: (data: { nodebook: NodebookInfo; nodes: Node[]; stickers: Sticker[]; links: Link[]; groups: Group[] }) => void;
  createGroup: () => void;
  removeGroup: (group: Group) => void;
  renameGroup: (group: Group, newTitle: string) => void;
  toggleGroupVisible: (group: Group) => void;
  // move: (prevIdx: number, newIdx: number) => void
};

const appContext = createContext<AppContext>({
  nodebook: null,
  links: [],
  nodes: [],
  stickers: [],
  groups: [],
  selection: {
    links: [],
    nodes: [],
  },
  sidebar: {
    visible: true,
    width: 250,
  },
  init: () => {},
  createGroup: () => {},
  removeGroup: () => {},
  renameGroup: () => {},
  toggleGroupVisible: () => {},
});

const useAppProvider = (): AppContext => {
  const [nodebook, setNodebook] = useState<AppState['nodebook']>(null);
  const [groups, setGroups] = useState<AppState['groups']>([]);
  const [nodes, setNodes] = useState<AppState['nodes']>([]);
  const [links, setLinks] = useState<AppState['links']>([]);
  const [stickers, setStickers] = useState<AppState['stickers']>([]);
  const [sidebar, setSidebar] = useState<AppState['sidebar']>({
    visible: true,
    width: 250,
  });
  const [selection, setSelection] = useState<AppState['selection']>({
    links: [],
    nodes: [],
  });

  const init: AppContext['init'] = ({ nodebook, links, nodes, stickers, groups }) => {
    setGroups(groups);
    setNodebook(nodebook);
    setNodes(nodes);
    setStickers(stickers);
    setLinks(links);
  };

  const createGroup: AppContext['createGroup'] = () => {
    setGroups([
      ...groups,
      {
        id: cuid(),
        title: `group #${groups.length}`,
        visible: true,
      },
    ]);
  };

  const removeGroup: AppContext['removeGroup'] = (group) => {
    groups.splice(groups.indexOf(group), 1);
    setNodes(nodes.filter((node) => node.group.id !== group.id));
    setStickers(stickers.filter((sticker) => sticker.group.id !== group.id));
    // TODO filter links
    setGroups([...groups]);
  };

  const renameGroup: AppContext['renameGroup'] = (group, newTitle) => {
    group.title = newTitle;
    setGroups([...groups]);
  };

  const toggleGroupVisible: AppContext['toggleGroupVisible'] = (group) => {
    group.visible = !group.visible;
    setGroups([...groups]);
  };

  return {
    nodebook,
    groups,
    nodes,
    links,
    stickers,
    sidebar,
    selection,
    init,
    createGroup,
    removeGroup,
    renameGroup,
    toggleGroupVisible,
  };
};

export const useApp = () => useContext(appContext);

export const AppStateProvider: FC = ({ children }) => {
  const appState = useAppProvider();
  return <appContext.Provider value={appState}>{children}</appContext.Provider>;
};
