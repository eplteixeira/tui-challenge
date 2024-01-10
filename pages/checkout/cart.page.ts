import { Page } from '@playwright/test';

export class CartPage {
  readonly buttonCheckout = this.page.getByTestId('checkout');
  readonly buttonRemove = this.page.locator('#cart_contents_container button.cart_button');

  async remoteProduct(index: number) {
    await this.buttonRemove.first().waitFor().catch(() => false);

    await this.buttonRemove.nth(index).click();
    await this.page.waitForLoadState();
  }


  constructor(private readonly page: Page) { }
}
