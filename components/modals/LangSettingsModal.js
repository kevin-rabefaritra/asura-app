import { Button, Card, Divider, Icon, Layout, Menu, MenuItem, Modal, Text } from "@ui-kitten/components";
import DefaultStyle from "../DefaultStyle";
import { StyleSheet } from "react-native";
import React from "react";
import CustomIconButton from "../basic/CustomIconButton";

const CheckIcon = (props) => (
	<Icon {...props} name='check' />
);

const LangSettingsModal = (props) => {

	const langs = {
		'fr': 'Français',
		'en': 'English',
		'mg': 'Malagasy'
	};

	const [selectedLang, setSelectedLang] = React.useState('en');

	const CardHeader = (props) => {
		return <Layout style={{padding: 16}}>
			<Text category="s1">Language</Text>
			<Text category="s2" style={{marginTop: 8}} appearance="hint">Choose your language</Text>
		</Layout>;
	};

	const CardFooter = (props) => {
		return <Layout style={{flexDirection: 'row-reverse', padding: 16}}>
			<CustomIconButton
                status='primary'
                size='small'
                iconName='check' />
			<Button
                style={ { marginRight: 8, paddingHorizontal: 16} }
                appearance='ghost'
                status='basic'
                size='small'
                children={() => (<Text>BACK</Text>)}>
            </Button>
		</Layout>;
	};

	return (
		<Modal
			visible={props.visible}
			style={{width: '90%'}}
			onBackdropPress={props.onBackdropPress}
			backdropStyle={DefaultStyle.modalBackdrop}>

			<Card style={styles.langCard} disabled={true} header={CardHeader} footer={CardFooter}>
				<Layout style={styles.langCardContainer}>
					<Menu>
						{
							Object.entries(langs).map(([key, value]) =>
								<MenuItem 
									key={key}
									title={value} 
									accessoryRight={selectedLang === key ? CheckIcon : null} 
									style={{height: 48}} />
							)
						}
					</Menu>
				</Layout>
			</Card>
		</Modal>
	);
};
export default LangSettingsModal;

const styles = StyleSheet.create({
	langCard: {
		
	},
	langCardContainer: {
		marginHorizontal: -24,
		marginVertical: -16
	},
});