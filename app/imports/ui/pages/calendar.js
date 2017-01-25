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
          `<h4>${ event.name }</h4>
         <p class="sensei">${ event.sensei }</p>
         <p class="students">${ event.students }</p>
        `
      );
    },
    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format()     } );
      $( '#addSession' ).modal( 'show' );
    },
  });
  Tracker.autorun( () => {
    SSession.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});

