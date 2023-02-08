import type { ReactNode, HTMLProps, CSSProperties } from 'react'

export type SprinkleFn = {
  (...args: any[]): string
  properties: Set<string>
}

type EscapedCSSProperties<TCSSPRroperties> = {
  [Key in keyof TCSSPRroperties as `__${string & Key}`]: TCSSPRroperties[Key]
}

export type JSXFactory<TSprinkleFn extends SprinkleFn, TCustomProps> = Record<
  string,
  <TProps>(
    prop: Parameters<TSprinkleFn>[0] & {
      children?: ReactNode
    } & HTMLProps<TProps> &
      EscapedCSSProperties<CSSProperties> &
      Partial<TCustomProps>
  ) => JSX.Element
>
