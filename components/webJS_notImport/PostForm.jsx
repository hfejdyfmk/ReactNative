import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Popover,
    PopoverHeader,
    PopoverBody,
} from 'reactstrap';
import {connect} from 'react-redux';

import {getMoodIcon} from 'utilities/weather.js';

import {createPost, 
        input, 
        inputDanger,
        inputVol, 
        togglelocationType, 
        setlocationTypeToggle, 
        selectlocationType, 
        clearItems,
        vibrateSetting,
        volumeDanger,
        typeFormSetting,
        mapOpen,
        setMap
} from 'states/post-actions.js';

import './PostForm.css';
import ListItem from './RemindItemList.jsx'


class PostForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        locationTypeToggle: PropTypes.bool,
        locationType: PropTypes.string,
        remindItemLoading: PropTypes.bool,
        vibration: PropTypes.bool,
        volume: PropTypes.string,
        volumeDanger: PropTypes.bool,
        isPersonal: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.inputVol = null;
        this.locationTypeToggleEl = null;
        this.itemList = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleLTToggle = this.handleLTToggle.bind(this);
        this.handleVibrate = this.handleVibrate.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleTypeForm = this.handleTypeForm.bind(this);
    }

    render() {
        const {isPersonal, inputValue,locationTypeToggle, locationType, remindItemLoading, vibration, volumeDanger} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';
        let vib = '';
        let typeFormName = isPersonal ? 'Personal' : 'General';
        let typeFormColor = isPersonal ? 'primary' : 'info';
        let vibColor = (vibration==true)? 'primary':'secondary';
        let typeForm = undefined;
        if (isPersonal){
            typeForm = (
                <div>
                    <div>Add a new Personal Place</div>
                    <Input className={`input${inputDanger}`} innerRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} placeholder="Give a Name for this place"></Input>
                    <Button id="Popover1" type="button" color="success">
                        Google Map
                    </Button>
                    <Popover placement="right" isOpen={locationTypeToggle} target="Popover1" toggle={this.handleLTToggle}>
                        <PopoverHeader>Target the Place</PopoverHeader>
                        <PopoverBody>CKJ</PopoverBody>
                    </Popover>
                </div>
            );
            //console.log('weird');
        }else{
            typeForm = (
                <div>
                    <div className ='LocationTpye'>Loaction Type :&nbsp;
                        <ButtonDropdown type='buttom' isOpen={locationTypeToggle} toggle={this.handleLTToggle}>
                            <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                                <i className={locationType}></i>&nbsp;{
                                    locationType === 'na' ? 'Type' : locationType
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Cafe')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Cafe</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Library')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Library</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </div>
            );
        }
        //console.log(locationType);
        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                        <Button color={typeFormColor} onClick={this.handleTypeForm}>{typeFormName}</Button>
                        {typeForm}
                        <InputGroup className = 'volumeSet'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Volume</InputGroupText>
                            </InputGroupAddon>
                            <Input className={`volume${volumeDanger}`} placeholder="0-100" innerRef={el => {this.inputVol = el}} value={this.props.volume} onChange={this.handleVolumeChange}/>
                            <InputGroupAddon addonType="append">%</InputGroupAddon>
                            <InputGroupAddon addonType="append">Vibration:&nbsp;</InputGroupAddon>
                            <InputGroupAddon addonType="append"><Button color={vibColor} onClick={this.handleVibrate}>{vib = vibration === true ? 'On' : 'Off'}</Button></InputGroupAddon>
                        </InputGroup>
                        <ListItem childRef={ref => (this.itemList = ref)} />{
                        remindItemLoading &&
                            <Alert color='warning' className='loading'>Loading...</Alert>
                        }
                    </div>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Set</Button>
                </Alert>
            </div>
        );
    }

    handleTypeForm(){
        this.props.dispatch(setlocationTypeToggle(false));
        this.props.dispatch(typeFormSetting());
    }

    handleVibrate(){
        this.props.dispatch(vibrateSetting());
        //console.log(this.props.vibration);
    }

    handleDropdownSelect(locationType) {
        this.props.dispatch(selectlocationType(locationType));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleVolumeChange(e){
        const text = e.target.value
        //console.log(text);
        let vol = Number(text, 10); //check if number
        //console.log(this.props.volumeDanger);
        if (!isNaN(vol)){
            if (vol>= 0 && vol <=100){
                this.props.dispatch(inputVol(text));
                if (text && this.props.volumeDanger) {
                    this.props.dispatch(volumeDanger(false));
                }
            }else{
                this.props.dispatch(volumeDanger(true));
                return;
            }
        }else{
            this.props.dispatch(volumeDanger(true));
            return;
        }
    }

    handleLTToggle(e) {
        this.props.dispatch(togglelocationType());
    }

    handlePost() {
        let bad = false;
        if (!this.props.inputValue && this.props.isPersonal) {
            this.props.dispatch(inputDanger(true));
            bad = true;
        }

        if (this.props.locationType === 'na' && !this.props.isPersonal) {
            this.props.dispatch(setlocationTypeToggle(true));
            bad = true;
        }
        //console.log(this.props.volume);
        if(!this.props.volume){
            this.props.dispatch(volumeDanger(true));
            bad = true;
        }
        let itemGood = this.itemList.saveWholeList();
        //console.log(locationType);
        if (itemGood && !bad){  //save
            this.props.dispatch(createPost(this.props.id, this.props.isPersonal,this.props.inputValue,this.props.locationType, this.props.volume, this.props.vibration));
            this.props.dispatch(input(''));
            this.props.dispatch(selectlocationType('na'));
            this.props.dispatch(clearItems());
        }
        return;
    }
}

export default connect(state => ({
    inputValue: state.postForm.inputValue,
    inputDanger: state.postForm.inputDanger,
    volumeDanger: state.postForm.volumeDanger,
    volume: state.postForm.volume,
    locationTypeToggle: state.postForm.locationTypeToggle,
    locationType: state.postForm.locationType,
    remindItemLoading: state.reminder.remindItemLoading,
    vibration: state.postForm.vibrate ? true : false,
    isPersonal: state.postForm.isPersonal ? true : false,
    //searchText: state.searchText,
}))(PostForm);
