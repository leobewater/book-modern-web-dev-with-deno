import { User, Contact } from './models.ts';
import { GQLError } from 'oak_graphql';
import DataLoader from 'dataloader';
import { hash } from 'scrypt';

interface IContact {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const getUser = async (userId: string) => {
  return await User.find(userId);
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await User.where('email', email).first();
  return existingUser;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new GQLError('User already exists');
  const hashedPassword = await hash(password);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const deleteUser = async (userId: string) => {
  await Contact.where('userId', userId).delete();
  await User.deleteById(userId);
  return null;
};

export const updateUser = async (userId: string, userData: any) => {
  await User.where('userId', userId).update(userData);
  return null;
};

export const getContactsByUserId = async (userId: string) => {
  return await User.where('userId', userId).contacts();
};

export const getContact = async (contactId: string) => {
  return await Contact.find(contactId);
};

export const createContact = async (contactData: IContact, userId: string) => {
  const existingUser = await User.where('userId', userId).get();
  if (!existingUser.length) throw new GQLError('User does not exist');
  const contact = await Contact.create({ ...contactData, userId });
  return contact;
};

export const deleteContact = async (userId: string) => {
  await Contact.deleteById(userId);
  return null;
};

export const updateContact = async (contactId: string, contactData: any) => {
  await Contact.where('contactId', contactId).update(contactData);
  return null;
};

const batchGetUsersByIds = (ids: any) => {
  const userPromises = ids.map(getUser);
  const usersPromise = Promise.resolve(userPromises);
  return usersPromise;
};

export const userLoader = new DataLoader(batchGetUsersByIds);
