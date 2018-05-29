class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.forms = {
      0: initialPage.bind(this),
      1: form1.bind(this),
      2: form2.bind(this),
      3: form3.bind(this),
      4: confirm.bind(this)
    }

    this.state = {
      form: 0,
      username: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardnumber: '',
      expirydate: '',
      cvv: '',
      billingzip: ''
    }
  }

  serverPost(data) {
    $.ajax({
      url: `/${data.type}`,
      type: 'POST',
      dataType: 'text',
      data: JSON.stringify(data),
      success: function(response) {
        console.log(response)
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  handleNextForm(event) {
    event.preventDefault();
    if(this.state.form === 1) {
      var userObj = {
        type: 'users',
        username: this.state.username,
        password: this.state.password
      }
      this.serverPost(userObj);
    } else if(this.state.form === 2) {
      var addressObj = {
        type: 'address',
        username: this.state.username,
        line1: this.state.address1,
        line2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
      this.serverPost(addressObj);
    } else if(this.state.form === 3) {
      var cardObj = {
        type: 'cards',
        username: this.state.username,
        number: this.state.cardnumber,
        expiry: this.state.expirydate,
        cvv: this.state.cvv,
        zip: this.state.billingzip
      }
      this.serverPost(cardObj);
    }
    this.setState({
      form: this.state.form + 1
    })
  }

  handlePurchase() {
    this.setState({
      form: 0,
      username: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardnumber: '',
      expirydate: '',
      cvv: '',
      billingzip: ''
    });
  }

  handleInputChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    })
  }

  render() {
    return this.forms[this.state.form]();
  }
}

var initialPage = function() {
  return (
    <div id='initial'>
      <div><button onClick={this.handleNextForm.bind(this)}>Checkout</button></div>
    </div>
  );
}

var form1 = function() {
  return (
    <div id='form-container'>
      <form id="form1" onSubmit={this.handleNextForm.bind(this)}>
        <input type="text" name="username" placeholder="username" required value={this.state.username} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="password" name="password" placeholder="password" required value={this.state.password} onChange={this.handleInputChange.bind(this)}/><br/>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

var form2 = function() {
  return (
    <div id='form-container'>
      <form id="form2" onSubmit={this.handleNextForm.bind(this)}>
        <input type="text" name="address1" placeholder="Address Line 1" required value={this.state.address1} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="address2" placeholder="Address Line 2" value={this.state.address2} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="city" placeholder="City" required value={this.state.city} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="state" placeholder="State" pattern="[A-Z]{2}" title="2 char state code (CA for california)" required value={this.state.state} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="zip" placeholder="Zip Code" pattern="[0-9]{5}" title="5-digit zip code" required value={this.state.zip} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="submit" value="Next"/>
      </form>
    </div>
  );
}

var form3 = function() {
  return (
    <div id='form-container' onSubmit={this.handleNextForm.bind(this)}>
      <form>
        <input type="text" name="cardnumber" placeholder="Credit Card Number" required value={this.state.cardnumber} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="expirydate" placeholder="Expiry Date" pattern="[0-9]{2}\/[0-9]{2}" title="mm/yy" required value={this.state.expirydate} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="cvv" placeholder="CVV" required value={this.state.cvv} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="text" name="billingzip" placeholder="Billing Zip Code" pattern="[0-9]{5}" title="5-digit zip code" required value={this.state.billingzip} onChange={this.handleInputChange.bind(this)}/><br/>
        <input type="submit" value="Finish"/>
      </form>
    </div>
  );
}

var confirm = function() {
  return (
    <div id="receipt-container">
      Username: {this.state.username}<br/>
      Address 1: {this.state.address1}<br/>
      Address 2: {this.state.address2}<br/>
      City: {this.state.city}<br/>
      State: {this.state.state}<br/>
      Zip Code: {this.state.zip}<br/>
      <br/>
      Card Number: {this.state.cardnumber}<br/>
      Expiry Date: {this.state.expirydate} CVV: {this.state.cvv}<br/>
      Billing Zip Code: {this.state.billingzip}<br/>
      <button onClick={this.handlePurchase.bind(this)}>Purchase</button>
    </div>
  )
}

window.App = App;
ReactDOM.render(<App />, document.getElementById('app'));
