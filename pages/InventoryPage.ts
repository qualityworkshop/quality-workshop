import type { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private readonly page: Page) {}
    async addBackpacktoCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
    async removeBackpackFromCart() {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }
    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}