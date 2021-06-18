import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { find } from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


const options = [
  { key: 't', text: 'Title', value: 'title' },
  { key: 'w', text: 'Writer', value: 'writer' },
  { key: 'c', text: 'Content', value: 'content' },
]


function Search(props) {
  const dispatch = useDispatch();
  const list = useSelector(state => state.user.findList)
  const [ops, setOps] = useState("");
  const [Text, setText] = useState("")

  const onChangeOptions = (e) => {

  }
  const onSubmitHandler = (event) => {
    list.forEach(element => {
      if (element.board_name == Text) {
        console.log("success")
        }
      });      
    }
const onSearchHandler = (event) => {
  setText(event.currentTarget.value)
}
return (
  <Form floated='right' onSubmit={onSubmitHandler}>

    <Form.Group>
      <Form.Select
        options={options}
        key={options.key}
        placeholder='Options'
        onChange={onChangeOptions}
      />
      <Form.Input
        width={11}
        placeholder='Name'
        name='name'
        value={Text}
        onChange={onSearchHandler}
      />

      <Form.Button content='검색' />
    </Form.Group>
  </Form>
)
}

export default withRouter(Search)
