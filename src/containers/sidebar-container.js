// This container is a sort of middleware between the React sidebar and the Redux data store

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReactGA from 'react-ga';
import Sidebar from '../sidebar/sidebar';
import * as Actions from '../data/actions';
import { withAccountInfo } from './with-server-data';

// This function passes values/objects from the Redux state to the React component as props
const mapStateToProps = state => ({
  user: state.user,
  currentEvent: state.events.current,
  general: state.general,
  isCollapsed: state.sidebar.isCollapsed,
  sidebarMode: state.sidebar.mode,
  possibleLabels: state.labels.labelList,
  selectedLabels: state.events.current ? state.events.current.labels : state.labels.visibleLabels,
});

// This function passes functions from /srcs/data/actions.jsx to the React component as props
const mapDispatchToProps = dispatch => ({
  labelToggled: (labelName) => {
    dispatch(Actions.labelVisibilityToggled(labelName));
  },
  homeClicked: () => {
    ReactGA.event({
      category: 'Sidebar Logo',
      action: 'click',
      label: 'User clicked the Olin logo to return to the Home view',
    });
    dispatch(Actions.navigateHome());
  },
  addEvent: () => {
    dispatch(push('/edit'));
  },
  editCurrentEvent: () => {
    dispatch(Actions.editCurrentEvent());
  },
  editEventSeries: () => {
    dispatch(Actions.editCurrentEventSeries());
  },
  deleteCurrentEvent: () => {
    // TODO: handling recurrences properly
  },
  importICSClicked: () => {
    dispatch(push('/import'));
  },
  toggleSidebarCollapsed: () => {
    dispatch(Actions.toggleSidebarCollapsed());
  },
  setVisibleLabels: (labels, allNoneDefault) => {
    dispatch(Actions.setVisibleLabels(labels, allNoneDefault));
  },
  icsUrlCopiedToClipboard: (url) => {
    ReactGA.event({
      category: 'ICS Feed URL Copied to Clipboard',
      action: url,
    });
  },
});

// Connect props to Redux state and actions
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(withAccountInfo(Sidebar));

export default SidebarContainer;
