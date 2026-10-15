import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import {CheckoutPage} from '../pages/CheckoutPage';

test(
    'SauceDemo user can log in successfully', async ({ page}) => {await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        
    }
);

test(
    'SauceDemo rejects invalid login', async ({ page}) => {await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login ('invalid_user','invalid_password');
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service', 
            { exact: true })).toBeVisible();
    }
);

test(
    'SauceDemo user can add a product to the cart', async ({page }) => {await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpacktoCart();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_list')).toBeVisible
        await expect (page.locator('.cart_item')).toHaveCount(1);
        await expect(page.locator('.cart_item [data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    }
);

test(
    'SauceDemo user can remove a product from the cart', async ({page }) => {await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user','secret_sauce');
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpacktoCart();
        await inventoryPage.removeBackpackFromCart();
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_item')).toHaveCount(0);
    }
);

test(
    'SauceDemo user can complete checkout', async ({page }) => {await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpacktoCart();
        await inventoryPage.openCart();
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCustomerInformation('Max', 'Mustermann', '12345');
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.locator('.cart_item [data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
}
);

test(
    'SauceDemo requires first name during checkout', async ({page }) => {await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('[data-test="lastName"]').fill('Mustermann');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();
        await expect(page.getByText('Error: First Name is required', { exact: true })).toBeVisible();
    }
);