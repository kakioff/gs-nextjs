import { LoginFormType, RegisterFormType } from "@/types/auth";
import { Api } from ".";
import getUserSession from "@/hooks/getUserSession";

const api = new Api();
export const userApi = {
    getAvatar() {
        let api = new Api().api_url
        // if (!session?.user) return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        // return `${api}/api/avatar/${session.user.avatar}`
    },
    /**
     * @description 登录
     * @param {string} username
     * @param {string} password
     * @returns
     * */
    async login(values: LoginFormType) {
        let res = await api.post("/user/login", {
            name: values.email,
            passwd: values.password,
            desc: "登录"
        });

        let resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;

    },
    async OAuthLogin(provider: string, token?: string) {

        let res = await api.get(`/user/auth/login-with-${provider}`, {
            params: {
                token
            }
        });

        let resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async link2provider(provider: string, token: string) {
        let res = await api.get(`/user/auth/link-${provider}`, {
            params: {
                token
            }
        })
        let resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async register(form: RegisterFormType) {
        let res = await api.post("/user/create", {
            name: form.username,
            passwd: form.password,
            email: form.email,
            phone: form.phone,
        })
        let resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    /**
     * @description 获取用户信息
     * @returns
     */
    async getUserInfo() {
        let res = await api.get("/user/info")
        let resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    /**
     * @description 获取用户权限
     * @returns
     */
    // getUserPermissions() {
    //     return Api.get("/user/permissions");
    // },
}