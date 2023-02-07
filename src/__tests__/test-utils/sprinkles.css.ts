import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'


const props = defineProperties({
    properties: {
        height: ['100%'],
        width: ['100%']
    }
})

export const sprinkles = createSprinkles(props)