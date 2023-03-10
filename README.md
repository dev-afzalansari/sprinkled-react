# Sprinkled-React

<div>
  <span><a href='https://npmjs.com/package/sprinkled-react'><img alt="npm" src='https://img.shields.io/npm/v/sprinkled-react' /></a></span>
  <span><a href='https://npmjs.com/package/sprinkled-react'><img alt="npm" src="https://img.shields.io/npm/dt/sprinkled-react"></a></span>
</div>

**A library to bind sprinkles with react.**

This library helps you to bind your `sprinkles` function from [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) with react so you can consume it's properties within jsx as props fast & easily. This library is inspired by [Box](https://chakra-ui.com/docs/components/box) component offered by ui libraries but takes different approach.

Basically you will not have to bother yourself to pass `as` prop anytime you need to render an element other than `div` and since you will be writing host-specific jsx the code will be more clear and readable.

**Example**

```ts
import { s } from './components'

function Component() {
  return (
    <s.div height='100vh' width='100vw' display='flex' alignItems='center' justifyContent='center'>
      <s.h1 fontSize='lg' color='gray-100'>Sprinkled-React</s.h1>
      <s.h2 fontSize='md' color='gray-200'>A library to bind sprinkles with react.</s.h2>
    </s.div>
  )
}
```
[Example on Stackbitz](https://stackblitz.com/edit/sprinkled-react?file=package.json)

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Escape Hatch](#escape-hatch)
- [Styling Components](#styling-components)
- [Reverse Condition Props](#reverse-condition-props)
- [APIs](#apis)
  - [createFactory](#createfactory)
- [Typescript](#typescript)
- [License](#license)

# Installation

Assuming you have installed [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) and configured [vanilla-extract](https://vanilla-extract.style/documentation/getting-started/) with your bundler.

```sh
npm i sprinkled-react
```
or
```sh
yarn add sprinkled-react
```

# Usage

Create sprinkles fn that fulfills your requirement in desired location. For eg.

```ts
// styles/sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const props = defineProperties({
  // ... your preferred properties, shorthands & conditions
})

// export the sprinkles fn
export const sprinkles = createSprinkles(props)
```
and then import the exported `sprinkles` fn from the file and the `createFactory` fn from the library and create an object with them.

```ts
// components/index.tsx
import { createFactory } from 'sprinkled-react'
import { sprinkles } from '../styles/sprinkles.css.ts'

export const s = createFactory({ sprinkles })
// Note: You can name your sprinkles fn whatever you want but it should be assigned to `sprinkles` property of argument object.
```

Now you can import the exported object and use it in your react components. Like this.

```ts
// app.tsx
import { s } from './components'

function App() {
  return <s.div h='100%' w='100%' display='flex' alignItems='center' justifyContent='center'>
    <s.h1 fontSize='lg' color='red-100'>Afzal Ansari</s.h1>
  </s.div>
}
```

# Escape Hatch

Instead of passing an inline `style` prop you can pass css properties starting with two underscore like this `__color` as props which is helpful when you wanna use property or value that isn't configured in your design system. This can be really helpful sometimes.

```ts
// app.tsx
import { s } from './components'

function App() {
  return <s.h1 __fontSize='4rem' __color='turquoise'>Afzal Ansari</s.h1>
}
```

# Styling Components

With [createFactory](#createfactory)'s `customElement` option you can style components as you wish. following is the example taken from [typescript](#typescript) section where react router's [link](https://reactrouter.com/en/main/components/link) is being styled.

```ts
// components/index.tsx
import * as React from 'react'
import { createFactory } from 'sprinkled-react'
import { sprinkles } from '../styles/sprinkles.css'
import { Link } from 'react-router-dom'

type CustomElementProps = {
    element: string;
    classes: string,
    props: { to: string, children: React.ReactNode }
}

export const s = createFactory<typeof sprinkles, CustomElementProps['props']>({ 
    sprinkles,
    customElement: ({ element, classes, props }: CustomElementProps) => {
        switch(element) {
            case 'Link':
                return <Link to={props.to} className={classes}>{props.children}</Link>
                // <s.Link to='...' ...>...</s.Link> is now a stylable `Link` component.
            default:
                return null
        }
    }
})
```

See [customElement](#customelement)

# Reverse Condition Props

You can configure reverse conditions for yourself if you want to avoid this.

```ts
<s.button 
    borderColor='#000'
    color={{ default: '#FFF', hover: '#000' }}
    backgroundColor={{ default: '#000', hover: '#FFF' }}
  > 
    Submit
</s.button>
```

And do this instead.

```ts
<s.button 
    borderColor='#000'
    color='#FFF' 
    backgroundColor='#000' 
    _h={{ color: '#000', backgroundColor: '#FFF' }} // hover - needs to be configured see APIs
  > 
    Submit
</s.button>
```

See [reverseConditions](#reverseconditions).

# APIs
# createFactory
> createFactory({ sprinkles: SprinklesFn, customElement?: ({ element: string, classes: string, props: NonCSSProps }) => JSX.Element | null | undefined, reverseConditions: { default: string, [x: string]: string } })

## sprinkles

You will use `createFactory` fn to create the object and use it's properties as jsx in your components. It takes an object as an argument. The required `sprinkles` property should be assigned with `sprinkles` fn created using the `createSprinkles` fn from [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/).

## customElement

The `customElement` property lets you render your own element or component and assign the sprinkles generated class to it. You will receive an object with `element`, `classes` & `props` property which are the name of the element it was called for, the classes generated against the props passed to it and the props which are not properties from your design system respectively. This can be helpful when you are trying to consume a ui library which does not come with pre-configured styling solution or you want to build reusable & stylable components.

```ts
// components/index.tsx
import { createFactory } from 'sprinkled-react'
import { sprinkles } from '../styles/sprinkles.css'

export const s = createFactory({ sprinkles })

export const c = createFactory({
  sprinkles: sprinkles,
  customElement: ({ element, classes, props }) => {
    switch(element) {
      case 'Center'
        return <s.div 
                  width='100%' 
                  height='100%' 
                  display='flex' 
                  alignItems='center' 
                  justifyContent='center' 
                  className={classes}
                >
                  {props.children}
                </s.div>
       default:
        return null
    }
  }
})
```

Now use it like this.

```ts
// app.tsx
import { s, c } from './components'

function App() {
  return <c.Center>
    <s.h1 fontSize='lg' color='red-100'>Afzal Ansari</s.h1>
  </c.Center>
}
```

## reverseConditions

You will pass an object with required default condition assigned to `default` property and then other properties you want to configure. For eg.

If you have configured conditions like this in `defineProperties` of [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/).

```ts
// sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const props = defineProperties({
  // properties...
  // shorthands...
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    focus: { selector: '&:focus' }
  },
  defaultCondition: 'default'
})
```

You will be configuring it like this.
```ts
import { createFactory } from 'sprinkled-react'
import { sprinkles } from './sprinkles.css.ts'

export const s = createFactory({
  sprinkles,
  reverseConditions: {
    default: 'default'  // Required
    h: 'hover',
    f: 'focus'
  }
})
```

And then use it by passing the properties with single underscore prefix. For eg. `_h` & `_f`.

```ts
<s.button 
    borderColor='#000'
    color='#FFF' 
    backgroundColor='#000' 
    _h={{ color: '#000', backgroundColor: '#FFF' }} // hover
  > 
    Submit
</s.button>
```

**Note: If the corresponding token is an array then the value in reverse condition prop will be ignored. For eg.**

```ts
<s.button 
    width={['4rem', '6rem']}    // Assuming this `responsiveArray` is configured.
    color='#FFF' 
    backgroundColor='#000' 
    _h={{ color: '#000', backgroundColor: '#FFF', width: '6rem' }} // width here will be ignored.
  > 
    Submit
</s.button>
```

# Typescript

You might want to extend the props being accepted by the jsx.

```ts
import { createFactory } from 'sprinkled-react'
import { sprinkles } from '../sprinkles.css.ts'

// First pass the typeof your sprinkles fn as generic parameter and then the extra prop type you want mark as valid props.
export const s = createFactory<typeof sprinkles, { foo: string, bar: number }>({ sprinkles })
```

Here is an example with react router's [link](https://reactrouter.com/en/main/components/link) component which accepts `to` prop.

```ts
// components/index.tsx
import * as React from 'react'
import { createFactory } from 'sprinkled-react'
import { sprinkles } from '../styles/sprinkles.css'
import { Link } from 'react-router-dom'

type CustomElementProps = {
    element: string;
    classes: string,
    props: { to: string, children: React.ReactNode }
}

export const s = createFactory<typeof sprinkles, CustomElementProps['props']>({ 
    sprinkles,
    customElement: ({ element, classes, props }: CustomElementProps) => {
        switch(element) {
            case 'Link':
                return <Link to={props.to} className={classes}>{props.children}</Link>
                // <s.Link to='...' ...>...</s.Link> is now a stylable `Link` component.
            default:
                return null
        }
    }
})
```

# License

[MIT License](https://github.com/dev-afzalansari/sprinkled-react/blob/main/LICENSE)
