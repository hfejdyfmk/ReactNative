import React from 'react';
//import * as React from 'react';
import { Root, Container, Content } from 'native-base'
import { StyleSheet } from 'react-native';
import { Text, View } from '../../Themed';
import Today from './Today.jsx';
export default class PostMain extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    render() {
        return (
            <Root>
                <Container>
                    <Content>
                        <View style={styles.container}>
                            <Text style={styles.title}>Place</Text>
                            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <Today />
                        </View>
                    </Content>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});