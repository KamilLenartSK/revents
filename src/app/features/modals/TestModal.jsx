import React from 'react'
import { Modal, ModalHeader, ModalContent, ModalDescription } from 'semantic-ui-react';


const TestModal = ({onClose}) => {
  return (
  <Modal closeIcon={'close'} open={true} onClose={onClose}>
  <ModalHeader> Test Modal</ModalHeader>
  <ModalContent>
      <ModalDescription><p>Test Modal.....</p></ModalDescription>
  </ModalContent>
  </Modal>
  )
}

export default TestModal
