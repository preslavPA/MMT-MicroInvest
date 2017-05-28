import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitCompanyForm} from '../actions/companies/companyActions';
import {bindActionCreators} from 'redux';
require("../../scss/style.scss");

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies : []
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const formData = {};
    console.log('this : ', this);
    for (const field in this.refs) {
      if (field !== 'form') {
        formData[field] = this.refs[field].value;
      }
    }
    console.log('formData : ', formData);
    formData.invoice = [Math.floor((Math.floor(Math.random() * 100) + 1))];
    this.setState({
      companies : this.state.companies.concat(formData)
    });
    this.refs.form.reset();
  }

  render () {
    console.log('Users in render: ', this.state.companies);
    return (
      <div className="companyForm">
        <div className="row">
          <div className="col-xs-12">
            <h4> Registrate a new Company(Legal Partner).</h4>
            <form onSubmit={this.handleFormSubmit.bind(this)} ref="form">
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Identification Number</label>
                <input type="number" className="form-control" ref="numberID"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Value-added tax registrated with number:</label>
                <input type="number" className="form-control" ref="vad"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Company Name</label>
                <input type="text" className="form-control" ref="name"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Country</label>
                <input type="text" className="form-control" ref="country"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Populated place</label>
                <input type="text" className="form-control" ref="place"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Address</label>
                <input type="text" className="form-control" ref="address"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Invoice</label>
                <input type="text" className="form-control" ref="invoice"/>
              </div>
              <div className="form-group col-xs-12 col-md-6">
                <label htmlFor="">Email</label>
                <input type="email" className="form-control" ref="email"/>
              </div>
              <button id="saveCompany" className="btn btn-success" onClick={() => this.props.submitCompanyForm(this.state.companies)} type="submit" value="Submit">Save Company</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    companies: state.companies
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({submitCompanyForm : submitCompanyForm}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Company);