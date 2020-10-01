import React, { Component, useState } from 'react';
import JobColumn from './JobColumn';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

// MOCK DATA - need to replace references to this data with real/fetched data
const itemsFromBackend = [
  { id: uuidv4(), name: 'First Job' },
  { id: uuidv4(), name: 'Second Job' },
  { id: uuidv4(), name: 'Third Job' },
  { id: uuidv4(), name: 'Fourth Job' },
  { id: uuidv4(), name: 'Fifth Job' },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: 'Interested',
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: 'Applied',
    items: [],
  },
  [uuidv4()]: {
    name: 'Interviews',
    items: [],
  },
  [uuidv4()]: {
    name: 'Offers',
    items: [],
  },
};

// function to update columns after dragging job post
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log('source', source);
  console.log('destination', destination);

  // post is moved to a different column/category
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    // post is moved to a different position within the same category
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function JobBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  console.log('columns in jobboard', columns);
  // constructor(props) {
  // 	super(props);
  // }

  // render() {
  return (
    <div className="jobBoard">
      <p>This is a board</p>
      <div className="board">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? '#92E2FD'
                              : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '7px',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#132853'
                                          : '#3367F9',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.name}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
// }

export default JobBoard;
