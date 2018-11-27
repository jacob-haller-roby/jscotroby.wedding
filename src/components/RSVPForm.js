import React, {Component} from 'react';
import Button from './Button';
import {TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Checkbox} from "@material-ui/core";
import {Restaurant, Favorite, FavoriteBorder} from "@material-ui/icons";

class RSVPForm extends Component {

    constructor(props) {
        super(props);
        let rsvps = JSON.parse(JSON.stringify(props.previousRSVPs));
        this.state = {
            rsvps,
            edit: !props.previousRSVPs.length
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    toggleEdit() {
        this.setState((state) => ({edit: !state.edit}));
    };

    handleCancel() {
        this.setState({
            rsvps: this.props.previousRSVPs,
            edit: false
        })
    }

    handleChange(id) {
        return (key) => {
            return (e) => {
                let rsvps = Object.assign([], this.state.rsvps);
                let rsvp = Object.assign({}, rsvps[id]);
                rsvp[key] = e.target.value || e.target.checked;
                rsvps[id] = rsvp;
                this.setState({rsvps}, console.log(this.state));
            }
        }
    };

    handleSubmit() {
        this.props.submitRSVPs(this.state.rsvps);
        this.setState({edit: false});
    };

    render() {
        return (
            <div className="row">
                {this.state.edit ? this.renderEdit() : this.renderStatic()}
            </div>
        );
    }

    renderEdit() {
        return (
            <div className="col-12 col-xl-8 offset-xl-2">
                <p>
                    Please submit the below form to RSVP to our wedding
                </p>
                {this.renderForms()}
                <Button onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </div>
        );
    };

    renderStatic() {
        return (
            <div className="col-12 col-xl-8 offset-xl-2">
                {this.renderForms()}
                <Button onClick={this.toggleEdit}>Edit RSVP</Button>
            </div>
        );
    };

    renderForms() {
        let forms = [];
        for (let i = 0; i < this.props.RSVPCount; i++) {
            forms.push(this.renderForm(i, i + this.props.previousRSVPs[i].toString));
        }
        return forms;
    };

    renderForm(id, key) {
        return (
            <div key={key} className="row auto">

                <div className="col-md-5 right-align">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        onChange={this.handleChange(id)('name')}
                        value={this.state.rsvps[id].name}
                        margin="normal"
                        type="text"
                        variant="outlined"
                        key={key}
                        fullWidth
                        disabled={!this.state.edit}
                    />
                </div>
                <div className="col-md-2">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Attending?</FormLabel>
                        <RadioGroup
                            aria-label="Attending?"
                            name="attending"
                            onChange={this.handleChange(id)('attending')}
                            value={this.state.rsvps[id].attending}
                            row
                        >
                            <FormControlLabel value="yes"
                                              control={
                                                  <Radio icon={<FavoriteBorder/>}
                                                         checkedIcon={<Favorite/>}/>
                                              }
                                              label="I'll be there!"
                                              disabled={!this.state.edit}/>
                            <FormControlLabel value="no"
                                              control={
                                                  <Radio/>
                                              }
                                              label="Regretfully Decline"
                                              disabled={!this.state.edit}/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="col-md-3    ">
                    {this.state.rsvps[id].attending === 'yes' && <FormControl component="fieldset">
                        <FormLabel component="legend">Diner Option</FormLabel>
                        <RadioGroup
                            aria-label="Dinner"
                            name="dinner"
                            onChange={this.handleChange(id)('dinner')}
                            value={this.state.rsvps[id].dinner}
                            row
                        >
                            <FormControlLabel value="tofu"
                                              control={
                                                  <Radio checkedIcon={<Restaurant/>}/>
                                              }
                                              label="Tofu"
                                              disabled={!this.state.edit}/>
                            <FormControlLabel value="seitan"
                                              control={
                                                  <Radio checkedIcon={<Restaurant/>}/>
                                              }
                                              label="Seitan"
                                              disabled={!this.state.edit}/>
                        </RadioGroup>
                    </FormControl>}
                </div>


            </div>
        )
    }
}

export default RSVPForm;
