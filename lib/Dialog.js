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

var _reactRnd = require('react-rnd');

var _reactRnd2 = _interopRequireDefault(_reactRnd);

var _reactPortal = require('react-portal');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var zIndex = 2000;
var backdropZIndex = 1999;

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _initialiseProps.call(_this);

    var defaultProps = props.default || {};
    _this.state = _extends({}, defaultProps, {
      dragged: false
    });
    return _this;
  }

  _createClass(Dialog, [{
    key: 'render',
    value: function render() {
      var center = this.props.center;

      var width = this.props.default.width;
      var x = center && width ? window.innerWidth / 2 - width / 2 : this.props.default.x;
      var defaultProps = _extends({}, this.props.default, { x: x });
      var rnd = this.renderRnd(defaultProps);
      if (this.props.inline) return rnd;
      var backdropStyle = _extends({ position: 'fixed', top: 0, zIndex: backdropZIndex }, this.props.backdropStyle);
      return _react2.default.createElement(
        _reactPortal.Portal,
        { node: this.props.node },
        _react2.default.createElement(
          'div',
          { style: backdropStyle },
          rnd
        )
      );
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  default: _propTypes2.default.object,
  center: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  backdropStyle: _propTypes2.default.object,
  node: _propTypes2.default.object
};
Dialog.defaultProps = {
  default: {},
  center: false,
  backdropStyle: {},
  inline: false,
  node: null
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentDidMount = function () {
    _this2.updateZIndex();
    (0, _jquery2.default)(window).resize(_this2.onResize);
  };

  this.componentWillUnmount = function () {
    (0, _jquery2.default)(window).off("resize", _this2.onResize);
  };

  this.onResize = function () {
    return _this2.center();
  };

  this.center = function (width) {
    if (_this2.props.center && !_this2.state.dragged) {
      width = width || _this2.state.width;
      var x = window.innerWidth / 2 - width / 2;
      _this2.rnd.updatePosition({ x: x });
    }
  };

  this.updateZIndex = function () {
    _this2.rnd.updateZIndex(++zIndex);
  };

  this.renderRnd = function (defaultProps) {
    return _react2.default.createElement(_reactRnd2.default, _extends({}, _this2.props, {
      'default': defaultProps,
      ref: function ref(rnd) {
        _this2.rnd = rnd;
      },
      onDrag: function () {
        var _props;

        this.updateZIndex();
        this.setState({ dragged: true });
        if (this.props.onDrag) (_props = this.props).onDrag.apply(_props, arguments);
      }.bind(_this2),
      onDragStop: function () {
        var _props2;

        this.updateZIndex();
        this.setState({ dragged: true });
        if (this.props.onDragStop) (_props2 = this.props).onDragStop.apply(_props2, arguments);
      }.bind(_this2),
      onResizeStop: function (a, b, c, delta) {
        var _props3;

        this.updateZIndex();
        var width = this.state.width + delta.width;
        this.setState({ width: width });
        this.center(width);
        if (this.props.onResizeStop) (_props3 = this.props).onResizeStop.apply(_props3, arguments);
      }.bind(_this2)
    }));
  };
};

exports.default = Dialog;