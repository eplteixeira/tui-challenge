import { Page } from '@playwright/test';

export class CheckoutPage {
  private readonly inputFirstName = this.page.getByTestId('firstName');
  private readonly inputLastName = this.page.getByTestId('lastName');
  private readonly inputPostalCode = this.page.getByTestId('postalCode');
  private readonly buttonContinue = this.page.getByTestId('continue');
  readonly buttonFinish = this.page.getByTestId('finish');
  readonly buttonBackHome = this.page.getByTestId('back-to-products');
  readonly labelComplete = this.page.locator('div h2');

  async fillUserInformationAndContinue(first: string, last: string, code: string) {
    await this.inputFirstName.waitFor().catch(() => false);

    await this.inputFirstName.fill(first);
    await this.inputLastName.fill(last);
    await this.inputPostalCode.fill(code);

    await this.buttonContinue.click();

    await this.buttonFinish.waitFor({ timeout: 2000 }).catch(() => false);
  }

  async clickBackHome() {
    await this.buttonBackHome.waitFor({ timeout: 2000 }).catch(() => false);
    await this.buttonBackHome.click();

    await this.page.waitForLoadState();
  }

  constructor(private readonly page: Page) { }
}
