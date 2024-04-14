import { Card, Modal, Text } from '@ui-kitten/components'
import DefaultStyle from '../DefaultStyle';
import CachedImage from '../basic/CachedImage';

const PostShareModal = (props) => {

    return (
        <Modal 
            visible={props.visible}
            style={{width: '90%', height: '90%'}}
            onBackdropPress={props.onBackdropPress}
            backdropStyle={DefaultStyle.modalBackdrop} >

            <Card disabled={true}>
                <CachedImage 
                    uri={props.sharedPostUri}
                    style={{marginHorizontal: -24, marginVertical: -16}}
                    imageStyle={{height: '100%', resizeMode: 'contain'}}
                />

            </Card>

        </Modal>
    );
};
export default PostShareModal;