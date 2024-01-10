import { Page } from '@playwright/test';
import { Product } from 'interfaces/product.interface';

export class ProductPage {
  private readonly productName = this.page.locator('div.inventory_details_name.large_size');
  private readonly productDescription = this.page.locator('div.inventory_details_desc.large_size');
  private readonly productPrice = this.page.locator('div.inventory_details_price');
  private readonly buttonBackToProducts = this.page.getByTestId('back-to-products');
  private readonly buttonAddToCart = this.page.locator('//button[contains(@data-test, "add-to-cart")]');
  private readonly buttonRemove = this.page.locator('//button[contains(@data-test, "remove")]');

  /**
   * This method lookup for product info in the product page
   * 
   * @returns An object with product details
   */
  async getProductInfo(): Promise<Product> {
    // Wait for elements
    await this.productName.waitFor({ state: 'attached' }).catch(() => false);
    await this.productDescription.waitFor({ state: 'attached' }).catch(() => false);
    await this.productPrice.waitFor({ state: 'attached' }).catch(() => false);

    const name = await this.productName.textContent();
    const description = await this.productDescription.textContent();
    const price = await this.productPrice.textContent();

    return {
      name: name,
      description: description,
      price: price
    }
  }

  /**
   * Perform the return to page
   */
  async clickBackToProducts() {
    await this.buttonBackToProducts.click();

    await this.page.waitForLoadState();
  }


  /**
   * Add product to the cart
   */
  async addToCart() {
    await this.buttonAddToCart.click();

    await this.buttonRemove.waitFor({ state: 'attached' }).catch(() => false);
  }

  /**
   * Add product to the cart
   */
  async removeFromCart() {
    await this.buttonRemove.click();

    await this.buttonAddToCart.waitFor({ state: 'attached' }).catch(() => false);
  }

  constructor(private readonly page: Page) { }
}
