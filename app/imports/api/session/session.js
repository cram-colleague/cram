import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const SSession = new Mongo.Collection('SSession');

/**
 * Create the schema for Stuff
 */
export const SessionSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
    max: 200,
  },
  time: {
    label: 'time',
    type: Date,
    optional: false,
    max: 200,
  },
  place: {
    label: 'place',
    type: String,
    optional: false,
    max: 200,
  },
  sensei: {
    label: 'sensei',
    type: String,
    optional: false,
    max: 200,
  },
});

SSession.attachSchema(SessionSchema);
