import React, { useReducer, useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { registerVendor } from "../../utils/api";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../navigation/types'; // Import RootParamList

const initialState = {
  name: "",
  phone: "",
  email: "",
  storeName: "",
  panCard: "",
  employerId: "",
  gstin: "",
};

const reducer = (state: typeof initialState, action: { field: string; value: string }) => ({ ...state, [action.field]: action.value });

type RegistrationScreenNavigationProp = StackNavigationProp<RootParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const [vendor, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RegistrationScreenNavigationProp>(); // Specify the correct navigation prop

  const handleRegister = async () => {
    if (!vendor.name || !vendor.phone || !vendor.email || !vendor.storeName) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      await registerVendor(vendor);
      Alert.alert("Success", "Vendor registered successfully!");
      navigation.reset({
        index: 0, // This specifies that we only want the Home screen in the stack
        routes: [{ name: 'Home' }], // Replace with HomeScreen
      });
    } catch (error) {
      Alert.alert("Error", "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Registration</Text>
      {(Object.keys(initialState) as (keyof typeof initialState)[]).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/([A-Z])/g, " $1").trim()}
          value={vendor[key]}
          onChangeText={(text) => dispatch({ field: key, value: text })}
        />
      ))}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f8f9fa" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, borderRadius: 8, backgroundColor: "#fff" },
});