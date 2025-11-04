import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function BudgetTrackerScreen() {
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState('');
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState([]);

  const addBalance = () => {
    const newAmount = parseFloat(amount);
    if (isNaN(newAmount) || newAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }
    setBalance(balance + newAmount);
    setAmount('');
  };

  const addExpense = () => {
    const newExpense = parseFloat(expense);
    if (isNaN(newExpense) || newExpense <= 0 || description.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter both description and valid expense amount.');
      return;
    }
    if (newExpense > balance) {
      Alert.alert('Insufficient Balance', 'You don’t have enough money for this expense.');
      return;
    }

    const expenseItem = {
      id: Date.now(),
      desc: description,
      amount: newExpense,
    };

    setBalance(balance - newExpense);
    setHistory([expenseItem, ...history]);
    setExpense('');
    setDescription('');
  };

  return (
    <View style={styles.container}>

      {/* Balance Box */}
      <View style={styles.centerBox}>
        <Text style={styles.balanceText}>₱{balance.toFixed(2)}</Text>
        <Text style={styles.subText}>Current Balance</Text>

        {balance === 0 && (
          <Text style={styles.warningText}>
            Your balance is empty. Add funds to start tracking!
          </Text>
        )}

        {/* Add Balance */}
        <Text style={styles.label}>Add Balance</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount to add"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#27ae60' }]} onPress={addBalance}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Expense Description (Moved above Add Expense) */}
        <Text style={styles.label}>Expense Description</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter description (e.g. Food, Transport)"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Add Expense */}
        <Text style={styles.label}>Add Expense</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter expense amount"
            keyboardType="numeric"
            value={expense}
            onChangeText={setExpense}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#e74c3c' }]}
            onPress={addExpense}
          >
            <Text style={styles.buttonText}>Spend</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expense History */}
      <Text style={styles.historyTitle}>Expense History</Text>
      <ScrollView style={styles.historyContainer}>
        {history.length === 0 ? (
          <Text style={styles.noHistory}>No expenses recorded yet.</Text>
        ) : (
          history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.historyDesc}>{item.desc}</Text>
              <Text style={styles.historyAmount}>-₱{item.amount.toFixed(2)}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  centerBox: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  subText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  warningText: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  historyContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
  noHistory: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  historyDesc: {
    color: '#333',
  },
  historyAmount: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});
