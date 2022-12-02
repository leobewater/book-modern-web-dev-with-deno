import { DataTypes, Database, Model, PostgresConnector } from 'denodb';

const DATABASE_URL = Deno.env.get('DATABASE_URL') as string;

const connector = new PostgresConnector({
  uri: DATABASE_URL,
});

export const db = new Database(connector);
