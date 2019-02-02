/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './CommentForm.css';
import { Input, Form, TextArea, Button } from 'semantic-ui-react';

const initialState = {
  name: '',
  comment: ''
};

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
      const { handleComment } = this.props;
      const { name, comment } = this.state;
      if(name && comment){
        handleComment(name, comment);
        this.setState(initialState);
      }
      event.preventDefault();
    };

    render() {
      const { name, comment } = this.state;
      return (
        <div className='commentForm'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input name='name' placeholder='Your name' onChange={this.handleChange} value={name} />
            </Form.Field>
            <Form.Field>
              <TextArea name='comment' autoHeight
              placeholder='Your comment' onChange={this.handleChange} value={comment} />
            </Form.Field>
            <Button type='submit' primary>Add</Button>
          </Form>
        </div>
      );
    }
}

export default CommentForm;
