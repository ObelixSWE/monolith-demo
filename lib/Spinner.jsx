/*
*  Name :   Spinner.jsx
*  Location : /lib/Spinner.jsx
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: Spinner
*/


import React, { Component } from 'react';
import './style.css';

export default class Spinner extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
	    return (
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        );
    }
}
