export class Photo {
    downloadUrl: string;
    alt: string;
    path: string;
    isProfilePic: string;
    src: string;
    thumb: string;
    user?: object;
 

    constructor(photoObj) {
        this.user = photoObj.user;
        this.path = photoObj.path;
        this.thumb = photoObj.thumb;
        this.src = photoObj.src;
        this.isProfilePic = photoObj.isProfilePic;
        this.downloadUrl = photoObj.downloadUrl;
        this.alt = photoObj.alt;
    }
}