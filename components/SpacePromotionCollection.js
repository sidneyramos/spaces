import React from 'react';
import {ScrollView, View, Image, Dimensions} from 'react-native';
import { Card, Header, Text, Icon, Tile } from 'react-native-elements';
import { SpaceTile } from './SpaceTile';

export class SpacePromotionCollection extends React.Component {

    _renderItems(data) {
      if(!data) {
          return null;
      }
      const renderedData = [];
      let indexKey = 0;
      for (promotion of data) {
        renderedData.push(<SpaceTile
          key={`promotion-${indexKey}`}
          {...promotion}
        />);
        indexKey+=1;
      }
      return renderedData;
    }

    render() {
        const {data} = this.props;
        return (
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              {this._renderItems(data)}
            </View>
        );
    }
}
