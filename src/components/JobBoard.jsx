import React, { Component, useState, useEffect } from 'react';
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

    // beginning skeleton for posting changes to server after drag event. NEEDS WORK
    async function fetchData() {
      const moved = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '5f75e7b2d3a398548e7addf1',
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

  // fetch request to get all board info and jobs for logged in user - NEED TO REDO with new schema
  async function fetchData() {
    const userRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: '5f75e7b2d3a398548e7addf1' }),
    };
    const res = await fetch('/api/getJobs', userRequest);
    const parsed = await res.json();

    await setJobs(parsed);
    renderJobs(parsed)
  }

  async function renderJobs(parsed) {

    setColumns({
      'f0ae9269-d425-43e8-91e5-177e6033c1f4': {
        ...columns['f0ae9269-d425-43e8-91e5-177e6033c1f4'],
        name: "Interested",
        items: parsed.interestedIn,
      },
      'be643203-6f1b-40ca-92ab-ce6f867e6755': {
        ...columns['be643203-6f1b-40ca-92ab-ce6f867e6755'],
        name: "Applied",
        items: parsed.appliedFor,
      },
      'ec38e4c5-dcf2-4cb7-b648-7f52d2f77966': {
        ...columns['ec38e4c5-dcf2-4cb7-b648-7f52d2f77966'],
        name: "Interviews",
        items: parsed.upcomingInterviews,
      },
      '3da033ba-7d52-46bf-9225-f702731d5939': {
        ...columns['3da033ba-7d52-46bf-9225-f702731d5939'],
        name: "Offers",
        items: parsed.offers
      }
    })
  }

  useEffect(async () => {
    await fetchData();
    console.log('jobs', jobs);
  }, []);

  // render() {
  return (
    <div className="jobBoard">
      <p>Your Job Board</p>
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
                              : 'white',
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                            borderRadius: '12px'
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
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
                                        borderRadius: '8px'
                                      }}
                                    >
                                      {item.title}
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

export default JobBoard;
