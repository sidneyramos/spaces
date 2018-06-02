import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  Text as NativeText,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
// import ViewPropTypes from '../config/ViewPropTypes';
// import BackgroundImage from '../config/BackgroundImage';

let width = Dimensions.get('window').width;
let height = width * 0.8;
const BackgroundImage = ImageBackground || Image;
const ViewPropTypes = RNViewPropTypes || View.propTypes;

export class SpaceTile extends React.Component {

    componentWillMount() {
      if (!!this.props.width ) {
        width = this.props.width;
      }

      if (!!this.props.height) {
        height = this.props.height;
      }
    }
    render() {
      const {
        title,
        icon,
        caption,
        imageSrc,
        containerStyle,
        imageContainerStyle,
        overlayContainerStyle,
        iconContainerStyle,
        titleStyle,
        captionStyle,
        imageProps,
        ...attributes
      } = this.props;

      return (
        <TouchableOpacity
          {...attributes}
          style={[styles.container, containerStyle && containerStyle]}
        >
          <BackgroundImage
            source={imageSrc}
            style={[
              styles.imageContainer,
              imageContainerStyle && imageContainerStyle,
            ]}
            {...imageProps}
          >
            <View
              style={[
                styles.overlayContainer,
                overlayContainerStyle && overlayContainerStyle,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  iconContainerStyle && iconContainerStyle,
                ]}
              >
                {icon && <Icon {...icon} />}
              </View>
              <Text h4 style={[styles.text, titleStyle && titleStyle]}>
                {title}
              </Text>
              <Text style={[styles.text, captionStyle && captionStyle]}>
                {caption}
              </Text>
            </View>
          </BackgroundImage>
        </TouchableOpacity>
      );
    }
}

SpaceTile.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  caption: PropTypes.string,
  imageSrc: Image.propTypes.source.isRequired,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  imageContainerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
  titleStyle: NativeText.propTypes.style,
  captionStyle: NativeText.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width,
    height,
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 45,
    paddingBottom: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 15,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
