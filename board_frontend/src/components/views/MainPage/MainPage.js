import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { list, read } from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment, List, Image, Table, Pagination, Container } from 'semantic-ui-react'
import userEvent from '@testing-library/user-event';
import Posts from '../posts/posts'
import Paginations from '../posts/Paginations'
import Search from '../Search/Search';

function MainPage(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [Option, setOption] = useState('Title')
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/api/user/list');
            setPosts(res.data);
            dispatch(list());
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleValueChange = (e) => {
        setSearchKeyword(e.currentTarget.value)
    }

    const filteredComponents = (data) => {
            data = posts.filter((c) => {
                return c.board_name.indexOf(searchKeyword) > -1;
            })   
        if (data.length > 10) {
            data = data.slice(indexOfFirstPost, indexOfLastPost);
        }
        return data.map((c) => {
            return <Table.Row key={c._id} >
                <Table.Cell>
                    {c.board_writer}
                </Table.Cell>
                <Table.Cell width={11} onClick={() => dispatch(read({ _id: c._id })).then(response => {
                    if (response) {
                        props.history.push('/boardread')
                    }
                })}>
                    <a style={{ color: "black" }}>{c.board_name}</a>
                </Table.Cell>
                <Table.Cell>
                    {c.board_date.slice(0,4) +"." + c.board_date.slice(5,7) + "." + c.board_date.slice(8,10) +" "+ c.board_date.slice(11,16)}
                </Table.Cell>
            </Table.Row>
        })
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // useEffect(() => {
    //     const fetchPosts = async (index) => {
    //         const response = await axios.get('/api/user/list');
    //         console.log(response)
    //         // const {results, count} = await response.json()
    //         // console.log(results)
    //         setList(response.data);
    //         console.log(response.data)
    //         setTotal(response.data.length)
    //         console.log(response.data.length)
    //     }
    //     const pageIndex = page - 1;
    //     fetchPosts(pageIndex);
    // }, [pageParam]);

    // useEffect(() => {
    //     dispatch(list())
    //         .then(response => {
    //             if (!response.data) {
    //                 return
    //             }
    //             return response.data
    //         })
    // }, [])


    // const test = useSelector((state) => state.user.findList)
    // console.log(test)
    // const item = test.map((tes, index) =>
    //     <Table.Row>
    //         <Table.Cell key={index}>{tes.board_writer}</Table.Cell>
    //         <Table.Cell key={index}>{tes.board_name}</Table.Cell>
    //         <Table.Cell key={index}>{tes.board_date}</Table.Cell>
    //     </Table.Row>)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const options = [
        { key: 't', text: 'Title', value: 'title' },
        { key: 'w', text: 'Writer', value: 'writer' }
      ]
    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h2' color='teal'>
                    Board
                    <Form>
                        <Form.Group>
                        {/* <Form.Select style={{minWidth:100}} options={options} placeholder='Title' onChange={(e, d) => {
                            setOption(d.value);
                        }} /> */}
                        <Form.Input
                            width={5}
                            placeholder='search'
                            name='searchKeyword'
                            value={searchKeyword}
                            onChange={handleValueChange}
                        />
                        </Form.Group>
                    
                    </Form>
                </Header>
                <Form size='large' >
                    <Segment stacked style={{ height: '59vh' }}>
                        <Table striped >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {posts ?
                                    filteredComponents(currentPosts) : <Table.Cell>Loding...</Table.Cell>
                                }

                                {/* {currentPosts.map(post => (
                                    <Table.Row key={post.board_date} >
                                        <Table.Cell>
                                            {post.board_writer}
                                        </Table.Cell>
                                        <Table.Cell width={11} onClick={() => dispatch(read({ _id: post._id })).then(response => {
                                            if (response) {
                                                props.history.push('/boardread')
                                            }
                                        })}>
                                            <a style={{ color: "black" }}>{post.board_name}</a>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {post.board_date}
                                        </Table.Cell>
                                    </Table.Row>
                                ))} */}
                            </Table.Body>
                        </Table>
                    </Segment>
                    {/* <Paginations postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} /> */}
                    <Pagination activePage={currentPage} totalPages={Math.ceil(posts.length / postsPerPage)} onPageChange={(e, d) => setCurrentPage(d.activePage)} />
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default withRouter(MainPage);