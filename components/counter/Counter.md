### Default Component

```tsx
import Counter from './Counter'
const [val, setVal] = React.useState(5)
;<Counter value={val} onChange={setVal} />
```

### Counter Button Varients

```tsx
import { Counter__ButtonRemove, Counter__ButtonAdd } from './Counter'
;<div>
  <Counter__ButtonRemove onClick={() => console.log('remove clicked')} />
  <Counter__ButtonAdd onClick={() => console.log('add clicked')} />
</div>
```

### Counter Label

```tsx
import { Counter__Label } from './Counter'
;<Counter__Label labelText={'1'} />
```
