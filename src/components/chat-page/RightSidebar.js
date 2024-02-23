import React, {useState} from 'react';
import s from './Chat.module.css'
import User from "./User";
import moon from '../../assets/img/moon.svg'
import sun from '../../assets/img/sun.svg'
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "../../scripts/store/slices/app/selectors";
import {setTheme} from "../../scripts/store/slices/app/app-slices";
import {clearLocalStorage, setLocalStorage} from "../../scripts/common/helpers/localStorage";
import { useSendInvitationMutation} from "../../scripts/api/chat-api";
import {selectMe} from "../../scripts/store/slices/chat/selectors";
import PopUp from "../common/popup/PopUp";
import ProgressBar from "../common/progress-bar/ProgressBar";
const RightSidebar = () => {
    const [isOpen,setIsOpen]=useState(false)
    const [friend_email,setFriendEmail]=useState('')
    const [isPopup,setIsPopup]=useState(false)

    const theme=useSelector(selectTheme)
    const me=useSelector(selectMe)

    const [sendInvitation,{ isLoading }] = useSendInvitationMutation();

    const dispatch = useDispatch();
    const changeTheme=(value)=>{
        dispatch(setTheme(value))
        setLocalStorage('theme',value)
    }
    const onSendInvitation= async()=>{
        const res= await sendInvitation({
            from_id:me.id,
            friend_email:friend_email
        })
        if(res.error){
            return
        }
        setFriendEmail('')
        setIsPopup(true)
        setIsOpen(false)

    }



    return (
        <div className={`${s.container_sidebar} ${s[`container_sidebar_${theme}`]}`}>
            <div className={s.container_theme}>

                <img src={sun} onClick={() =>changeTheme('light')} />
                <img src={moon} onClick={() => changeTheme('dark')} />

            </div>
            <div
                className={`${s.sidebar_btn} ${s[`sidebar_btn_${theme}`]}`} onClick={()=>setIsOpen(!isOpen)}>Invite a friend</div>

                <div className={s.invite_friends} style={{display:isOpen?'flex':'none'}}>

                     <input className={`${s.input_invite} ${s[`input_invite_${theme}`]}` }
                            value={friend_email}
                            onChange={(e)=>setFriendEmail(e.target.value)}
                            placeholder='Please enter your friend’s email'/>

                    <button
                        className={`${s.btn_invite} ${s[`btn_invite_${theme}`]}` }
                        disabled={isLoading} onClick={()=>onSendInvitation()}>send</button>
                 </div>

            <div className={s.line}></div>
            {/*<User/>*/}
            {/*<User/>*/}
            {/*<User/>*/}
            {/*<User/>*/}
            <PopUp text={"Changes have been saved!"}  isOpen={isPopup} changeOpen={(value)=>setIsPopup(value)}/>
            {isLoading&&<ProgressBar/>}

        </div>
    );
};

export default RightSidebar;
