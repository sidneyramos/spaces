import React from 'react';
import {ScrollView, View, Image, FlatList, TouchableOpacity} from 'react-native';
import { Card, Header, Text, Icon } from 'react-native-elements';

export class SpaceItemCollection extends React.Component {
    _renderItems(data, categoryKey) {
        if(!data) {
            return null;
        }

        const renderedData = [];
        if(!categoryKey.toString()) {
          for (category of data) {
            renderedData.push(<Text style={category.categoryStyle}>{category.name}</Text>);
            if(!!category.items) {
              const itemArray = [];
              for (item of category.items) {
                itemArray.push(
                  <Card containerStyle={{ borderWidth: 0, shadowOpacity: 0, margin: 0, marginRight: 15, }} imageStyle={{height: 130, width: 150, }} wrapperStyle={{padding: 0, }} image={{uri: item.image.url }}>
                    <View style={{
                        paddingTop: 10,
                      }}>
                      <Text style={category.itemStyle.titleText}>{item.name}</Text>
                      {item.subtitle && <Text style={category.itemStyle.subtitleText}>{item.subtitle}</Text>}
                      {item.description && <Text style={category.itemStyle.description}>{item.description}</Text>}
                      <Text style={category.itemStyle.priceText}>${item.price}</Text>
                      {item.priceSubtitle && <Text style={category.itemStyle.priceSubtitleText}>${item.priceSubtitle}</Text>}
                    </View>
                  </Card>
                )
              }
              renderedData.push(<ScrollView style={{ paddingTop: 10, paddingBottom: 10,}} horizontal showsHorizontalScrollIndicator={false}>{itemArray}</ScrollView>);
            }
          }
        } else {
          let category = data[categoryKey];
          if(!!category) {
            renderedData.push(<Text key={"category-" + categoryKey} style={category.categoryStyle}>{category.name}</Text>);
            if(!!category.items) {
              // const itemArray = [];
              // for (item of category.items) {
              //   itemArray.push(
              //     <Card containerStyle={{ borderWidth: 0, shadowOpacity: 0, margin: 0, marginRight: 15, }} imageStyle={{height: 130, width: 150, }} wrapperStyle={{padding: 0, }} image={{uri: item.image.url }}>
              //       <View style={{
              //           paddingTop: 10,
              //         }}>
              //         <Text style={category.itemStyle.titleText}>{item.name}</Text>
              //         {item.subtitle && <Text style={category.itemStyle.subtitleText}>{item.subtitle}</Text>}
              //         {item.description && <Text style={category.itemStyle.description}>{item.description}</Text>}
              //         <Text style={category.itemStyle.priceText}>${item.price}</Text>
              //         {item.priceSubtitle && <Text style={category.itemStyle.priceSubtitleText}>${item.priceSubtitle}</Text>}
              //       </View>
              //     </Card>
              //   )
              // }
              // renderedData.push(<ScrollView style={{ paddingTop: 10, paddingBottom: 10,}} horizontal showsHorizontalScrollIndicator={false}>{itemArray}</ScrollView>);
              renderedData.push(<FlatList
                key={"item-list-" + categoryKey}
                data={category.items}
                renderItem={
                  ({item, index}) =>{
                    return (
                    <TouchableOpacity key={"item-touch-" + index} style={{ flex: 0.48}}>
                      <Card key={"item-card-" + index} containerStyle={{ borderWidth: 0, shadowOpacity: 0, margin: 0, marginRight: 20, marginTop: 15, width: "100%" }}wrapperStyle={{padding: 0, }} image={{uri: item.image.url }}>
                        <View key={"item-view-" + index} style={{
                            paddingTop: 10,
                          }}>
                          <Text key={"item-title-" + index} style={category.itemStyle.titleText}>{item.name}</Text>
                          {item.subtitle && <Text key={"item-subtitle-" + index} style={category.itemStyle.subtitleText}>{item.subtitle}</Text>}
                          {item.description && <Text key={"item-description-" + index} style={category.itemStyle.description}>{item.description}</Text>}
                          <Text key={"item-price-" + index} style={category.itemStyle.priceText}>${item.price}</Text>
                          {item.priceSubtitle && <Text key={"item-priceSubtitle-" + index} style={category.itemStyle.priceSubtitleText}>${item.priceSubtitle}</Text>}
                        </View>
                      </Card>
                    </TouchableOpacity>);
                  }
                }
                keyExtractor={(item, index) => index}
                numColumns={!category.horizontal ? 2 : 1}
                horizontal={category.horizontal}
                columnWrapperStyle={!category.horizontal ? {justifyContent: 'space-between'} : null}
              />);
            }
          }
        }
        return(renderedData);
    }

    render() {
        const {data, categoryKey} = this.props;
        return (
            <View style={{paddingLeft: 15, paddingRight: 15,}}>
                {this._renderItems(data, categoryKey)}
            </View>
        );
    }
}
