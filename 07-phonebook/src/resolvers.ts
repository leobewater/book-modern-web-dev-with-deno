import {
  getUser,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  getContactsByUserId,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  userLoader,
} from './controllers.ts';
import { authenticate } from './auth.ts';
import { GQLError } from 'oak_graphql';

export const resolvers = {
  // Query: {
  //   hello: (parent: any, { name }: any, context: any, info: any) => {
  //     if (!name) throw new GQLError('Name not provided');
  //     return `Hello ${name}`;
  //   },
  // },
  Query: {
    user: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      return await getUser(context.userId);
    },
    contacts: (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      return getContactsByUserId(context.userId);
    },
    contact: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      return await getContact(args.contactId);
    },
    login: async (parent: any, args: any, context: any, info: any) => {
      const { email, password } = args.user;
      const user = await getUserByEmail(email);
      if (!user) throw new GQLError(`Invalid email or password`);
      const authToken = await authenticate(user, password);
      if (!authToken) throw new GQLError(`Invalid email or password`);
      return { token: authToken };
    },
  },

  Mutation: {
    registerUser: async (parent: any, args: any, context: any, info: any) => {
      const { name, email, password } = args.user;
      const user = await createUser(name, email, password);
      console.log('created user :>> ', user);
      return user;
    },
    deleteUser: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      return await deleteUser(context.userId);
    },
    updateUser: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      const { name, isActive } = args.user;
      return await updateUser(context.userId, { name, isActive });
    },
    addContact: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      const contact = await createContact(args.contact, context.userId);
      console.log('created user :>> ', contact);
      return contact;
    },
    deleteContact: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      return await deleteContact(args.contactId);
    },
    updateContact: async (parent: any, args: any, context: any, info: any) => {
      if (!context?.userId) throw new GQLError('Authentication error');
      console.log(`args`, args);
      const { contactId, ...contactData } = args.contact;
      if (contactId) return await updateContact(contactId, contactData);
    },
  },
  User: {
    name: (parent: any, args: any, context: any, info: any) => {
      return parent.name;
    },
    contacts: async (parent: any, args: any, context: any, info: any) => {
      const contacts = await resolvers.Query.contacts(
        parent,
        {},
        context,
        info
      );
      return contacts;
    },
  },
  Contact: {
    name: (parent: any, args: any, context: any, info: any) => {
      return parent.name;
    },
    user: async (parent: any, args: any, context: any, info: any) => {
      return await userLoader.load(parent.userId);
    },
  },
};
