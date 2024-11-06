import { LoginFormType, RegisterFormType, UpdateProfileFormType } from "@/types/auth";
import { Api } from ".";

const api = new Api();
export const userApi = {
    getAvatar() {
        // let api = new Api().api_url
        // if (!session?.user) return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        // return `${api}/api/avatar/${session.user.avatar}`
    },
    async updateAvatar(file: File) {
        const form = new FormData();
        form.append("avatar", file);
        const res = await api.post("/file/avatar", {}, {
            data: form,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    /**
     * @description 登录
     * @param {string} username
     * @param {string} password
     * @returns
     * */
    async login(values: LoginFormType) {
        const res = await api.post("/user/login", {
            name: values.email,
            passwd: values.password,
            desc: "登录"
        });

        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;

    },
    async OAuthLogin(provider: string, token?: string) {

        const res = await api.get(`/user/auth/login-with-${provider}`, {
            params: {
                token
            }
        });

        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async link2provider(provider: string, token: string) {
        const res = await api.get(`/user/auth/link-${provider}`, {
            params: {
                token
            }
        })
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async register(form: RegisterFormType) {
        const res = await api.post("/user/create", {
            name: form.username,
            passwd: form.password,
            email: form.email,
            phone: form.phone,
        })
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    /**
     * @description 获取用户信息
     * @returns
     */
    async getUserInfo() {
        const res = await api.get("/user/info")
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async updateProfile(form: UpdateProfileFormType) {
        const res = await api.post("/user/update", {
            uname: form.name,
            email: form.email,
            phone: form.phone,
            // passwd: form.passwd
        })
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    },
    async resetPassword(form: {
        old_passwd?: string,
        passwd?: string
    }){
        const res = await api.post("/user/update", form)
        const resData: ApiResponse<UserInfo> = await res.data;
        return resData.data;
    }
    /**
     * @description 获取用户权限
     * @returns
     */
    // getUserPermissions() {
    //     return Api.get("/user/permissions");
    // },
}