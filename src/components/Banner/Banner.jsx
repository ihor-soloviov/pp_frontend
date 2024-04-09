import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import './Banner.scss';
import modalsStore from '../../store/modal-store';

export const Banner = observer(() => {
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
    <div className='banner'>
      <section className="banner__info">
        <h1>зареєструйся <br /> на сайті</h1>
        <p>та отримай знижку на перше {window.innerWidth < 1024 && <br />} замовлення</p>
        <button onClick={() => {
          authModalHandler(true)
        }}
        >
          Зареєструватися
        </button>
      </section>
      <ul className="banner__inner-anim">
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
        <li className='anim-item'>-40%</li>
      </ul>
    </div>
  )
})