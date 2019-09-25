import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import FavoriteModal from './FavoriteModal'; 

export default class SpotifyFavoriteExample extends React.Component {
  state = {
    favoriteModal: null,
    dataSource: [
      {
        id: 1,
        name: 'Song 1',
        favorite: false
      },
      {
        id: 2,
        name: 'Song 2',
        favorite: false
      },
      {
        id: 3,
        name: 'Song 3',
        favorite: false
      }
    ]
  }

  constructor(props) {
    super(props);

    this.rowSwipeAnimatedValues = [];
    this.rowSwipeIconsShow = [];
    this.rowSwipeIconsHide = [];
    this.rowSwipeIconsMove = [];

    this.renderItem = this.renderItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.onSwipeValueChange = this.onSwipeValueChange.bind(this);

    Array(this.state.dataSource.length).fill('').forEach((_, i) => {
      this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

    Array(this.state.dataSource.length).fill('').forEach((_, i) => {
      this.rowSwipeIconsShow[`${i}`] = new Animated.Value(0);
    });

    Array(this.state.dataSource.length).fill('').forEach((_, i) => {
      this.rowSwipeIconsHide[`${i}`] = new Animated.Value(0);
    });

    Array(this.state.dataSource.length).fill('').forEach((_, i) => {
      this.rowSwipeIconsMove[`${i}`] = new Animated.Value(0);
    });
  }

  _keyExtractor(item) { 
    return item.id.toString();
  }

  favoriteItem(rowKey, rowMap) {
    const { dataSource } = this.state; 

    rowMap[rowKey].closeRow();

    const prevIndex = dataSource.findIndex(item => item.id == rowKey);
    
    this.state.favoriteModal.setModalVisible(true, !dataSource[prevIndex].favorite);
    
    dataSource[prevIndex].favorite = !dataSource[prevIndex].favorite; 

    var newDataSource = dataSource;

    this.setState({
      dataSource: newDataSource
    }); 
  
  }

  onSwipeValueChange(swipeData, key) {
    if(swipeData.value < -140) {
      this.rowSwipeAnimatedValues[key].setValue(Math.abs(100));
      this.rowSwipeIconsShow[key].setValue(Math.abs(180));
      this.rowSwipeIconsHide[key].setValue(Math.abs(0));
    } else {
      this.rowSwipeAnimatedValues[key].setValue(Math.abs(0));
      this.rowSwipeIconsShow[key].setValue(Math.abs(0));
      this.rowSwipeIconsHide[key].setValue(Math.abs(100));
    }

    this.rowSwipeIconsMove[key].setValue(Math.abs(swipeData.value));
  }

  renderItem(item, index) {
    let like_color = !item.user_liked ? '#17bca5' : '#ff6044';

    let animatedStyle, frontAnimatedStyle, backAnimatedStyle, iconAnimatedStyle;
    if(this.rowSwipeAnimatedValues[item.index]) {
      animatedStyle = {
        backgroundColor: this.rowSwipeAnimatedValues[item.index].interpolate({
          inputRange: [0, 100],
          outputRange: ['gray', like_color]
        }),
      }
      iconAnimatedStyle= {
        marginRight: this.rowSwipeIconsMove[item.index].interpolate({
          inputRange: [0, 100],
          outputRange: [wp(6), wp(15)]
        }),
        position:'relative',
        marginBottom: 30
      }
      frontAnimatedStyle = {
        transform: [
          {
              scale: this.rowSwipeIconsShow[item.index].interpolate({
                  inputRange: [45, 90],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
              }),
          }
        ]
      }
      backAnimatedStyle = {
        transform: [
          {
              scale: this.rowSwipeIconsHide[item.index].interpolate({
                  inputRange: [45, 90],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
              }),
          }
        ]
      }
    }

    return (
      <SwipeRow
        onSwipeValueChange={(swipeData) => this.onSwipeValueChange(swipeData, item.index)}
        onRowDidClose={() => this.rowSwipeAnimatedValues[item.index].setValue(0)}
        friction={20}
        tension={500}
        key={item.id}
        rightOpenValue={-150}
        disableRightSwipe >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{ width: 150, backgroundColor: 'white' }}></View>
            <Animated.View style={[styles.rowBack, animatedStyle]}>
              <Animated.View style={[iconAnimatedStyle]}>
                <Animated.View style={[styles.rowBackText, backAnimatedStyle, {position: 'absolute'}]}>
                  <Ionicons name={'ios-heart-empty'} style={styles.inputIcon} />
                </Animated.View>
                <Animated.View style={[styles.rowBackText, frontAnimatedStyle, {position: 'absolute'}]}>
                  <Ionicons name={'ios-heart'} style={styles.inputIcon} />
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </View>
          <View style={styles.itemContainer}>
              <Text>Row </Text>
          </View>
      </SwipeRow>
    ); 
  }

  render() {
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <SwipeListView
          data={dataSource}
          keyExtractor={this._keyExtractor}
          onRowDidOpen={this.favoriteItem}
          renderItem={this.renderItem} >
        </SwipeListView>

        <FavoriteModal
          ref={(el) => { this.state.favoriteModal = el; }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 25,
  },
  rowBack: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    backgroundColor: 'gray'
  },
  rowBackText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22
  },
  inputIcon: {
    color: 'white',
    fontSize: wp('8%'),
  },
});
