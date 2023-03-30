import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, TouchableHighlight } from 'react-native';
import { formDataStore } from '../store/formDataStore';
import { theme } from '../utils/mainStyles';

export const RemoveButton = observer(({ type, id }) => {
  const { removeItem } = formDataStore;
  return (
    <View style={{ flex: 0.6 }}>
      <TouchableHighlight
        underlayColor={theme.colors.underlayColor}
        activeOpacity={theme.activeOpacity}
        onPress={() => removeItem(type, id)}
      >
        <Icon name="minussquareo" size={24} color={theme.colors.negativeButton} />
      </TouchableHighlight>
    </View>
  );
});
