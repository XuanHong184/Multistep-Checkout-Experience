'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.forms = {
      0: initialPage.bind(_this),
      1: form1.bind(_this),
      2: form2.bind(_this),
      3: form3.bind(_this),
      4: confirm.bind(_this)
    };

    _this.state = {
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
    };
    return _this;
  }

  _createClass(App, [{
    key: 'serverPost',
    value: function serverPost(data) {
      $.ajax({
        url: '/' + data.type,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify(data),
        success: function success(response) {
          console.log(response);
        },
        error: function error(err) {
          console.error(err);
        }
      });
    }
  }, {
    key: 'handleNextForm',
    value: function handleNextForm(event) {
      event.preventDefault();
      if (this.state.form === 1) {
        var userObj = {
          type: 'users',
          username: this.state.username,
          password: this.state.password
        };
        this.serverPost(userObj);
      } else if (this.state.form === 2) {
        var addressObj = {
          type: 'address',
          username: this.state.username,
          line1: this.state.address1,
          line2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip
        };
        this.serverPost(addressObj);
      } else if (this.state.form === 3) {
        var cardObj = {
          type: 'cards',
          username: this.state.username,
          number: this.state.cardnumber,
          expiry: this.state.expirydate,
          cvv: this.state.cvv,
          zip: this.state.billingzip
        };
        this.serverPost(cardObj);
      }
      this.setState({
        form: this.state.form + 1
      });
    }
  }, {
    key: 'handlePurchase',
    value: function handlePurchase() {
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
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'render',
    value: function render() {
      return this.forms[this.state.form]();
    }
  }]);

  return App;
}(React.Component);

var initialPage = function initialPage() {
  return React.createElement(
    'div',
    { id: 'initial' },
    React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: this.handleNextForm.bind(this) },
        'Checkout'
      )
    )
  );
};

