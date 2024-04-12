import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard/ProductCard';

const MenuProducts = React.memo(({ products }) => {

  useEffect(() => {
    if (products) {

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('product-visible');
          }
        });
      }, { threshold: 0 });
      console.log(document.querySelectorAll('#product'));
      const hiddenElements = document.querySelectorAll('#product');

      if (hiddenElements) {
        hiddenElements.forEach(el => observer.observe(el));
      }

      // Cleanup function
      return () => {
        hiddenElements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      }
    };
  }, [products]);

  return (
    <div className='menu__products'>
      {products.map((product) => {
        if (product.spots[0].visible !== '0') {
          return (
            <React.Fragment key={product.product_id}>
              <ProductCard product={product} />
            </React.Fragment>
          )
        }
      })}
    </div>
  )
})
export default MenuProducts
