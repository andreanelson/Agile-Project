import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, FlatList, Modal, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import clinicData from '../data/clinic_locations.json';
import { UserIcon } from "react-native-heroicons/outline";
import { HomeIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import AppointmentBooking from '../BookingApp';

const Clinics = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [selectedClinicColor, setSelectedClinicColor] = useState('red');
    const [displayLocations, setDisplayLocations] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [matchingClinicNames, setMatchingClinicNames] = useState([]);
    const [isAppointmentModalVisible, setAppointmentModalVisible] = useState(false);
    const mapViewRef = useRef(null);

    const showAppointmentModal = () => {
        setAppointmentModalVisible(true);
    };

    const hideAppointmentModal = () => {
        setAppointmentModalVisible(false);
    };

    const initialRegion = {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    const loadMarkers = () => {
        if (!displayLocations) {
            setMarkers(clinicData);
            mapViewRef.current.animateToRegion(initialRegion, 500);
        } else {
            setMarkers([]);
        }
        setDisplayLocations(!displayLocations);
    };

    const handleSearch = (query) => {
        const filteredClinics = clinicData.filter(
            (clinic) =>
                clinic.name.toLowerCase().includes(query.toLowerCase()) ||
                clinic.address.toLowerCase().includes(query.toLowerCase())
        );
        setMarkers(filteredClinics);
        setSearchQuery(query);
        const matchingNames = filteredClinics.map((clinic) => clinic.name);
        setMatchingClinicNames(matchingNames);
        setSelectedClinic(null);
    };

    const handleListItemClick = (clinic) => {
        setSelectedClinic(clinic);
        setSelectedClinicColor('green');
        if (mapViewRef.current && clinic) {
            const { latitude, longitude } = clinic;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            };
            mapViewRef.current.animateToRegion(region, 500);
        }
    };

    const handleMarkerPress = (clinic) => {
        setSelectedClinic(clinic);
        setSelectedClinicColor('green');
    };

    return (
        <ImageBackground
            source={require("../assets/background-img.png")}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/* Top Bar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    {/* Left Section (Side Navigation) */}
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <HomeIcon size={35} color="#000000" />
                    </TouchableOpacity>

                    {/* Middle Section (Logo) */}
                    <View>
                        <Image
                            source={require('../assets/Logo.png')}
                            style={{ width: 80, height: 80 }}
                        />
                    </View>

                    {/* Right Section (Profile Pic) */}
                    <View>
                        <UserIcon size={35} color="#000000" />
                    </View>
                </View>


                {/* Heading */}
                <View style={{ padding: 16, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Clinic Locations</Text>
                </View>

                {/* Main Content */}
                <View style={{ flex: 1, padding: 16 }}>
                    <MapView
                        ref={mapViewRef}
                        style={{ height: 180 }}
                        initialRegion={initialRegion}
                    >
                        {markers.map((clinic, index) => (
                            <Marker
                                key={index.toString()}
                                coordinate={{ latitude: clinic.latitude, longitude: clinic.longitude }}
                                title={clinic.name}
                                description={clinic.address}
                                pinColor={clinic === selectedClinic ? selectedClinicColor : 'red'}
                                onPress={() => handleMarkerPress(clinic)}
                            />
                        ))}
                    </MapView>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{
                            flex: 2,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 5,
                            shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <TextInput
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChangeText={(text) => handleSearch(text)}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 50,
                            shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <Button title="Search" onPress={() => handleSearch(searchQuery)} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 50,
                            shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <Button title="Display Locations" onPress={loadMarkers} />
                        </View>
                    </View>
                    {selectedClinic && (
                        <View style={{ marginTop: 20 }}>
                            <View>
                                {selectedClinic.name && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Name: {selectedClinic.name}
                                    </Text>
                                )}
                                {selectedClinic.address && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Address: {selectedClinic.address}
                                    </Text>
                                )}

                                <TouchableOpacity
                                    onPress={showAppointmentModal}
                                    style={{ // Adjust the button's background color
                                        padding: 10, // Increase padding for touchable area
                                        borderRadius: 5, // Add some border radius for a nicer look
                                        backgroundColor: 'lightblue',
                                        alignItems: 'center',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'blue' }}>
                                        Book Appointment
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                visible={isAppointmentModalVisible}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={hideAppointmentModal}
                            >

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', width: '80%', padding: 20 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Appointment Booking</Text>
                                        <AppointmentBooking />

                                        <Button title="Cancel" onPress={hideAppointmentModal} />
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )}

                    <FlatList
                        data={matchingClinicNames}
                        keyExtractor={(item, index) => `${item}_${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    padding: 12,
                                    marginBottom: 8,
                                    borderRadius: 5,
                                    shadowColor: '#171717',
                                    shadowOffset: { width: -2, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                }}
                                onPress={() => {
                                    const clinic = markers.find((c) => c.name === item);
                                    handleListItemClick(clinic);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: 'black',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Clinics;
