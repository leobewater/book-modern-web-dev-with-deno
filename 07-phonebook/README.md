To run program:
```
> vr dev
```

Visit http://localhost:8080/graphql

Register User:
```
mutation registerUser {
  registerUser(
    user: { name: "<NAME>", email: "<USERNAME>", password: "<PASSWORD>" }
  ) {
    userId
    name
    email
  }
}
```

Login User:
```
query {
  login(user: { email: "<USERNAME>", password: "<PASSWORD>" }) {
    token
  }
}
```

Add Auth Header and Doing the follwing:
```
// set up "Http header"
{
  "Authorization": "Bearer <JWTtoken>"
}
```

Add Contact:
```
mutation addContact {
  addContact(
    contact: {
      name: "<NAME>"
      email: "<USERNAME>"
      phone: "222-222-3333"
      address: "123 freedom road"
    }
  ) {
    contactId
    name
    phone
    address
    email
  }
}
```

To Get All Contacts:
```
query{
  contacts {
    contactId
    name
    phone
    email
    address
  }
}
```

Get Contact By ID:
```
query {
  contact(contactId: "<CONTACT_ID>") {
    name
    phone
    email
    address
  }
}
```

Update A Contact
```
mutation {
  updateContact(
    contact: {
      contactId: "<CONTACT_ID>"
      phone: "888-888-8888"
    }
  ) 
}
```

Delete A Contact:
```
mutation {
  deleteContact(contactId: "<CONTACT_ID>")
}
```

Update A User:
```
mutation {
  updateUser(user: {
    name: "<NAME>"
  })
}
```

Delete A User:
```
mutation {
  deleteUser
}
```