import React from 'react';
import GroupOfModificators from './GroupOfModificators';
import "./Modificators.scss";


const ModificatorsPopup = React.memo(({ groups, setSelectedModificators, addProductToCart }) => {

  return (
    <div className='modificators'>
      <h3>Додай до страви</h3>
      {groups.length > 0 && groups.map(group => (
        <div className='modificators-inner' key={group.dish_modification_group_id}>
          <GroupOfModificators group={group} setSelectedModificators={setSelectedModificators} />
        </div>
      ))}
      <button
        className="btn btn-main"
        onClick={addProductToCart}
      >
        Додати в кошик
      </button>
    </div>
  )
})

export default ModificatorsPopup
