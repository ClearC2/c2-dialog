function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import { Portal } from 'react-portal';
import $ from 'jquery';
var zIndex = 2000;
var portalNode = null;
export function setPortalNode(node) {
  portalNode = node;
}

var Dialog =
/*#__PURE__*/
function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(_props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dialog).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      return _this.center();
    });

    _defineProperty(_assertThisInitialized(_this), "center", function (width) {
      if (_this.props.center && !_this.state.dragged) {
        width = width || _this.state.width;
        var x = window.innerWidth / 2 - width / 2;

        _this.rnd.updatePosition({
          x: x
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateZIndex", function () {
      ++zIndex;

      _this.setState({
        zIndex: zIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderRnd", function (defaultProps) {
      var _this$props = _this.props,
          inline = _this$props.inline,
          center = _this$props.center,
          backdropStyle = _this$props.backdropStyle,
          style = _this$props.style,
          getRnd = _this$props.getRnd,
          zIndex = _this$props.zIndex,
          props = _objectWithoutProperties(_this$props, ["inline", "center", "backdropStyle", "style", "getRnd", "zIndex"]);

      if (zIndex) style.zIndex = zIndex;else style.zIndex = _this.state.zIndex;
      return React.createElement(Rnd, _extends({}, props, {
        style: style,
        default: defaultProps,
        ref: function ref(rnd) {
          _this.rnd = rnd;
          if (rnd) getRnd(rnd);
        },
        onDrag: function () {
          var _this$props2;

          this.updateZIndex();
          this.setState({
            dragged: true
          });
          if (this.props.onDrag) (_this$props2 = this.props).onDrag.apply(_this$props2, arguments);
        }.bind(_assertThisInitialized(_this)),
        onDragStop: function () {
          var _this$props3;

          this.updateZIndex();
          this.setState({
            dragged: true
          });
          if (this.props.onDragStop) (_this$props3 = this.props).onDragStop.apply(_this$props3, arguments);
        }.bind(_assertThisInitialized(_this)),
        onResizeStop: function (a, b, c, delta) {
          var _this$props4;

          this.updateZIndex();
          var width = this.state.width + delta.width;
          this.setState({
            width: width
          });
          this.center(width);
          if (this.props.onResizeStop) (_this$props4 = this.props).onResizeStop.apply(_this$props4, arguments);
        }.bind(_assertThisInitialized(_this))
      }));
    });

    var _defaultProps = _props.default || {};

    _this.state = _objectSpread({}, _defaultProps, {
      dragged: false,
      zIndex: zIndex
    });
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateZIndex();
      $(window).resize(this.onResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      $(window).off('resize', this.onResize);
    }
  }, {
    key: "render",
    value: function render() {
      var center = this.props.center;
      var width = this.props.default.width;
      var x = center && width ? window.innerWidth / 2 - width / 2 : this.props.default.x;

      var defaultProps = _objectSpread({}, this.props.default, {
        x: x
      });

      var rnd = this.renderRnd(defaultProps);
      if (this.props.inline) return rnd;
      return React.createElement(Portal, {
        node: this.props.node || portalNode
      }, this.props.backdropStyle ? React.createElement("div", {
        style: this.props.backdropStyle
      }, rnd) : rnd);
    }
  }]);

  return Dialog;
}(Component);

_defineProperty(Dialog, "propTypes", {
  default: PropTypes.object,
  center: PropTypes.bool,
  inline: PropTypes.bool,
  backdropStyle: PropTypes.object,
  node: PropTypes.object,
  getRnd: PropTypes.func,
  zIndex: PropTypes.number
});

_defineProperty(Dialog, "defaultProps", {
  default: {},
  center: false,
  backdropStyle: null,
  inline: false,
  node: null,
  style: {},
  getRnd: function getRnd() {}
});

export { Dialog as default };