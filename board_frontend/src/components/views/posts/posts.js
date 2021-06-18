import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../_action/user_action'
import { Table } from 'semantic-ui-react'

const posts = ({ posts, loading, props }) => {
    const onClickHandler = () => {
        console.log()
    }
    // const state = useSelector(state => state.state)

    // const onSubmitHandler = (event) => {
    //     event.preventDefault();

    //     let body = {
            
    //     }

    //     dispatch()
    //     .then(response=>{
    //       console.log(response.payload)
    //         if(response.payload.loginSuccess){
    //             props.history.push('/')
    //         }else{
    //             alert("Error")
    //         }
    //     })
    // }
    if (loading) {
        return <Table.Row><Table.Cell>Loading...</Table.Cell></Table.Row>;
    }
    return (
        <>
            {posts.map(post => (
                <Table.Row key={post.board_date}>
                    <Table.Cell>
                        {post.board_writer}
                    </Table.Cell>
                    <Table.Cell onClick={onClickHandler}>
                        <a style={{color: "black"}}>{post.board_name}</a>
                    </Table.Cell>
                    <Table.Cell>
                        {post.board_date}
                    </Table.Cell>
                </Table.Row>
            ))}
        </>
    )
}

export default posts;