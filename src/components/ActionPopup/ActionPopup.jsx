import React from 'react'
import PopupActions from '../PopupActions/PopupActions';
import { observer } from 'mobx-react-lite';
import popupActionsStore from '../../store/popup-action-store';

export const ActionPopup = observer(() => {
  const { currentAction } = popupActionsStore
  if (currentAction === 'addToCard') {
    return <PopupActions action={'Блюдо додано у кошик'} />;
  }
  if (currentAction === 'addToFavorit') {
    return <PopupActions action={'Блюдо додано в «Улюблене»'} />;
  }

  return null
})

