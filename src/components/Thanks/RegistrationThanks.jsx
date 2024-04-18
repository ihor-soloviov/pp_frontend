import React from 'react'
import BtnSecondary from '../Buttons/BtnSecondary'
import { useNavigate } from 'react-router-dom'
import ThanksContainer from './ThanksContainer';
import modalsStore from '../../store/modal-store';
import { observer } from 'mobx-react-lite';

const RegistrationThanks = observer(() => {
  const { thanksRegModalHandler } = modalsStore;
  const navigate = useNavigate();
  return (
    <ThanksContainer>
      <h5>Ви успішно зареєструвалися на сайті</h5>
      <BtnSecondary name='Перейти до меню' onClick={() => { thanksRegModalHandler(false); navigate('/menu') }} fullWide className />
    </ThanksContainer>
  )
})

export default RegistrationThanks
