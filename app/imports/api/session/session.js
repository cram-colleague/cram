import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Session = new Mongo.Collection('Session');

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
  skill: {
    label: 'skill',
    type: String,
    optional: false,
    max: 200,
  },
});

SSession.attachSchema(SessionSchema);
