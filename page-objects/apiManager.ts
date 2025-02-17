import { APIRequestContext, expect, request } from '@playwright/test';

export class ApiManager {

    private apiRequest: APIRequestContext;

    constructor() { }

    async init() {
        this.apiRequest = await request.newContext();
    }
    async getCurrentUserResponseAPI(accessToken: string, name: string): Promise<any> {


        const response = await this.apiRequest.get(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/current',
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,

                }
            }
        );

        return response;
    }



    async getCarsModelsAPI(accessToken: string, page: number = 1): Promise<any> {


        const response = await this.apiRequest.get(
            `https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models?page=${page}`,
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,

                }
            }
        );

        return response;
    }

    async getModelByIdAPI(accessToken: string, modelId: string): Promise<any> {


        const response = await this.apiRequest.get(
            `https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/${modelId}`,
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,

                }
            }
        );


        return response;
    }

    async gatPopularModelAPI(accessToken: string) {

        const response = await this.apiRequest.get(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg',
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,
                },
            }
        )
        return response;
    }

    async getPopularMakeAPI(accessToken: string) {

        const response = await this.apiRequest.get(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/ckl2phsabijs71623vk0?modelsPage=1',
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,
                },
            }
        )
        return response;
    }

    async getBackToBuggyCarsRatingMainPage(accessToken: string) {

        const response = await this.apiRequest.get(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard',
            {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`,
                },
            }
        )
        return response;
    }

    async createUser(username: string, firstName: string, lastName: string, password: string): Promise<any> {

        const requestBody = {
            username,
            firstName,
            lastName,
            password
        };

        const response = await this.apiRequest.post(
            `https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users`,
            {
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'


                },
                data: requestBody
            }
        );


        return response;
    }

    async updateProfile(accessToken: string, profileData: Record<string, any>) {
        const apiRequest: APIRequestContext = await request.newContext();

        const response = await apiRequest.put(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile',
            {
                headers: {
                    'accept': '"application/json"',
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                data: profileData 
            }
        );
        const responseBody = await response.json(); 
        console.log("@@@" + responseBody.message);



        console.log("Profile Update Response:", responseBody);


        return response;
    }




    async getAccessToken(username: string, password: string): Promise<string> {

        const response = await this.apiRequest.post(
            'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token',
            {
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    'grant_type': 'password',
                    'username': username,
                    'password': password
                }
            }
        );

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        return responseBody.access_token;
    }

    async cleanup() {
        if (this.apiRequest) {
            await this.apiRequest.dispose();
            console.log("APIRequestContext disposed.");
        }
    }

}
