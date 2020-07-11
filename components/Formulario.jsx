import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  Alert
} from "react-native";
import { Picker } from "react-native";

const Formulario = ({ busqueda, setBusqueda, consultar, setConsultar }) => {
  const { pais, ciudad } = busqueda;

  const [animacionboton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      useNativeDriver: true,
      toValue: 0.75,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  };

  const estiloAnimacion = () => {
    transform: [{ scale: animacionboton }];
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const consultarClima = () => {
      if(pais.trim() === '' || ciudad.trim() === ''){
        mostrarAlerta();
        return;
      }
      setConsultar(true);
  }

  const mostrarAlerta = () => {
      Alert.alert(
          'Oops...',
          'Ambos campos son obligatorios',
          [
              {
                  text: 'Entendido'
              }
          ]
      )
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={styles.formulario}>
          <View>
            <TextInput
              value={ciudad}
              onChangeText={ciudadTxt => setBusqueda({...busqueda, ciudad: ciudadTxt})}
              style={styles.input}
              placeholder="Ingrese ciudad"
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.pickerContainer}>
            <Picker
                onValueChange={paisSelected => setBusqueda({...busqueda, pais: paisSelected})}
              selectedValue={pais}
              itemStyle={{ height: 120, textAlign: "center" }}
            >
              <Picker.Item label="seleccione un país" value="" />
              <Picker.Item label="Estados Unidos" value="US" />
              <Picker.Item label="México" value="MX" />
              <Picker.Item label="Argentina" value="AR" />
              <Picker.Item label="Colombia" value="CO" />
              <Picker.Item label="Costa Rica" value="CR" />
              <Picker.Item label="España" value="ES" />
              <Picker.Item label="Perú" value="PE" />
            </Picker>
          </View>

          <TouchableWithoutFeedback
            onPressIn={() => animacionEntrada()}
            onPressOut={() => animacionSalida()}
            onPress={() => consultarClima()}
          >
            <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
              <Text style={styles.txtBuscar}>Consultar Clima</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: "#FFF",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#FFF",
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
  },
  txtBuscar: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});
export default Formulario;
