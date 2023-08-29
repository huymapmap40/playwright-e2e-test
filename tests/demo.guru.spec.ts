import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://demo.guru99.com/');
});

const userCredential = {
    email: 'huyquocnguyen532@gmail.com'
}

test.describe('Test login web demo guru', () => {
    test('user should login web successfully', async ({page}) => {
        await page.locator('input[name=emailid]').fill(userCredential.email)
        await page.locator('input[name=btnLogin]').click();
        let textAccessedPage = await page.locator('table h2').textContent();

        // Verify accessed get credential page
        expect(textAccessedPage).toBe('Access details to demo site.');

        const userId = (await page.locator("(//td[@class='accpage']/following-sibling::td)[1]").textContent() as string).trim();
        const password = (await page.locator("(//td[@class='accpage']/following-sibling::td)[2]").textContent() as string).trim();
        const LOGIN_URL = 'https://demo.guru99.com/V1/index.php';
        await page.goto(LOGIN_URL);
        await page.waitForURL(LOGIN_URL);

        await page.locator('[name=uid]').type(userId);
        await page.locator('[name=password]').type(password);
        await page.locator('input[name=btnLogin]').click();

        // Verify Home guru bank page displayed
        expect(await page.locator('.heading3').textContent()).toBe("Welcome To Manager's Page of GTPL Bank");
    });
});
