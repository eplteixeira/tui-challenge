import { Page } from '@playwright/test';

export class CartPage {
  readonly buttonCheckout = this.page.getByTestId('checkout');
  readonly buttonRemove = this.page.locator('#cart_contents_container button.cart_button');

  /**
   * This method remove a product from the basket cart list
   * by indicating the position of the product to be removed from the list
   * 
   * @param index product position in the list to be removed (values 0 to n - 0 means first product)
   */
  async remoteProduct(index: number) {
    await this.buttonRemove.first().waitFor().catch(() => false);

    await this.buttonRemove.nth(index).click();
    await this.page.waitForLoadState();
  }

  constructor(private readonly page: Page) { }
}
