import node_matrices from "../resources/node_matrices.json";
import site_a from "../resources/site_a.json";
import { SiteType } from "../components/MainScene/Site";
import unlocked_nodes from "../resources/unlocked_nodes.json";

type NodeSelectorContext = {
  keyPress: string;
  nodeMatIdx: number;
  nodeColIdx: number;
  nodeRowIdx: number;
  level: string;
  siteRotY: number;
  sitePosY: number;
  unlockedNodes: typeof unlocked_nodes;
};

const getNodeId = (
  level: string,
  nodeMatIdx: number,
  nodeRowIdx: number,
  nodeColIdx: number
) =>
  level +
  node_matrices[nodeMatIdx.toString() as keyof typeof node_matrices][
    nodeRowIdx
  ][nodeColIdx];

const isNodeVisible = (
  nodeId: string,
  unlockedNodes: typeof unlocked_nodes
) => {
  const nodeLevel = nodeId.substr(0, 2);
  const nodeData = (site_a as SiteType)[nodeLevel][nodeId];
  if (nodeData) {
    const unlockedBy = nodeData.unlocked_by;

    let unlocked;
    if (unlockedBy === "-1") unlocked = true;
    else
      unlocked =
        unlockedNodes[unlockedBy as keyof typeof unlockedNodes].unlocked;

    // ishidden checker needs tweaking, this is temp
    return (
      unlocked && (nodeData.is_hidden === "0" || nodeData.is_hidden === "3")
    );
  } else {
    return false;
  }
};

const findNodeAfterMoving = (
  direction: string,
  unlockedNodes: typeof unlocked_nodes,
  level: string,
  nodeMatIdx: number,
  nodeRowIdx: number
) => {
  let newNodeId;
  let newNodeRowIdx = nodeRowIdx;
  let newNodeMatIdx = nodeMatIdx;
  let newNodeColIdx;

  if (direction === "left") {
    newNodeColIdx = 0;

    newNodeMatIdx = nodeMatIdx + 1 > 8 ? 1 : nodeMatIdx + 1;
    newNodeId = getNodeId(level, newNodeMatIdx, nodeRowIdx, newNodeColIdx);

    let triedRows: number[] = [];

    while (!isNodeVisible(newNodeId, unlockedNodes)) {
      if (triedRows.length < 3) {
        triedRows.push(newNodeRowIdx);
        if (newNodeRowIdx === 1 && !triedRows.includes(0)) newNodeRowIdx = 0;
        else if (newNodeRowIdx === 1 && !triedRows.includes(2))
          newNodeRowIdx = 2;
        else if (newNodeRowIdx === 2 && !triedRows.includes(0))
          newNodeRowIdx = 0;
        else if (newNodeRowIdx === 2 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(2))
          newNodeRowIdx = 2;
      } else {
        if (newNodeColIdx === 3) {
          newNodeId = getNodeId(
            level,
            newNodeMatIdx,
            newNodeRowIdx,
            newNodeColIdx
          );
        } else {
          newNodeColIdx++;
          triedRows = [];
          newNodeRowIdx = 0;
        }
      }
      newNodeId = getNodeId(level, newNodeMatIdx, newNodeRowIdx, newNodeColIdx);
    }
  } else if (direction === "right") {
    newNodeColIdx = 3;

    newNodeMatIdx = nodeMatIdx - 1 < 1 ? 8 : nodeMatIdx - 1;
    newNodeId = getNodeId(level, newNodeMatIdx, nodeRowIdx, newNodeColIdx);

    let triedRows: number[] = [];

    while (!isNodeVisible(newNodeId, unlockedNodes)) {
      if (triedRows.length < 3) {
        triedRows.push(newNodeRowIdx);
        if (newNodeRowIdx === 1 && !triedRows.includes(0)) newNodeRowIdx = 0;
        else if (newNodeRowIdx === 1 && !triedRows.includes(2))
          newNodeRowIdx = 2;
        else if (newNodeRowIdx === 2 && !triedRows.includes(0))
          newNodeRowIdx = 0;
        else if (newNodeRowIdx === 2 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(2))
          newNodeRowIdx = 2;
      } else {
        if (newNodeColIdx === 0) {
          newNodeId = getNodeId(
            level,
            newNodeMatIdx,
            newNodeRowIdx,
            newNodeColIdx
          );
        } else {
          newNodeColIdx--;
          triedRows = [];
          newNodeRowIdx = 0;
        }
      }
      newNodeId = getNodeId(level, newNodeMatIdx, newNodeRowIdx, newNodeColIdx);
    }
  }

  return {
    newNodeId: newNodeId,
    newNodeMatIdx: newNodeMatIdx,
    newNodeRowIdx: newNodeRowIdx,
    newNodeColIdx: newNodeColIdx,
  };
};

