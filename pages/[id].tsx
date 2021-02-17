import { NextPageContext, NextPage } from 'next';
import React, { Reducer, useReducer, useRef } from 'react';
import LinkComp from '../components/Link';
import StickerComp from '../components/Sticker';
import NodeComp from '../components/Node';
import MetaTags from '../components/MetaTags';
import { transformInfo } from '../core/transformations';
import {
  LinkInfo,
  Maybe,
  NodebookInfo,
  NodeInfo,
  LayerInfo,
  StickerInfo,
  NodebookPageProps,
  NodebookPageState,
} from '../core/types';
import Sidebar from '../components/Sidebar';
import cuid from 'cuid';
import { useApp } from '../core/store';

const NodebookPage: NextPage<NodebookPageProps> = (props) => {

  const [state, setState] = useApp(props)

  const contentHolder = useRef<SVGGElement>(null);
  const layersHolder = useRef<SVGGElement>(null);
  const linksHolder = useRef<SVGGElement>(null);
  const nodesHolder = useRef<SVGGElement>(null);

  return (
    <div>
      <MetaTags />

      <Sidebar
        layers={state.layers}
        createNewLayer={() => { }}
        deleteLayer={() => { }}
        renameLayer={() => { }}
        toggleLayer={() => { }}
        config={state.sidebar}
      />

      <svg tabIndex={-1}>
        <g ref={contentHolder}>
          {/* layers' stickers */}
          {state.layers.map((layer) => (
            <g /* ref={linksHolder} */>
              {layer.stickers.map((sticker) => (
                <StickerComp key={sticker.id} {...sticker} />
              ))}
            </g>
          ))}
          {/* layers' links */}
          {
            // layers.map(layer => (
            //   <g ref={linksHolder}>
            //     {
            //       links.map(link => <Link key={link.id} {...link} />)
            //     }
            //   </g>
            // ))
          }
          {/* layers' nodes */}
          {state.layers.map((layer) => (
            <g /* ref={linksHolder} */>
              {layer.nodes.map((node) => (
                <NodeComp key={node.id} {...node} />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default NodebookPage;

export async function getServerSideProps(ctx: NextPageContext) {
  const nodebookInfo: Maybe<NodebookInfo> = {
    id: cuid(),
    coverUrl: '',
    createdAt: Date.now(),
    description: 'ndbk desc',
    modifiedAt: Date.now(),
    privacy: 'public',
    title: 'ndbk title',
  };
  const nodesInfo: Maybe<NodeInfo[]> = [];
  const linksInfo: Maybe<LinkInfo[]> = [];
  // const layersInfo: Maybe<LayerInfo[]> = null;
  const stickersInfo: Maybe<StickerInfo[]> = [];

  // if (!nodebookInfo || !nodesInfo || !linksInfo || !layersInfo) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const props: NodebookPageProps = transformInfo({
    nodebook: nodebookInfo,
    nodes: nodesInfo,
    links: linksInfo,
    // layers: layersInfo,
    stickers: stickersInfo,
  });

  return {
    props,
  };
}
