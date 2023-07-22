import { StatusBar, View } from "react-native";
import { useTheme } from "@ui-kitten/components";


const MainStatusBar = () => {
  const theme = useTheme();
  return (
    <View style={{height: StatusBar.currentHeight, backgroundColor: theme['background-basic-color-1']}}/>
  );
}

export default MainStatusBar;