/*
*  Name :   ListBubble.jsx
*  Location : /lib/ListBubble.jsx
*  Author: Emanuele Crespan
*  Creation Data: 2017-06-27
*  Description: class ListBubble
*/



import React, { Component } from 'react'
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

import {ListDb} from "./ListDb.js";

export default class ListBubble extends AbsBubble{
    constructor(props){
        super(props);
        this.checkItem=this.checkItem.bind(this);
        this.buttonSymbol=this.buttonSymbol.bind(this);
    }

    checkItem(position){
        ListDb.update(this.props._id, 'updateCheckListItem', position);
    }

    buttonSymbol (position) {
        if(this.props.ops[position].check){
            return {simb: <span>&radic;</span>, active: true};
        } else {
            return {simb: <span>&times;</span>, active: false};
        }
    }

    render(){
        const listItems = [];
        for(let i=0;i<this.props.ops.length;i++){
            listItems.push(
                <div key={i}>
                    <PushButton argument={i}
                                buttonName={this.buttonSymbol(i).simb}
                                dis={this.buttonSymbol(i).active}
                                handleClick={this.checkItem}
                    />
                    <span className="itemInList">{this.props.ops[i].item}</span>
                </div>
            );
        }
        return(
            <VerticalLayout>
                <h1>{this.props.title}</h1>
                {listItems}
            </VerticalLayout>
        );
    }
}
