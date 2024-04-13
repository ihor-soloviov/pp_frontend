/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { getProductsByCategoryId } from '../../utils/menu';
import menuStore from '../../store/menu-store';
import { observer } from 'mobx-react-lite';
import { m, AnimatePresence } from 'framer-motion';
import { dropInCategories } from '../../utils/animation';
import { useLocation } from 'react-router-dom';

export const Categories = observer(({ setProducts }) => {
  const { pathname } = useLocation();
  const { categories, currentCategoryId, setCurrentCategoryId } = menuStore;

  useEffect(() => {
    getProductsByCategoryId(currentCategoryId, setProducts)
  }, [currentCategoryId]);


  useEffect(() => {
    if (window.innerWidth < 1024) {
      const activeBtn = document.getElementById(currentCategoryId);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentCategoryId]);

  if (categories) {
    return (
      <AnimatePresence>
        <m.div
          id='catHeader'
          variants={dropInCategories}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='categories__inner'
        >
          <div className='categories__list'>
            {categories.map(({ category_id, category_name, order }) => (
              <button
                id={category_id}
                name={order}
                key={category_id}
                className={classNames('categories__btn', {
                  'categories__btn-active': currentCategoryId === category_id,
                })}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    window.scrollTo({ top: pathname.includes('menu') ? 101 : 700, behavior: 'smooth' })
                  }
                  setCurrentCategoryId(category_id)
                }}
              >
                {category_name}
              </button>
            ))}
          </div>
        </m.div>
      </AnimatePresence>
    );
  }
});
