import { Button, Icon } from "@ui-kitten/components";


const CustomIconButton = (props) => {
    return (
        <Button 
            {...props}
            status={props.status}
            accessoryLeft={<Icon name={props.iconName} />}>
            {props.children}
        </Button>
    );
}

export default CustomIconButton;