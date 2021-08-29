import { useState } from 'react';
import { Group } from '../core/types';
import { InputGroup } from '@blueprintjs/core';
import GroupsPanel from './GroupsPanel';
import styled from 'styled-components';
import { useApp } from '../core/store';

const SidebarWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: #e1e8ed;
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

const Sidebar: React.FC = () => {
  const [query, setQuery] = useState('');

  const {
    sidebar: { visible, width },
  } = useApp();

  if (!visible) {
    return null;
  }

  return (
    <SidebarWrapper
      style={{
        width: `${width}px`,
      }}
    >
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

      <GroupsPanel query={query} />
    </SidebarWrapper>
  );
};

export default Sidebar;
