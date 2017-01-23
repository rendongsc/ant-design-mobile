import React from 'react';
import RcTabs, { TabPane } from 'rc-tabs';
import TabsProps from './PropsType';
import SwipeableTabContent from 'rc-tabs/lib/SwipeableTabContent';
import TabContent from 'rc-tabs/lib/TabContent';
import InkTabBar from 'rc-tabs/lib/InkTabBar';

const Tabs = React.createClass<TabsProps, any>({
  statics: {
    TabPane,
  },

  getDefaultProps() {
    return {
      prefixCls: 'am-tabs',
      animated: true,
      swipeable: true,
      onChange() {},
      tabBarPosition: 'top',
      onTabClick() {},
    };
  },

  getInitialState() {
    const { activeKey, defaultActiveKey, children } = this.props;
    const activeTabKey = activeKey || defaultActiveKey || children[0].props.key;
    const activeTabIndex = children.findIndex(tabPane => tabPane.key === activeTabKey);
    const startTabIndex = activeTabIndex > 4 ? activeTabIndex - 1 : activeTabIndex;
    return {
      startTabIndex,
    };
  },

  renderTabBar() {
    const {props} = this;
    return <InkTabBar onTabClick={this.handleTabClick} inkBarAnimated={props.animated}/>;
  },

  renderTabContent() {
    const { animated, swipeable } = this.props;
    return swipeable ? (
      <SwipeableTabContent animated={animated} />
    ) : (
      <TabContent animated={animated} />
    );
  },

  getChildren() {
    const { children } = this.props;
    const { startTabIndex } = this.state;
    return children.slice(startTabIndex, startTabIndex + 5);
  },

  handleTabClick(key) {
    this.setState({
      startTabIndex: this.getStartTabIndex(key),
    });
    this.props.onTabClick(key);
  },

  getStartTabIndex(activeTabKey) {
    const { children } = this.props;
    const activeTabIndex = children.findIndex(tabPane => tabPane.key === activeTabKey);
    const startTabIndex = activeTabIndex > 3 ? activeTabIndex - 3 : 0;
    return startTabIndex;
  },

  getClassName() {
    const { startTabIndex } = this.state;
    const totalTabsCount = this.props.children.length;
    const cls = [];
    if (totalTabsCount > 5 ) {
      if (startTabIndex + 5 < totalTabsCount) {
        cls.push(`${this.props.prefixCls}-rightpage`);
      }
      if (startTabIndex > 0) {
        cls.push(`${this.props.prefixCls}-leftpage`);
      }
    }
    return cls.join(' ');
  },

  render() {
    const newProps = Object.assign({}, this.props, {
      children: this.getChildren(),
      className: this.getClassName(),
    });
    return (
      <RcTabs
        renderTabBar={this.renderTabBar}
        renderTabContent={this.renderTabContent}
        {...newProps}
      />
    );
  },
});

export default Tabs;
