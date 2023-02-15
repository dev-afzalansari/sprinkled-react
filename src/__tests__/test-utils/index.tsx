import * as React from 'react'
import type { ReactNode } from 'react'
import { createFactory } from '../..'
import { sprinkles } from './sprinkles.css'

type CustomElementProps = {
  element: string
  classes: string
  props: { children: ReactNode; type: 'submit' }
}

export const s = createFactory({
  sprinkles,
  reverseConditions: {
    default: 'default',
    f: 'focus'
  },
  customElement: ({ element, classes, props }: CustomElementProps) => {
    if (element === 'Button') {
      return (
        <button className={classes} type={props.type}>
          {props.children}
        </button>
      )
    }
    return null
  }
})
