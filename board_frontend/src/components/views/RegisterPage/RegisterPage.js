import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 다릅니다. ')
        }

        let body = {
            id: Id,
            email: Email,
            password: Password
        }
        if(body.id && body.email && body.password != ""){
          dispatch(registerUser(body))
          .then(response => {
              if(response.payload.success){
                  props.history.push("/login")
              } else {
                  alert("Failed to sign up")
              }
          })
        }else{
          alert("FAIL")
        }

    }

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign Up to your account
          </Header>
          <Form size='large' onSubmit={onSubmitHandler}>
            <Segment stacked>
              <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='ID'
              value={Id}
              onChange={onIdHandler} />
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                value={Email}
                onChange={onEmailHandler}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                value={Password}
                onChange={onPasswordHandler}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password Check'
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
              />
              <Button color='teal' fluid size='large'>
                회원가입
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        //     <form style={{ display: 'flex', flexDirection: 'column' }}
        //         onSubmit={onSubmitHandler}
        //     >
        //         <label>Id</label>
        //         <input type="id" value={Id} onChange={onIdHandler} />
        //         <label>Email</label>
        //         <input type="email" value={Email} onChange={onEmailHandler} />
        //         <label>Password</label>
        //         <input type="password" value={Password} onChange={onPasswordHandler} />
        //         <label>Confirm Password</label>
        //         <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        //         <br />
        //         <button>
        //             회원가입
        //         </button>

        //     </form>
        // </div>
    )
}

export default withRouter(RegisterPage)
