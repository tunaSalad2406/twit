import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import PropTypes from 'prop-types';

const ModalComponent = ({ children, open, toggle, large }) => {
  const toggleModal = () => {
    toggle()
  };
  return (
    <Modal isVisible={open} onBackdropPress={toggleModal} onBackdropPress={toggle}>
      <View style={large ? styles.largeModalContent : styles.modalContent}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  modalContent: { flex: 0.7, backgroundColor: 'white', paddingVertical: 10, borderRadius: 5 },
  largeModalContent: { flex: 0.9, backgroundColor: 'white', paddingVertical: 10, borderRadius: 5 },
})

ModalComponent.propsTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  large: PropTypes.bool
}

ModalComponent.defaultProps = {
  large: false
}

export default ModalComponent
