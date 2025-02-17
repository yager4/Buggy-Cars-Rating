import { expect, test, APIRequestContext } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { ApiManager } from '../page-objects/apiManager';
import { log } from 'console';
import { console } from 'inspector';
import generator from 'generate-password';
import cryptoRandomString from 'crypto-random-string';

test.describe('API test suite', () => {
    const userName = 'testuser212';
    const password = '123456aBc#';
    let accessToken: string;
    let apiRequest: APIRequestContext;
    let am: ApiManager;

    test.beforeAll(async ({ playwright }) => {
        apiRequest = await playwright.request.newContext();
        am = new ApiManager();
        await am.init();

        accessToken = await am.getAccessToken(userName, password);
    });


    test('Login API test', async () => {
        const response = await am.getCurrentUserResponseAPI(accessToken, userName);
        expect(response.status()).toEqual(200);
    });

    test('Car Models page API test', async () => {
        const response = await am.getCarsModelsAPI(accessToken);
        expect(response.status()).toEqual(200);
    });

    test('Car Model page API test', async () => {
        const modelId = 'ckl2phsabijs71623vtg%7Cckl2phsabijs7162402g';
        const response = await am.getModelByIdAPI(accessToken, modelId);
        expect(response.status()).toEqual(200);
    });


    test('Popular Model page API test', async () => {
        const response = await am.gatPopularModelAPI(accessToken);
        expect(response.status()).toEqual(200);
    });

    test('Popular Make page API test', async () => {
        const response = await am.getPopularMakeAPI(accessToken);
        expect(response.status()).toEqual(200);
    })

    test('Buggy Cars Rating main page API test', async () => {
        const response = await am.getBackToBuggyCarsRatingMainPage(accessToken);
        expect(response.status()).toEqual(200);
    })

    test('Create new user', async () => {
        let i = 1;
        let userName = 'shayTester' + Math.floor(100 + Math.random() * 900).toString()
        console.log("userName " + userName)
        for (let i = 1; i < 10; i++) {
            const response = await am.createUser('shayTester', 'Shay', 'Levi', '123456aBc@')
            const responseBody = await response.json();
            const message = responseBody.message || "No message returned";
            if (message == 'UsernameExistsException: User already exists') {
                userName = 'shayTester' + Math.floor(100 + Math.random() * 900).toString()
            } else if (response.status() == 201) {
                break
            } else {
                expect(response.status()).toEqual(201)
            }
        }

    })

    test('Edit profile', async () => {
        let response = await am.getCurrentUserResponseAPI(accessToken, userName);
        expect(response.status()).toEqual(200);

        const userProfile = {
            address: "Erzel street Ramat gan",
            age: "25",
            currentPassword: "123456aBc#",
            firstName: "Jhon",
            gender: "Male",
            hobby: "Bird-watching",
            lastName: "Smith",
            newPassword: "123456aBc#",
            newPasswordConfirmation: "123456aBc#",
            phone: "212",
            username: "testuser212"
        };
        response = await am.updateProfile(accessToken, userProfile);
        expect(response.status()).toEqual(200);
    })

});

let pm: PageManager

test.describe('UI test suite', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('https://buggy.justtestit.org/');

        pm = new PageManager(page);
    });

    test('Navigate to Alfa Romeo Guilia Page and write a comment', async ({ page }) => {

        let userName = 'testuser212';
        let password = '123456aBc#';

        await pm.getLogin().loginUser(userName, password);

        const navName = await page.locator('.nav-link.disabled').textContent();
        expect(navName).toEqual('Hi, Jhon');

        await pm.navigateTo().navigateToalfaRomeoGuiliaPage();
        await page.waitForTimeout(3000);
        const message = page.locator('p:has-text("Thank you for your vote!")');

        const isMessageVisible = await message.isVisible();

        if (!isMessageVisible) {
            const comment = page.locator('#comment');
            await expect(comment).toBeVisible({ timeout: 5000 });

            await comment.fill('Great car!!!');
            await expect(comment).toHaveValue('Great car!!!');

            await page.getByRole('button', { name: 'Vote!' }).click();
        }

        const rowLocator = page.locator('tr', { hasText: 'Great car!!!' });
        await expect(rowLocator).toBeVisible();
    });


    test('Register new user', async ({ page }) => {
        const userName = "tester" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const firstName = "aviv" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const lastName = "smith" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const password = "1234567aBc@"


        await pm.navigateTo().navigateToRegisterPage()

        await expect(page.locator('main')).toContainText('Register with Buggy Cars Rating')
        pm.getRegister().fillTheRegisterPage(userName, firstName, lastName, password)
        await page.waitForTimeout(3000)
        const successMessage = page.locator('.alert-success', { hasText: 'Registration is successful' });
        await expect(successMessage).toBeVisible();




    })
    test('attempt to Register exist user', async ({ page }) => {
        const userName = "tester" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const firstName = "aviv" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const lastName = "smith" + Math.floor(1000 + Math.random() * 9000).toString().toString()
        const password = "1234567aBc@"


        await pm.navigateTo().navigateToRegisterPage()
        await expect(page.locator('main')).toContainText('Register with Buggy Cars Rating')
        pm.getRegister().fillTheRegisterPage(userName, firstName, lastName, password)
        await expect(page.locator('.alert-success', { hasText: 'Registration is successful' })).toBeVisible();
        await page.reload();
        pm.getRegister().fillTheRegisterPage(userName, firstName, lastName, password)
        await expect(page.locator('.alert-danger', { hasText: 'User already exists' })).toBeVisible();
    })

    test('attempt to login with wrong password', async ({ page }) => {
        let userName = 'testuser212';
        let password = '123456Abc#';

        await pm.getLogin().loginUser(userName, password);
        await page.waitForTimeout(2000)
        await expect(page.locator('.label-warning', { hasText: 'Invalid username/password' })).toBeVisible();


    })

    test('logout', async ({ page }) => {
        const userName = 'testuser212';
        const password = '123456aBc#';

        await pm.getLogin().loginUser(userName, password);
        await page.waitForTimeout(2000)

        const logoutButton = page.getByRole('link', { name: 'Logout' });
        await expect(logoutButton).toBeVisible();
        await logoutButton.click();
        const loginInput = page.getByPlaceholder('login');
        await expect(loginInput).toBeVisible()
    })
    test('Edit profile', async ({ page }) => {
        const userName = 'testuser212';
        const password = '123456aBc!';
        await pm.getLogin().loginUser(userName, password);

        await pm.navigateTo().navigateToProfile()
        pm.getEditProfilePage().editProfile()
        await expect(page.locator('#age')).toHaveValue('30');

    })

    test('Edit profile to change password', async ({ page }) => {
        const userName = 'testuser212';
        const currentPassword = '123456aBc@';
        const newPassword = '123456aBc!';
        await pm.getLogin().loginUser(userName, currentPassword);

        await pm.navigateTo().navigateToProfile();

        await pm.getEditProfilePage().changePassword(currentPassword, newPassword);
        const successMessage = page.locator('.alert-success').first(); 
        await expect(successMessage).toBeVisible()

    })
});
