import { observer } from 'mobx-react-lite';
import { TextInput, View, StyleSheet } from 'react-native';
import { formDataStore } from '../store/formDataStore';
import { input } from '../utils/mainStyles';

export const FormDataInputs = observer(() => {
  const { inputs, setInputsData } = formDataStore;

  return (
    <View style={{ marginTop: 20, gap: 5 }}>
      <TextInput
        style={styles.input}
        onChangeText={value => setInputsData('name', value)}
        value={inputs.name}
        placeholder="Имя клиента"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => setInputsData('phone', value)}
        value={inputs.phone}
        placeholder="Телефон"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => setInputsData('location', value)}
        value={inputs.location}
        placeholder="Локация"
        keyboardType="default"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input,
});
