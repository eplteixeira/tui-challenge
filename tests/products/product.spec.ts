import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/homepage/home.page';
import { LoginPage } from 'pages/login/login.page';
import { ProductPage } from 'pages/products/product.page';
import { ResultsPage } from 'pages/products/results.page';
import { Users } from 'tests/test-data/loging.data';

test.describe('Product', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.standardUser.username, Users.standardUser.password);
    });

    /**
     * Open a product and back to the list of products
     */
    test('Open product details & Back to products list', async ({ page }) => {
        const results = new ResultsPage(page);
        const product = new ProductPage(page);

        // Open product
        const productInfoResults = await results.openProductFirst();

        // Make sure the information is visible
        expect(productInfoResults.name).not.toBeFalsy();
        expect(productInfoResults.description).not.toBeFalsy();
        expect(productInfoResults.price).not.toBeFalsy();

        // Get product details
        const productInfoDetails = await product.getProductInfo();

        // Validate info in results and product details is accrurated
        expect(productInfoResults).toEqual(productInfoDetails);

        // Go back to products
        await product.clickBackToProducts();

        // Check we are in the product list
        await expect(results.productItem.first()).toBeAttached();
    });

    /**
     * Open a product, add to cart and remove it
     */
    test('Open product details and add and remove from cart', async ({ page }) => {
        const results = new ResultsPage(page);
        const product = new ProductPage(page);
        const homepage = new HomePage(page);

        // Open product
        await results.openProductFirst(false);

        // Add product to cart
        await product.addToCart();

        // Check if the cart is updated to one
        expect(await homepage.cartNumProducts()).toBe(1);

        // Add product to cart
        await product.removeFromCart();

        // Check if the cart is updated to one
        expect(await homepage.cartNumProducts()).toBe(0);
    });
});
