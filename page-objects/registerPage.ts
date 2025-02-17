import { Page, request, APIRequestContext, expect } from "@playwright/test";
import { console } from "inspector";
import { HelperBase } from "./HelperBase";

export class Register extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async fillTheRegisterPage(username: string, firstName: string, lastName: string, password) {
        await this.page.locator('#username').fill(username);
        await this.page.locator('#firstName').fill(firstName);
        await this.page.locator('#lastName').fill(lastName);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#confirmPassword').fill(password);
        console.log(password);
        
        await this.page.locator(".btn.btn-default").click();




 
    }
}