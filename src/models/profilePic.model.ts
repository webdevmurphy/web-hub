export class profilePic {
  

    downloadUrl: string;
    uid: string
 

    constructor(photoObj) {
       
        this.uid = photoObj.uid;
        this.downloadUrl = photoObj.downloadUrl;
      
     
    }
}