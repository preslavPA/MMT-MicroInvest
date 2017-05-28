import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
require("../../scss/style.scss");
import {submitInvoiceForm} from '../actions/invoice/invoiceActions';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices : [],
      bank   : '',
      payment  : ''
    };

    this.handleBankChange    = this.handleBankChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
  }

  handleFormSubmit() {
    event.preventDefault();

    const formData = {};
    console.log('this : ', this);
    for (const field in this.refs) {
      if (field !== 'form') {
        formData[field] = this.refs[field].value;
      }
    }
    console.log('formData : ', formData);
    formData.bank = this.state.bank;
    formData.payment = this.state.payment;
    formData.id = [Math.floor((Math.floor(Math.random() * 100) + 1))];
    this.setState({
      invoices : this.state.invoices.concat(formData)
    });
    this.refs.form.reset();
  }

  handlePaymentChange(e) {
    this.setState({
      payment : e.target.value
    })
  }

  handleBankChange(e) {
    this.setState({
      bank : e.target.value
    })
  }

  render () {
    console.log('invoices: ', this.state.invoices);
    return (
      <div className="invoiceForm">
        <div className="row">
          <div className="col-xs-12">
            <h4> Create your Invoice.</h4>
            <form onSubmit={this.handleFormSubmit.bind(this)} ref="form">
              <div className="col-xs-12">
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="">Partner :</label>
                    <input type="text" className="form-control" ref="partner"/>
                    <div id="addPartner" className="col-md-6">
                      <button className="btn btn-info"> New Partner</button>
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="">Document N# :</label>
                    <input type="number" className="form-control" ref="docNum"/>
                    <div id="dateRow" className="form-group col-xs-12">
                      <div className="col-md-12">
                        <label htmlFor="">Create Date</label>
                        <input type="date" className="form-control" ref="createDate"/>
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="">Due Date</label>
                        <input type="date" className="form-control" ref="dueDate"/>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="">Company Name</label>
                    <input type="text" className="form-control" ref="name"/>
                  </div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="form-group col-md-4">
                    <div className="dropdown">
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Way of payment: </ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Bank account" onChange={this.handlePaymentChange}>
                          <option value="bank" >Bank</option>
                          <option value="cash" >Cash</option>
                          <option value="cashDelivery" >Cash on Delivery</option>
                        </FormControl>
                      </FormGroup>
                    </div>
                    <hr/>
                    <div className="dropdown">
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select Bank account</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Bank account" onChange={this.handleBankChange}>
                          <option value="BG28STSA93000019219554 - BGN" >BG28STSA93000019219554 - BGN</option>
                          <option value="BG62TTBB94001527177455 - USD" >BG62TTBB94001527177455 - USD</option>
                          <option value="BG12UNCR12365478965214 - GBP" >BG12UNCR12365478965214 - GBP</option>
                        </FormControl>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="">Description of the deal :</label>
                    <textarea rows="4" cols="50" className="form-control" ref="description"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="">Receiver :</label>
                    <input type="text" ref="receiver" className="form-control"/>
                    <label htmlFor="">Sender :</label>
                    <input type="text" ref="sender" className="form-control"/>
                  </div>
                </div>
              </div>
              <button id="saveInvoice" className="btn btn-success" onClick={() => this.props.submitInvoiceForm(this.state.invoices)} type="submit" value="Submit">Save Invoice</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    invoices: state.invoices
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({submitInvoiceForm : submitInvoiceForm}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Invoice);