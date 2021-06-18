import React from 'react'
import posts from './posts';
import { Button, Form, Grid, Header, Message, Segment, List, Image, Table, Pagination } from 'semantic-ui-react'

const Paginations = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav style={{display:"flex", flexDirection:"row", textAlign:"center", justifyContent:"center"}}>
            <div>
                {pageNumbers.map(number => (
                        <Button key={number} onClick={() => paginate(number)}>
                            {number}
                        </Button>
                ))}
            </div>
        </nav>
    )
}
export default Paginations;