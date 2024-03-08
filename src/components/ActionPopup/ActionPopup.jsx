import React from 'react'
import PopupActions from '../PopupActions/PopupActions';
import { observer } from 'mobx-react-lite';
import popupActionsStore from '../../store/popup-action-store';
import { actionMessages } from './actionMessages';

export const ActionPopup = observer(() => {
  const { currentAction } = popupActionsStore;

  const actionMessage = actionMessages[currentAction];

  return actionMessage ? <PopupActions action={actionMessage} /> : null;
});

