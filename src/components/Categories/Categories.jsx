import classNames from 'classnames';
import React, { useEffect } from 'react'
import { getProducts } from '../../utils/menu';
import menuStore from '../../store/menu-store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export const Categories = observer(({ setProducts }) => {
  const { id } = useParams();
  const { categories, currentCategoryId, setCurrentCategoryId } = menuStore;

  useEffect(() => {
    getProducts(currentCategoryId, setProducts);
  }, [currentCategoryId, setProducts]);


  useEffect(() => {
    if (id) {
      setCurrentCategoryId(id);
    }
  }, [id, setCurrentCategoryId]);

  if (categories) {
    return (
      <div className="categories__list">
        {categories.map(({ category_id, category_name }) => (
          <button
            key={category_id}
            className={classNames("categories__btn", {
              "categories__btn-active": currentCategoryId === category_id,
            })}
            onClick={() => setCurrentCategoryId(category_id)}
          >
            {category_name}
          </button>
        )
        )}
      </div>
    )
  }
})

