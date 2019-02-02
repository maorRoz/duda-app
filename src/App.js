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
    const comments = localStorage.getItem('comments');
    this.state = { editing: false, editCommentId: null, comments: comments ? JSON.parse(comments) : [] };
  }

  componentDidUpdate(){
    this.setLocalStorage();
  }

  setLocalStorage = () => {
    const { comments } = this.state;
    localStorage.setItem('comments', JSON.stringify(comments));
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
    const updatedComments = comments.map(comment => comment.id === commentIdToEdit
      ? { avatarUrl : comment.avatarUrl, id: commentIdToEdit, name, text } : comment);
    this.setState({ editing: false, editCommentId: null, comments: updatedComments });
  };

  focusEditComment = (commentIdToEdit) => {
    this.setState({ editing: true, editCommentId: commentIdToEdit });
  };

  removeComment = (commentIdToRemove) => {
    const { comments } = this.state;
    this.setState({ editing: false, comments : comments.filter(comment => comment.id !== commentIdToRemove) });
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