const findNode = (
  direction: string,
  unlockedNodes: typeof unlocked_nodes,
  level: string,
  nodeMatIdx: number,
  nodeRowIdx: number,
  nodeColIdx: number
) => {
  let newNodeId;
  let newNodeRowIdx = nodeRowIdx;
  let newNodeMatIdx = nodeMatIdx;
  let newNodeColIdx = nodeColIdx;
  if (direction === "left") {
    newNodeColIdx--;

    let newNodeId = getNodeId(
      level,
      newNodeMatIdx,
      newNodeRowIdx,
      newNodeColIdx
    );

    let triedRows: number[] = [];

    if (newNodeColIdx < 0)
      return findNodeAfterMoving(
        "left",
        unlockedNodes,
        level,
        nodeMatIdx,
        nodeRowIdx
      );

    while (!isNodeVisible(newNodeId, unlockedNodes)) {
      if (triedRows.length < 3) {
        triedRows.push(newNodeRowIdx);
        if (newNodeRowIdx === 1 && !triedRows.includes(0)) newNodeRowIdx = 0;
        else if (newNodeRowIdx === 1 && !triedRows.includes(2))
          newNodeRowIdx = 2;
        else if (newNodeRowIdx === 2 && !triedRows.includes(0))
          newNodeRowIdx = 0;
        else if (newNodeRowIdx === 2 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(2))
          newNodeRowIdx = 2;
      } else {
        if (newNodeColIdx === 0) {
          return findNodeAfterMoving(
            "left",
            unlockedNodes,
            level,
            nodeMatIdx,
            nodeRowIdx
          );
        } else {
          newNodeColIdx--;
          triedRows = [];
          newNodeRowIdx = 0;
        }
      }
      newNodeId = getNodeId(level, newNodeMatIdx, newNodeRowIdx, newNodeColIdx);
    }
  } else if (direction === "right") {
    newNodeColIdx++;

    let newNodeId = getNodeId(
      level,
      newNodeMatIdx,
      newNodeRowIdx,
      newNodeColIdx
    );

    let triedRows: number[] = [];

    if (newNodeColIdx > 3)
      return findNodeAfterMoving(
        "right",
        unlockedNodes,
        level,
        nodeMatIdx,
        nodeRowIdx
      );

    while (!isNodeVisible(newNodeId, unlockedNodes)) {
      if (triedRows.length < 3) {
        triedRows.push(newNodeRowIdx);
        if (newNodeRowIdx === 1 && !triedRows.includes(0)) newNodeRowIdx = 0;
        else if (newNodeRowIdx === 1 && !triedRows.includes(2))
          newNodeRowIdx = 2;
        else if (newNodeRowIdx === 2 && !triedRows.includes(0))
          newNodeRowIdx = 0;
        else if (newNodeRowIdx === 2 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(1))
          newNodeRowIdx = 1;
        else if (newNodeRowIdx === 0 && !triedRows.includes(2))
          newNodeRowIdx = 2;
      } else {
        if (newNodeColIdx === 3) {
          return findNodeAfterMoving(
            "right",
            unlockedNodes,
            level,
            nodeMatIdx,
            nodeRowIdx
          );
        } else {
          newNodeColIdx++;
          triedRows = [];
          newNodeRowIdx = 0;
        }
      }
      newNodeId = getNodeId(level, newNodeMatIdx, newNodeRowIdx, newNodeColIdx);
    }
  }

  return {
    newNodeId: newNodeId,
    newNodeMatIdx: newNodeMatIdx,
    newNodeRowIdx: newNodeRowIdx,
    newNodeColIdx: newNodeColIdx,
  };
};

const nodeSelector = (context: NodeSelectorContext) => {
  let newNodeData;
  switch (context.keyPress) {
    case "LEFT":
      newNodeData = findNode(
        "left",
        context.unlockedNodes,
        context.level,
        context.nodeMatIdx,
        context.nodeRowIdx,
        context.nodeColIdx
      );

      if (newNodeData) {
        const didMove = context.nodeMatIdx !== newNodeData.newNodeMatIdx;
        return {
          event: didMove ? "move_left" : "change_node",
          newNodeMatIdx: newNodeData.newNodeMatIdx,
          newNodeRowIdx: newNodeData.newNodeRowIdx,
          newNodeColIdx: newNodeData.newNodeColIdx,
          newSiteRotY: didMove
            ? context.siteRotY + Math.PI / 4
            : context.siteRotY,
          newSitePosY: context.sitePosY,
          newLevel: context.level,
        };
      }
      break;
    case "RIGHT":
      newNodeData = findNode(
        "right",
        context.unlockedNodes,
        context.level,
        context.nodeMatIdx,
        context.nodeRowIdx,
        context.nodeColIdx
      );

      if (newNodeData) {
        const didMove = context.nodeMatIdx !== newNodeData.newNodeMatIdx;
        return {
          event: didMove ? "move_right" : "change_node",
          newNodeMatIdx: newNodeData.newNodeMatIdx,
          newNodeRowIdx: newNodeData.newNodeRowIdx,
          newNodeColIdx: newNodeData.newNodeColIdx,
          newSiteRotY: didMove
            ? context.siteRotY - Math.PI / 4
            : context.siteRotY,
          newSitePosY: context.sitePosY,
          newLevel: context.level,
        };
      }
  }
};

export default nodeSelector;
