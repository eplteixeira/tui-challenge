# Setup
1. Install [Microsoft Visual Studio Code IDE](https://code.visualstudio.com).
1. (optional) NVM https://github.com/coreybutler/nvm-windows/releases
1. Install [Nodejs](https://nodejs.org/en/download/) on your system.
1. Install [Git](https://git-scm.com/download/) on your system.

# Installation
1. npm install
1. npm playwright install-deps

# Run Project
1. Run `npm run ui` - a GUI is display for you to navigate on the tests and run it for all browsers
1. Run `npm run test` - this way, will run the tests without a GUI interface
1. Run `npm run test:userjourney` - run user journey tests, i.e., typical end user flow

# The Test Scripts Design
The current project cover all important flows and features.
Below, we share the coverage by features:

**Login**
- Valid user
- Locked user
- Non-existance user
- Missing username
- Missing password
- Logout

**HomePage**
- Panel Menu
- About
- All Items

**Product**
- Open Product (back to product list)
- Open Product and add cart and remove cart

**List of Products**
- Apply Filter

**User Journey**
1. Add some products
2. Reset App
3. Add new products
4. Go to Basket Cart
5. Remove product from checkout list
6. Fill user information
7. Checkout
8. Back to products


## References:
- [Playwright Get started](https://playwright.dev/docs/intro)
