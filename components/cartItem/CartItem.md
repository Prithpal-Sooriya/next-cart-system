### Connected Component

```tsx padded
import CartItem from './CartItem'
import ShoppingCartProvider from 'root/context/ShoppingCartContext'
import { CartItemType } from 'root/utils/specialOffers'
;<ShoppingCartProvider>
  <CartItem type={CartItemType.Bread} />
  <hr />
  <CartItem type={CartItemType.Milk} />
  <hr />
  <CartItem type={CartItemType.Cheese} />
  <hr />
  <CartItem type={CartItemType.Soup} />
  <hr />
  <CartItem type={CartItemType.Butter} />
</ShoppingCartProvider>
```

### Unconnected Component

```tsx
import { CartItem } from './CartItem'
const [amount, setAmount] = React.useState(0)
;<CartItem
  title={'Test'}
  specialOffer={'Test Special Offer'}
  itemPrice={0.9}
  amount={amount}
  setAmount={setAmount}
/>
```

### Cart Item Title & with optional description

```tsx
import { CartItem__Label } from './CartItem'
;<div>
  <CartItem__Label title={'Title'} />
  <hr />
  <CartItem__Label title={'Title'} specialOffer={'Buy one, get one free'} />
</div>
```

### Cart Item Price

- NOTE: this does not use Intl/i18n to provide dynamic currency, this is something to improve on.

```tsx
import { CartItem__Price } from './CartItem'
;<CartItem__Price price={12.56} />
```
