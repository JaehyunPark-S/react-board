import React, { useEffect, useState } from 'react'
import Posts from '../posts/posts'
import Paginations from '../posts/Paginations'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { list } from '../../../_action/user_action'
import { Button, Form, Grid, Header, Message, Segment, List, Image, Table, Pagination } from 'semantic-ui-react'
import userEvent from '@testing-library/user-event';

function MainPage(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate =(pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className='container mt-5'>
            <h1 className="text-primary mb-3">My Blog</h1>
            <Posts posts={currentPosts} loading={loading} />
            <Paginations postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    )
}

export default withRouter(MainPage);