import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Home', { main: 'Home_Page' });
  },
});

FlowRouter.route('/term-page', {
  name: 'Term_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Term_Page' });
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

FlowRouter.route('/list-messenger', {
  name: 'List_Messenger_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Messenger_Page' });
  },
});

FlowRouter.route('/sent-messenger', {
  name: 'Sent_Messenger_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Sent_Messenger_Page' });
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

FlowRouter.route('/add-messenger/:_id', {
  name: 'Add_Messenger_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Messenger_Page' });
  },
});

FlowRouter.route('/add-report', {
  name: 'Add_Report_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Report_Page' });
  },
});

FlowRouter.route('/user-schedule', {
  name: 'User_Schedule_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Schedule_Page' });
  },
});

FlowRouter.route('/user-profile', {
  name: 'User_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Page' });
  },
});

FlowRouter.route('/admin', {
  name: 'Admin_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Page' });
  },
});

FlowRouter.route('/admin-profile', {
  name: 'Admin_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Profile_Page' });
  },
});

FlowRouter.route('/admin-schedule', {
  name: 'Admin_Schedule_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Schedule_Page' });
  },
});

FlowRouter.route('/admin-report', {
  name: 'Admin_Report_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Report_Page' });
  },
});

FlowRouter.route('/message/:_id', {
  name: 'Message_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Message_Page' });
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

// change it later
FlowRouter.route('/profile/:_id', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/session/:_id', {
  name: 'Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Session_Page' });
  },
});

FlowRouter.route('/report/:_id', {
  name: 'Report_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Report_Page' });
  },
});

FlowRouter.route('/edit-session/:_id', {
  name: 'Edit_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Session_Page' });
  },
});

FlowRouter.route('/calendar', {
  name: 'Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
  },
});

FlowRouter.route('/personal-calendar', {
  name: 'personal_calendar',
  action() {
    BlazeLayout.render('App_Body', { main: 'personal_calendar' });
  },
});

FlowRouter.route('/events', {
  name: 'events',
  action() {
    BlazeLayout.render('App_Body', { main: 'events' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

FlowRouter.route('/leaderboard/', {
  name: 'Leaderboard_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Leaderboard_Page' });
  },
});

FlowRouter.route('/tuto-add-profile', {
  name: 'Tuto_Add_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_Add_Profile_Page' });
  },
});

FlowRouter.route('/tuto-user-profile', {
  name: 'Tuto_User_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_User_Page' });
  },
});

FlowRouter.route('/tuto-user-schedule', {
  name: 'Tuto_User_Schedule_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_User_Schedule_Page' });
  },
});

FlowRouter.route('/tuto-add-session', {
  name: 'Tuto_Add_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_Add_Session_Page' });
  },
});

FlowRouter.route('/tuto-session', {
  name: 'Tuto_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_Session_Page' });
  },
});

FlowRouter.route('/tuto-add-report', {
  name: 'Tuto_Add_Report_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_Add_Report_Page' });
  },
});

FlowRouter.route('/tuto-user-message', {
  name: 'Tuto_List_Messenger_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tuto_List_Messenger_Page' });
  },
});