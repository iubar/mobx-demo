import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
	Divider,
	Text,
	Title,
	Paragraph,
	Button,
	TextInput,
	Subheading,
	Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class FirstScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={{ textAlign: 'center' }}>Hello {this.props.store.name} !</Text>
				<Divider style={{ marginVertical: 20, background: 'black', height: 10 }} />
				<Text>Please change tab</Text>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});
