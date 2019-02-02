/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import imgGen from '@dudadev/random-img';
import uuid4 from 'uuid/v4';
import CommentsList from './components/CommentsList';
import CommentForm from './components/CommentForm';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = { editing: false, editCommentId: null, comments: [] };
  }

  addComment = async (name, text) => {
    const id = uuid4();
    const avatarUrl = await imgGen();
    const comment = [{ id, name, text, avatarUrl }];
    const { comments } = this.state;
    this.setState({ comments: comments.concat(comment) });
  }

  editComment = (commentIdToEdit, name, text) => {
    const { comments } = this.state;
    const updatedCommentList = comments.filter(comment => comment.id !== commentIdToEdit);
    const comment = { id: commentIdToEdit, name, text };
    updatedCommentList.push(comment);
    this.setState({ comments: updatedCommentList });
  };

  focusEditComment = (commentIdToEdit) => {
    this.setState({ editing: true, editCommentId: commentIdToEdit });
  };

  removeComment = (commentIdToRemove) => {
    const { comments } = this.state;
    this.setState({ comments : comments.filter(comment => comment.id !== commentIdToRemove) });
  }

  render() {
    const { editing, editCommentId, comments } = this.state;
    return (
      <div className='App'>
        <Header className='App-header' as='h1' color='blue'>User Reviews</Header>
        <CommentsList comments={comments} focusEditComment={this.focusEditComment}
          editCommentId={editCommentId} editComment={this.editComment} removeComment={this.removeComment} />
        {!editing && <CommentForm handleComment={this.addComment} />}
      </div>
    );
  }
}

export default App;
