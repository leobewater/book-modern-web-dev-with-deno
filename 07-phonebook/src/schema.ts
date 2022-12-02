import { gql } from 'oak_graphql';

export const types = gql`
  # type Query {
  #   hello(name: String): String
  # }

  type User {
    userId: String!
    name: String!
    contacts: [Contact]!
    email: String!
  }

  type Contact {
    contactId: String!
    name: String!
    phone: String
    email: String
    address: String
    user: User!
  }
  
  type Login {
    token: String!
  }

  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
  }

  input CreateContactInput {
    name: String!
    phone: String
    email: String
    address: String
  }

  input UpdateContactInput {
    contactId: String!
    name: String
    phone: String
    email: String
    address: String
  }

  type Query {
    user: User
    contacts: [Contact]
    contact(contactId: String!): Contact
    login(user: LoginUserInput): Login
  }

  type Mutation {
    registerUser(user: RegisterUserInput!): User
    deleteUser: Boolean
    updateUser(user: UpdateUserInput!): Boolean
    addContact(contact: CreateContactInput!): Contact
    deleteContact(contactId: String!): Boolean
    updateContact(contact: UpdateContactInput!): Boolean
  }
`;
