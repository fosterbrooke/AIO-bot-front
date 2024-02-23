import React, {useState} from 'react';
import logo from '../../assets/img/logo.png'
import s from './Chat.module.css'
import User from "./User";
import {useSelector} from "react-redux";
import {selectTheme} from "../../scripts/store/slices/app/selectors";
import {selectMe} from "../../scripts/store/slices/chat/selectors";
import {useLogoutQuery} from "../../scripts/api/auth-api";

const LeftSidebar = () => {

    const theme=useSelector(selectTheme)
    const me=useSelector(selectMe)


    return (
        <div className={`${s.container_sidebar} ${s[`container_sidebar_${theme}`]}`}>

            <img src={logo} className={s.logo}/>
            <div  className={`${s.sidebar_btn} ${s[`sidebar_btn_${theme}`]}`}>New chat</div>
            <div className={s.line}></div>
            <div className={s.list}>

            </div>
            <div className={s.profile}>
                {me&& <User isMenu={true} user={me}/>}

            </div>
        </div>
    );
};

export default LeftSidebar;
