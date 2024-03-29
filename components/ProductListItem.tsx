import Link from 'next/link';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { favoritesState } from '../state/state';
import { Product } from '../types/types';
import { priceComma } from '../utils/priceComma';

const ProductListItem = ({ product }: { product: Product }) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const toggleFavorites = (productId: number) => {
    if (favorites.find((item) => item.id === productId)) {
      setFavorites(favorites.filter((item) => item.id !== productId));
    } else {
      product && setFavorites([...favorites, product]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full col-span-2 md:col-span-1 gap-1 text-sm md:text-base">
      <Link href={`/shop/product/${product.id}`} className="w-full after:pb-[100%] bg-mint flex justify-center items-center ">
        <span className="text-3xl font-semibold text-orange">IMAGE</span>
      </Link>
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <Link href={`/shop/product/${product.id}`} className="w-full font-medium text-beige">
            {product.productName}
            {product.size ? `(${product.size})` : ''}
          </Link>
          <span className="w-full font-medium text-ocher">{priceComma(product.price)}원</span>
        </div>
        <button className="flex items-center justify-center px-2 w-fit text-orange" type="button" onClick={() => product && toggleFavorites(product?.id)}>
          {product && favorites.includes(product) ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
