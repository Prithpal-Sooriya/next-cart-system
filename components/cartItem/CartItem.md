### Default Component

```tsx
import CartItem from './CartItem'
;<CartItem
  title={'Cheese'}
  specialOffer={'Buy a cheese, get second cheese for free!'}
  itemPrice={0.9}
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
