import { createElement, forwardRef, memo } from 'react'
import isEqual from 'react-fast-compare'

import { extractProps } from './utils'
import type { SprinkleFn, JSXFactory } from './utils'

export function createFactory<
  TSprinkleFn extends SprinkleFn,
  TCustomProps = {},
  TReverseCondtions extends { default: string; [x: string]: string } = {
    default: ''
  }
>({
  sprinkles,
  customElement,
  reverseConditions
}: {
  sprinkles: TSprinkleFn
  customElement?: (arg: {
    element: string
    classes: string
    props: any
  }) => JSX.Element | null | undefined
  reverseConditions?: TReverseCondtions
}) {
  return new Proxy<JSXFactory<TSprinkleFn, TCustomProps, TReverseCondtions>>(
    {},
    {
      get: (_: unknown, element: string) => {
        return memo(
          forwardRef<Parameters<TSprinkleFn>[0]>((props, ref) => {
            const { sprinkleProps, otherProps, style, className } =
              extractProps(props, sprinkles, reverseConditions)
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
              style,
              ...otherProps
            })
          }),
          // Since `extractProps` fn performs some heavy calculation
          // we will memoize each component and will only rerender if
          // the props have changed.
          (prevProps: any, nextProps: any) => {
            return isEqual(prevProps, nextProps)
          }
        )
      }
    }
  )
}
