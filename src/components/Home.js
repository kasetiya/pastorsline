import React from 'react'
import Button from './common/Button'
import ModalA from './modal/ModalA';
import ModalB from './modal/ModalB';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleModalA, toggleModalB } from '../redux/actions';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModalA = () => {
        navigate('/modalA')
        dispatch(toggleModalA(true));
    };
    
    const openModalB = () => {
        navigate('/modalB')
        dispatch(toggleModalB(true));
    };

    return (
        <>
            <div className="button-container d-flex align-items-center justify-content-center">
                <Button label="Button A" color="#46139f" onClick={openModalA} />
                <Button label="Button B" color="#ff7f50" onClick={openModalB} />
            </div>
            <ModalA />
            <ModalB />
        </>
    )
}

export default Home