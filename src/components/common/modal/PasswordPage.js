import React from 'react';
import s from "./Modal.module.css";

const PasswordPage = () => {
    return (
        <div>
            <div className={s.container}>
                <p>Current Password</p>
                <div className={s.name_container}>
                    <input className={s.input}  type="password"/>
                    <p style={{fontWeight:300,fontSize:14}}>Note: Please input your current password and type the new password below and click save.</p>
                </div>
            </div>
            <div className={s.container}>
                <p>New Password</p>
                <input className={s.input}  type="password"/>
                <input className={s.input}  type="password"/>


            </div>

        </div>
    );
};

export default PasswordPage;
