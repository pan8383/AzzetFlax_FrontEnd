'use client';

import ShoppingCartIcon from '@/icons/ShoppingCartIcon';
import { useState } from 'react';
import CartPanel from '../CartPanel';

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
      >
        <ShoppingCartIcon />
      </button>

      {isOpen && <CartPanel />}
    </>
  );
}
