export function extractProps(props: Record<string, any>, sprinkles: any) {
  let sprinkleProps: Record<string, any> = {}
  let otherProps: Record<string, any> = {}
  let className: string = ''

  for (let key in props) {
    if (sprinkles.properties.has(key)) {
      sprinkleProps[key] = props[key]
    } else if (key === 'className') {
      className = props[key]
    } else {
      otherProps[key] = props[key]
    }
  }

  return {
    sprinkleProps,
    otherProps,
    className
  }
}
