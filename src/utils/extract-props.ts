export function extractProps(
  { className = '', style = {}, ...props }: Record<string, any>,
  sprinkles: any,
  reverseLookup: any = {}
) {
  let sprinkleProps: Record<string, any> = {}
  let escapedStyles: Record<string, any> = {}
  let otherProps: Record<string, any> = {}

  let conditionProps = []

  // Divide props to their appropriate position.
  for (let key in props) {
    if (sprinkles.properties.has(key)) {
      // Initial sprinkled props but will get modified later.
      sprinkleProps[key] = props[key]
    } else if (key[0] === '_' && key[1] !== '_') {
      // Push all condition props in an array for now.
      conditionProps.push({
        name: reverseLookup[key.substring(1)],
        keys: Object.keys(props[key]),
        values: props[key]
      })
    } else if (key.startsWith('__')) {
      // Escaped styles which will be assigned to `style` prop later.
      escapedStyles[key.substring(2)] = props[key]
    } else {
      // Props that we don't need
      otherProps[key] = props[key]
    }
  }

  // Assign each reverse condition props by modifying `sprinkleProps`
  conditionProps.forEach(condition => {
    condition.keys.forEach(key => {
      // If prop for specified condition is available update it.
      if (key in sprinkleProps) {
        if (typeof sprinkleProps[key] !== 'object') {
          sprinkleProps[key] = {
            [reverseLookup.default]: sprinkleProps[key],
            [condition.name]: condition.values[key]
          }
        } else if(!Array.isArray(sprinkleProps[key])) {
          sprinkleProps[key][condition.name] = condition.values[key]
        }
      } else {
        // If prop for specified condition is not available make it.
        sprinkleProps[key] = {
          [reverseLookup.default]: undefined,
          [condition.name]: condition.values[key]
        }
      }
    })
  })

  style = { ...style, ...escapedStyles }

  return {
    sprinkleProps,
    otherProps,
    style,
    className
  }
}
