/*
*  Name :   ChecklistEditing.jsx
*  Location : /lib/ChecklistEditing.jsx
*  Author: Nicolò Rigato
*  Creation Data: 2017-06-27
*  Description: class ChecklistEditing
*/



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

import React, { Component } from 'react';
import {aBubbleCheckList} from "./CheckListDb";

import AbsList from './AbsList.jsx';

export default class CheckListEditing extends AbsList {
    constructor(props){
        super(props);
        this.state={
            title:this.props.listElement.title,
            ops:this.props.listElement.ops
        };
        this.titleChange=this.titleChange.bind(this);
        this.save=this.save.bind(this);
    }

    save(){
        const upProm = aBubbleCheckList.updateAsync(
            {_id: this.props.listElement._id},{$set: {title: this.state.title, ops: this.state.ops}},
            );
        upProm.then(
            (s) => {console.log(s);},
            (e) => {console.log(e);}
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                title: nextProps.listElement.title,
                ops: nextProps.listElement.ops
            }
        );
    }

    render() {
        let rows=[];
        for(let i=0;i<this.props.listElement.ops.length;i++){
            rows.push(
                <div key={i}>
                    <h5>Option n:{i+1}:</h5>
                    <LineEdit id={i} value={this.state.ops[i]} updateState={this.optChange}/>
                    <PushButton  argument={i} buttonName="&times;" handleClick={this.delOpt}/>
                </div>
            );
        }
        return (
            <VerticalLayout hide={this.props.hide}>
                <h4>Checklist Name:</h4>
                <LineEdit value={this.props.listElement.title} updateState={this.titleChange}/><br/>
                {rows}<br/>
                <PushButton buttonName="Add" handleClick={this.addOpt}/><br/>
                <PushButton buttonName="Save" handleClick={this.save}/>
            </VerticalLayout>

        );
    }
}
