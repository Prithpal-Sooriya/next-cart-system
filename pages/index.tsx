import React from 'react'
import CartItem from '../components/cartItem/CartItem'
import Receipt from '../components/recipt/Receipt'
import { CartItemType } from '../utils/specialOffers'
import ShoppingCartProvider from '../context/ShoppingCartContext'
import styles from './Home.module.css'

const IndexPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <ShoppingCartProvider>
        <div className={styles.cardContent}>
          <nav className={styles.navContent}>
            <h1>Shopping Cart</h1>
          </nav>
          <main className={styles.mainContent}>
            <div className={styles.cartContainer}>
              <CartItem type={CartItemType.Bread} />
              <CartItem type={CartItemType.Milk} />
              <CartItem type={CartItemType.Cheese} />
              <CartItem type={CartItemType.Soup} />
              <CartItem type={CartItemType.Butter} />
            </div>
            <Receipt />
          </main>
        </div>
      </ShoppingCartProvider>
    </div>
  )
}

export default IndexPage
