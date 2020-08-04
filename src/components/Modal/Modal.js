import React,{Component} from 'react'
import classes from './Modal.module.css';
import BackDrop from "../BackDrop/BackDrop"
import Spinner from "../Spinner/Spinner"
class Modal extends Component{
   render(){
  return(
    <div>
    <BackDrop show={this.props.show } close={this.props.close}/>
    <div className={classes.Modal}
    style={{transform:this.props.show ? "translateY(0)":"translateY(-100vh)",
            opacity:this.props.show? "1" : "0"}}>
      <Spinner />
    </div>
    </div>
  )
}
}

export default Modal;