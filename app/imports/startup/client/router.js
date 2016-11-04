import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/list-profile', {
  name: 'List_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Profile_Page' });
  },
});

FlowRouter.route('/list-course', {
  name: 'List_Course_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Course_Page' });
  },
});

FlowRouter.route('/list-session', {
  name: 'List_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Session_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/add-profile', {
  name: 'Add_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Profile_Page' });
  },
});

FlowRouter.route('/add-session', {
  name: 'Add_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Session_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.route('/edit-profile/:_id', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/profile/:_id', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/edit-session/:_id', {
  name: 'Edit_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Session_Page' });
  },
});

// FlowRouter.route('/calendar', {
//   name: 'Calendar_Page',
//   action() {
//     BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
//   },
// });

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
