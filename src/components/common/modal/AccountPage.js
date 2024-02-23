import React from 'react';
import s from './Modal.module.css'
const AccountPage = () => {
    return (
        <div>
            <div>
                <div>
                    <p style={{fontSize:20}}>JOE DOE</p>
                    <p>Connected accounts:</p>
                </div>
                <p>
                    Member since: March 24th, 2023
                </p>
            </div>
            <div className={s.account_container}>
                <p style={{fontSize:20}}>Security</p>
                <div className={s.flex_container}>
                    <p>Log out of all sessions except for this current browser</p>
                    <button className={s.btn}> Log out </button>
                </div>
            </div>
            <div  className={s.account_container}>
                <p  style={{fontSize:20}}>Delete account</p>
                <div className={s.flex_container} >
                    <p>Delete your account and remove all personal data</p>
                    <button className={s.btn}> Delete</button>
                </div>
            </div>


        </div>
    );
};

export default AccountPage;
