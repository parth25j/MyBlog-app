import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
      client = new Client();
      account;

      constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)// Your API Endpoint
        .setProject(conf.appwriteProjectId);  
        this.account = new Account(this.client);
      }

      async createAccount({email,password,name}){
        try{
               const userAccount =  await this.account.create(ID.unique(),email,password)
               if(userAccount){
                return this.login({email,password})
               }else{
                return userAccount;
               }
        }catch(e){
            throw e
        }
      }
      async login({email,password}){
        try{
       return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error
        }
      }
      async getCurrentUser(){
        try{
   return await this.account.get();
        }catch(error){
            throw error
        }
        return null;
      }

      async logOut(){
        try {
           await this.account.deleteSessions() 
        } catch (error) {
            throw error
        }
      }
}

const authService = new AuthService();

export default authService;
