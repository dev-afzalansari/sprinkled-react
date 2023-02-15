import type { ReactNode, HTMLProps, CSSProperties } from 'react'

export type SprinkleFn = {
  (...args: any[]): string
  properties: Set<string>
}

type EscapedCSSProperties<TCSSPRroperties> = {
  [Key in keyof TCSSPRroperties as `__${string & Key}`]: TCSSPRroperties[Key]
}
type ReversedConditionProps<TConditionProps, SprinkleProps> = {
  [Key in keyof TConditionProps as `_${string & Key}`]: SprinkleProps
}

export type JSXFactory<
  TSprinkleFn extends SprinkleFn,
  TCustomProps,
  TConditionProps
> = Record<
  string,
  <TProps>(
    prop: Parameters<TSprinkleFn>[0] & {
      children?: ReactNode
    } & HTMLProps<TProps> &
      EscapedCSSProperties<CSSProperties> &
      Partial<
        ReversedConditionProps<
          Omit<TConditionProps, 'default'>,
          Parameters<TSprinkleFn>[0]
        >
      > &
      Partial<TCustomProps>
  ) => JSX.Element
>
