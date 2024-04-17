import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import './Banner.scss';

export const Banner = () => {

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
        <h1>зареєструйся <br /> на сайті</h1>
        <p>та отримай знижку на перше {window.innerWidth < 1024 && <br />} замовлення</p>

      </section>
      <ul className="banner__inner-anim">
        <li className='anim-item'>POLAR PELMENI</li>
        <li className='anim-item'>CHICKEN COINS</li>
        <li className='anim-item'>КОТЛЕТИ ПО-КИЇВСЬКІ</li>
      </ul>
    </div>
  )
}