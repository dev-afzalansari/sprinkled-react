import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const props = defineProperties({
  properties: {
    height: { full: '100%' },
    width: { full: '100%' },
    padding: {
      sm: 4,
      md: 8,
      lg: 16
    },
    margin: {
      sm: 4,
      md: 8,
      lg: 16
    },
    fontSize: {
      sm: '1rem',
      md: '2rem',
      lg: '4rem'
    }
  },
  shorthands: {
    h: ['height'],
    w: ['width'],
    p: ['padding'],
    m: ['margin']
  },
  conditions: {
    default: {},
    focus: { selector: '&:focus' }
  },
  defaultCondition: 'default'
})

export const sprinkles = createSprinkles(props)
