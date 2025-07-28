import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;
  
    constructor() {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
  
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
    }
  
    async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
        return await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          ID.unique(),
          {
            title,
            slug,
            content,
            featuredImage,
            status,
            userId,
          }
        );
      } catch (error) {
        console.error("Create Post Error:", error);
        throw error;
      }
    }
  
    async updatePost(documentId, { title, slug, content, featuredImage, status }) {
      try {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          documentId,
          {
            title,
            slug,
            content,
            featuredImage,
            status,
          }
        );
      } catch (error) {
        console.error("Update Post Error:", error);
        throw error;
      }
    }
  
    async deletePost(documentId) {
      try {
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          documentId
        );
        return true;
      } catch (error) {
        console.error("Delete Post Error:", error);
        throw error;
      }
    }

    async getPost({ title, slug, content, featuredImage, status, userId }) {
        try {
          return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, 
            {
              title,
              content,
              featuredImage,
              status,
              userId,
              slug 
            }
          );
        } catch (error) {
          console.error("Create Post Error:", error);
          throw error;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error
          
        }
       
      
  
    }

    //upload file

    async uplaodFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }
    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
                
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }
    getFilePreview(fileId){
          return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
          )
    }
    }
  
  const service = new Service();
  export default service;
