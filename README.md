# ChainWatcher

Hi! I have created this project which is available publicly via [this link](https://chainwatcher-gilt.vercel.app/).
It uses the following technologies to combine the requested features:

- NextJS 13.2 as **React** Meta-framework (We're using the brand new app directory)
- **Prisma** (& **Planetscale**) as database for storing views for hashes (useful for tops)
- **Vercel** as hosting solution, it was chosen due to simplicity of deploying and having CDN and SSR solution out of the box.
- Storybook 7 (RC) is used to view & document shared components in the sites. Some JEST tests are made for visual testing via Storybook interactions.
- Cypress 12 is used for E2E tests.
- Tailwind / Shadcn / RadixUI were used for styling of the components.
- Zod ❤️, a small library that converts `unknown` to fully typed definitions. When receiving input from users, zod is a must.
- Prettier / Eslint to ensure consistent code style across the whole project. This is even more useful with more contributors.

# Project Requirements

Projects requirements were given via a PDF file, I extracted them into below checkboxes:

## Features

- [x] Use ReactJS
- [x] retrieves address and transaction information from the BTC
      blockchain.
- [x] It also allows a user to subscribe for changes to specific
      hashes.
- [x] Each subscribed hash should generate a notification on the UI.
- [x] Furthermore, the user should be able to select in which currency
      the values should be displayed (USD, EUR or BTC).

## Deliverables

- [x] Solution code
- [x] Tests
- [x] Documentation to set up / run / test the project
- [x] Upload to GitHub

## Questions

- [x] Logic and code complexity - How easy will my code be for it to be
      maintained by someone else? Am I using good practices and proper
      design patterns?
- [x] Test coverage - Is my code tested? Are all scenarios considered?
- [x] Requirement coverage - Is the application doing what it is meant
      to be doing?

## Issues

While working on the project, some small parts of the requirements were a bit unclear to me, probably because I don't have much experience working with ₿itcoins.

- I had trouble understanding what “Total BTC unspent” means in the context of an address. I am currently returning the balance as part of the value.
- Ideally websockets are used for notifications oAdding notifications for hash changes can become very expensive in terms of API consumptions

## Possible Improvements

The project was very interesting, and even though I have worked in a Web3 project at @**BetssonGroup** (mainly covering ETH), I haven't focused that much on details such as confirmations.

I felt like working on all below improvements, however that would go beyong the 10h limit 😭

- When tracking page views we are trusting user input (hash).
  Ideally this is sanitised before this is included in database.
- Since app supports up to 5 subscriptions, the rest of subscriptions in database can be cleared via cron jobs, this was  
  not done due to limited scope.
- More Unit tests (especially for all utils).
- Individual components are mostly made for specific container sizes. Usage of container queries would allow them to be used in  
  multiple websites.
- No use of Design System, so some components are themed under various colours made specifically for this website. These  
  components might not look as good on different sites.
- Pages are not tested via storybook due to storybook limitation of retrieving async components
