import { test, expect } from '@playwright/test';
import { LoginPage } from 'pages/login/login.page';
import { ResultsPage } from 'pages/products/results.page';
import { filterOptions } from 'tests/test-data/filter.data';
import { Users } from 'tests/test-data/loging.data';

test.describe('Results', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        await login.login(Users.standardUser.username, Users.standardUser.password);
    });

    /**
     * Apply filter Z to A and check products are correct filtered
     */
    test('Filter by Z to A', async ({ page }) => {
        const results = new ResultsPage(page);

        // Go to list of products
        await results.goto();

        // Validate A to Z is present
        await expect(results.filterSelected).toHaveText(filterOptions.az);

        // Apply Z to A
        await results.selectFilter(filterOptions.za);

        // Validate all products are well order
        await expect(results.filterSelected).toHaveText(filterOptions.za);

        const listOfProductsza = await results.getAllProductNames();
        const cloneListOfProductsza = [...listOfProductsza];

        // Sort to Z_A
        cloneListOfProductsza.sort((x, y) => x > y ? -1 : x < y ? 1 : 0);
        expect(listOfProductsza).toEqual(cloneListOfProductsza);
    });

    /**
     * Apply filter low to high and check products are correct filtered
     */
    test('Filter by low to high', async ({ page }) => {
        const results = new ResultsPage(page);

        // Go to list of products
        await results.goto();

        // Validate A to Z is present
        await expect(results.filterSelected).toHaveText(filterOptions.az);

        // Apply low to high
        await results.selectFilter(filterOptions.lohi);

        // Validate all products are well order
        await expect(results.filterSelected).toHaveText(filterOptions.lohi);

        const listOfProductsLowHigh = await results.getAllProductPrices();
        const cloneListOfProductsLowHigh = [...listOfProductsLowHigh];

        // Sort to low to high
        cloneListOfProductsLowHigh.sort((x, y) => (Number(x) - Number(y)) ? -1 : 1);
        expect(listOfProductsLowHigh).toEqual(cloneListOfProductsLowHigh);
    });
});
