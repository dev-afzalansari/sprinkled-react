import * as React from 'react'
import { render } from '@testing-library/react'
import * as is from 'react-is'

import { s } from './test-utils'

describe('Sprinkled React', () => {

    test('Creates the expected element', () => {

        expect(is.isElement(<s.div></s.div>))

    })

})