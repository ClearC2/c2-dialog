'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('./redux');

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialogs = function (_React$Component) {
  _inherits(Dialogs, _React$Component);

  function Dialogs() {
    _classCallCheck(this, Dialogs);

    return _possibleConstructorReturn(this, (Dialogs.__proto__ || Object.getPrototypeOf(Dialogs)).apply(this, arguments));
  }

  _createClass(Dialogs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          dialogs = _props.dialogs,
          components = _props.components,
          dialogProps = _objectWithoutProperties(_props, ['dialogs', 'components']);

      return _react2.default.createElement(
        'div',
        { style: { height: 0 } },
        dialogs.map(function (dialog, i) {
          var Component = components[dialog.get('component')];
          var componentProps = (dialog.get('props') || Map()).toJS();
          if (!Component) {
            console.error('Invalid dialog component: ' + dialog.get('component'));
            return _react2.default.createElement('div', { key: 'invalid-' + i });
          }
          return _react2.default.createElement(
            _Dialog2.default,
            _extends({
              key: dialog.get('id')
            }, dialogProps),
            Component ? _react2.default.createElement(Component, _extends({}, componentProps, {
              close: function close() {
                return _this2.props.closeDialog(dialog.get('id'));
              }
            })) : null
          );
        })
      );
    }
  }]);

  return Dialogs;
}(_react2.default.Component);

Dialogs.propTypes = {
  dialogs: _propTypes2.default.object.isRequired,
  closeDialog: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.object.isRequired
};


function props(state, props) {
  return { dialogs: (0, _redux.dialogs)(state, props) };
}

exports.default = (0, _reactRedux.connect)(props, { closeDialog: _redux.closeDialog })(Dialogs);