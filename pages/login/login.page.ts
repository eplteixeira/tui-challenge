import { Page } from '@playwright/test';
import { HomePage } from 'pages/homepage/home.page';


export class LoginPage {
  private readonly fieldUsername = this.page.getByTestId('username');
  private readonly fieldPassword = this.page.getByTestId('password');
  readonly buttonLogin = this.page.getByTestId('login-button');
  readonly error = this.page.getByTestId('error');

  /**
   * Go to login section
   */
  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });

    await this.buttonLogin.waitFor({ state: 'attached', timeout: 2000 }).catch(() => false);
  }

  /**
   * Login in the web application with specified user.
   * Wait for the login to be perform.
   *
   * @param username username to use in the login
   * @param password password to use in the login
   */
  async login(username: string, password: string) {
    await this.goto();

    if (username.length > 0) {
      await this.fieldUsername.fill(username);
    }
    if (password.length > 0) {
      await this.fieldPassword.fill(password);
    }

    await this.buttonLogin.click();
  }

  async logout() {
    const homePage = new HomePage(this.page);
    await homePage.logout();

    await this.buttonLogin.waitFor({ state: 'attached', timeout: 2000 }).catch(() => false);
  }

  constructor(private readonly page: Page) { }
}
