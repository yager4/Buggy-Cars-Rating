import { Page, request, APIRequestContext, expect } from "@playwright/test";
import { console } from "inspector";
import { HelperBase } from "./HelperBase";

export class Login extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async loginUser(name: string, password: string) {
        const loginInput = this.page.getByPlaceholder('login');
        const passwordInput = this.page.locator('[name="password"]');

        await loginInput.click();
        await loginInput.fill(name);
        await passwordInput.fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();


    }



  
}
