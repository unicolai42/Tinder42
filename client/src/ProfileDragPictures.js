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

const pictureTarget = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.movePicture(draggedId, props.id);
    }
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class ProfileDragPictures extends React.Component {
  render() {
    const { connectDragSource, isDragging, connectDropTarget } = this.props;
    return connectDragSource(connectDropTarget(
        <div className='Profile_pictures' id={this.props.id}
              style={{
                opcacity: isDragging ? 0.5 : 1,
                cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
                backgroundImage: isDragging ? null :`url(${this.props.picture})`,
                transform: 'translate(0, 0)'}}/>
    ))
  }
}

export default flow(
  DragSource(ItemTypes.PICTURE, pictureSource, collectSource),
  DropTarget(ItemTypes.PICTURE, pictureTarget, collectTarget)
)(ProfileDragPictures)