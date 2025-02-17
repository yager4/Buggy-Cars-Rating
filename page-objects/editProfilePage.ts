import { Page, request, APIRequestContext, expect } from "@playwright/test";
import { console } from "inspector";
import { HelperBase } from "./HelperBase";

export class EditProfilePage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async editProfile() {
        const profileLink = this.page.getByRole('link', { name: 'Profile' });
        await profileLink.click();
        const ageInput = this.page.locator('#age');
        await expect(ageInput).toBeVisible();
        await ageInput.fill('30');

    }

    async changePassword(currentPassword: string, newPassword: string) {

        await this.page.locator('#currentPassword').fill(currentPassword);
        await this.page.locator('#newPassword').fill(newPassword);
        await this.page.locator('#newPasswordConfirmation').fill(newPassword);
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Save' }).click();



    }
}