import { Group, Node, Sticker } from '../core/types';
import { Button, Icon } from '@blueprintjs/core';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../core/store';

const GroupItemWrapper = styled.div`
  .group-meta {
    display: grid;
    grid-template-columns: max-content max-content 1fr max-content max-content;
    grid-gap: 4px;
    align-items: center;
  }
  .group-content {
    padding-left: 16px;

    .node-meta {
    }
  }
`;

const GroupItem: React.FC<{
  group: Group;
  nodes: Node[];
  stickers: Sticker[];
}> = ({ group, nodes, stickers }) => {
  const { createGroup, renameGroup, toggleGroupVisible, removeGroup } = useApp();

  const [collapsed, setCollapsed] = useState(true);
  const [newGroupName, setNewGroupName] = useState(group?.title);

  return (
    <GroupItemWrapper>
      <div className="group-meta">
        <Button
          icon={collapsed ? 'chevron-right' : 'chevron-down'}
          minimal
          title="Collapse"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          small
        />
        <Button icon={group.visible ? 'eye-open' : 'blank'} onClick={() => toggleGroupVisible(group)} small minimal />
        <div>{group.title}</div>
        <Button icon="edit" title="Rename" minimal onClick={() => removeGroup(group)} small />
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
        <div className="group-content">
          <div>
            <Button text="New sticker" icon="heatmap" minimal small />
          </div>
          <div>
            <Button text="New node" icon="graph" minimal small />
          </div>
          {/* stickers */}
          {stickers.map((sticker) => (
            <div className="node-meta" key={sticker.id}>
              {sticker.title}
              {/* focus, delete */}
            </div>
          ))}
          {/* nodes */}
          {nodes.map((node) => {
            return (
              <div className="node-meta" key={node.id}>
                {node.content}
                {/* focus, delete */}
              </div>
            );
          })}
        </div>
      )}
    </GroupItemWrapper>
  );
};

type GroupsPanelProps = {
  query: string;
};

const GroupsPanel: React.FC<GroupsPanelProps> = ({ query }) => {
  const { nodes, stickers } = useApp();

  const groupedData = useMemo(() => {
    type GroupData = { nodes: Node[]; stickers: Sticker[]; group: Group };

    const groups: Record<Group['id'], GroupData> = {};

    // group nodes
    nodes.forEach((node) => {
      if (groups[node.group.id] === undefined) {
        groups[node.group.id] = {
          nodes: [],
          stickers: [],
          group: node.group,
        };
      }

      groups[node.group.id].nodes.push(node);
    });

    // group stickers
    stickers.forEach((sticker) => {
      if (groups[sticker.group.id] === undefined) {
        groups[sticker.group.id] = {
          nodes: [],
          stickers: [],
          group: sticker.group,
        };
      }

      groups[sticker.group.id].stickers.push(sticker);
    });

    return groups;
  }, [nodes, stickers]);

  return (
    <div>
      <div>
        <Button text="New group" icon="folder-new" minimal small />
      </div>
      {Object.values(groupedData).map(({ nodes, stickers, group }) => (
        <GroupItem key={group ? group.id : 'free'} group={group} nodes={nodes} stickers={stickers} />
      ))}
    </div>
  );
};

export default GroupsPanel;
