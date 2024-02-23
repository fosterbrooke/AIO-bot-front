import React from 'react';
import s from './Popup.module.css'
const PopUp = ({text,isOpen,changeOpen}) => {
    return (
        isOpen&&
        <div className={s.container_popup} >

            <div className={s.popup} onClick={()=>changeOpen(false)}>
               <button className={s.btn} />
                <p className={s.text}>
                    {text}
                </p>

            </div>

        </div>
    );
};

export default PopUp;
