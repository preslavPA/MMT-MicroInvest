import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UserActions from '../actions/users/usersActions';
import {bindActionCreators} from 'redux';
require("../../scss/style.scss");

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      address : '',
      country : '',
      company : [],
      phone : ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    const actions = bindActionCreators(UserActions, dispatch);
    actions.submitUserForm(this.state);
    var form = document.getElementById("uForm");
    form.reset();
    console.log('this', this);
  }

  render() {
    const {dispatch, property, propertyValue, eventType} = this.props;
    const actions = bindActionCreators(UserActions, dispatch);
    console.log('eventType, ', eventType);

    if(eventType === 'CHANGE_PROP_VALUE') {
      this.state[property] = propertyValue;
    }

    return (
      <div className="userForm">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h4> Registrate a new user(Physical individual).</h4>
            <form className="form-horizontal" id="uForm">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  id="name"
                  onChange={e => actions.changePropValue(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.phone}
                  id="phone"
                  onChange={e => actions.changePropValue(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  id="address"
                  onChange={e => actions.changePropValue(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.company}
                  id="company"
                  onChange={e => actions.changePropValue(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  id="email"
                  onChange={e => actions.changePropValue(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.country}
                  id="country"
                  onChange={e => actions.changePropValue(e)}
                />
              </div>
              <button id="saveUser" className="btn btn-success" onClick={e => this.handleFormSubmit(e)}>Save User</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    property      : state.usersReducer.property,
    propertyValue : state.usersReducer.propertyValue,
    eventType     : state.usersReducer.eventType
  }
}

/*function matchDispatchToProps(dispatch) {
  return bindActionCreators({submitUserForm : submitUserForm}, dispatch)
}*/

export default connect(mapStateToProps)(User);