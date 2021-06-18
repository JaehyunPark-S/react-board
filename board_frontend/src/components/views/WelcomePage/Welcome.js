import React from 'react'
import image from './image/digi.jpg'
import {
    Icon,
    Button,
    Header,

} from 'semantic-ui-react';
function Welcome() {
    const divStyle = {
        width: '100%',
        height: '941px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        textAlign: 'center',
        marginTop: -14.1
      };
    return (
        // <Header style={{backgroundImage: {image}, color: 'white', padding: 300}}>
        <Header style={divStyle}>
            <p style={{fontSize:'2.5em' ,color: 'white', paddingTop: 400}}>정보 공유 게시판 입니다.</p>
            <Button inverted size='huge' href='/login'>
                Get Started
                <Icon name='right arrow' />
            </Button>
        </Header>
        // <Container style={{ width: '100%', height: '100%', margin: 0 }}>
        //     <Image src={image} fluid >

        //     </Image>
        // </Container>
    )
}

export default Welcome
