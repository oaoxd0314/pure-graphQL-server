const { gql } = require("graphql")

const example_query = gql`
query getAllCompany{
	allCompany{
    id
    name
    description
  }
}

query getAllUser{
  allUser{
    id
    firstName
  }
}

query getUser($id:String){
  user(id:$id){
    firstName
    age
    company{
      id
      name
    }
  }
}

mutation deleteUser($id: String!){
  deleteUser(id:$id){
    firstName
  }
}

mutation addUser(
  $firstName: String!
  $age: Int!
  $companyId: String
){
    addUser(
      firstName:$firstName,
      age:$age,
      companyId:$companyId
    ){
    id
    firstName
    age
    company{
      id
      name
    }
  }
}

mutation editUser(
  $id:String!
  $firstName: String!
  $age: Int!
  $companyId: String
){
    editUser(
      id:$id
      firstName:$firstName,
      age:$age,
      companyId:$companyId
    ){
    id
    firstName
    age
    company{
      id
      name
    }
  }
}

mutation changeCompany(
  $id:String!
  $companyId: String
){
    editUser(
      id:$id
      companyId:$companyId
    ){
    id
    firstName
    age
    company{
      id
      name
    }
  }
}
`