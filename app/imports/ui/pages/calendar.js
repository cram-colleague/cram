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
          `<h4>${ event.title }</h4>
         <p class="guest-count">${ event.guests } Guests</p>
         <p class="type-${ event.type }">#${ event.type }</p>
        `
      );
    },
    dayClick( date ) {
      FlowRouter.go('Add_Session_Page');
      //Session.set( 'eventModal', { type: 'add', date: date.format() } );
      //$( '#add-edit-event-modal' ).modal( 'show' );
    },
    eventClick( event ) {
      FlowRouter.go('Add_Session_Page');
      //Session.set( 'eventModal', { type: 'edit', event: event._id } );
      //$( '#add-edit-event-modal' ).modal( 'show' );
    }
  });
  Tracker.autorun( () => {
    SSession.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});