var form1 = function form1() {
  return React.createElement(
    'div',
    { id: 'form-container' },
    React.createElement(
      'form',
      { id: 'form1', onSubmit: this.handleNextForm.bind(this) },
      React.createElement('input', { type: 'text', name: 'username', placeholder: 'username', required: true, value: this.state.username, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'password', name: 'password', placeholder: 'password', required: true, value: this.state.password, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement(
        'button',
        { type: 'submit' },
        'Next'
      )
    )
  );
};

var form2 = function form2() {
  return React.createElement(
    'div',
    { id: 'form-container' },
    React.createElement(
      'form',
      { id: 'form2', onSubmit: this.handleNextForm.bind(this) },
      React.createElement('input', { type: 'text', name: 'address1', placeholder: 'Address Line 1', required: true, value: this.state.address1, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'address2', placeholder: 'Address Line 2', value: this.state.address2, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'city', placeholder: 'City', required: true, value: this.state.city, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'state', placeholder: 'State', pattern: '[A-Z]{2}', title: '2 char state code (CA for california)', required: true, value: this.state.state, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'zip', placeholder: 'Zip Code', pattern: '[0-9]{5}', title: '5-digit zip code', required: true, value: this.state.zip, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'submit', value: 'Next' })
    )
  );
};

var form3 = function form3() {
  return React.createElement(
    'div',
    { id: 'form-container', onSubmit: this.handleNextForm.bind(this) },
    React.createElement(
      'form',
      null,
      React.createElement('input', { type: 'text', name: 'cardnumber', placeholder: 'Credit Card Number', required: true, value: this.state.cardnumber, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'expirydate', placeholder: 'Expiry Date', pattern: '[0-9]{2}\\/[0-9]{2}', title: 'mm/yy', required: true, value: this.state.expirydate, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'cvv', placeholder: 'CVV', required: true, value: this.state.cvv, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'text', name: 'billingzip', placeholder: 'Billing Zip Code', pattern: '[0-9]{5}', title: '5-digit zip code', required: true, value: this.state.billingzip, onChange: this.handleInputChange.bind(this) }),
      React.createElement('br', null),
      React.createElement('input', { type: 'submit', value: 'Finish' })
    )
  );
};

var confirm = function confirm() {
  return React.createElement(
    'div',
    { id: 'receipt-container' },
    'Username: ',
    this.state.username,
    React.createElement('br', null),
    'Address 1: ',
    this.state.address1,
    React.createElement('br', null),
    'Address 2: ',
    this.state.address2,
    React.createElement('br', null),
    'City: ',
    this.state.city,
    React.createElement('br', null),
    'State: ',
    this.state.state,
    React.createElement('br', null),
    'Zip Code: ',
    this.state.zip,
    React.createElement('br', null),
    React.createElement('br', null),
    'Card Number: ',
    this.state.cardnumber,
    React.createElement('br', null),
    'Expiry Date: ',
    this.state.expirydate,
    ' CVV: ',
    this.state.cvv,
    React.createElement('br', null),
    'Billing Zip Code: ',
    this.state.billingzip,
    React.createElement('br', null),
    React.createElement(
      'button',
      { onClick: this.handlePurchase.bind(this) },
      'Purchase'
    )
  );
};

window.App = App;
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFNLEc7OztBQUVKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsU0FBRyxZQUFZLElBQVosT0FEUTtBQUVYLFNBQUcsTUFBTSxJQUFOLE9BRlE7QUFHWCxTQUFHLE1BQU0sSUFBTixPQUhRO0FBSVgsU0FBRyxNQUFNLElBQU4sT0FKUTtBQUtYLFNBQUcsUUFBUSxJQUFSO0FBTFEsS0FBYjs7QUFRQSxVQUFLLEtBQUwsR0FBYTtBQUNYLFlBQU0sQ0FESztBQUVYLGdCQUFVLEVBRkM7QUFHWCxnQkFBVSxFQUhDO0FBSVgsZ0JBQVUsRUFKQztBQUtYLGdCQUFVLEVBTEM7QUFNWCxZQUFNLEVBTks7QUFPWCxhQUFPLEVBUEk7QUFRWCxXQUFLLEVBUk07QUFTWCxrQkFBWSxFQVREO0FBVVgsa0JBQVksRUFWRDtBQVdYLFdBQUssRUFYTTtBQVlYLGtCQUFZO0FBWkQsS0FBYjtBQVhpQjtBQXlCbEI7Ozs7K0JBRVUsSSxFQUFNO0FBQ2YsUUFBRSxJQUFGLENBQU87QUFDTCxtQkFBUyxLQUFLLElBRFQ7QUFFTCxjQUFNLE1BRkQ7QUFHTCxrQkFBVSxNQUhMO0FBSUwsY0FBTSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBSkQ7QUFLTCxpQkFBUyxpQkFBUyxRQUFULEVBQW1CO0FBQzFCLGtCQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsU0FQSTtBQVFMLGVBQU8sZUFBUyxHQUFULEVBQWM7QUFDbkIsa0JBQVEsS0FBUixDQUFjLEdBQWQ7QUFDRDtBQVZJLE9BQVA7QUFZRDs7O21DQUVjLEssRUFBTztBQUNwQixZQUFNLGNBQU47QUFDQSxVQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsQ0FBdkIsRUFBMEI7QUFDeEIsWUFBSSxVQUFVO0FBQ1osZ0JBQU0sT0FETTtBQUVaLG9CQUFVLEtBQUssS0FBTCxDQUFXLFFBRlQ7QUFHWixvQkFBVSxLQUFLLEtBQUwsQ0FBVztBQUhULFNBQWQ7QUFLQSxhQUFLLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDRCxPQVBELE1BT08sSUFBRyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEtBQW9CLENBQXZCLEVBQTBCO0FBQy9CLFlBQUksYUFBYTtBQUNmLGdCQUFNLFNBRFM7QUFFZixvQkFBVSxLQUFLLEtBQUwsQ0FBVyxRQUZOO0FBR2YsaUJBQU8sS0FBSyxLQUFMLENBQVcsUUFISDtBQUlmLGlCQUFPLEtBQUssS0FBTCxDQUFXLFFBSkg7QUFLZixnQkFBTSxLQUFLLEtBQUwsQ0FBVyxJQUxGO0FBTWYsaUJBQU8sS0FBSyxLQUFMLENBQVcsS0FOSDtBQU9mLGVBQUssS0FBSyxLQUFMLENBQVc7QUFQRCxTQUFqQjtBQVNBLGFBQUssVUFBTCxDQUFnQixVQUFoQjtBQUNELE9BWE0sTUFXQSxJQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsQ0FBdkIsRUFBMEI7QUFDL0IsWUFBSSxVQUFVO0FBQ1osZ0JBQU0sT0FETTtBQUVaLG9CQUFVLEtBQUssS0FBTCxDQUFXLFFBRlQ7QUFHWixrQkFBUSxLQUFLLEtBQUwsQ0FBVyxVQUhQO0FBSVosa0JBQVEsS0FBSyxLQUFMLENBQVcsVUFKUDtBQUtaLGVBQUssS0FBSyxLQUFMLENBQVcsR0FMSjtBQU1aLGVBQUssS0FBSyxLQUFMLENBQVc7QUFOSixTQUFkO0FBUUEsYUFBSyxVQUFMLENBQWdCLE9BQWhCO0FBQ0Q7QUFDRCxXQUFLLFFBQUwsQ0FBYztBQUNaLGNBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQjtBQURaLE9BQWQ7QUFHRDs7O3FDQUVnQjtBQUNmLFdBQUssUUFBTCxDQUFjO0FBQ1osY0FBTSxDQURNO0FBRVosa0JBQVUsRUFGRTtBQUdaLGtCQUFVLEVBSEU7QUFJWixrQkFBVSxFQUpFO0FBS1osa0JBQVUsRUFMRTtBQU1aLGNBQU0sRUFOTTtBQU9aLGVBQU8sRUFQSztBQVFaLGFBQUssRUFSTztBQVNaLG9CQUFZLEVBVEE7QUFVWixvQkFBWSxFQVZBO0FBV1osYUFBSyxFQVhPO0FBWVosb0JBQVk7QUFaQSxPQUFkO0FBY0Q7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksU0FBUyxNQUFNLE1BQW5CO0FBQ0EsVUFBSSxRQUFRLE9BQU8sS0FBbkI7QUFDQSxVQUFJLE9BQU8sT0FBTyxJQUFsQjtBQUNBLFdBQUssUUFBTCxxQkFDRyxJQURILEVBQ1UsS0FEVjtBQUdEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLElBQXRCLEdBQVA7QUFDRDs7OztFQTVHZSxNQUFNLFM7O0FBK0d4QixJQUFJLGNBQWMsU0FBZCxXQUFjLEdBQVc7QUFDM0IsU0FDRTtBQUFBO0FBQUEsTUFBSyxJQUFHLFNBQVI7QUFDRTtBQUFBO0FBQUE7QUFBSztBQUFBO0FBQUEsVUFBUSxTQUFTLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFqQjtBQUFBO0FBQUE7QUFBTDtBQURGLEdBREY7QUFLRCxDQU5EOztBQVFBLElBQUksUUFBUSxTQUFSLEtBQVEsR0FBVztBQUNyQixTQUNFO0FBQUE7QUFBQSxNQUFLLElBQUcsZ0JBQVI7QUFDRTtBQUFBO0FBQUEsUUFBTSxJQUFHLE9BQVQsRUFBaUIsVUFBVSxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBM0I7QUFDRSxxQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxhQUFZLFVBQS9DLEVBQTBELGNBQTFELEVBQW1FLE9BQU8sS0FBSyxLQUFMLENBQVcsUUFBckYsRUFBK0YsVUFBVSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQXpHLEdBREY7QUFDK0kscUNBRC9JO0FBRUUscUNBQU8sTUFBSyxVQUFaLEVBQXVCLE1BQUssVUFBNUIsRUFBdUMsYUFBWSxVQUFuRCxFQUE4RCxjQUE5RCxFQUF1RSxPQUFPLEtBQUssS0FBTCxDQUFXLFFBQXpGLEVBQW1HLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUE3RyxHQUZGO0FBRW1KLHFDQUZuSjtBQUdFO0FBQUE7QUFBQSxVQUFRLE1BQUssUUFBYjtBQUFBO0FBQUE7QUFIRjtBQURGLEdBREY7QUFTRCxDQVZEOztBQVlBLElBQUksUUFBUSxTQUFSLEtBQVEsR0FBVztBQUNyQixTQUNFO0FBQUE7QUFBQSxNQUFLLElBQUcsZ0JBQVI7QUFDRTtBQUFBO0FBQUEsUUFBTSxJQUFHLE9BQVQsRUFBaUIsVUFBVSxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBM0I7QUFDRSxxQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxhQUFZLGdCQUEvQyxFQUFnRSxjQUFoRSxFQUF5RSxPQUFPLEtBQUssS0FBTCxDQUFXLFFBQTNGLEVBQXFHLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUEvRyxHQURGO0FBQ3FKLHFDQURySjtBQUVFLHFDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLFVBQXhCLEVBQW1DLGFBQVksZ0JBQS9DLEVBQWdFLE9BQU8sS0FBSyxLQUFMLENBQVcsUUFBbEYsRUFBNEYsVUFBVSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQXRHLEdBRkY7QUFFNEkscUNBRjVJO0FBR0UscUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssTUFBeEIsRUFBK0IsYUFBWSxNQUEzQyxFQUFrRCxjQUFsRCxFQUEyRCxPQUFPLEtBQUssS0FBTCxDQUFXLElBQTdFLEVBQW1GLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUE3RixHQUhGO0FBR21JLHFDQUhuSTtBQUlFLHFDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE9BQXhCLEVBQWdDLGFBQVksT0FBNUMsRUFBb0QsU0FBUSxVQUE1RCxFQUF1RSxPQUFNLHVDQUE3RSxFQUFxSCxjQUFySCxFQUE4SCxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQWhKLEVBQXVKLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFqSyxHQUpGO0FBSXVNLHFDQUp2TTtBQUtFLHFDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLEtBQXhCLEVBQThCLGFBQVksVUFBMUMsRUFBcUQsU0FBUSxVQUE3RCxFQUF3RSxPQUFNLGtCQUE5RSxFQUFpRyxjQUFqRyxFQUEwRyxPQUFPLEtBQUssS0FBTCxDQUFXLEdBQTVILEVBQWlJLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUEzSSxHQUxGO0FBS2lMLHFDQUxqTDtBQU1FLHFDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLE1BQTNCO0FBTkY7QUFERixHQURGO0FBWUQsQ0FiRDs7QUFlQSxJQUFJLFFBQVEsU0FBUixLQUFRLEdBQVc7QUFDckIsU0FDRTtBQUFBO0FBQUEsTUFBSyxJQUFHLGdCQUFSLEVBQXlCLFVBQVUsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQW5DO0FBQ0U7QUFBQTtBQUFBO0FBQ0UscUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssWUFBeEIsRUFBcUMsYUFBWSxvQkFBakQsRUFBc0UsY0FBdEUsRUFBK0UsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUFqRyxFQUE2RyxVQUFVLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBdkgsR0FERjtBQUM2SixxQ0FEN0o7QUFFRSxxQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxZQUF4QixFQUFxQyxhQUFZLGFBQWpELEVBQStELFNBQVEscUJBQXZFLEVBQTRGLE9BQU0sT0FBbEcsRUFBMEcsY0FBMUcsRUFBbUgsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUFySSxFQUFpSixVQUFVLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBM0osR0FGRjtBQUVpTSxxQ0FGak07QUFHRSxxQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxLQUF4QixFQUE4QixhQUFZLEtBQTFDLEVBQWdELGNBQWhELEVBQXlELE9BQU8sS0FBSyxLQUFMLENBQVcsR0FBM0UsRUFBZ0YsVUFBVSxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQTFGLEdBSEY7QUFHZ0kscUNBSGhJO0FBSUUscUNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssWUFBeEIsRUFBcUMsYUFBWSxrQkFBakQsRUFBb0UsU0FBUSxVQUE1RSxFQUF1RixPQUFNLGtCQUE3RixFQUFnSCxjQUFoSCxFQUF5SCxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQTNJLEVBQXVKLFVBQVUsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFqSyxHQUpGO0FBSXVNLHFDQUp2TTtBQUtFLHFDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFFBQTNCO0FBTEY7QUFERixHQURGO0FBV0QsQ0FaRDs7QUFjQSxJQUFJLFVBQVUsU0FBVixPQUFVLEdBQVc7QUFDdkIsU0FDRTtBQUFBO0FBQUEsTUFBSyxJQUFHLG1CQUFSO0FBQUE7QUFDYSxTQUFLLEtBQUwsQ0FBVyxRQUR4QjtBQUNpQyxtQ0FEakM7QUFBQTtBQUVjLFNBQUssS0FBTCxDQUFXLFFBRnpCO0FBRWtDLG1DQUZsQztBQUFBO0FBR2MsU0FBSyxLQUFMLENBQVcsUUFIekI7QUFHa0MsbUNBSGxDO0FBQUE7QUFJUyxTQUFLLEtBQUwsQ0FBVyxJQUpwQjtBQUl5QixtQ0FKekI7QUFBQTtBQUtVLFNBQUssS0FBTCxDQUFXLEtBTHJCO0FBSzJCLG1DQUwzQjtBQUFBO0FBTWEsU0FBSyxLQUFMLENBQVcsR0FOeEI7QUFNNEIsbUNBTjVCO0FBT0UsbUNBUEY7QUFBQTtBQVFnQixTQUFLLEtBQUwsQ0FBVyxVQVIzQjtBQVFzQyxtQ0FSdEM7QUFBQTtBQVNnQixTQUFLLEtBQUwsQ0FBVyxVQVQzQjtBQUFBO0FBUzZDLFNBQUssS0FBTCxDQUFXLEdBVHhEO0FBUzRELG1DQVQ1RDtBQUFBO0FBVXFCLFNBQUssS0FBTCxDQUFXLFVBVmhDO0FBVTJDLG1DQVYzQztBQVdFO0FBQUE7QUFBQSxRQUFRLFNBQVMsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWpCO0FBQUE7QUFBQTtBQVhGLEdBREY7QUFlRCxDQWhCRDs7QUFrQkEsT0FBTyxHQUFQLEdBQWEsR0FBYjtBQUNBLFNBQVMsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUF6QiIsImZpbGUiOiJjb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBcbiAgICB0aGlzLmZvcm1zID0ge1xuICAgICAgMDogaW5pdGlhbFBhZ2UuYmluZCh0aGlzKSxcbiAgICAgIDE6IGZvcm0xLmJpbmQodGhpcyksXG4gICAgICAyOiBmb3JtMi5iaW5kKHRoaXMpLFxuICAgICAgMzogZm9ybTMuYmluZCh0aGlzKSxcbiAgICAgIDQ6IGNvbmZpcm0uYmluZCh0aGlzKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmb3JtOiAwLFxuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgYWRkcmVzczE6ICcnLFxuICAgICAgYWRkcmVzczI6ICcnLFxuICAgICAgY2l0eTogJycsXG4gICAgICBzdGF0ZTogJycsXG4gICAgICB6aXA6ICcnLFxuICAgICAgY2FyZG51bWJlcjogJycsXG4gICAgICBleHBpcnlkYXRlOiAnJyxcbiAgICAgIGN2djogJycsXG4gICAgICBiaWxsaW5nemlwOiAnJ1xuICAgIH1cbiAgfVxuXG4gIHNlcnZlclBvc3QoZGF0YSkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGAvJHtkYXRhLnR5cGV9YCxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGFUeXBlOiAndGV4dCcsXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTmV4dEZvcm0oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKHRoaXMuc3RhdGUuZm9ybSA9PT0gMSkge1xuICAgICAgdmFyIHVzZXJPYmogPSB7XG4gICAgICAgIHR5cGU6ICd1c2VycycsXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZFxuICAgICAgfVxuICAgICAgdGhpcy5zZXJ2ZXJQb3N0KHVzZXJPYmopO1xuICAgIH0gZWxzZSBpZih0aGlzLnN0YXRlLmZvcm0gPT09IDIpIHtcbiAgICAgIHZhciBhZGRyZXNzT2JqID0ge1xuICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnN0YXRlLnVzZXJuYW1lLFxuICAgICAgICBsaW5lMTogdGhpcy5zdGF0ZS5hZGRyZXNzMSxcbiAgICAgICAgbGluZTI6IHRoaXMuc3RhdGUuYWRkcmVzczIsXG4gICAgICAgIGNpdHk6IHRoaXMuc3RhdGUuY2l0eSxcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUuc3RhdGUsXG4gICAgICAgIHppcDogdGhpcy5zdGF0ZS56aXBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VydmVyUG9zdChhZGRyZXNzT2JqKTtcbiAgICB9IGVsc2UgaWYodGhpcy5zdGF0ZS5mb3JtID09PSAzKSB7XG4gICAgICB2YXIgY2FyZE9iaiA9IHtcbiAgICAgICAgdHlwZTogJ2NhcmRzJyxcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsXG4gICAgICAgIG51bWJlcjogdGhpcy5zdGF0ZS5jYXJkbnVtYmVyLFxuICAgICAgICBleHBpcnk6IHRoaXMuc3RhdGUuZXhwaXJ5ZGF0ZSxcbiAgICAgICAgY3Z2OiB0aGlzLnN0YXRlLmN2dixcbiAgICAgICAgemlwOiB0aGlzLnN0YXRlLmJpbGxpbmd6aXBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VydmVyUG9zdChjYXJkT2JqKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmb3JtOiB0aGlzLnN0YXRlLmZvcm0gKyAxXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZVB1cmNoYXNlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9ybTogMCxcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIGFkZHJlc3MxOiAnJyxcbiAgICAgIGFkZHJlc3MyOiAnJyxcbiAgICAgIGNpdHk6ICcnLFxuICAgICAgc3RhdGU6ICcnLFxuICAgICAgemlwOiAnJyxcbiAgICAgIGNhcmRudW1iZXI6ICcnLFxuICAgICAgZXhwaXJ5ZGF0ZTogJycsXG4gICAgICBjdnY6ICcnLFxuICAgICAgYmlsbGluZ3ppcDogJydcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgdmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdmFyIG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIFtuYW1lXTogdmFsdWVcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm1zW3RoaXMuc3RhdGUuZm9ybV0oKTtcbiAgfVxufVxuXG52YXIgaW5pdGlhbFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPSdpbml0aWFsJz5cbiAgICAgIDxkaXY+PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZU5leHRGb3JtLmJpbmQodGhpcyl9PkNoZWNrb3V0PC9idXR0b24+PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbnZhciBmb3JtMSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9J2Zvcm0tY29udGFpbmVyJz5cbiAgICAgIDxmb3JtIGlkPVwiZm9ybTFcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVOZXh0Rm9ybS5iaW5kKHRoaXMpfT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVzZXJuYW1lXCIgcGxhY2Vob2xkZXI9XCJ1c2VybmFtZVwiIHJlcXVpcmVkIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfS8+PGJyLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIiByZXF1aXJlZCB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKX0vPjxici8+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPk5leHQ8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxudmFyIGZvcm0yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD0nZm9ybS1jb250YWluZXInPlxuICAgICAgPGZvcm0gaWQ9XCJmb3JtMlwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZU5leHRGb3JtLmJpbmQodGhpcyl9PlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczFcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MgTGluZSAxXCIgcmVxdWlyZWQgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzczF9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9Lz48YnIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczJcIiBwbGFjZWhvbGRlcj1cIkFkZHJlc3MgTGluZSAyXCIgdmFsdWU9e3RoaXMuc3RhdGUuYWRkcmVzczJ9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9Lz48YnIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIHBsYWNlaG9sZGVyPVwiQ2l0eVwiIHJlcXVpcmVkIHZhbHVlPXt0aGlzLnN0YXRlLmNpdHl9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9Lz48YnIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdGVcIiBwbGFjZWhvbGRlcj1cIlN0YXRlXCIgcGF0dGVybj1cIltBLVpdezJ9XCIgdGl0bGU9XCIyIGNoYXIgc3RhdGUgY29kZSAoQ0EgZm9yIGNhbGlmb3JuaWEpXCIgcmVxdWlyZWQgdmFsdWU9e3RoaXMuc3RhdGUuc3RhdGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9Lz48YnIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiemlwXCIgcGxhY2Vob2xkZXI9XCJaaXAgQ29kZVwiIHBhdHRlcm49XCJbMC05XXs1fVwiIHRpdGxlPVwiNS1kaWdpdCB6aXAgY29kZVwiIHJlcXVpcmVkIHZhbHVlPXt0aGlzLnN0YXRlLnppcH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKX0vPjxici8+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIvPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG52YXIgZm9ybTMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPSdmb3JtLWNvbnRhaW5lcicgb25TdWJtaXQ9e3RoaXMuaGFuZGxlTmV4dEZvcm0uYmluZCh0aGlzKX0+XG4gICAgICA8Zm9ybT5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNhcmRudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkNyZWRpdCBDYXJkIE51bWJlclwiIHJlcXVpcmVkIHZhbHVlPXt0aGlzLnN0YXRlLmNhcmRudW1iZXJ9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9Lz48YnIvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwaXJ5ZGF0ZVwiIHBsYWNlaG9sZGVyPVwiRXhwaXJ5IERhdGVcIiBwYXR0ZXJuPVwiWzAtOV17Mn1cXC9bMC05XXsyfVwiIHRpdGxlPVwibW0veXlcIiByZXF1aXJlZCB2YWx1ZT17dGhpcy5zdGF0ZS5leHBpcnlkYXRlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfS8+PGJyLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImN2dlwiIHBsYWNlaG9sZGVyPVwiQ1ZWXCIgcmVxdWlyZWQgdmFsdWU9e3RoaXMuc3RhdGUuY3Z2fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfS8+PGJyLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJpbGxpbmd6aXBcIiBwbGFjZWhvbGRlcj1cIkJpbGxpbmcgWmlwIENvZGVcIiBwYXR0ZXJuPVwiWzAtOV17NX1cIiB0aXRsZT1cIjUtZGlnaXQgemlwIGNvZGVcIiByZXF1aXJlZCB2YWx1ZT17dGhpcy5zdGF0ZS5iaWxsaW5nemlwfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfS8+PGJyLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkZpbmlzaFwiLz5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxudmFyIGNvbmZpcm0gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwicmVjZWlwdC1jb250YWluZXJcIj5cbiAgICAgIFVzZXJuYW1lOiB7dGhpcy5zdGF0ZS51c2VybmFtZX08YnIvPlxuICAgICAgQWRkcmVzcyAxOiB7dGhpcy5zdGF0ZS5hZGRyZXNzMX08YnIvPlxuICAgICAgQWRkcmVzcyAyOiB7dGhpcy5zdGF0ZS5hZGRyZXNzMn08YnIvPlxuICAgICAgQ2l0eToge3RoaXMuc3RhdGUuY2l0eX08YnIvPlxuICAgICAgU3RhdGU6IHt0aGlzLnN0YXRlLnN0YXRlfTxici8+XG4gICAgICBaaXAgQ29kZToge3RoaXMuc3RhdGUuemlwfTxici8+XG4gICAgICA8YnIvPlxuICAgICAgQ2FyZCBOdW1iZXI6IHt0aGlzLnN0YXRlLmNhcmRudW1iZXJ9PGJyLz5cbiAgICAgIEV4cGlyeSBEYXRlOiB7dGhpcy5zdGF0ZS5leHBpcnlkYXRlfSBDVlY6IHt0aGlzLnN0YXRlLmN2dn08YnIvPlxuICAgICAgQmlsbGluZyBaaXAgQ29kZToge3RoaXMuc3RhdGUuYmlsbGluZ3ppcH08YnIvPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZVB1cmNoYXNlLmJpbmQodGhpcyl9PlB1cmNoYXNlPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIClcbn1cblxud2luZG93LkFwcCA9IEFwcDtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuXG4iXX0=
