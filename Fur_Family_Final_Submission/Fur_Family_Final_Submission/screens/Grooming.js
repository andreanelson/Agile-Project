import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, SafeAreaView, Image, Modal, ImageBackground, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import groomersData from '../data/groomer_locations.json';
import { UserIcon } from "react-native-heroicons/outline";
import { HomeIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import AppointmentBooking from '../BookingApp';

const Grooming = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGroomer, setSelectedGroomer] = useState(null);
    const [selectedGroomerColor, setSelectedGroomerColor] = useState('red');
    const [displayLocations, setDisplayLocations] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [matchingGroomerNames, setMatchingGroomerNames] = useState([]);
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
            setMarkers(groomersData);
            mapViewRef.current.animateToRegion(initialRegion, 500);
        } else {
            setMarkers([]);
        }
        setDisplayLocations(!displayLocations);
    };

    const handleSearch = (query) => {
        const filteredGroomers = groomersData.filter(
            (groomer) =>
                groomer.name.toLowerCase().includes(query.toLowerCase()) ||
                groomer.address.toLowerCase().includes(query.toLowerCase())
        );
        setMarkers(filteredGroomers);
        setSearchQuery(query);
        const matchingNames = filteredGroomers.map((groomer) => groomer.name);
        setMatchingGroomerNames(matchingNames);
        setSelectedGroomer(null);
    };

    const handleListItemClick = (groomer) => {
        setSelectedGroomer(groomer);
        setSelectedGroomerColor('green');
        if (mapViewRef.current && groomer) {
            const { latitude, longitude } = groomer;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            };
            mapViewRef.current.animateToRegion(region, 500);
        }
    };

    const handleMarkerPress = (groomer) => {
        setSelectedGroomer(groomer);
        setSelectedGroomerColor('green');
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Grooming Locations</Text>
                </View>

                {/* Main Content */}
                <View style={{ flex: 1, padding: 16 }}>
                    <MapView
                        ref={mapViewRef}
                        style={{ height: 180 }}
                        initialRegion={initialRegion}
                    >
                        {markers.map((groomer, index) => (
                            <Marker
                                key={index.toString()}
                                coordinate={{ latitude: groomer.latitude, longitude: groomer.longitude }}
                                title={groomer.name}
                                description={groomer.address}
                                pinColor={groomer === selectedGroomer ? selectedGroomerColor : 'red'}
                                onPress={() => handleMarkerPress(groomer)}
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

                    {selectedGroomer && (
                        <View style={{ marginTop: 20 }}>
                            <View>
                                {selectedGroomer.name && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Name: {selectedGroomer.name}
                                    </Text>
                                )}
                                {selectedGroomer.address && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Address: {selectedGroomer.address}
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
                        data={matchingGroomerNames}
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
                                    const groomer = markers.find((g) => g.name === item);
                                    handleListItemClick(groomer);
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

export default Grooming;
