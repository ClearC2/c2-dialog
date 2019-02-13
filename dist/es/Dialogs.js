function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDialog, dialogs } from './redux';
import Dialog from './Dialog';

var Dialogs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dialogs, _React$Component);

  function Dialogs() {
    _classCallCheck(this, Dialogs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dialogs).apply(this, arguments));
  }

  _createClass(Dialogs, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          dialogs = _this$props.dialogs,
          components = _this$props.components,
          dialogProps = _objectWithoutProperties(_this$props, ["dialogs", "components"]);

      return React.createElement("div", {
        style: {
          height: 0
        }
      }, dialogs.map(function (dialog, i) {
        var Component = components[dialog.get('component')];
        var componentProps = (dialog.get('props') || Map()).toJS();

        if (!Component) {
          console.error("Invalid dialog component: ".concat(dialog.get('component')));
          return React.createElement("div", {
            key: "invalid-".concat(i)
          });
        }

        return React.createElement(Dialog, _extends({
          key: dialog.get('id')
        }, dialogProps), Component ? React.createElement(Component, _extends({}, componentProps, {
          close: function close() {
            return _this.props.closeDialog(dialog.get('id'));
          }
        })) : null);
      }));
    }
  }]);

  return Dialogs;
}(React.Component);

_defineProperty(Dialogs, "propTypes", {
  dialogs: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired
});

function props(state, props) {
  return {
    dialogs: dialogs(state, props)
  };
}

export default connect(props, {
  closeDialog: closeDialog
})(Dialogs);