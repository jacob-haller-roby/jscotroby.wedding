import React, {Component} from 'react';
import Button from './Button';
import {TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel} from "@material-ui/core";

class RSVPForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rsvps: props.previousRSVPs,
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
                let rsvps = Object.assign({}, this.state.rsvps);
                if (!rsvps[id]) {
                    rsvps[id] = {};
                }
                rsvps[id][key] = e.target.value;
                this.setState({rsvps}, () => console.log(this.state));
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
            forms.push(this.renderForm(i, i + this.state.edit + this.props.previousRSVPs[i].toString));
        }
        return forms;
    }

    renderForm(id, key) {
        return (
            <div key={key} className="row">

                <div className="col-md-8 right-align">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        onChange={this.handleChange(id)('name')}
                        defaultValue={this.state.rsvps[id].name}
                        margin="normal"
                        type="text"
                        variant="outlined"
                        key={key}
                        fullWidth
                        disabled={!this.state.edit}
                    />
                </div>
                <div className="col-md-4    ">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Diner Option</FormLabel>
                        <RadioGroup
                            aria-label="Dinner"
                            name="dinner"
                            onChange={this.handleChange(id)('dinner')}
                            value={this.state.rsvps[id].dinner}
                            row
                        >
                            <FormControlLabel value="tofu" control={<Radio/>} label="Tofu" disabled={!this.state.edit}/>
                            <FormControlLabel value="seitan" control={<Radio/>} label="Seitan" disabled={!this.state.edit}/>
                        </RadioGroup>
                    </FormControl>
                </div>


            </div>
        )
    }
}

export default RSVPForm;
