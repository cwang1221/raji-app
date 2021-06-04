import { List } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export function TestPage() {
  const data = [{
    id: '1111',
    node: [{
      id: '1',
      index: 0
    }, {
      id: '2',
      index: 1
    }, {
      id: '3',
      index: 2
    }, {
      id: '4',
      index: 3
    }]
  }, {
    id: '2222',
    node: [{
      id: '5',
      index: 0
    }, {
      id: '6',
      index: 1
    }, {
      id: '7',
      index: 2
    }, {
      id: '8',
      index: 3
    }]
  }]

  const onDragEnd = (result) => {

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {data.map((item) => (
          <List
            key={item.id}
            style={{ width: '5rem', margin: '2rem' }}
          >
            <Droppable droppableId={item.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {item.node.map((node) => (
                    <Draggable key={node.id} draggableId={node.id} index={node.index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <List.Item>{node.id}</List.Item>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </List>
        ))}
      </div>
    </DragDropContext>
  )
}
