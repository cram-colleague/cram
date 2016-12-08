import { Template } from 'meteor/templating';
import { SSession } from '../../api/session/session.js';

Template.personal_calendar.helpers({

  /**
   * @returns {*} All of the Profile documents.
   */
  sessionList() {
    return SSession.find();
  },
});

Template.personal_calendar.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('SSession');
  });
});


let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.personal_calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'personal_calendar' );
});

Template.personal_calendar.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    personal_calendar( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
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
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});
