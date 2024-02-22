import React, { useState, useRef, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Modal,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import petHotelData from '../data/pethotels.json';
import { UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import AppointmentBooking from '../BookingApp';

const PetHotels = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPetHotel, setSelectedPetHotel] = useState(null);
    const [selectedPetHotelColor, setSelectedPetHotelColor] = useState('red');
    const [displayLocations, setDisplayLocations] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [matchingPetHotelNames, setMatchingPetHotelNames] = useState([]);
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
            setMarkers(petHotelData);
            mapViewRef.current.animateToRegion(initialRegion, 500);
        } else {
            setMarkers([]);
        }
        setDisplayLocations(!displayLocations);
    };

    const handleSearch = (query) => {
        const filteredPetHotels = petHotelData.filter(
            (hotel) =>
                hotel.name.toLowerCase().includes(query.toLowerCase()) ||
                hotel.address.toLowerCase().includes(query.toLowerCase())
        );
        setMarkers(filteredPetHotels);
        setSearchQuery(query);
        const matchingNames = filteredPetHotels.map((hotel) => hotel.name);
        setMatchingPetHotelNames(matchingNames);
        setSelectedPetHotel(null);
    };

    const handleListItemClick = (hotel) => {
        setSelectedPetHotel(hotel);
        setSelectedPetHotelColor('green');
        if (mapViewRef.current && hotel) {
            const { latitude, longitude } = hotel;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            };
            mapViewRef.current.animateToRegion(region, 500);
        }
    };

    const handleMarkerPress = (hotel) => {
        setSelectedPetHotel(hotel);
        setSelectedPetHotelColor('green');
    };

    return (
        <ImageBackground
            source={require('../assets/background-img.png')}
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Pet Hotel Locations</Text>
                </View>

                {/* Main Content */}
                <View style={{ flex: 1, padding: 16 }}>
                    <MapView
                        ref={mapViewRef}
                        style={{ height: 180 }}
                        initialRegion={initialRegion}
                    >
                        {markers.map((hotel, index) => (
                            <Marker
                                key={index.toString()}
                                coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
                                title={hotel.name}
                                description={hotel.address}
                                pinColor={hotel === selectedPetHotel ? selectedPetHotelColor : 'red'}
                                onPress={() => handleMarkerPress(hotel)}
                            />
                        ))}
                    </MapView>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View
                            style={{
                                flex: 2,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 5,
                                shadowColor: '#171717',
                                shadowOffset: { width: -2, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                            }}
                        >
                            <TextInput
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChangeText={(text) => handleSearch(text)}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#ffffff',
                                borderRadius: 50,
                                shadowColor: '#171717',
                                shadowOffset: { width: -2, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                            }}
                        >
                            <Button title="Search" onPress={() => handleSearch(searchQuery)} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#ffffff',
                                borderRadius: 50,
                                shadowColor: '#171717',
                                shadowOffset: { width: -2, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                            }}
                        >
                            <Button title="Display Locations" onPress={loadMarkers} />
                        </View>
                    </View>
                    {selectedPetHotel && (
                        <View style={{ marginTop: 20 }}>
                            <View>
                                {selectedPetHotel.name && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Name: {selectedPetHotel.name}
                                    </Text>
                                )}
                                {selectedPetHotel.address && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Address: {selectedPetHotel.address}
                                    </Text>
                                )}

                                <TouchableOpacity
                                    onPress={showAppointmentModal}
                                    style={{
                                        padding: 10,
                                        borderRadius: 5,
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
                        data={matchingPetHotelNames}
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
                                    const hotel = markers.find((h) => h.name === item);
                                    handleListItemClick(hotel);
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

export default PetHotels;
