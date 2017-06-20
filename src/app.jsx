import * as React from "react";
import {render} from 'react-dom';
import foo from './testimport.js';
//import customCalendar from './calendar.js';
import * as fullCalendar from 'fullcalendar/dist/fullcalendar';

class PageHeaderTitle extends React.Component {
    render() {
        return <h1>Welcome to ABE!</h1>

    }
}

class PageHeaderNav extends React.Component {
    render() {
        return <p>A nav menu should go here...</p>
    }
}

class PageHeader extends React.Component {
    render() {
        return (
            <header>
                <PageHeaderTitle/>
                <PageHeaderNav/>
            </header>

        );
    }
}

class Calendar extends React.Component {
//   componentWillMount() {
//     console.log('componentWillMount is called');
//     const script = document.createElement('script');
//     script.src = 'calendar.js';
//     document.body.appendChild(script);
// }
  componentDidMount(){
    //customCalendar();
    var mycalendar; //THIS IS IMPORTANT because JS sucks at handling classes
    mycalendar = new foo();
    mycalendar.initCalendar();
    mycalendar.makeDropdown();
    mycalendar.populateDropdown();
    mycalendar.refreshFilters([]);
  }
  render(){
    return (
      <div>
        <p>There should be a calendar here</p>
        <div id='calendar'></div>
      </div>

    );
  }
}

class App extends React.Component {
    render() {
        return (
        <div>
        <PageHeader/>
        <Calendar/>
        </div>
      );
    }
}

//$(document).foundation()
render(<App/>, document.getElementById('app'));
