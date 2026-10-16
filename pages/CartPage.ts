import type {Page } from '@playwright/test';
export class CartPage {
    constructor(private readonly page: Page) {}

    async startCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }
}