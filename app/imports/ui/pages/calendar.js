import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { SSession, SessionSchema } from '../../api/session/session.js';
import { Meteor } from 'meteor/meteor';

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.Calendar_Page.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'SSession' );
});

Template.Calendar_Page.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    header: {
      left:   'title',
      center: '',
      right:  'today prev,next'
    },
    events( start, end, timezone, callback ) {
      let data = SSession.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });
      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
          `<h4 class="name">${ event.name }</h4>`
      );
    },
    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format()} );
      $( '#addSession' ).modal({ blurring: true }).modal( 'show' );
    },
    eventClick(event) {
      Session.set('eventModal', { type: 'edit', event: event._id });
      FlowRouter.go('Session_Page', { _id: event._id });
    }
  });
  Tracker.autorun( () => {
    SSession.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refreshEvents' );
  });
});

