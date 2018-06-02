import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  statusBar: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  columnContainer: {
    padding: 10,
    paddingLeft: 17,
    paddingRight: 17,
  },
  header: {
    // backgroundColor: 'black',
    backgroundColor: 'white',
    height: 60,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: 28,
    color: 'black',
    fontFamily: 'Aktiv Grotesk Light',

  },
  headerDot: {
    color: '#0E7C7B',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollHorizontalItem: {
    marginLeft: 5,
    marginRight: 5,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  appButton: {
    width: 42,
    marginBottom: 15,
    marginTop: 15,
  },
  textInput: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f5f5f5',
    width: '80%',
    marginTop: 10,
    borderRadius: 10
  },
  defaultFont: {
    fontFamily: 'Aktiv Grotesk',
  },
  selectedFont: {
    fontFamily: 'Aktiv Grotesk Bold',
  },
  inactiveFont: {
    color: '#1A936F',
  },
  selectedBorder: {
    borderBottomWidth: 3,
    borderColor: '#1A936F',
    paddingBottom: 3
  },
  searchInput: {
    height: 30,
    width: '90%',
    marginTop: 0,
    paddingLeft: 3,
    paddingRight: 0,
    color: 'black'
  },
  cardTitle: {
    fontFamily: 'Aktiv Grotesk Medium',
    letterSpacing: 1,
    fontSize: 13,
  },
  headingTitle: {
    fontFamily: 'Aktiv Grotesk Medium',
    letterSpacing: 1,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
  },
  adminCategoryStyle: {
    fontSize: 16,
    fontFamily: 'Aktiv Grotesk Bold',
  },
  adminHeaderInput: {
    marginBottom: 10,
    marginTop: 21,
    backgroundColor: 'transparent',
    width: '100%',
    borderBottomWidth: 2,
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomColor: Colors.tintColor,

  }
});
