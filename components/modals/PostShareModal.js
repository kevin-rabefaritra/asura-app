import { Card, Modal, Text } from '@ui-kitten/components'
import DefaultStyle from '../DefaultStyle';

const PostShareModal = (props) => {

    return (
        <Modal 
            visible={props.visible}
            style={{width: '90%'}}
            onBackdropPress={props.onBackdropPress}
            backdropStyle={DefaultStyle.modalBackdrop} >

            <Card disabled={true}>
                <Text>{props.sharedPostUuid}</Text>
            </Card>

        </Modal>
    );
};
export default PostShareModal;