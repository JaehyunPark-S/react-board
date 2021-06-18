import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, TextArea } from 'semantic-ui-react'
import axios from 'axios';
import CKEDITOR from 'ckeditor4-react';

function BoardWrite(props) {    
    const dispatch = useDispatch();

    const [CK, setCK] = useState("")
    const [Title, setTitle] = useState("")

    CKEDITOR.editorConfig = function( config ) {
        config.enterMode = CKEDITOR.ENTER_BR // pressing the ENTER Key puts the <br/> tag
        config.shiftEnterMode = CKEDITOR.ENTER_P; //pressing the SHIFT + ENTER Keys puts the <p> tag
        };

    const onClickHandler = () => {
        let body = {
            _id: da._id,
            board_name: Title,
            board_content: CK,
            board_writer: da.board_writer,
            board_date: Date.now()
        }
        axios.post('/api/user/update', body)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/mainpage")
                } else {
                    alert("글쓰기 실패")
                }
            })
    }
    const da = useSelector(state => state.user.readData);
    console.log(da)

    const onCKHandler = (event) => {
        console.log(event.editor.getData())
        setCK(event.editor.getData())
    }

    const onTitleHandler = (event) => {
        console.log(event.currentTarget.value)
        setTitle(event.currentTarget.value)
    }

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle' >
            <Grid.Column style={{ maxWidth: 1000 }} >
                <Header as='h2' color='teal' textAlign='center'>
                    글 작성
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='pencil' iconPosition='left' placeholder={da.board_name} value={Title} onChange={onTitleHandler}/>
                    <CKEditor style={{ height: 1000 }}
                        value={CK}
                        onChange={onCKHandler}
                        data={da.board_content}
                        config={{
                            height: 500,
                            enterMode: CKEDITOR.ENTER_BR,
                            shiftEnterMode: CKEDITOR.ENTER_P,
                            autoParagraph: false
                        }}
                    />
                    </Segment>
                        <Button color='teal' fluid size='large' onClick={onClickHandler}>
                            수정
                        </Button>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(BoardWrite)
