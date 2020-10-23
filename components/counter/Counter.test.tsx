import { render } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter Component Tests', () => {
  const onChange = jest.fn()
  const value = 0
  it('should render the component', () => {
    const { getByTestId } = render(<Counter onChange={onChange} value={value} />)
    expect(getByTestId('counterContainer')).toBeDefined()
  })
})
