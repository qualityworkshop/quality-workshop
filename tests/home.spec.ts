import {test, expect } from '@playwright/test';

test(
    'SauceDemo user can log in successfully', async ({ page}) => {await page.goto('/');

        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        
    }
);

test(
    'SauceDemo rejects invalid login', async ({ page}) => {await page.goto('/');
        await page.locator('[data-test="username"]').fill('invalid_user');
        await page.locator('[data-test="password"]').fill('invalid_password');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service', 
            { exact: true })).toBeVisible();
    }
);