import React, { useCallback } from 'react';
import plus from "../../../src/assets/add.svg";
import "./Modificators.scss";

const getFactoredName = (name) => name.split(" ").slice(0, 2).join(" ");

const ModificatorsPopup = React.memo(({ groups }) => {

  return (
    <div className='modificators'>
      <h3>Додай до страви</h3>
      {groups.length > 0 && groups.map(group => (
        <div className='modificators-inner' key={group.dish_modification_group_id}>
          {group.modifications.map((modificator) => (
            <div
              key={modificator.dish_modification_id}
              // onClick={() => handleSelect(modificator.dish_modification_id)}
              className="modificator"
            >
              <img src={plus} alt="add the item to cart" />
              <b>{getFactoredName(modificator.name)}</b>
              {/*<span>{modificator.price}₴/{modificator.brutto}г</span>*/}
              <span>{modificator.price}₴/40г</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

export default ModificatorsPopup
