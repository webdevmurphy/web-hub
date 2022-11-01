export class profilePic {
  

    downloadUrl: string;
    uid: string;
    key!: string
 

    constructor(photoObj) {
        this.key = photoObj.key;
        this.uid = photoObj.uid;
        this.downloadUrl = photoObj.downloadUrl;
      
     
    }
}