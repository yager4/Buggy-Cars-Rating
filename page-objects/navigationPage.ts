import { expect, test, Page } from '@playwright/test'



export class NavigationPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigateToalfaRomeoGuiliaPage() {
        await this.page.locator('[href="/overall"]').click();
        await this.page.locator('img[title="Alfa Romeo Guilia Quadrifoglio"]').locator('..').click();
    }

    async navigateToRegisterPage() {
        const registerButton = await this.page.getByRole('link', { name: 'Register' });
        await registerButton.click()
    }
    async navigateToProfile() {
        await this.page.waitForSelector('a.nav-link[href="/profile"]', { state: 'visible' });
        await expect(this.page.getByRole('link', { name: 'Profile' })).toBeVisible();

        await this.page.waitForTimeout(1000);

        const profileLink = this.page.getByRole('link', { name: 'Profile' });
        await profileLink.click();
    }


}