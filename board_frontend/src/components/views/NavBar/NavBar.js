import React, { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { auth } from '../../../_action/user_action'

function NavBar(props) {
    //user.userData.isAuth
    //isAuth 초기값을 false로 잡아둬야하는데 user.userData.isAuth를 찾아오지 못하는 상황
    //container의 초기값이 없으니 undefined로 생성됨 
    //container의 초기값을 잡아줘야한다.
    const isLoggedIn = useSelector((state) => state.user.userData.isAuth)
    
    const onClickHandler = () => {
        axios.get(`/api/user/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert("로그아웃 하는데 실패 했습니다.")
                }
            })
    }

    if(!isLoggedIn){
        return (
            <Menu inverted>
            <Menu.Item name='home' href="/mainpage" />
            <Menu.Menu position='right'>
                <Menu.Item href='/login' name='login' />
                <Menu.Item href='/register' name='sign up' />
            </Menu.Menu>
        </Menu>

        )
    }return (
        <Menu inverted>
        <Menu.Item color='blue' name='home' href="/mainpage" />
        <Menu.Item name='write' href="/boardwrite" />
        <Menu.Menu position='right'>
            <Menu.Item name='logout' onClick={onClickHandler} />
        </Menu.Menu>
    </Menu>
    )
}

export default withRouter(NavBar)
