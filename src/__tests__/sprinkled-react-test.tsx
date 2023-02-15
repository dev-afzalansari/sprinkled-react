import * as React from 'react'
import { render } from '@testing-library/react'
import * as is from 'react-is'

import { s } from './test-utils'

describe('Sprinkled React element tests', () => {
  test('Creates valid react elements', () => {
    expect(is.isElement(<s.div></s.div>)).toBe(true)
    expect(is.isElement(<s.main></s.main>)).toBe(true)
    expect(is.isElement(<s.section></s.section>)).toBe(true)
    expect(is.isElement(<s.a></s.a>)).toBe(true)
    expect(is.isElement(<s.header />)).toBe(true)
    expect(is.isElement(<s.footer />)).toBe(true)
  })

  test('Accepts html attributes', () => {
    const { getByTestId } = render(
      <s.div
        className="the-class"
        title="the-title"
        data-foo="foo"
        data-bar="bar"
        data-testid="div"
      />
    )

    const elem = getByTestId('div')

    expect(elem).toHaveClass('the-class')
    expect(elem).toHaveAttribute('title', 'the-title')
    expect(elem).toHaveAttribute('data-foo', 'foo')
    expect(elem).toHaveAttribute('data-bar', 'bar')
  })

  test('Accepts configured style tokens', () => {
    const { getByTestId, getByText } = render(
      <s.div h="full" w="full" p="md" data-testid="div">
        <s.h1 m="md" fontSize="md">
          Sprinkled-React
        </s.h1>
      </s.div>
    )

    expect(getByTestId('div')).toHaveStyle({
      width: '100%',
      height: '100%',
      padding: '8px'
    })
    expect(getByText('Sprinkled-React')).toHaveStyle({
      margin: '8px',
      fontSize: '2rem'
    })
  })

  test('Accepts ref prop', async () => {
    function Comp() {
      const inputRef = React.useRef<HTMLInputElement>(null)

      React.useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, [])

      return (
        <s.input
          type="text"
          placeholder="your-name"
          ref={inputRef}
          m={{ default: 'md', focus: 'lg' }}
        />
      )
    }

    const { getByPlaceholderText } = render(<Comp />)

    const elem = getByPlaceholderText('your-name')

    expect(elem).toHaveFocus()
    expect(elem).toHaveStyle({ margin: '16px' })
  })

  test('Accepts escaped style props', () => {
    const { getByTestId } = render(
      <s.div
        m="md"
        p="md"
        __height="10rem"
        __width="10rem"
        style={{ backgroundColor: 'red' }}
        data-testid="div"
      />
    )

    expect(getByTestId('div')).toHaveStyle({
      margin: '8px',
      padding: '8px',
      width: '10rem',
      height: '10rem',
      backgroundColor: 'red'
    })
  })

  test('Renders customElement', () => {
    const { getByText } = render(
      <s.Button fontSize="md" p="md" type="submit">
        Sprinkled-React
      </s.Button>
    )

    const elem = getByText('Sprinkled-React')

    expect(elem).toHaveStyle({
      padding: '8px',
      fontSize: '2rem'
    })

    expect(elem).toHaveAttribute('type', 'submit')
  })

  test('Accepts reversed condition props', () => {
    function Comp() {
      const inputRef = React.useRef<HTMLInputElement>(null)

      React.useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, [])

      return (
        <s.input
          type="text"
          placeholder="your-name"
          ref={inputRef}
          _f={{ m: 'lg' }}
        />
      )
    }

    const { getByPlaceholderText } = render(<Comp />)

    const elem = getByPlaceholderText('your-name')

    expect(elem).toHaveFocus()
    expect(elem).toHaveStyle({ margin: '16px' })
  })
})
