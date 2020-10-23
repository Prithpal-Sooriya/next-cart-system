import { render } from '@testing-library/react'
import { CartItem, ICartItemProps } from './CartItem'

describe('CartItem tests', () => {
  const setAmount = jest.fn()
  const itemPrice = 1
  const amount = 0
  const title = 'Test Title'
  const specialOffer = 'Test Special Offer'
  const props: ICartItemProps = {
    setAmount,
    itemPrice,
    amount,
    title,
    specialOffer,
  }

  it('should render the component', () => {
    const { getByTestId } = render(<CartItem {...props} />)
    expect(getByTestId('cartItemContainer')).toBeDefined()
  })
  it('should render the component title and special offer', () => {
    const { getByTestId } = render(<CartItem {...props} />)
    const titleElement = getByTestId('cartItemTitle')
    const specialOfferElement = getByTestId('cartItemSubTitle')

    expect(titleElement).toBeDefined()
    expect(titleElement.innerHTML).toStrictEqual(title)
    expect(specialOfferElement).toBeDefined()
    expect(specialOfferElement.innerHTML).toStrictEqual(specialOffer)
  })
  it('should render the counter component', () => {
    const { getByTestId } = render(<CartItem {...props} />)
    expect(getByTestId('counterContainer')).toBeDefined()
  })
  it('should render the price component', () => {
    const { getByTestId } = render(<CartItem {...props} amount={1} />)
    expect(getByTestId('cartItemPrice')).toBeDefined()

    const priceElement = getByTestId('price')
    expect(priceElement).toBeDefined()
    expect(priceElement.innerHTML).toStrictEqual('1.00')
  })
})
