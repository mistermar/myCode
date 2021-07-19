import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.less";
import _ from "lodash";

class BaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeM: this.props.closeFn
    };

    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.state.closeM();
    }
    if (event.keyCode === 13) {
      this.props.save();
    }
  }

  keyPress = event => {
    //TODO сделать обработку, чтобы не затрагивался DRAG and DROP
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    //document.addEventListener("mousedown",this.keyPress,false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  closeModal=(e)=>{
    const { title } = this.props;

    if(e.target.className.indexOf("modalsRan") === 0 && title &&   title.indexOf("Riders Import") === 0){
      if(this.props.saveBtn.indexOf("Done")>-1){
        this.props.canceled()
      }

      return false
    }

    if(typeof(e.target.className)===`string` && e.target.className.indexOf("modalsRan") > -1){
      this.props.closeFn();
    }
  }

  render() {
    const { title } = this.props;
    const content = this.props.children;
    const addClass = this.props.class;
    const close = this.props.close;
    const closeM = this.props.closeFn;
    let dopClass = this.props.dopClass ? this.props.dopClass : "";

    return ReactDOM.createPortal(
      <div
        id={this.props.id && this.props.id}
        className={
          `modalsRan`
        }
        onMouseDown={(e)=>{
          e.persist()
          if((e.clientX + 10) >= e.target.clientWidth) return;
          this.closeModal(e)
        }}
      >
        <div
          className={`open modal ${
            addClass ? addClass : " open " + dopClass
          }`}
        >
          <div
            onClick={closeM}
            className={
              close ? close : "closeM" + " " + this.props.class + " open"
            }
          />
          {!_.isEmpty(title) ? (
            <div id={this.props.id && this.props.id} className="header">
              <span>{title}</span>
            </div>
          ) : null}

          {content}
        </div>
      </div>,
      document.body
    );
  }
}

export default BaseModal;
