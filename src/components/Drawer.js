import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

class NavigationDrawer extends Component {
    render() {
        const state = this.props.navigationState;
        const children = state.children;
        console.log(state)
        console.log(children)
        console.log(this.props)
        return (
            <Drawer
                style={drawerStyles}
                side={'right'}
                ref="navigation"
                open={state.open}
                onOpen={() => Actions.refresh({ key: state.key, open: true })}
                onClose={() => Actions.refresh({ key: state.key, open: false })}
                type="displace"
                content={<SideMenu />}
                tapToClose
                openDrawerOffset={0.15}
                panCloseMask={0.15}
                negotiatePan
                tweenHandler={(ratio) => ({ main: { opacity: Math.max(0.54, 1 - ratio) } })}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, borderColor: 'red', borderWidth: 4 },
  main: { paddingLeft: 3, backgroundColor: 'blue' },
};

export default NavigationDrawer;
