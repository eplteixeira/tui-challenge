import { Page } from '@playwright/test';
import { Product } from 'interfaces/product.interface';
import { filterOptions } from 'tests/test-data/filter.data';

export class ResultsPage {
  private readonly buttonAddToCart = this.page.locator('//button[contains(@data-test,"add-to-cart")]');
  readonly productItem = this.page.locator('div#inventory_container > div > div.inventory_item');
  readonly filter = this.page.getByTestId('product_sort_container');
  readonly filterSelected = this.page.locator('span.active_option');
  readonly productName = this.page.locator('#inventory_container div.inventory_item_name');
  readonly productPrice = this.page.locator('#inventory_container div.inventory_item_price');

  async goto() {
    await this.page.goto('/inventory.html');

    await this.filter.waitFor({ state: 'attached' });
  }

  async openProductFirst(returnProductData = true): Promise<Product> {
    return await this.openProduct(0, returnProductData);
  }

  async openProduct(index: number, returnProductData = true): Promise<Product> {
    const elemProduct = this.productItem.nth(index);

    await elemProduct.waitFor({ state: 'attached' }).catch(() => false);

    let product: Product = null;

    if (returnProductData) {
      const count = await elemProduct.count();

      if (count == 1) {
        const name = await elemProduct.locator('div.inventory_item_name').textContent();
        const description = await elemProduct.locator('div.inventory_item_desc').textContent();
        const price = await elemProduct.locator('div.inventory_item_price').textContent();

        product = {
          name: name,
          description: description,
          price: price
        };
      }
    }

    // click in first hyperlink
    await elemProduct.locator('a').first().click();

    return product;
  }

  async selectFilter(option: filterOptions) {
    await this.filter.selectOption({ label: option });

    await this.page.waitForLoadState();

    const activeFilter = this.filterSelected.getByText(option, { exact: true });
    await activeFilter.waitFor();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productName.allTextContents();
  }

  async getAllProductPrices(): Promise<string[]> {
    return await this.productPrice.allTextContents();
  }

  async clickAddToCart(index: number) {
    const productElement = this.productItem.nth(index)
    await productElement.locator('//button[contains(@data-test,"add-to-cart")]').click();

    await productElement.locator('//button[contains(@data-test,"remove")]').waitFor();
  }

  constructor(private readonly page: Page) { }
}
