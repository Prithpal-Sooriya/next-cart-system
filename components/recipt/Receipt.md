### Default Component

```tsx
import Receipt from './Receipt'
const basketItems = [
  {
    type: 'Cheese',
    amount: 0,
    price: 0.9,
  },
  {
    type: 'Milk',
    amount: 3,
    price: 0.5,
  },
  {
    type: 'Soup',
    amount: 1,
    price: 0.6,
  },
  {
    type: 'Butter',
    amount: 1,
    price: 1.2,
  },
]
const specialOffers = [
  {
    name: 'Test Special Offer',
    overallDiscount: 1.1,
  },
]
;<Receipt basketItems={basketItems} specialOffers={specialOffers} />
```

### Receipt Container

```tsx
import { Receipt__Container } from './Receipt'
;<Receipt__Container children={<div style={{ width: '100px', height: '100px' }} />} />
```

### Receipt With Prices & Divider

```tsx
import { Receipt__Container, Receipt__List, Receipt__Divider } from './Receipt'
const breadTotalString = '4x Bread: £5.30'
const CheeseTotalString = '4x Cheese: £2.80'
;<Receipt__Container>
  <Receipt__List items={[breadTotalString, CheeseTotalString]} />
  <Receipt__Divider />
</Receipt__Container>
```

### Receipt SubTotal (with discounts) & Final amount

```tsx
import {
  Receipt__Container,
  Receipt__SubTotalAndDiscounts,
  Receipt__Divider,
  Receipt_FinalAmount,
} from './Receipt'
const subTotal = 'SubTotal: £10.60'
const discounts = ['Buy a cheese, get second cheese for free! -£3.60']
;<Receipt__Container>
  <Receipt__SubTotalAndDiscounts subTotal={subTotal} discounts={discounts} />
  <Receipt__Divider />
  <Receipt_FinalAmount finalAmount={'£7.00'} />
</Receipt__Container>
```
