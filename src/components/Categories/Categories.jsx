/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { getProductsByCategoryId } from '../../utils/menu';
import menuStore from '../../store/menu-store';
import { observer } from 'mobx-react-lite';
import { m, AnimatePresence } from 'framer-motion';
import { dropInCategories } from '../../utils/animation';

export const Categories = observer(({ setProducts }) => {
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
                onClick={() => setCurrentCategoryId(category_id)}
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
