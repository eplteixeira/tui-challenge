import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/homepage/home.page';
import { LoginPage } from 'pages/login/login.page';
import { ResultsPage } from 'pages/products/results.page';
import { Users } from 'tests/test-data/loging.data';

test.describe('Homepage', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.standardUser.username, Users.standardUser.password);
    });

    /**
     * Open the Menu and validate entries and close it
     */
    test('Menu Panel', async ({ page }) => {
        const homepage = new HomePage(page);

        await homepage.openMenu();

        await expect(homepage.buttonAllItems).toBeAttached();
        await expect(homepage.buttonAbout).toBeAttached();
        await expect(homepage.buttonLogout).toBeAttached();
        await expect(homepage.buttonResetAppState).toBeAttached();

        await homepage.closeMenu();

        await expect(homepage.buttonAllItems).toBeHidden();
    });

    /**
     * Open a product and validate All Items display the list of products
     */
    test('All Items', async ({ page }) => {
        const homepage = new HomePage(page);
        const results = new ResultsPage(page);

        // Making sure we are in the list of products
        await expect(results.filter).toBeAttached();

        // We went to a product
        await results.openProductFirst(false);

        // Making sure we aren't in the list of products
        await expect(results.filter).toBeHidden();

        // Click in All Items
        await homepage.clickAllItems();

        // Making sure we are in the list of products
        await expect(results.filter).toBeAttached();
    });

    /**
     * Access to About page and check the url
     */
    test('About', async ({ page }) => {
        const homepage = new HomePage(page);

        await homepage.about();

        expect(page.url()).toEqual('https://saucelabs.com/');
    });

});
