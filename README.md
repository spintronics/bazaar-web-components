# Emporium

A growing collection of commerce focused web-components to help you build a better shop.

## Goals

- storybook integration and testing
- accessibility
- internationalization
- customizable
- decoupled interface
- responds to observable state changes
- performant
- touch/swipe enabled
- dynamic skeleton loading
- animated entry / Intersection behaviors
- register with open-wc and npm

## Wishlist

- media matcher
- animation container
- parralax trigger
- product card
- badging
- combo search
- drawer
- grid layout
- action interface
- state mapper
- modal
- toast

## Journey

More important than the destination.

- get storybook working and transfer existing components
- polish homepage examples (slider promotion grid) and work on style extensibility / configuration
- build a minimal test environment to mock graphql based state
- build the product element with properties based on schema.org. state should 'serialize' to the JSON-LD compatible definition.
- as much as possible make the element be abstract with options and simple sensible defaults.
- keep it simple stupid
- ensure the mixers have a form that is simple enough to extend or custom-roll.
- build a simple github demo site

## Prerequisites

These custom elements should work in most modern web frameworks. Check out some of the [caveats](https://custom-elements-everywhere.com/) related to your building material of choice.

## Installation

```bash
yarn add @emporium/product
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
