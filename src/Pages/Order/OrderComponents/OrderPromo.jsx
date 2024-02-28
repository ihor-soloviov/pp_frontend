import React, { useEffect, useState } from 'react'
import userStore from '../../../store/user-store';
import BtnMain from '../../../components/Buttons/BtnMain';
import { calculateTotalPrice } from '../OrderFunctions/OrderTools';
import shoppingCartStore from '../../../store/shoping-cart-store';
import { observer } from 'mobx-react-lite';
import { CustomSelect } from '../../../components/CustomSelect/CustomSelect';

export const OrderPromo = observer(({ formData, handleFormValueChange, handleError, isPromotion, setPromotionPopup, setIsPromotion }) => {

  const { promocode40 } = userStore;
  const { cartItems } = shoppingCartStore
  const [promo, setPromo] = useState('')

  const handleActivatePromoClick = () => {
    if (promo.label !== '40%') {
      return
    }
    if (calculateTotalPrice(cartItems) * (60 / 100) <= 200) {
      handleError({
        status: true,
        currentError: "Мінімальна сумма замовлення 200 ₴",
      });
      setTimeout(() => {
        handleError({
          status: false,
          currentError: "",
        });
      }, 2000);
    } else {
      setPromotionPopup(true)
      setTimeout(() => {
        setPromotionPopup(false)
      }, 2500);
      setIsPromotion(true);
    }
  }


  const handleChangePromo = (e) => {
    setPromo(e)
    handleFormValueChange("promoCode", e)
  }

  const promoOptions = promocode40 ? ['40%', ''] : ['']

  return (
    <section className="order-page__section">
      <h3 className='order-page__header'>Додати промокод</h3>
      <section className="order-page__section-inputs order-page__section-inputs-row">
        <label className='inputText'>
          <span>Промокод</span>
          <CustomSelect className={`cityDrop promo`} placeholder='Промокод' value={promo} options={promoOptions} handleChange={handleChangePromo} />
        </label>

        {promocode40 && (
          <BtnMain
            name={"Застосувати"}
            onClick={handleActivatePromoClick}
            disabled={isPromotion}
          />
        )}
      </section>
      {promocode40 && <div className='order-page__have-promocode'>
        <span>У ВАС Є ПРОМОКОД НА ЗНИЖКУ 40%</span>
        <div className="order-page__arrow">
          <svg
            width="17"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16645 11.7814L12.7425 8.20535L13.6851 9.14802L8.49979 14.3334L3.31445 9.14802L4.25712 8.20535L7.83312 11.7814V3.66669H9.16645V11.7814Z"
              fill="#12130F"
            />
          </svg>
        </div>
      </div>}

    </section>
  )
})
