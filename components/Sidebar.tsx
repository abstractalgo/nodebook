import { useState } from 'react';
import { Layer, NodebookPageState } from '../core/types';
import { InputGroup } from '@blueprintjs/core';
import LayersPanel from './LayersPanel';
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: #E1E8ED;
  padding: 5px;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: max-content 1fr;
  grid-gap: 5px;
  align-items: start;

  .search {
    padding: 5px;
  }
`;

type SidebarProps = {
  layers: Layer[];
  createNewLayer: () => void;
  deleteLayer: (layer: Layer) => void;
  renameLayer: (layer: Layer, name: string) => void;
  toggleLayer: (layer: Layer) => void
  config: NodebookPageState['sidebar']
};

const Sidebar: React.FC<SidebarProps> = ({ config: { visible, width }, ...rest }) => {
  const [query, setQuery] = useState('');

  if (!visible) {
    return null
  }

  return (
    <SidebarWrapper style={{
      width: `${width}px`
    }}>
      <div className="search">
        <InputGroup
          fill
          placeholder="Search..."
          leftIcon="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <LayersPanel
        {...rest}
        query={query}
      />
    </SidebarWrapper>
  );
};

export default Sidebar;
