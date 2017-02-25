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
    allowedValues: ['ICS111',"ICS141","ICS211","ICS212","ICS215","ICS222","ICS241","ICS290","ICS311","ICS312","ICS313","ICS314","ICS321","ICS331","ICS332","ICS351","ICS355","ICS361","ICS390","ICS414","ICS415","ICS419","ICS421","ICS422","ICS423","ICS424","ICS425","ICS426","ICS431","ICS432","ICS435","ICS441","ICS443","ICS451","ICS452","ICS455","ICS461","ICS462","ICS464","ICS465","ICS466","ICS469","ICS471","ICS475","ICS476","ICS483","ICS484","ICS485","ICS491","ICS495","ICS499"],
    autoform: {
      atFirldInput: {
        firstOption: "(Select a Class)"
      }
    }
  },
  // time: {
  //   label: 'time',
  //   type: String,
  //   optional: false,
  //   max: 200,
  // },
  start: {
    label: 'start',
    type: String,
  },
  end: {
    label: 'start',
    type: String,
    optional: true,
  },
  startV: {
    label: 'Start Time Value',
    type: Number,
    optional: false,
  },
  endV: {
    label: 'End Time Value',
    type: Number,
    optional: false,
    custom: function startAndEnd() {
      let x = 0;
      if (this.value < this.field('startV').value || this.value === this.field('startV').value) {
        x = 'endV';
      }
      //console.log('x: ' + x);
      return x;
    },
  },
  startString: {
    label: 'Start time of event represented as a string',
    type: String,
    optional: false,
  },
  endString: {
    label: 'End time of event represented as a string',
    type: String,
    optional: false,
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
  students: {
    label: 'students',
    type: Array,
    maxCount: 5,
    optional: true,
  },
  "students.$": {
    type: String,
  },
  detail: {
    label: 'detail',
    type: String,
    optional: false,
  },
  owner: {
    label: 'owner',
    type: String,
  },
});

SSession.attachSchema(SessionSchema);
