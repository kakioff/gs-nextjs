import getUserSession from "@/hooks/getUserSession";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export class Api {
    api_url: string = "http://127.0.0.1:8000"
    url_prefix: string = "/api"
    constructor() {
        this.api_url = process.env.API_BASE_URL || this.api_url

    }
    async request(url: string, method: AxiosRequestConfig["method"], config: AxiosRequestConfig = {}) {
        // const data = await auth();
        // console.log(data);
        // let session = await getSession();
        // let r =await axios.get("http://localhost:3000/api/auth/session")
        // console.log(r);
        let session = await getUserSession()
        // return {
        //     data: {}
        // }
        let headers: AxiosRequestConfig["headers"] = {
            "Content-Type": "application/json",
            "Device-Id": "web",
            ...config.headers
        }
        
        if (session?.sessionToken)
            headers["Authorization"] = `Bearer ${session?.sessionToken}`

        try{
            const response = await axios(new URL(this.url_prefix + url, this.api_url).href, {
                method,
                ...config,
                headers
            });
            return response;
        }catch(e) {
            throw e;
        }
        
    }
    async get(url: string, config?: AxiosRequestConfig) {
        return await this.request(url, "GET", config)
    }
    async post(url: string, body: any, config?: AxiosRequestConfig) {
        return await this.request(url, "POST", {
            ...config,
            data: JSON.stringify(body)
        })
    }
}