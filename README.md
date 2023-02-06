# Sprinkled-React

A library to bind sprinkles with react.

This library helps you to bind your `sprinkles` function from [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) with react so you can consume it's properties within jsx as props fast & easily.

Example

```ts
import { s } from './components'

function Component() {
  return <s.h1 fontSize='lg' color='gray-100'>Sprinkled-React</s.h1>
}
```
Example on Stackblitz

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [APIs](#apis)
  - [createFactory](#createFactory)
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
// /styles/sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

const props = defineProperties({
  // ... your preferred properties, shorthands & conditions
})

// export the sprinkles fn
export const sprinkles = createSprinkles(props)
```
and then import the exported `sprinkles` fn from the file and the `createFactory` fn from the library and create an object with them.

```ts
// /components/index.ts
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

# APIs
## createFactory
> createFactory({ sprinkles: SprinklesFn, customElement?: ({ element: string, classes: string, props: NonCSSProps }) => JSX.Element | null | undefined })

You will use `createFactory` fn to create the object and use it's properties as jsx in your components. It takes an object as an argument. The required `sprinkles` property should be assigned with `sprinkles` fn created from the `createSprinkles` fn from [vanilla-extract/sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/). The `customElement` property lets you to render your own component and assign the sprinkles generated class to it.

```ts
// /components/index.ts
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
                className={classes}>{props.children}</s.div>
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
