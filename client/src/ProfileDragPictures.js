import React from 'react'
import './ProfileDragPictures.css'
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow'

const ItemTypes = {
  PICTURE: 'picture'
};

const pictureSource = {
  beginDrag(props) {
    return { id: props.id }
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let prevDraggedId
let prevPropsId
let draggedId
const pictureTarget = {
  hover(props, monitor) {
    if (draggedId === null)
      draggedId = monitor.getItem().id
      
    if (prevDraggedId !== draggedId || prevPropsId !== props.id) {
      props.movePicture(draggedId, props.id)
      prevDraggedId = draggedId
      prevPropsId = props.id
      draggedId = props.id
    }
  },
  drop () {
    draggedId = null
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class ProfileDragPictures extends React.Component {
  render() {
    const { connectDragSource, isDragging, connectDropTarget, removePicture, id } = this.props;
    return connectDragSource(connectDropTarget(
        <div className='ProfileDragPictures_pictures Profile_boxPictures' id={id}
              style={{
                opcacity: isDragging ? 0.5 : 1,
                cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
                backgroundImage: `url(${this.props.picture})`,
                transform: 'translate(0, 0)'
              }}
        >
          <div className='ProfileDragPictures_remove' onClick={removePicture}/>
        </div>
    ))
  }
}

export default flow(
  DragSource(ItemTypes.PICTURE, pictureSource, collectSource),
  DropTarget(ItemTypes.PICTURE, pictureTarget, collectTarget)
)(ProfileDragPictures)