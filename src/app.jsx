// eslint-disable-next-line import/no-extraneous-dependencies
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import AddEditContainer from './containers/add-edit-container';
import CalendarContainer from './containers/calendar-container';
import ViewEventContainer from './containers/event-details-container';
import ImportContainer from './containers/import-container';
import LabelsContainer from './containers/labels-container';
import SidebarContainer from './containers/sidebar-container';
import SubscriptionContainer from './containers/subscription-container';
import { fetchAccount, fetchLabels, toggleSidebarCollapsed } from './data/actions';
import setupStore from './data/setup-store';

// Remove the trailing slash, if present
//
// TODO: change this from a global variable to an API Client that's supplied via
// the provider pattern.
window.abe_url = process.env.ABE_URL.replace(/\/$/, '');

// React Router (with Redux middleware)
const history = createHistory();

// Set up the Redux store
const store = setupStore(history);

// Fetch the labels
store.dispatch(fetchAccount());
store.dispatch(fetchLabels());

ReactDOM.render(
  <Provider store={store}>
    <div className="app-container">
      <SidebarContainer />
      <div className="scene-container">
        <div className="scene-overlay" onClick={() => store.dispatch(toggleSidebarCollapsed())} />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={CalendarContainer} />
            <Route path="/calendar/:labels?" component={CalendarContainer} />
            <Route path="/edit/:id?/:recId?" component={AddEditContainer} />
            <Route path="/view/:id/:recId?" component={ViewEventContainer} />
            <Route exact path="/import" component={ImportContainer} />
            <Route exact path="/labels" component={LabelsContainer} />
            <Route path="/subscription/:id" component={SubscriptionContainer} />
          </Switch>
        </Router>
      </div>
    </div>
  </Provider>,
  document.getElementById('app'),
);
