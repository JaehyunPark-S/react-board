import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Table } from 'semantic-ui-react';
import { commentList } from '../../../_action/user_action'
import { useDispatch, useSelector } from 'react-redux';
import Comments from '../CommentPage/Comments'
function BoardRead(props) {
    const initialBoard = () => Object(window.localStorage.getItem('Board') || [])

    const dispatch = useDispatch();
    const [Board, setBoard] = useState(initialBoard);
    const read = useSelector(state => state.user.readData)
    const user = useSelector(state => state.user.userData)

    const loadingData = () => {
        setBoard(read)
    }

    useEffect(() => {
        loadingData();
        if (read._id !== "") {
            window.localStorage.setItem('Board', JSON.stringify(read))
        } else {
            return
        }
    }, [Board])

    const onClickUpdate = () => {
        props.history.push('/boardupdate')
    }

    const onClickDelete = () => {
        if (window.confirm("삭제하시겠습니까?") === true) {
            axios.post('/api/user/delete', {
                _id: parseBoard._id
            })
                .then(response => {
                    if (response.success === false) {
                        alert("err")
                    } else {
                        axios.post('/api/user/deleteBoardToComment', {
                            _id: parseBoard._id
                        }).then(response => {
                            if(response.success === false){
                                alert("err")
                            }else {
                                props.history.push('/mainpage')
                            }
                        })
                    }
                })
        }
    }

    const loadBoard = localStorage.getItem('Board')
    const parseBoard = JSON.parse(loadBoard)

    if (user.id === parseBoard.board_writer) {
        return (
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 1000 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Board
                    </Header>
                    <Form size='large' >
                        <Segment stacked style={{ height: '59vh' }}>
                            <Segment >
                                {parseBoard.board_name}
                            </Segment>
                            <Segment textAlign='left' style={{ height: '43vh' }}>
                                {parseBoard.board_content}
                            </Segment>
                            <Button floated='right' style={{ marginTop: 10 }} onClick={onClickDelete}>Delete</Button>
                            <Button floated='right' style={{ marginTop: 10 }} onClick={onClickUpdate}>Update</Button>
                        </Segment>
                    </Form>
                    <Comments />
                </Grid.Column>
            </Grid>
        )
    }
    return (
        <Grid style={{ height: '80vh' }} textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Board
                </Header>
                <Form size='large' >
                    <Segment stacked style={{ height: '59vh' }}>
                        <Segment >
                            {parseBoard.board_name}
                        </Segment>
                        <Segment textAlign='left' style={{ height: '43vh' }}>
                            {parseBoard.board_content}
                        </Segment>
                    </Segment>
                </Form>
                    <Comments />
            </Grid.Column>
        </Grid>


    )
}

export default withRouter(BoardRead)
