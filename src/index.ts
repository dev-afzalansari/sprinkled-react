import { createElement, forwardRef } from 'react'

import { extractProps } from './utils'
import type { SprinkleFn, JSXFactory } from './utils'

export function createFactory<
  TSprinkleFn extends SprinkleFn,
  TCustomProps = {}
>({
  sprinkles,
  customElement
}: {
  sprinkles: TSprinkleFn
  customElement?: (arg: {
    element: string
    classes: string
    props: any
  }) => JSX.Element | null | undefined
}) {
  return new Proxy<JSXFactory<TSprinkleFn, TCustomProps>>(
    {},
    {
      get: (_: unknown, element: string) => {
        return forwardRef<Parameters<TSprinkleFn>[0]>((props, ref) => {
          const { sprinkleProps, otherProps, className } = extractProps(
            props,
            sprinkles
          )
          const classes = sprinkles(sprinkleProps)

          const userElement = customElement
            ? customElement({ element, classes, props })
            : null

          if (userElement) {
            return userElement
          }

          return createElement(element, {
            ref,
            className: `${classes} ${className}`.trim(),
            ...otherProps
          })
        })
      }
    }
  )
}
