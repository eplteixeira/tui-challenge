import { Page } from '@playwright/test';

export class HomePage {
  private readonly buttonMenu = this.page.locator('button#react-burger-menu-btn');
  private readonly menuPanel = this.page.locator('div.bm-menu-wrap');
  private readonly buttonCloseMenu = this.page.locator('button#react-burger-cross-btn');
  readonly buttonBasketCart = this.page.locator('#shopping_cart_container a');
  readonly buttonAllItems = this.page.locator('a#inventory_sidebar_link');
  readonly buttonAbout = this.page.locator('a#about_sidebar_link');
  readonly buttonLogout = this.page.locator('a#logout_sidebar_link');
  readonly buttonResetAppState = this.page.locator('a#reset_sidebar_link');

  /**
   * Go to home page (where products are all listed)
   */
  async goto() {
    await this.page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });

    await this.buttonMenu.waitFor({ state: 'attached', timeout: 2000 }).catch(() => false);
  }

  /**
   * Open the menu
   */
  async openMenu() {
    await this.buttonMenu.click();

    await this.menuPanel.waitFor({ state: 'visible' });
    await this.buttonCloseMenu.waitFor({ state: 'visible' });
  }

  /**
   * Close the menu
   */
  async closeMenu() {
    await this.buttonCloseMenu.click();

    await this.menuPanel.waitFor({ state: 'hidden' });
  }

  /**
   * Click in the "about" option in the menu
   */
  async about() {
    await this.openMenu();

    await this.buttonAbout.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click in the "logout" option in the menu
   */
  async logout() {
    await this.openMenu();

    await this.buttonLogout.click();
  }

  /**
   * Get the number of items in the cart.
   * 
   * @returns Number of items added in the cart
   */
  async cartNumProducts(): Promise<number> {
    await this.buttonBasketCart.waitFor({ state: 'attached' });

    const basketCounter = this.buttonBasketCart.locator('span');
    const hasBasketCounter = await basketCounter.count();
    if (hasBasketCounter == 1) {
      return Number(await basketCounter.textContent());
    }

    return 0;
  }

  /**
   * Click in the "All Items" option in the menu
   */
  async clickAllItems() {
    await this.openMenu();

    await this.buttonAllItems.click();
  }

  /**
   * Click in the "Reset App State" option in the menu
   */
  async clickReset() {
    await this.openMenu();

    await this.buttonResetAppState.click();
  }

  /**
   * Open the Basket Cart
   */
  async clickBasketCart() {
    await this.buttonBasketCart.click();

    await this.page.waitForLoadState();
  }

  constructor(private readonly page: Page) { }
}
