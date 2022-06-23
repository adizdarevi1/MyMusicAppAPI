import React from 'react';
import './infoPopup.css';

function InfoPopup(props) {
    return (props.trigger) ? (
        <div className="info-popup">
            <div className="info-popup-inner">
                <button class="modal__closed" onClick={() => props.setTrigger(false)}></button>
                <div class="modal__details">
                    <h1 class="modal__title">Song Title</h1>
                    <p class="modal__description"> Artist of the song: .</p>
                </div>

                <p class="modal__text">Some facts like url, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>

                <button class="modal__btn">Edit</button>


                {props.children}
            </div>
        </div>
    ) : "";
}

export default InfoPopup;