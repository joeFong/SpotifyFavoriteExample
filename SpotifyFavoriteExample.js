import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default class SpotifyFavoriteExample extends React.Component {
  state = {
    data: [
      {
        name: 'Item 1',
        favorite: false
      },
      {
        name: 'Item 2',
        favorite: false
      },
      {
        name: 'Item 3',
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

    this.renderRow = this.renderRow.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
  }

  _keyExtractor(item, index) { 
    return index.toString();
  }

  favoriteItem(rowKey, rowMap) {
    console.log('favorited item');
  }

  renderRow(item, index) {
    return (
      <SwipeRow
        onSwipeValueChange={(swipeData) => this.onSwipeValueChange(swipeData, index)}
        onRowDidClose={() => this.rowSwipeAnimatedValues[index].setValue(0)}
        friction={20}
        tension={500}
        key={item.key}
        rightOpenValue={-150} >
        <View>
          <Text>Item</Text>
        </View>
      </SwipeRow>
    ); 
  }

  render() {
    const { data } = this.state; 

    return (
      <View style={styles.container}>
        <SwipeListView
          data={data}
          keyExtractor={this._keyExtractor}
          onRowDidOpen={this.favoriteItem}
          renderItem={this.renderRow}
          disableRightSwipe>
        </SwipeListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
