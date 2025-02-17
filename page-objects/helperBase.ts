import { Page, request, APIRequestContext, expect } from "@playwright/test";
import { console } from "inspector";
import generator from 'generate-password';

export class HelperBase {

    readonly page: Page


    constructor(page: Page) {
        this.page = page
    }

    async generatorPassword() {
        const password = generator.generate({
            length: 12, // Password length
            numbers: true, // Include numbers
            symbols: true, // Include special characters
            uppercase: true, // Include uppercase letters
            lowercase: true, // Include lowercase letters
            strict: true // Ensures all character types are included
        });

        return password
    }






}



