/*
*  Name :   ListBubbleConfig.js
*  Location : /lib/ListBubbleConfig.jsx
*  Author: Emanuele Crespan
*  Creation Data: 2017-06-27
*  Description: class ListBubbleConfig
*/

import React, { Component } from 'react';
import MonolithUI from 'meteor/monolith-sdk';

let CheckBoxList = MonolithUI.MonolithUI.CheckBoxList;
let CheckButton = MonolithUI.MonolithUI.CheckButton;
let ComboBox = MonolithUI.MonolithUI.ComboBox;
let Image = MonolithUI.MonolithUI.Image;
let ImageButton = MonolithUI.MonolithUI.ImageButton;
let LineEdit = MonolithUI.MonolithUI.LineEdit;
let LineEditComboBox = MonolithUI.MonolithUI.LineEditComboBox;
let PushButton = MonolithUI.MonolithUI.PushButton;
let RadioButtonGroup = MonolithUI.MonolithUI.RadioButtonGroup;
let TextAreaButton = MonolithUI.MonolithUI.TextAreaButton;
let TextAreaComboBox = MonolithUI.MonolithUI.TextAreaComboBox;
let VerticalLayout = MonolithUI.MonolithUI.VerticalLayout;
let HorizontalLayout = MonolithUI.MonolithUI.HorizontalLayout;
let AbsBubble = MonolithUI.MonolithUI.AbsBubble;
let AbsButton = MonolithUI.MonolithUI.AbsButton;
let AbsBubbleConfig = MonolithUI.MonolithUI.AbsBubbleConfig;
let BubbleCreator = MonolithUI.MonolithUI.BubbleCreator;
let BubbleDiscriminator = MonolithUI.MonolithUI.BubbleDiscriminator;

import ListCheckListNavigationContainer from './ListCheckListNavigation.jsx';
import AbsList from './AbsList.jsx';
import {ListDb} from "./ListDb.js";

export default class ListBubbleConfig extends AbsList {
    constructor(props){
        super(props);
        this.state={ ops:[],title:'', hide:true	};
		this.display_checklist=this.display_checklist.bind(this);
		//this.add_checklist=this.add_checklist.bind(this);
		this.send=this.send.bind(this);
    }

	display_checklist(){
		this.setState({hide:!this.state.hide});
	}


	send(){//mettere apposto questo metodo
        let insProm = ListDb.insert(
            {
                title: this.state.title,
                ops: this.state.ops
            },
            'listInsertion'
        );
        insProm.then(
            (s) => {console.log(s); this.props.closeMenu();},
            (e) => {console.log(e);}
        );
	}

    render() {
        let rows=[];

        for(let i=0;i<this.state.ops.length;i++){
            rows.push(
                <div key={i}>
		    		Option {i+1}:<br/>
		            <LineEdit id={i} value={this.state.ops[i]} updateState={this.optChange}/>
                    <PushButton argument={i} buttonName="&times;" handleClick={this.delOpt}/>
                </div>
            );
        }
        return (
            <div>
                <h3>List Name:</h3>
                <LineEdit id="title" placeholder="Insert List Name" updateState={this.titleChange}/><br/>
                <PushButton buttonName="CheckLists" classes="checklist-button btn-sm" handleClick={this.display_checklist}/><br/>
				<ListCheckListNavigationContainer hide={this.state.hide} add={this.addOpt}/>
                {rows}<br/>
                <PushButton buttonName="Add" classes="btn-sm add-option-button" handleClick={this.addOpt}/><br/>
                <PushButton buttonName="Send" classes="" handleClick={this.send}/>
            </div>

        );
    }
}


/*
how to use:
<ListBubbleConfig send={this."function name"}/>
*/
