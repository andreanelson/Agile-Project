import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentBooking = ({  }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookAppointment = () => {
    setDatePickerVisibility(true);
  };


  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      
    }
    setDatePickerVisibility(false);
  };


  const handleConfirmBooking = () => {
  if (selectedDate) {
    const selectedHour = selectedDate.getHours();
    if (selectedHour >= 8 && selectedHour < 20) {
      Alert.alert('Booking Confirmed', 'Your appointment has been successfully booked.');
    } else {
      Alert.alert('Booking Unavailable', 'Booking is only available between 8 AM and 8 PM.');
    }
  } else {
   
    Alert.alert('No Date Selected', 'Please select a date and time for your appointment.');
  }
};


  return (
    <View>
      <Button title="Book Appointment" onPress={handleBookAppointment} />

    
      {isDatePickerVisible && (
        <View>
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="datetime" 
            is24Hour={true} 
            display="calendar"
            onChange={handleDateChange}
            minuteInterval={15} 
          />
         
          <Button title="Confirm" onPress={handleConfirmBooking} />
        </View>
      )}
    </View>
  );
};

export default AppointmentBooking;
