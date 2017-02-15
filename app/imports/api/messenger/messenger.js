import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Messenger = new Mongo.Collection('Messenger');

/**
 * Create the schema for Stuff
 */
export const MessengerSchema = new SimpleSchema({
  sender: {
    label: 'sender',
    type: String,
    optional: false,
  },
  name: {
    label: 'name',
    type: String,
    optional: false,
  },
  title: {
    label: 'title',
    type: String,
    optional: false,
    max: 200,
  },
  content: {
    label: 'content',
    type: String,
    optional: false,
    max: 10000,
  },
  receiver: {
    label: 'receiver',
    type: String,
    optional: false,
  },
});

Messenger.attachSchema(MessengerSchema);
