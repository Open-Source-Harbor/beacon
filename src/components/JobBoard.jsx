import React, { Component, useState, useEffect } from 'react';
import JobColumn from './JobColumn';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log('source', source);
  console.log('destination', destination);

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

    async function fetchData() {
      const moved = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '5f752731337865bfc01369fa',
          // jobId: ,
          // prevCol: ,
          // prevIndex: ,
          // newCol: ,
          // newIndex: ,
          // boardIndex: ,
        }),
      };
      const res = await fetch('http://localhost:8080/moveJob', moved);
      res
        .json()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    
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
  const [jobs, setJobs] = useState({});

  // constructor(props) {
  // 	super(props);
  // }

  async function fetchData() {
    const userRequest = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: '5f74a8292a769931c7b7b0eb'}),
    };
    const res = await fetch('http://localhost:8080/getJobs', userRequest);
    res
      .json()
      .then((res) => setJobs(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
    console.log('jobs', jobs);
  }, []);

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
