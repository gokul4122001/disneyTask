import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Footer = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#ffffffcc', '#f0f0f0cc']}
      style={styles.footerContainer}
    >
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={22} color="#444" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Reports')}
        >
          <Icon name="bar-chart" size={22} color="#444" />
          <Text style={styles.footerText}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('NewName')}
        >
          <Icon name="user" size={22} color="#444" />
          <Text style={styles.footerText}>New User</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor:"#fff"
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
    fontWeight: '600',
  },
});

export default Footer;
