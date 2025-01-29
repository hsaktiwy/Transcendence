export interface UserDataInterface {
    unique_id:string;
    login:string;
    email:string;
    firstName:string;
    lastName:string;
    state:string;
    last_visit:string | null;
    profile_pic:string;
    two_factor_auth: boolean;
    CoverProfile: string;
}
export interface ProfileDataInterface {
    unique_id:string;
    login:string;
    email:string;
    firstName:string;
    lastName:string;
    state:string;
    last_visit:string | null;
    profile_pic:string;
    CoverProfile: string;
}


