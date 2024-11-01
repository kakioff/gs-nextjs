interface UserRole {
    id: number;
    label: string;
    name: string;
}

interface GithubInfo{
    id?: int
    name?: string
    email?: string
}

interface ClickUpInfo extends GithubInfo{
}

interface UserInfo {
    email: string;
    has_password: boolean;
    id: string;
    name: string;
    phone: string;
    role: UserRole;
    token: string;
    avatar?: string;
    github: GithubInfo
    "click-up": ClickUpInfo
}

interface LoginReqBody {
    desc: string;
    name: string;
    passwd: string;
}
