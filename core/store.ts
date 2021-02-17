import { Reducer, useReducer, useState } from 'react';
import { NodebookPageInfo, NodebookPageProps, NodebookPageState } from './types';

export const useApp = (info: NodebookPageProps) => {
  const { layers, links, nodebook } = info;

  /* const [state, setState] = */ return useState<NodebookPageState>({
    nodebook,
    layers,
    links,
    sidebar: {
      visible: true,
      width: 250,
    },
    selection: {
      links: [],
      nodes: [],
    },
  });

  // return [state, setState];
};
