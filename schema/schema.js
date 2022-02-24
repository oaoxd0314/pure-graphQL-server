const { graphql, buildSchema,GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const axios = require("axios");

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields:()=>({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        description:{type: GraphQLString},
        users:{
            type: new GraphQLList(UserType), 
            resolve(parentValue,args){
                console.log(parentValue)
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res=>{
                    return res.data
                })
            }
        }
    })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields:{
      id:{type: GraphQLString},
      firstName:{type: GraphQLString},
      age:{type: GraphQLInt},
      company:{
        type:CompanyType,
        resolve(parentValue,args){

            console.log(parentValue)
            
            if(!parentValue.companyId){
                return []
            }

            return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res=>{
                return res.data
            })
        }
    }
  }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        allUser:{
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                return axios.get('http://localhost:3000/users/').then(res=>{
                    return res.data
                })
            }
        },
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res=>{
                    return res.data
                })
            }
        },
        allCompany:{
            type: new GraphQLList(CompanyType),
            resolve(parentValue,args){
                return axios.get('http://localhost:3000/companies').then(res=>{
                    return res.data
                })
            }
        },
        company:{
            type:CompanyType,
            args:{ id:{type:GraphQLString}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(res=>{
                    return res.data
                })
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt)},
                companyId: {type:GraphQLString}
            },
            resolve(parentValue,{firstName,age,...args}){
                return axios.post(`http://localhost:3000/users/`,{firstName,age,...args}).then(res=>{
                    return res.data
                })
            }
        },
        deleteUser:{
            type:UserType,
            args:{id:{type:new GraphQLNonNull(GraphQLString)}},
            resolve(parentValue,{id}){
                return axios.delete(`http://localhost:3000/users/${id}`).then(res=>{
                    return res.data
                })
            }
        },
        editUser: {
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: GraphQLString},
                age: {type: GraphQLInt},
                companyId: {type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch(`http://localhost:3000/users/${args.id}`,args).then(res=>{
                    return res.data
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})