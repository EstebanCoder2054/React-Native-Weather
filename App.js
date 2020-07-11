import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import Formulario from "./components/Formulario";
import Clima from "./components/Clima";

export default function App() {


  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgcolor, setBgcolor] = useState("rgb(71,149,212)");

  const ocultarTeclado = () =>{
    Keyboard.dismiss();
  }

  useEffect(() => {
    
    consultarAPI();

    setConsultar(false);
  }, [consultar]);

  const consultarAPI = async () => {
    if(consultar){
      const {pais, ciudad} = busqueda;
      const apiKey = '9ab6227b50b38e3e3a11f75085152749';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

      try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);


        // modifica los colores de fondo basado en la temperatura
        const kelvin = 273.15;
        const {main} = resultado;
        const actual = main.temp - kelvin;

        if(actual <= 10){
          setBgcolor('rgb(105, 108, 149)');
        }else if(actual >= 10 && actual < 25){
          setBgcolor("rgb(71,149,212)");
        }else{
          setBgcolor("rgb(178, 28, 61)");
        }


      } catch(error){
        mostrarAlerta();
      }

    }
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Oops...',
      'No hay resultados, intenta con otra búsqueda',
      [
        {
          text: 'Entendido'
        }
      ]
    )
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <>
        <StatusBar style="light" />
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado}/>
            <Formulario consultar={consultar} setConsultar={setConsultar} busqueda={busqueda} setBusqueda={setBusqueda}/>
          </View>
        </View>
        </>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
