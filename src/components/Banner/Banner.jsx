import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/user-store';
import modalsStore from '../../store/modal-store';
import './Banner.scss';

export const Banner = observer(() => {
  const { isAuthenticated } = userStore;
  const { authModalHandler } = modalsStore;

  useEffect(() => {
    const scrollers = document.querySelectorAll('.banner');

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
    function addAnimation() {
      scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = document.querySelector('.banner__inner-anim');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem)
        })
      })
    }
  }, [])

  return (
    <div className='banner container-banner'>
      <section className="banner__info">
        <h1>Котлети по-Київськи <br /> у подарунок *</h1>
        <p>до кожної порції Polar Pelmeni</p>
        {!isAuthenticated ?
          (
            <button onClick={() => {
              authModalHandler(true)
            }}
            >
              Зареєструватися
            </button>
          )
          : <span />
        }
        <div className="banner__info-add">
          * - котлети автоматично додаються при {window.innerWidth < 1024 && <br />} підтвердженні замовлення оператором
        </div>
      </section>
      <ul className="banner__inner-anim">
        <li className='anim-item'>POLAR PELMENI</li>
        <li className='anim-item'>CHICKEN COINS</li>
        <li className='anim-item'>КОТЛЕТИ ПО-КИЇВСЬКІ</li>
      </ul>
    </div>
  )
})