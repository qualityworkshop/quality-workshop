import type { Page } from '@playwright/test';
export class CheckoutPage {
    constructor(private readonly page: Page) {}
async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

async continueCheckout() {
        await this.page.locator('[data-test="continue"]').click();
    }

async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
    }

    async fillCustomerInformationWithoutFirstName(lastName: string, postalCode: string) {
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }
}