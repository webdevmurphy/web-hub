import { User } from "firebase/auth";

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  uid!: string;
  file: File;
  user: User;
  isProfile: boolean;
  type: string;

  constructor(file: File) {
    this.file = file;
  
  }
}
