import { Layer, Node, Sticker } from '../core/types';
import { Button, Icon } from '@blueprintjs/core';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

const LayerItemWrapper = styled.div`
  .layer-meta {
    display: grid;
    grid-template-columns: max-content max-content 1fr max-content max-content;
    grid-gap: 4px;
    align-items: center;
  }
  .layer-content {
    padding-left: 16px;

    .node-meta {
    }
  }
`;

const LayerItem: React.FC<
  Layer & {
    deleteLayer: () => void;
    renameLayer: (name: string) => void;
    toggleLayer: () => void
  }
> = ({ name, visible, nodes, deleteLayer, renameLayer, toggleLayer }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [newLayerName, setNewLayerName] = useState(name);

  return (
    <LayerItemWrapper>
      <div className="layer-meta">
        <Button
          icon={collapsed ? 'chevron-right' : 'chevron-down'}
          minimal
          title="Collapse"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          small
        />
        <Button icon={visible ? 'eye-open' : 'blank'} onClick={toggleLayer} small minimal />
        <div>{name}</div>
        <Button icon="edit" title="Rename" minimal onClick={() => deleteLayer()} small />
        <Button
          icon="trash"
          title="Delete"
          minimal
          small
          onClick={() => {
            /* TODO */
          }}
        />
      </div>
      {!collapsed && (
        <div className="layer-content">
          <div>
            <Button text="New sticker" icon="heatmap" minimal small />
          </div>
          <div>
            <Button text="New node" icon="graph" minimal small />
          </div>
          {/* stickers */}
          {
            // layer.stickers.map(sticker => (
            //   <StickerItem key={sticker.id} {...sticker} />
            // ))
          }
          {/* nodes */}
          {nodes.map((node) => {
            const newlineIdx = node.content.indexOf('\n');
            const onelineContent = node.content.substr(0, newlineIdx);
            return (
              <div className="node-meta" key={node.id}>
                {onelineContent}
                {/* focus, delete */}
              </div>
            );
          })}
        </div>
      )}
    </LayerItemWrapper>
  );
};

type LayersPanelProps = {
  layers: Layer[];
  query: string;
  createNewLayer: () => void;
  deleteLayer: (layer: Layer) => void;
  renameLayer: (layer: Layer, name: string) => void;
  toggleLayer: (layer: Layer) => void
};

const LayersPanel: React.FC<LayersPanelProps> = ({ layers, query, deleteLayer, renameLayer }) => {
  const filteredLayersAndNodes = useMemo(() => {
    return layers
      .map((layer) => ({
        ...layer,
        nodes: layer.nodes.filter((node) => node.content.match(query)),
      }))
      .filter((layer) => query ? layer.nodes.length : true);
  }, [query]);

  return (
    <div>
      <div>
        <Button text="New layer" icon="new-layer" minimal small />
      </div>
      {filteredLayersAndNodes.map((layer) => (
        <LayerItem
          key={layer.id}
          {...layer}
          deleteLayer={() => {
            deleteLayer(layer);
          }}
          renameLayer={(newName: string) => {
            renameLayer(layer, newName);
          }}
          toggleLayer={() => toggleLayer(layer)}
        />
      ))}
    </div>
  );
};

export default LayersPanel;
