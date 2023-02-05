export function extractProps(
  { className = '', style = {}, ...props }: Record<string, any>,
  sprinkles: any
) {
  let sprinkleProps: Record<string, any> = {}
  let escapedStyles: Record<string, any> = {}
  let otherProps: Record<string, any> = {}

  for (let key in props) {
    if (sprinkles.properties.has(key)) {
      sprinkleProps[key] = props[key]
    } else if (key.startsWith('__')) {
      escapedStyles[key.substring(2)] = props[key]
    } else {
      otherProps[key] = props[key]
    }
  }

  style = { ...style, ...escapedStyles }

  return {
    sprinkleProps,
    otherProps,
    style,
    className
  }
}
