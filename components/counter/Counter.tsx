import { FaMinus, FaPlus } from 'react-icons/fa'

import styles from './Counter.module.css'

type IButtonProps = Pick<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>

type ICounterLabelProps = {
  labelText: string
}

type ICounterProps = {
  min?: number
  max?: number
  value: number
  onChange: (n: number) => void
}

export const Counter: React.FC<ICounterProps> = ({ min = 0, max = 10, value, onChange }) => {
  const onRemove = () => value > min && onChange(value - 1)
  const onAdd = () => value < max && onChange(value + 1)

  const boundedValue = clampValue(min, max, value)
  return (
    <div className={styles.counterContainer} data-testid="counterContainer">
      <Counter__ButtonRemove onClick={onRemove} />
      <Counter__Label labelText={boundedValue.toString()} />
      <Counter__ButtonAdd onClick={onAdd} />
    </div>
  )
}

export const Counter__ButtonRemove: React.FC<IButtonProps> = (props) => (
  <button className={`${styles.counterButton} ${styles.counterButtonRemove}`} {...props}>
    <FaMinus className={styles.counterIcon} />
  </button>
)

export const Counter__ButtonAdd: React.FC<IButtonProps> = (props) => (
  <button className={`${styles.counterButton} ${styles.counterButtonAdd}`} {...props}>
    <FaPlus className={styles.counterIcon} />
  </button>
)

export const Counter__Label: React.FC<ICounterLabelProps> = ({ labelText }) => (
  <div className={styles.counterLabel}>{labelText}</div>
)

const clampValue = (min: number, max: number, value: number): number =>
  Math.min(Math.max(value, min), max)

export default Counter
