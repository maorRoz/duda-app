import React, { Component } from 'react';
import './CommentList.css';
import { Comment, Icon, Container } from 'semantic-ui-react';
import CommentForm from './CommentForm';
//import imgGen from '@dudadev/random-img';

const CommentItem = ({ name, text, avatarUrl, edit }) => (
  <div>
    <Comment.Group size='large'>
      <Comment>
        <Comment.Avatar src={avatarUrl} />
        <Comment.Content>
          <Comment.Author>
            {name}
            <span className='commentActions'>
              <Icon name='edit' />
              <Icon name='trash' />
            </span>
          </Comment.Author>
          <Comment.Text>{text}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
    {edit && <CommentForm handleComment={() => undefined}/>}
  </div>
);

class CommentList extends Component {
  render() {
    const { comments = [] } = this.props;
    return (
      <div className='commentList'>
        {comments.map(comment => <CommentItem
            key={comment.id} edit name={comment.name}
            text={comment.text} avatarUrl={comment.avatarUrl}/>)}
      </div>
    );
  }
}

export default CommentList;
