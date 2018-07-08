import React from 'react'
import { connect } from 'react-redux';
import TestModal from './TestModal';
import * as dispatchActions from './modalActions';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
    TestModal,
    RegisterModal,
    LoginModal

}
const ModalManager = ({currentModal,closeModal}) => {
    let renderedModal;
  if(currentModal){
      const {modalType,modalProps}= currentModal;
      const ModalComponent = modalLookup[modalType];
      renderedModal = <ModalComponent onClose={closeModal} {...modalProps}/>

  }
    return <span>{renderedModal}</span>
}

const mapStateToProps = ({modals})=>{
   return {currentModal: modals}
}


export default connect(mapStateToProps,dispatchActions)( ModalManager)

