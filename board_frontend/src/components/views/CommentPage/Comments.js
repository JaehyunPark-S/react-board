
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { commentWrite } from '../../../_action/user_action';
import { commentList } from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Comment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

function Comments(props) {
  const dispatch = useDispatch();
  const [CommentContent, setCommentContent] = useState("")
  const [CommentPosts, setCommentPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [UpdateContent, setUpdateContent] = useState("")
  const [Id, setId] = useState("");
  const read = useSelector(state => state.user.readData)
  const user = useSelector(state => state.user.userData)

  const loadBoard = localStorage.getItem('Board')
  const parseBoard = JSON.parse(loadBoard)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('/api/user/commentList')
      setCommentPosts(res.data);
      dispatch(commentList());
      setLoading(false)
    };
    fetchPosts();
  }, []);

  const onUpdateContentChange = (event) => {
    setUpdateContent(event.currentTarget.value)
  }
  const onCommentChange = (event) => {
    setCommentContent(event.currentTarget.value)
  }

  const onClickChangeState = (id) => {
    setId(id);
  }

  const onClickCancel = () => {
    window.location.reload();
  }

  const onClickDelete = (id) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      axios.post('/api/user/commentDelete', {
        _id: id
      })
        .then(response => {
          if (response.success === false) {
            alert("err")
          } else {
            window.location.reload();
          }
        })
    }
  }

  const onClickUpdate = () => {
    let body = {
      _id: Id,
      comment_content: UpdateContent,
    }
    axios.post('/api/user/commentUpdate', body)
            .then(response => {
                if (response.data.success) {
                    window.location.reload();
                } else {
                    alert("글쓰기 실패")
                }
            })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      comment_content: CommentContent,
      comment_writer: user.id,
      board_num: parseBoard._id,
      user_num: user._id
    }

    if (body.comment_content !== "") {
      dispatch(commentWrite(body))
        .then(response => {
          if (response.payload.success) {
            window.location.reload();
          } else {
            alert("Failed to comment")
          }
        })
    } else {
      alert("FAIL")
    }
  }
  
  const filteredComponents = (data) => {
    return data.map((c) => {
      if (c.board_num === parseBoard._id && user._id === c.user_num) {
        return <Comment key={c._id}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content style={{ textAlign: 'left' }}>
            <Comment.Author as='a'>{c.comment_writer}</Comment.Author>
            <Comment.Metadata>
              <div>{c.comment_date.slice(0,4) +"." + c.comment_date.slice(5,7) + "." + c.comment_date.slice(8,10) +" "+ c.comment_date.slice(11,16)}</div>
            </Comment.Metadata>
            <Comment.Text>{c.comment_content}</Comment.Text>
            {Id === c._id ?
              <Form>
                <Form.TextArea value={UpdateContent} onChange={onUpdateContentChange} />
                <Button content='Revise' onClick={onClickUpdate} />
                <Button content='Cancel' onClick={onClickCancel} />
              </Form> :
              <Comment.Actions>
                <Comment.Action onClick={() => onClickChangeState(c._id)}>UPDATE</Comment.Action>
                <Comment.Action onClick={() => onClickDelete(c._id)}>DELETE</Comment.Action>
              </Comment.Actions>}
          </Comment.Content>
        </Comment>
      } else if (c.board_num === parseBoard._id && user._id !== c.user_num) {
        return <Comment key={c._id}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content style={{ textAlign: 'left' }}>
            <Comment.Author as='a'>{c.comment_writer}</Comment.Author>
            <Comment.Metadata>
              <div>{c.comment_date.slice(0,4) +"." + c.comment_date.slice(5,7) + "." + c.comment_date.slice(8,10) +" "+ c.comment_date.slice(11,16)}</div>
            </Comment.Metadata>
            <Comment.Text>{c.comment_content}</Comment.Text>
          </Comment.Content>
        </Comment>
      }
    })
  }

  return (
    <Comment.Group style={{ maxWidth: 1000 }}>
      <Header as='h3' dividing>
        Comments
      </Header>
      {CommentPosts ?
        filteredComponents(CommentPosts) : <h1>Loading...</h1>}
      <Form style={{ textAlign: 'left' }} onSubmit={onSubmitHandler} reply>
        <Form.TextArea value={CommentContent} onChange={onCommentChange} style={{ height: '8vh' }} />
        <Button content='Add Reply' labelPosition='left' icon='edit' />
      </Form>
    </Comment.Group>
  )
}

export default withRouter(Comments)
