import React, { Component } from 'react';
import './CommentList.css';
import { Comment, Icon } from 'semantic-ui-react';
import CommentForm from './CommentForm';
//import imgGen from '@dudadev/random-img';

const CommentItem = ({ comment, isEditing, setEditComment, editComment, removeComment }) => {
  const { id, name, text, avatarUrl } = comment;
  const setEdit = () => setEditComment(id);
  const toEdit = () => editComment(id);
  const toRemove = () => removeComment(id);
  return (
    <div>
      <Comment.Group size='large'>
        <Comment>
          <Comment.Avatar src={avatarUrl} />
          <Comment.Content>
            <Comment.Author>
              {name}
              <span className='commentActions'>
                <Icon name='edit' onClick={setEdit}/>
                <Icon name='trash' onClick={toRemove}/>
              </span>
            </Comment.Author>
            <Comment.Text>{text}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
      {isEditing && <CommentForm name={name} comment={text} editing handleComment={toEdit}/>}
    </div>
  );
};

class CommentList extends Component {
  render() {
    const { comments, editCommentId, focusEditComment, removeComment } = this.props;
    return (
      <div className='commentList'>
        {comments.map(comment => <CommentItem
            key={comment.id} isEditing={editCommentId === comment.id} comment={comment}
            setEditComment={focusEditComment} removeComment={removeComment}/>)}
      </div>
    );
  }
}

export default CommentList;
