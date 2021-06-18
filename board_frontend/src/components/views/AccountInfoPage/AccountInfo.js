import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function AccountInfo(props) {

    const info = useSelector((state) => state.user.findData)

    const userID = info.id
    const userPW = info.password
    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Find Your Account
          </Header>
                <Form size='large' >
                    <Segment stacked>
                        <Message floating>ID: {userID}</Message>
                        <Message floating>PW: {userPW}</Message>
                        <Button color='teal' fluid size='large' href='/login'>
                            이동
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(AccountInfo)
