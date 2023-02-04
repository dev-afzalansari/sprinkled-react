import type { ReactNode, HTMLProps } from 'react'

export type SprinkleFn = {
  (...args: any[]): string
  properties: Set<string>
}

export type JSXFactory<TSprinkleFn extends SprinkleFn, TCustomProps> = Record<
  string,
  <TProps>(
    prop: Parameters<TSprinkleFn>[0] & {
      children?: ReactNode
    } & HTMLProps<TProps> &
      TCustomProps
  ) => JSX.Element
>
