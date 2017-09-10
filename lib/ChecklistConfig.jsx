/*
*  Name :   ChecklistConfig.jsx
*  Location : /lib/ChecklistConfig.jsx
*  Author: Emanuele Crespan
*  Creation Data: 2017-06-27
*  Description: {class ChecklistConfig}
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

import { createContainer } from 'meteor/react-meteor-data';
import {BubbleCheckList} from "./CheckListDb";
import {aBubbleCheckList} from "./CheckListDb";
import Spinner from './Spinner.jsx';
import { Meteor } from 'meteor/meteor';
import CheckListEditing from './CheckListEditing.jsx';
import CheckListCreation from './CheckListCreation.jsx';



export class ChecklistConfig extends React.Component {
    constructor(props){
        super(props);
        this.display=this.display.bind(this);
        // this.removeChecklist=this.removeChecklist.bind(this);
        this.closeCreationMenu=this.closeCreationMenu.bind(this);
        this.openListCreator = this.openListCreator.bind(this);
        this.state={
            //aggiungere -> lists:this.props.lists,
            hidden: [],
            creatorComp:null
        };
        if(props.lists) {
            let h = [];
            for (let i = 0; i < props.lists.length; i++) {
                h.push(true);
            }
            this.state = {hidden: h, creatorComp: null};
        }
    }

    removeList(id) {
        const remProm = aBubbleCheckList.removeAsync({_id: id});
        remProm.then(
            (s) => {console.log(s);},
            (e) => {console.log(e);}
        );
    }

    display(position){
        let hiddenMap=this.state.hidden;
        let b=hiddenMap[position];
        for(let i=0;i<this.state.hidden.length;i++) {
            hiddenMap[i] = true;
        }
        hiddenMap[position]=!b;
        this.setState({hidden:hiddenMap});
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.lists) {
            let h = [];
            for (let i = 0; i < nextProps.lists.length; i++) {
                h.push(true);
            }
            this.setState({hidden: h});
        }
    }

    openListCreator(){
        if(this.state.creatorComp){
            this.setState({creatorComp: null});
        }
        else {
            this.setState({creatorComp: (<CheckListCreation closeMenu={this.closeCreationMenu}/>) });
        }
    }

    closeCreationMenu(){
        this.setState({creatorComp: null});
    }

    render() {
        if(this.props.loading){
            return (<Spinner/>);
        }
        else {
            let rows = [];
            for (let i=0; i < this.props.lists.length; i++) {
                rows.push(
                    <div key={i}>
                        <div className="btn-group">
                            <PushButton argument={i} buttonName={this.props.lists[i].title} classes="btn btn-primary"handleClick={this.display}/>
                            <PushButton argument={this.props.lists[i]._id} buttonName="&times;" classes="btn btn-primary" handleClick={this.removeList}/>
                        </div>
                        <CheckListEditing hide={this.state.hidden[i]} listElement={this.props.lists[i]}/>
                    </div>
                );
            }
            if(this.props.lists.length === 0){
                rows = (<p>There are no checklists defined for this chat room.</p>);
            }
            return (
                <div>
                    <h3>Checklists</h3>
                    <PushButton buttonName="New" handleClick={this.openListCreator}/>
                    {this.state.creatorComp}
                    {rows}
                </div>
            );
        }
    }
}



export default ChecklistConfigContainer = createContainer(() => {
    let roomId = Session.get('openedRoom');
    let subHandler = Meteor.subscribe('monolith-checklists', roomId);
    const loading = !subHandler.ready();
    const lists = BubbleCheckList.find({roomId: {$eq: roomId}}).fetch();
    return {
        loading,
        lists,
        currentUser: Meteor.user()
    };
}, ChecklistConfig);
