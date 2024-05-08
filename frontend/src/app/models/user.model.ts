export class User{
    
 
    constructor(
        public username:string|null|undefined,
        public accessToken:string|null|undefined,
        public refreshToken:string|null|undefined,
        public password:string|null|undefined,
        public refreshTokenExpiration: Date|null|undefined,
        public accessTokenExpiration: Date|null|undefined,

     
    ){}
    
     
}