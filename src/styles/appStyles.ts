import { StyleSheet } from 'react-native';

export const DRAWER_WIDTH = 260;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  navigatorWrapper: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 5,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },
  drawerItem: {
    paddingVertical: 4,
  },
});

export default styles;
