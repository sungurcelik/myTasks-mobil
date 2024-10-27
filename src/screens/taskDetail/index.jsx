import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Divider} from '@ui-kitten/components';
import moment from 'moment';
import {setCategory} from '../../utils/function';
import {status, taskValues} from '../../utils/constants';
import {AppColors} from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = ({route}) => {
  const {item} = route?.params;

  // delete butonu taskları silmek için
  const deleteTask = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; // kayıtlı görev yoksa fonksiyonu durdur
      }
      const tasks = JSON.parse(savedTasks);

      // silinecek görevi filtrele
      const filteredTasks = tasks.filter(task => task.id !== item.id);

      // filtrelenmiş görevleri depola
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log('Görev Silindi');
    } catch (error) {
      console.log(error);
    }
  };

  // update butonları için güncelleme
  const updateTask = async newStatus => {
    try {
      // mevcut görevleri al
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks === null) {
        return;
      }

      const tasks = JSON.parse(savedTasks);

      //güncellenecek görevi bul

      const updatedTask = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus, // yeni durumu uygula
          };
        }
        return task;
      });
      // güncellenmiş görevleri depola
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      console.log(updateTask);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            Title:
          </Text>
          <Text>{item.title}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            Description:
          </Text>
          <Text>{item.description}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            Start Date:
          </Text>
          <Text>{moment(item.startDate).format('YYYY/MM/DD')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            End Date:
          </Text>
          <Text>{moment(item.endDate).format('YYYY/MM/DD')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            Category:
          </Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}>
            Status:
          </Text>
          <Text>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <Divider />
      </ScrollView>
      <View>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.button}
          status="primary">
          START
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLATED)}
          style={styles.button}
          status="success">
          COMPLATED
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.button}
          status="danger">
          CANCEL
        </Button>
        <Button onPress={deleteTask} style={styles.button} status="warning">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    padding: 10,
  },
  button: {
    marginVertical: 5,
  },
});
