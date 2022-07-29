export class Profiles {
    firstName: string;
    lastName: string;
    downloadUrl: string;
    isProfilePic: string;
    uid: string;
    bio: string;
    likes: number;
 
 
    constructor(photoObj) {
       this.downloadUrl = photoObj.downloadUrl;
        this.uid = photoObj.uid;
        this.isProfilePic = photoObj.isProfilePic;
         this.firstName = photoObj.firstName;
         this.lastName = photoObj.lastName;
         this.bio = photoObj.bio;
         this.likes = photoObj.likes;
     
    }
 }