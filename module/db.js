var MongoDB=require('mongodb');
var MongoClient=MongoDB.MongoClient;
const ObjectID=MongoDB.ObjectID;
var config=require('./config.js');
class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    constructor(){
        this.dbClient='';
        this.connect();
    }
    connect(){
        let _that=this;
        return new Promise((resolve,reject)=>{
            if(!_that.dbClient){
               MongoClient.connect(config.dbUrl,(err,client)=>{
                   if(err){
                       reject(err);
                   }else{
                       _that.dbClient=client.db(config.dbName);
                       resolve(_that.dbClient);
                   }
               })
            }else{
                resolve(_that.dbClient);
            }
        })
    }
    find(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                var result=db.collection(collectionName).find(json);
                result.toArray(function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })
            })
        })
    }
    insert(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,function(err,result){
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        })
    }
    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(json1,{$set:json2},(err,result)=>{
                   if (err) {
                       reject(err);
                   }else{
                       resolve(result);
                   }
                })
            })
        })
    }
    remove(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(json,function(err,result){
                    if (err) {
                        reject(err)
                    }else{
                        resolve(result);
                    }
                })
            })
        })
    }
    getobjectId(id){
        return new ObjectID(id);
    }
}
module.exports=Db.getInstance();