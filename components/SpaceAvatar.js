import React from 'react';
import { Avatar } from 'react-native-elements';

export class SpaceAvatar extends React.Component {
  render() {
    return (<Avatar
              medium
              rounded
              source={{uri: this.props.data.logoUrl }}
              containerStyle={this.props.style}
              imageProps={!!this.props.data.resizeLogo ? { resizeMode: this.props.data.resizeLogo.type, height: this.props.data.resizeLogo.height, width: this.props.data.resizeLogo.width} : {}}
              onPress={this.props.onPress}
            />);
  }
}
