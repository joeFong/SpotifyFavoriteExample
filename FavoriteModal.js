import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

export default class FavoriteModal extends React.Component {
  state = {
    modalVisible: false,
    liked: false
  };

  setModalVisible(visible, liked) {
    this.setState({ modalVisible: visible, liked: liked });

  }

  renderLikeStatus(liked) {
    return (
      liked ?
      <View style={styles.iconContainer}>
        <Ionicons name={'ios-heart'} style={styles.inputLikeIcon} />
        <Text style={styles.iconText}>Added!</Text>
      </View> :
      <View style={styles.iconContainer}>
        <Ionicons name={'ios-heart'} style={styles.inputDislikeIcon} />
        <Text style={styles.iconText}>Removed!</Text>
      </View>
    );
  }

  closeAfterSomeTime = (n) =>
    setTimeout(() => {
      this.setState({ modalVisible: false});
    }, n);

  render() {
    const { liked } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        onShow={this.closeAfterSomeTime.bind(this, 500)}
        visible={this.state.modalVisible}>
        <View style={styles.modal}>
          { this.renderLikeStatus(liked) }
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    width: hp('20%'),
    height: hp('20%'),
    alignSelf: 'center',
    borderRadius: 5,
    top: hp('40%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  inputLikeIcon: {
    color: '#17bca5',
    fontSize: 28,
  },
  inputDislikeIcon: {
    color: '#ff6044',
    fontSize: 28,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: '#949494',
    textAlign: 'center',
    fontSize: 20,
  }
});
