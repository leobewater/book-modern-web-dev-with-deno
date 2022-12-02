import { Model, DataTypes, Relationships } from 'denodb';
import { db } from './db.ts';
import { v4 } from 'uuid';

export class User extends Model {
  static table = 'users';
  static timestamps = true;

  static fields = {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, length: 50 },
    isActive: { type: DataTypes.BOOLEAN },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  };

  static defaults = {
    userId: v4.generate,
    name: 'ABC',
    isActive: true,
  };

  static contacts() {
    return this.hasMany(Contact);
  }
}

export class Contact extends Model {
  static table = 'contacts';
  static timestamps = true;

  static fields = {
    contactId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, length: 100 },
    phone: { type: DataTypes.STRING, length: 50, allowNull: true },
    email: { type: DataTypes.STRING, length: 100, allowNull: true },
    address: { type: DataTypes.STRING, length: 200, allowNull: true },
  };

  static defaults = {
    contactId: v4.generate,
    name: 'Learn Deno',
    isCompleted: false,
  };

  static user() {
    return this.hasOne(User);
  }
}

Relationships.belongsTo(Contact, User);

db.link([User, Contact]);
await db.sync({ drop: true });
