import React from 'react';
import {View, Image} from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';

export class SpaceHeader extends React.Component {
  _getComponent(position, data, navigation) {
    const {styles} = this.props;
    let selectedComponent = null;
    switch(position) {
        case 'center':
            selectedComponent = data.centerComponent;
            break;
        case 'left':
            selectedComponent = data.leftComponent;
            break;
        case 'right':
            selectedComponent = data.rightComponent;
            break;
    }
    if(!selectedComponent) {
        return null;
    }
    let type = selectedComponent.type;
    switch(type) {
        case 'icon':
            return(<Icon {...selectedComponent.icon}/>);
            break;
        case 'text':
            return(<Text style={selectedComponent.style}>{selectedComponent.text}</Text>);
            break;
        case 'image':
            return(<Image style={selectedComponent.style} {...selectedComponent.image}/>);
            break;
        case 'menu':
            return (<Icon {...selectedComponent.menu.icon} onPress={() => navigation.navigate('DrawerToggle')}/>);
            break;
    }
  }

  render() {
    const {data, navigation} = this.props;

    return (<Header
        leftComponent={this._getComponent('left', data, navigation)}
        centerComponent={this._getComponent('center', data, navigation)}
        rightComponent={this._getComponent('right', data, navigation)}
        outerContainerStyles={data.outerContainerStyles}
        innerContainerStyles={data.innerContainerStyles}
        />);
  }
}
