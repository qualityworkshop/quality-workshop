import {test, expect, Page } from '@playwright/test';
async function login(page: Page, username:string, password:string) {
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();
}
test(
    'SauceDemo user can log in successfully', async ({ page}) => {await page.goto('/');

        await login(page, 'standard_user', 'secret_sauce');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        
    }
);

test(
    'SauceDemo rejects invalid login', async ({ page}) => {await page.goto('/');
        await login(page, 'invalid_user', 'invalid_password');
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service', 
            { exact: true })).toBeVisible();
    }
);