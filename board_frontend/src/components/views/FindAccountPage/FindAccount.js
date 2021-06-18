import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {find} from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

function FindAccount(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const onSubmitHandler = (event) => {
      if(event.currentTarget !== ""){
        event.preventDefault();

        let body = {
            email: Email
        }

        dispatch(find(body))
        .then(response=>{
            if(response){
                props.history.push('/accountinfo')
            }else{
                alert("Error")
            }
        })
      }else{
        alert("존재하지 않는 이메일 입니다.")
      }
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Find Your Account
          </Header>
          <Form size='large' onSubmit={onSubmitHandler}>
            <Segment stacked>
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' value={Email} onChange={onEmailHandler} />
              <Button color='teal' fluid size='large'>
                search
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
}

export default withRouter(FindAccount)
