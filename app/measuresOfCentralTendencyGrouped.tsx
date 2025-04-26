import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import styles from "../constants/styles";

const MeasuresOfCentralTendencyGrouped = () => {
  const [data, setData] = useState([
    { id: 1, lower: "", upper: "", frequency: "" },
  ]);
  const [mean, setMean] = useState("");
  const [mode, setMode] = useState("");
  const [median, setMedian] = useState("");
  const [invalidInput, setInvalidInput] = useState("");

  const handleChange = (id: number, field: string, value: string) => {
    setData(
      data.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    const newId = data.length + 1;
    setData([...data, { id: newId, lower: "", upper: "", frequency: "" }]);
  };

  const removeRow = (id: number) => {
    if (data.length === 1) {
      Alert.alert("Error", "At least one row is required!");
      return;
    }
    setData(data.filter((row) => row.id !== id));
  };

  const handleReset = () => {
    setData([{ id: 1, lower: "", upper: "", frequency: "" }]);
    setMean("");
    setMode("");
    setMedian("");
    setInvalidInput("");
  };

  const handleCalculateMean = () => {
    if (
      data.some(
        (row) => row.lower === "" || row.upper === "" || row.frequency === ""
      )
    ) {
      setInvalidInput("All fields must be filled in!");
      return;
    }

    try {
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
      handleCalculateMedian();
      handleCalculateMode();
    } catch (err) {
      if (err instanceof Error) {
        setInvalidInput(err.message);
      }
    }
  };

  const handleCalculateMedian = () => {
    let totalFrequency = 0;
    let cumulativeFrequency: Array<number> = [];
    data.forEach((row, index) => {
      totalFrequency += parseFloat(row.frequency);
      cumulativeFrequency[index] = totalFrequency;
    });

    const N = totalFrequency / 2;

    let medianClassIndex = cumulativeFrequency.findIndex((cf) => cf >= N);

    let x =
      parseFloat(data[medianClassIndex].lower) -
      parseFloat(data[medianClassIndex - 1].upper);
    let L;
    x === 0
      ? (L = parseFloat(data[medianClassIndex].lower))
      : (L = parseFloat(data[medianClassIndex].lower) - x * 0.5);
    //let L = parseFloat(data[medianClassIndex].lower);
    let F = parseFloat(data[medianClassIndex].frequency);
    let C = cumulativeFrequency[medianClassIndex - 1] || 0;
    let y =
      parseFloat(data[medianClassIndex].upper) -
      parseFloat(data[medianClassIndex].lower);
    let h;
    x === 0 ? (h = y) : (h = y + x);

    let median = L + ((N - C) / F) * h;
    setMedian(median.toString());
  };

  const handleCalculateMode = () => {
    let maxFrequency = 0;
    let modeClassIndex = 0;

    data.forEach((row, index) => {
      //console.log(index)
      if (parseFloat(row.frequency) > maxFrequency) {
        maxFrequency = parseFloat(row.frequency);
        modeClassIndex = index;
      }
    });

    // Determine x, the difference between the upper class limit(of the class before the modal class) and the lower class limit of the modal class.
    let x =
      parseFloat(data[modeClassIndex].lower) -
      parseFloat(data[modeClassIndex - 1].upper);

    // Determine L, the lower class boundary of the modal class
    let L;
    x === 0
      ? (L = parseFloat(data[modeClassIndex].lower))
      : (L = parseFloat(data[modeClassIndex].lower) - x * 0.5);
    // Assign f1 as the frequency of the modal class
    let f1 = parseFloat(data[modeClassIndex].frequency);

    // Assign f0 as the frequency of the class just before the modal class
    let f0;
    if (modeClassIndex === 0) {
      f0 === 0;
    } else {
      f0 = parseFloat(data[modeClassIndex - 1].frequency);
    }

    // Assign f2 as the frequency of the class just after the modal class
    let f2;
    let lastIndex = data.length - 1;
    // = parseFloat(data[modeClassIndex + 1]?.frequency || 0);
    if (modeClassIndex === lastIndex) {
      f2 === 0;
    } else {
      f2 = parseFloat(data[modeClassIndex + 1].frequency);
    }
    // let y be difference between upper class limit and lower class limit
    let y =
      parseFloat(data[modeClassIndex].upper) -
      parseFloat(data[modeClassIndex].lower);

    // let c be class mark
    let c;
    x === 0 ? (c = y) : (c = y + x);

    let mode = L + ((f1 - f0!) / (f1 - f0! + (f1 - f2!))) * c;
    setMode(mode.toString());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        Mean, Median, and Mode (Grouped Data) Calculator
      </Text>
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
              onChangeText={(text) => handleChange(item.id, "lower", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Upper"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              value={item.upper}
              onChangeText={(text) => handleChange(item.id, "upper", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              value={item.frequency}
              onChangeText={(text) => handleChange(item.id, "frequency", text)}
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

      <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
        <Text style={styles.addButtonText}>Add Row</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleCalculateMean}
          style={styles.calcButton}
        >
          <Text style={styles.addButtonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.addButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {invalidInput && (
        <Text style={styles.invalidInputMsg}>{invalidInput}</Text>
      )}
      {mean !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mean: {mean}</Text>
        </View>
      )}

      {mode !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mode: {mode}</Text>
        </View>
      )}

      {median !== "" && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Median: {median}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MeasuresOfCentralTendencyGrouped;
