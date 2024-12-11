import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import styles from "../constants/styles"

const MeasuresOfDispersionGrouped = () => {
  const [data, setData] = useState([{id:1, lower: "", upper: "", frequency: "" }]);
  const [range, setRange] = useState("");
  const [mean, setMean] = useState("");
  const [meanDeviation, setMeanDeviation] = useState("");
  const [variance, setVariance] = useState("");
  const [standardDev, setStandardDev] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  

  const calculateRange = () => {
    let nums = [];
    for (let i = 0; i < data.length; i++) {
      nums.push(parseFloat(data[i].lower));
      nums.push(parseFloat(data[i].upper));
    }
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    setRange((max - min).toString());
  };

  const calculateMean = () => {
    
    try{
      const totalFrequency = data.reduce(
        (sum, item) => sum + parseInt(item.frequency),
        0
      );
      const weightedSum = data.reduce(
        (sum, item) =>
          sum +
          (parseFloat(item.lower) + parseFloat(item.upper)) *
            0.5 *
            parseInt(item.frequency),
        0
      );
      const meanValue = weightedSum / totalFrequency;
  
      setMean(meanValue.toString());
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
        sum +
        Math.abs(
          (parseFloat(item.lower) + parseFloat(item.upper)) * 0.5 - mean
        ) *
          parseInt(item.frequency),
      0
    );
    const meanDev = devFromMean / sumFreq;
    setMeanDeviation(meanDev.toString());
  };

  const calcVariance = (mean:number, sumFreq:number) => {
    const summationfxsquared = data.reduce(
      (sum, item) =>
        sum +
        Math.pow(
          (parseFloat(item.lower) + parseFloat(item.upper)) * 0.5 - mean,
          2
        ) *
          parseInt(item.frequency),
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
    setData([...data, {id:newId, lower: "", upper: "", frequency: "" }]);
  };

  const handleReset = () => {
    setData([{id:1, lower: "", upper: "", frequency: "" }]);
    setMean("");
    setRange("");
    setMeanDeviation("");
    setStandardDev("");
    setVariance("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}> Range, Mean, Mean Deviation, Variance, Standard Deviation (Grouped Data)
        Calculator</Text>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Lower</Text>
          <Text style={styles.subHeaderText}>Upper</Text>
          <Text style={styles.subHeaderText}>Frequency</Text>
        </View>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <TextInput
                style={styles.input}
                placeholder="Lower"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.lower}
                onChangeText={(text) => updateRow(item.id, 'lower', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Upper"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.upper}
                onChangeText={(text) => updateRow(item.id, 'upper', text)}
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
      {mean !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mean(Not a measure of dispersion): {mean}</Text>
        </View>
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

export default MeasuresOfDispersionGrouped;
