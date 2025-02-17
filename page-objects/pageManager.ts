import { expect, Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { CarsModelPage } from './carsModelPage'
import { CarModelPage } from './carModelPage'
import { Login } from './login'
import { Register } from './registerPage'
import { EditProfilePage } from './editProfilePage'


export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly login: Login
    private readonly carsModelPage: CarsModelPage
    private readonly carModelPage: CarModelPage
    private readonly register: Register
    private readonly EditProfilePage: EditProfilePage


    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.login = new Login(this.page)
        this.carsModelPage = new CarsModelPage(this.page)
        this.carModelPage = new CarModelPage(this.page)
        this.register = new Register(this.page)
        this.EditProfilePage = new EditProfilePage (this.page)

    }

    navigateTo() {
        return this.navigationPage
    }

    getLogin() {
        return this.login
    }

    getCarsModelPage() {
        return this.carsModelPage
    }

    getCarModelPage() {
        return this.carModelPage

    }

    getRegister() {
        return this.register
    }
    getEditProfilePage() {
        return this.EditProfilePage
    }


}