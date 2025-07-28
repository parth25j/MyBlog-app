import conf from "../conf/confg";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service{
   client = new Client();
   databases;
   bucket;
   constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)// Your API Endpoint
        .setProject(conf.appwriteProjectId);  
    this.databases - new Databases(this.client);    
    this.bucket = new Storage(this.client)
   }
}

const servie = new Service();

export default servie
