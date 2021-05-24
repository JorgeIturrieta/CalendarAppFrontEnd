import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import  './styles.css' ;
//console.log(process.env.REACT_APP_API_URL);

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);

