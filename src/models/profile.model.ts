export class Profile {
 constructor(
    public firstName: string = null,
    public lastName: string = null,
    public profilePic: string = null,
    public  uid: string = null,
    public downloadUrl: string = null,
    public bio: string = null,
    public likes: number = 0,
 ){}
}