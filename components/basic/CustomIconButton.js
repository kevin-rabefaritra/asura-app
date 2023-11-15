import { Button, Icon, Text } from "@ui-kitten/components";
import DefaultStyle from "../DefaultStyle";


const CustomIconButton = (props) => {
    var {iconName, ...properties} = props;
    return (
        <Button 
            {...properties}
            accessoryLeft={<Icon name={iconName} />}
            children={() => (<Text>{properties.children}</Text>)}>
        </Button>
    );
}

export default CustomIconButton;