import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Add} from 'iconsax-react-native';

const FloatActionButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size="32" color="#fff" />
    </TouchableOpacity>
  );
};

export default FloatActionButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#2ccce4',
  },
});
