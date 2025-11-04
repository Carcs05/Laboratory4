import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Welcome to ₱ Budget Tracker</Text>
      <Text style={styles.subtitle}>Manage your expenses and balance easily!</Text>
      <Button
        title="Go to Budget Tracker"
        onPress={() => navigation.navigate('BudgetTracker')}
        color="#27ae60"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
});



