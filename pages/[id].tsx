import { NextPageContext, NextPage } from 'next'
import React, { useRef } from 'react'
import LinkComp from '../components/Link'
import StickerComp from '../components/Sticker'
import NodeComp from '../components/Node'
import MetaTags from '../components/MetaTags'
import { transformInfo } from '../core/transformations'
import { LinkInfo, Maybe, NodebookInfo, NodeInfo, LayerInfo, StickerInfo, NodebookPageProps } from '../core/types'

const NodebookPage: NextPage<NodebookPageProps> = ({ nodebook, links, layers }) => {

  const contentHolder = useRef<SVGGElement>(null)
  const layersHolder = useRef<SVGGElement>(null)
  const linksHolder = useRef<SVGGElement>(null)
  const nodesHolder = useRef<SVGGElement>(null)

  return (
    <div>
      <MetaTags />

      <svg tabIndex={-1}>
        <g ref={contentHolder}>
          {/* layers' stickers */}
          {
            layers.map(layer => (
              <g /* ref={linksHolder} */>
                {
                  layer.stickers.map(sticker => <StickerComp key={sticker.id} {...sticker} />)
                }
              </g>
            ))
          }
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
          {
            layers.map(layer => (
              <g /* ref={linksHolder} */>
                {
                  layer.nodes.map(node => <NodeComp key={node.id} {...node} />)
                }
              </g>
            ))
          }
        </g>
      </svg>
    </div>
  )
}

export default NodebookPage

export async function getServerSideProps(ctx: NextPageContext) {

  const nodebookInfo: Maybe<NodebookInfo> = null
  const nodesInfo: Maybe<NodeInfo[]> = null
  const linksInfo: Maybe<LinkInfo[]> = null
  const layersInfo: Maybe<LayerInfo[]> = null
  const stickersInfo: Maybe<StickerInfo[]> = null

  if (!nodebookInfo || !nodesInfo || !linksInfo || !layersInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const props: NodebookPageProps = transformInfo({
    nodebook: nodebookInfo,
    nodes: nodesInfo,
    links: linksInfo,
    layers: layersInfo,
    stickers: stickersInfo,
  })

  return {
    props,
  }
}