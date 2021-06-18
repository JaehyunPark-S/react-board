import Axios from 'axios'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                props.history.push('/mainpage')
            }else{
                alert("Error")
            }
        })
    }

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign in to your account
          </Header>
          <Form size='large' onSubmit={onSubmitHandler}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='ID' value={Id} onChange={onIdHandler} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type='password'
                placeholder='Password'
                value={Password}
                onChange={onPasswordHandler}
              />
    
              <Button color='teal' fluid size='large'>
                Sign In
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/register'>Sign Up</a>
          </Message>
          <Message>
          <a href='/find'>Forgot account? </a>
          </Message>
        </Grid.Column>
      </Grid>
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        //     <form style={{display: 'flex', flexDirection: 'column'}}
        //         onSubmit={onSubmitHandler}
        //     >
        //         <label>Id</label>
        //         <input type="id" value={Id} onChange={onIdHandler} />
        //         <label>Password</label>
        //         <input type="password" value={Password} onChange={onPasswordHandler} />

        //         <br />
        //         <button>
        //             로그인
        //         </button><br />
        //         <button onClick={onClickHandler}>
        //             회원가입
        //         </button>
        //     </form>
        // </div>
    )
}

export default withRouter(LoginPage)
