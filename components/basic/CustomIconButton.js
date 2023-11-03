import { Button, Icon } from "@ui-kitten/components";


const CustomIconButton = (props) => {
    var {iconName, ...properties} = props;
    return (
        <Button 
            {...properties}
            accessoryLeft={<Icon name={iconName} />}>
            {properties.children}
        </Button>
    );
}

export default CustomIconButton;