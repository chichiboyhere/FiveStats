import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import styles from "../constants/styles"

const MeasuresOfDispersionUngrouped = () => {
  const [data, setData] = useState([{id: 1, value: "", frequency: "1" }]);
  const [range, setRange] = useState("");
  const [meanDeviation, setMeanDeviation] = useState("");
  const [variance, setVariance] = useState("");
  const [standardDev, setStandardDev] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
 
  const calculateRange = () => {
    let nums = [];
    for (let i = 0; i < data.length; i++) {
      nums.push(parseFloat(data[i].value));
    }
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    setRange((max - min).toString());
  };

  const calculateMean = () => {
    //if (data.length === 0) return;

    try{
      const totalFrequency = data.reduce(
        (sum, item) => sum + +item.frequency,
        0
      );
      const weightedSum = data.reduce(
        (sum, item) => sum + parseFloat(item.value) * +item.frequency,
        0
      );
      const meanValue = weightedSum / totalFrequency;
      calcMeanDeviation(meanValue, totalFrequency);
      calcVariance(meanValue, totalFrequency);
      calculateRange();
    }
    catch(err){
      if (err instanceof Error)
      setInvalidInput(err.message)
    }
  };

  const calcMeanDeviation = (mean:number, sumFreq:number) => {
    const devFromMean = data.reduce(
      (sum, item) =>
        sum + Math.abs(parseFloat(item.value) - mean) * +item.frequency,
      0
    );
    const meanDev = devFromMean / sumFreq;
    setMeanDeviation(meanDev.toString());
  };

  const calcVariance = (mean:number, sumFreq:number) => {
    const summationfxsquared = data.reduce(
      (sum, item) =>
        sum + Math.pow(parseFloat(item.value) - mean, 2) * +item.frequency,
      0
    );
    const varian = summationfxsquared / sumFreq;
    setVariance(varian.toString());
    calcStandardDeviation(varian);
  };

  const calcStandardDeviation = (varian:number) => {
    const sd = Math.sqrt(varian);
    setStandardDev(sd.toString());
  };

  // Function to remove a row
  const removeRow = (id:number) => {
    if (data.length === 1) {
      Alert.alert('Error', 'At least one row is required!');
      return;
    }
    setData(data.filter(row => row.id !== id)); 
  };

  // Function to update row values
  const updateRow = (id:number, field:string, value:string) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
   
  };

  // Function to add a new row
  const addRow = () => {
    const newId = data.length + 1;
    setData([...data, { id: newId, value: '', frequency: "1" }]);
  };

  const handleReset = () => {
    setData([{id:1, value: "", frequency: "1" }]);
    setRange("");
    setMeanDeviation("");
    setStandardDev("");
    setVariance("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Range, Mean Deviation, Variance, Standard Deviation (Ungrouped)Calculator</Text>
       <Text style={styles.additionalHeaderText}>You may adjust the frequency field as required</Text>
       <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Value</Text>
          <Text style={styles.subHeaderText}>Frequency</Text>
        </View>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.value}
                onChangeText={(text) => updateRow(item.id, 'value', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Frequency"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.frequency}
                onChangeText={(text) => updateRow(item.id, 'frequency', text)}
                />
                <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeRow(item.id)}
                >
                <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
            )}
            scrollEnabled={false} // Disable FlatList scrolling
        />

        <TouchableOpacity style={styles.addButton} onPress={addRow}>
            <Text style={styles.addButtonText}>Add Row</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={calculateMean}
              style={styles.calcButton}
            >
            <Text style={styles.addButtonText}>Calculate</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
            >
            <Text style={styles.addButtonText}>Reset</Text>
            </TouchableOpacity>
      </View>
      {invalidInput && (
        <Text style={styles.invalidInputMsg}>{invalidInput}</Text>
      )}
      {range !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Range: {range}</Text>
        </View>
      )}

      {meanDeviation !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mean Deviation: {meanDeviation}</Text>
        </View>
      )}

      {variance !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Variance: {variance}</Text>
        </View>
      )}
      {standardDev !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Standard Deviation: {standardDev}</Text>
        </View>
      )}
    </ScrollView>
  );
};


export default MeasuresOfDispersionUngrouped;

