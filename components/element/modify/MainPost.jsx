import React from 'react';
import * as Font from 'expo-font'
import { Root, Container, Content } from 'native-base'
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '../../Themed';
import Today from './Today.jsx';
import { setCoor } from "../../states/post-actions.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class PostMain extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.handleCoordinate = this.handleCoordinate.bind(this);

    }
    componentWillMount = async () => {
        await Font.loadAsync({
            Roboto: require("../../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../../node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    handleCoordinate() {
        if (this.props.currentLat != undefined && this.props.currentLon != undefined) {
            this.props.dispatch(setCoor(this.props.currentLat, this.props.currentLon));
        }
    }
    render() {
        console.log(this.props);

        this.handleCoordinate();
        if (this.state.loading) {
            return (
                <ActivityIndicator style={[styles.container, styles.horizontal]} size="large" />
            );
        } else {  //finish loading
            return (
                <Root >
                    <Container style={{ backgroundColor: 'rgba(245, 222, 179, 1.0)' }}>
                        <Content>
                            <View style={styles.container}>
                                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                                <Today />
                            </View>
                        </Content>
                    </Container>
                </Root>
            );
        }
    }
}
export default connect(state => ({}))(PostMain);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(245, 222, 179, 1.0)',
    },
    switchButton: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 20,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});