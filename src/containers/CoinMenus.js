import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { connect } from 'react-redux';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import Overview from './Overview'
import SendCoin from './SendCoin'
import ReceiveCoin from './ReceiveCoin'
import { Icon } from "react-native-elements"
//import ReceiveCoin from './wherever_receive_coin_is_located'

class CoinMenu extends Component {
  constructor(props) {
    super(props)
    let stateObj = this.generateTabs();
    this.state = {
      tabs: stateObj.tabs,
      activeTab: stateObj.activeTab,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: typeof(navigation.state.params)==='undefined' || 
      typeof(navigation.state.params.title) === 'undefined' ? 
      'undefined': navigation.state.params.title,
    };
  };

  generateTabs = () => {
    //this.props.activeSection
    let tabArray = []
    let activeTab;
    let options = this.props.activeCoin.apps[this.props.activeApp].data
    const screens = {
      //Overview: <Overview/>,
      //SendCoin: <SendCoin/>
      Overview: "Overview",
      SendCoin: "SendCoin",
      ReceiveCoin: "ReceiveCoin"
    }

    for (let i = 0; i < options.length; i++) {
      let _tab = {
        key: options[i].key,
        icon: options[i].icon,
        label: options[i].name,
        barColor: options[i].color,
        pressColor: 'rgba(255, 255, 255, 0.16)',
        screen: screens[options[i].screen]
      }

      if (options[i].key === this.props.activeSection.key) {
        activeTab = _tab
      }

      tabArray.push(_tab)
    }

    if (!activeTab) {
      throw "Tab not found for active section " + this.props.activeSection.key
    }

    return {
      tabs: tabArray,
      activeTab: activeTab
    };
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key ? tab.key : ''}
      label={tab.label ? tab.label : ''}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  switchTab = (newTab) => {
    this.props.navigation.setParams({ title: newTab.label })
    this.setState({ activeTab: newTab })
  }

  //The rendering of overview, send and recieve is temporary, we want to use
  //this.state.activeTab.screen, but the 
  //"Cannot Add a child that doesn't have a YogaNode to a parent with out a measure function"
  //bug comes up and it seems like a bug in rn
  render() {
    return (
      <View style={{ flex: 1 }}>
          {this.state.activeTab.screen === "Overview" ? <Overview navigation={this.props.navigation}/> :
          (this.state.activeTab.screen === "SendCoin" ? <SendCoin navigation={this.props.navigation}/> : 
          (this.state.activeTab.screen === "ReceiveCoin" ? <ReceiveCoin navigation={this.props.navigation}/> : null))}
        <BottomNavigation
          onTabPress={newTab => this.switchTab(newTab)}
          renderTab={this.renderTab}
          tabs={this.state.tabs}
          activeTab={this.state.activeTab.key}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCoin: state.coins.activeCoin,
    activeApp: state.coins.activeApp,
    activeSection: state.coins.activeSection
  }
};

export default connect(mapStateToProps)(CoinMenu);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#232323",
    flex: 1,
    alignItems: "center"
  },
});
