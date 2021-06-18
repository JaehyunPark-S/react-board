import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import CKEDITOR from 'ckeditor4-react';
CKEDITOR.editorConfig = function(config) 
{
    config.enterMode = CKEDITOR.ENTER_BR;
}
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
            board_name: Title,
            board_content: CK
        }
        axios.post('/api/user/write', body)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/mainpage")
                } else {
                    alert("글쓰기 실패")
                }
            })
    }
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
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    글 작성
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='pencil' iconPosition='left' placeholder='제목' value={Title} onChange={onTitleHandler}/>
                    <CKEditor style={{ height: 1000 }}
                        value={CK}
                        onChange={onCKHandler}
                        config={{
                            height: 500,
                            enterMode: CKEDITOR.ENTER_BR,
                            shiftEnterMode: CKEDITOR.ENTER_P,
                            basicEntities: false,
                            autoParagraph: false,
                            fillEmptyBlocks: false,
                        }}
                    />
                    </Segment>
                        <Button color='teal' fluid size='large' onClick={onClickHandler}>
                            작성
                        </Button>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(BoardWrite)
