/**
 * Created by preslav on 09-Apr-17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UsersActions from '../actions/users/usersActions';
import * as ActionTypes from '../constants/users/UsersActionsTypes';

class GetAllUsers extends Component {

  constructor() {
    super();
    this.state = {
      organizerId: '',
      containerClass: 'hide',
      value: 'Value'
    };
  }

  requestAllUsers() {
    const {dispatch} = this.props;
    const actions = bindActionCreators(UsersActions, dispatch);
    actions.requestAllUsers();
  }

  removeUser(userid) {
    const {dispatch} = this.props;
    const actions = bindActionCreators(UsersActions, dispatch);
    actions.removeUser(userid);
  }

  render() {
    const {
      eventType,
      dispatch,
      allUsers,
      visibleTab
    } = this.props;


    if (eventType == ActionTypes.SWITCH_SECTION) {
      if (visibleTab == 'showAllUsers') {
        this.state.containerClass = 'col-xs-12 show'
      } else {
        this.state.containerClass = 'hide'
      }
    }

    let usersRows = [];
    if (allUsers) {
      usersRows = allUsers.map((user) => {
        console.log('user: ', user);
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.details.name}</td>
            <td>{user.details.email}</td>
            <td>{user.details.country}</td>
            <td>{user.details.phone}</td>
            <td>
              <button type="button" className="btn btn-danger text-center" onClick={e => this.removeUser(user._id)}>
                <i className="icon-trash icon-white"/>
                {"delete"}
              </button>
            </td>
          </tr>
        )
      });
    }

    return (
      <div className="col-xs-12">

        <div className="form-group">
          <div className="col-lg-12">
            <button type="button" className="btn btn-primary btn-block" onClick={e => this.requestAllUsers(e)}>
              Show all users
            </button>
          </div>
        </div>

        <table className="table table-striped table-hover">

          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Remove</th>
          </tr>
          </thead>

          <tbody>
          {usersRows}
          </tbody>

        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    property      : state.usersReducer.property,
    propertyValue : state.usersReducer.propertyValue,
    eventType     : state.usersReducer.eventType,
    allUsers      : state.usersReducer.allUsers
  }
}

export default connect(mapStateToProps)(GetAllUsers);