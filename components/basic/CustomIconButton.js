import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import DefaultStyle from "../DefaultStyle";


const CustomIconButton = (props) => {
    var {iconName, ...properties} = props;
    const theme = useTheme();
    return (
        <Button 
            {...properties}
            accessoryLeft={<Icon name={iconName} />}
            children={() => (<Text style={{color: theme['color-primary-100']}}>{properties.children}</Text>)}>
        </Button>
    );
}

export default CustomIconButton;