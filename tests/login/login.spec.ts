import { test, expect } from '@playwright/test';
import { ResultsPage } from 'pages/products/results.page';
import { LoginPage } from 'pages/login/login.page';
import { Users } from 'tests/test-data/loging.data';
import { ErrorMessage } from 'tests/test-data/loging.error.data';

test.describe('Login', () => {

    /**
     * Login with regular user and make sure user is logged
     */
    test('Regular user', async ({ page }) => {
        const login = new LoginPage(page);
        const results = new ResultsPage(page);

        await login.login(Users.standardUser.username, Users.standardUser.password);

        await expect(results.filter).toBeAttached();
    });

    /**
     * Login with locked user and make sure the error message is accurated
     */
    test('Locked user', async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.lockedUser.username, Users.lockedUser.password);

        await expect(login.error).toBeVisible();
        await expect(login.error).toHaveText(ErrorMessage.locked);
    });

    /**
     * Login with non-existing user and make sure the error message is accurated
     */
    test('Non-Existing user', async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.nonExistingUser.username, Users.nonExistingUser.password);

        await expect(login.error).toBeVisible();
        await expect(login.error).toHaveText(ErrorMessage.noUser);
    });

    /**
     * Login without fill username and make sure the error message is accurated
     */
    test('Missing username', async ({ page }) => {
        const login = new LoginPage(page);

        await login.login('', Users.standardUser.password);

        await expect(login.error).toBeVisible();
        await expect(login.error).toHaveText(ErrorMessage.missingUsername);
    });

    /**
     * Login without fill password and make sure the error message is accurated
     */
    test('Missing password', async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.standardUser.username, '');

        await expect(login.error).toBeVisible();
        await expect(login.error).toHaveText(ErrorMessage.missingPassword);
    });

    /**
     * Login with regular user and then logout
     */
    test('Logout', async ({ page }) => {
        const login = new LoginPage(page);
        const results = new ResultsPage(page);

        // Login
        await login.login(Users.standardUser.username, Users.standardUser.password);
        // validate we logged
        await expect(results.filter).toBeAttached();

        // Logout
        await login.logout();
        // validate we are in login page
        await expect(login.buttonLogin).toBeVisible();
    });
});
