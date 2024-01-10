import { test, expect } from '@playwright/test';
import { CartPage } from 'pages/checkout/cart.page';
import { CheckoutPage } from 'pages/checkout/checkout.page';
import { HomePage } from 'pages/homepage/home.page';
import { LoginPage } from 'pages/login/login.page';
import { ResultsPage } from 'pages/products/results.page';
import { Users } from 'tests/test-data/loging.data';
import { People } from 'tests/test-data/user.data';

test.describe('Checkout', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        const homepage = new HomePage(page);

        await login.login(Users.standardUser.username, Users.standardUser.password);
        await homepage.clickReset();
        await homepage.goto();
    });

    /**
     * This test pretends:
     *   1. Add some products
     *   2. Reset App
     *   3. Add new products
     *   4. Go to Basket Cart
     *   5. Remove product from checkout list
     *   6. Fill user information
     *   7. Checkout
     *   8. Back to products
     */
    test('Add products, remove and checkout @userjourney', async ({ page }) => {
        const results = new ResultsPage(page);
        const homepage = new HomePage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Step 1 - Add some products (2 prods)
        await results.clickAddToCart(1);
        await results.clickAddToCart(3);
        // Check if the cart is updated to one
        expect(await homepage.cartNumProducts()).toBe(2);


        // Step 2 - Reset APP
        await homepage.clickReset();
        // Check if the cart is updated to one
        await results.goto();
        expect(await homepage.cartNumProducts()).toBe(0);


        // Step 3 - Add some products (3 prods)
        await results.clickAddToCart(0);
        await results.clickAddToCart(2);
        await results.clickAddToCart(3);
        // Check if the cart is updated to one
        expect(await homepage.cartNumProducts()).toBe(3);


        // Step 4. Go to Basket Cart
        await homepage.clickBasketCart();
        await expect(cart.buttonCheckout).toBeVisible();


        // Step 5. Remove product from checkout list
        await cart.remoteProduct(1);
        // Check if the cart is updated to one
        expect(await homepage.cartNumProducts()).toBe(2);


        // Step 6. Fill user information
        await cart.buttonCheckout.click();
        const person = People.regularUser;
        await checkout.fillUserInformationAndContinue(person.firstname,
            person.lastname,
            person.postalcode);
        await expect(checkout.buttonFinish).toBeVisible();


        // Step 7. Checkout Overview
        await checkout.buttonFinish.click();
        await expect(checkout.labelComplete).toHaveText('Thank you for your order!');
        await expect(checkout.buttonBackHome).toBeVisible();


        // Step 8. After complete purschase users is back to list of products
        await checkout.clickBackHome();
        await expect(results.filter).toBeVisible();
    });
});
