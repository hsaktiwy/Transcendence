export const BACKEND:string = "http://10.13.2.16:8000/"
export const LOGIN_PATH:string = 'login/'
export const SESSION_CHECKPATH:string = 'api/session/'
export const INIT_CSRFTOKEN_PATH:string = "csrftoken/"
export const ADD_USER:string = "api/user/create/"
export const CONVERSATION:string = "chat/conversations/" 
export const MULTIFORMDATA_BOUNDARY_HASH:number =  20 // this will be the random string size (for more info search for Multi Format Data related to POST methode), that will be added to our boundary
export const ws_scheame = 'ws'
export const ws_host = '10.13.2.16'
export const ws_port = '8000'
export const ws_url = ws_scheame + '://' + ws_host + ':' + ws_port;
export let user_id:number;