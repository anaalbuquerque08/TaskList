import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const TaskForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'O título precisa ter pelo menos 2 caracteres')
      .max(24, 'O título só pode ter até 24 caracteres')
      .required('O título é obrigatório'),
    description: Yup.string()
      .min(8, 'A descrição precisa ter pelo menos 8 caracteres')
      .max(60, 'A descrição só pode ter até 60 caracteres')
      .required('A descrição é obrigatória'),
    step: Yup.string()
      .oneOf(['Para fazer', 'Em andamento', 'Pronto'], 'Step inválido')
      .required('O step é obrigatório'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.form}>
          <Text style={styles.label}>Título da tarefa</Text>
          <TextInput
            style={[styles.input, Platform.OS === 'web' && styles.webInput]}
            placeholder="Título"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          />
          {touched.title && errors.title && <Text style={styles.errorMessage}>{errors.title}</Text>}

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, Platform.OS === 'web' && styles.webInput]}
            placeholder="Descrição"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
          />
          {touched.description && errors.description && <Text style={styles.errorMessage}>{errors.description}</Text>}

          <Text style={styles.label}>Step</Text>
          <View style={[styles.pickerContainer, Platform.OS === 'ios' && styles.iosPickerContainer]}>
            <Picker
              selectedValue={values.step}
              onValueChange={(itemValue) => setFieldValue('step', itemValue)}
              style={Platform.OS === 'ios' ? styles.iosPicker : styles.picker}
            >
              <Picker.Item label="Para fazer" value="Para fazer" />
              <Picker.Item label="Em andamento" value="Em andamento" />
              <Picker.Item label="Pronto" value="Pronto" />
            </Picker>
          </View>
          {touched.step && errors.step && <Text style={styles.errorMessage}>{errors.step}</Text>}

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    borderRadius: 8,
    fontSize: 16,
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  webInput: {
    outlineWidth: 0,
  },
  button: {
    backgroundColor: '#8a2be2',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1.8,
    borderRadius: 4,
    marginBottom: 20,
  },
  iosPickerContainer: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  picker: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
  },
  iosPicker: {
    height: 200,
    width: '100%',
  },
});

export default TaskForm;


