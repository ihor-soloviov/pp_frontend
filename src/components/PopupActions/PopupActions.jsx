import React from 'react';

//Import style
import './PopupActions.scss';
import {useDispatch} from 'react-redux';
import {setActions} from '../../store/popupActionsSlice';
import {Link} from "react-router-dom";

const PopupActions = ({action, error, onClick}) => {
    const dispatch = useDispatch();

    return (
        <Link to={action === 'Блюдо додано у кошик' ? '/order' : ''} className='popup-actions'>
            <div className='popup-actions__content' onClick={onClick}>
                <div
                    className={`popup-actions__ico`}
                >
                    {error ? (
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <circle cx='12' cy='12' r='12' fill='#F55D66'/>
                            <path
                                d='M12.0007 18.6666C8.31875 18.6666 5.33398 15.6818 5.33398 11.9999C5.33398 8.31802 8.31875 5.33325 12.0007 5.33325C15.6825 5.33325 18.6673 8.31802 18.6673 11.9999C18.6673 15.6818 15.6825 18.6666 12.0007 18.6666ZM12.0007 17.3333C14.9462 17.3333 17.334 14.9455 17.334 11.9999C17.334 9.0544 14.9462 6.66659 12.0007 6.66659C9.05513 6.66659 6.66732 9.0544 6.66732 11.9999C6.66732 14.9455 9.05513 17.3333 12.0007 17.3333ZM11.334 13.9999H12.6673V15.3333H11.334V13.9999ZM11.334 8.66659H12.6673V12.6666H11.334V8.66659Z'
                                fill='black'
                            />
                        </svg>
                    ) : (
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <circle cx='12' cy='12' r='12' fill='#55CB99'/>
                            <g clipPath='url(#clip0_390_8333)'>
                                <path
                                    d='M10.6665 14.1148L16.7945 7.98608L17.7378 8.92875L10.6665 16.0001L6.42383 11.7574L7.36649 10.8148L10.6665 14.1148Z'
                                    fill='#12130F'
                                />
                            </g>
                            <defs>
                                <clipPath id='clip0_390_8333'>
                                    <rect
                                        width='16'
                                        height='16'
                                        fill='white'
                                        transform='translate(4 4)'
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    )}
                </div>
                <p>{action}</p>
                <div
                    className='popup-actions__close'
                    onClick={() => dispatch(setActions({action: ''}))}
                >
                    <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M5.00048 4.05732L8.30048 0.757324L9.24315 1.69999L5.94315 4.99999L9.24315 8.29999L8.30048 9.24266L5.00048 5.94266L1.70048 9.24266L0.757812 8.29999L4.05781 4.99999L0.757812 1.69999L1.70048 0.757324L5.00048 4.05732Z'
                            fill='white'
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default PopupActions;
