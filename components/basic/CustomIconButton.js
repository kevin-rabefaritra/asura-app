import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import DefaultStyle from "../DefaultStyle";


const CustomIconButton = (props) => {
    var {iconName, ...properties} = props;
    const theme = useTheme();
    const textColor = props.textColor || theme['text-basic-color'];
    return (
        <Button 
            {...properties}
            accessoryLeft={<Icon name={iconName} />}
            children={() => (<Text style={{color: textColor}}>{properties.children}</Text>)}>
        </Button>
    );
}

export default CustomIconButton;