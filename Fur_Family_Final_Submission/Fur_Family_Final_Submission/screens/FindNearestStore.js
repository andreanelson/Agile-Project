import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import shopsData from '../data/find_nearest_store.json';
import { UserIcon } from "react-native-heroicons/outline";
import { ArrowUturnLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const FindNearestStore = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);



    const [searchQuery, setSearchQuery] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const [selectedShopColor, setSelectedShopColor] = useState('red');
    const [displayLocations, setDisplayLocations] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [matchingShopNames, setMatchingShopNames] = useState([]);
    const mapViewRef = useRef(null);

    const initialRegion = {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    const loadMarkers = () => {
        if (!displayLocations) {
            setMarkers(shopsData);
            mapViewRef.current.animateToRegion(initialRegion, 500);
        } else {
            setMarkers([]);
        }
        setDisplayLocations(!displayLocations);
    };

    const handleSearch = (query) => {
        const filteredShops = shopsData.filter(
            (shop) =>
                shop.name.toLowerCase().includes(query.toLowerCase()) ||
                shop.name.toLowerCase().includes(query.toLowerCase()) ||
                shop.address.toLowerCase().includes(query.toLowerCase())
        );
        setMarkers(filteredShops);
        setSearchQuery(query);
        const matchingNames = filteredShops.map((shop) => shop.name);
        setMatchingShopNames(matchingNames);
        setSelectedShop(null);
    };

    const handleListItemClick = (shop) => {
        setSelectedShop(shop);
        setSelectedShopColor('green');
        if (mapViewRef.current && shop) {
            const { latitude, longitude } = shop;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            };
            mapViewRef.current.animateToRegion(region, 500);
        }
    };

    const handleMarkerPress = (shop) => {
        setSelectedShop(shop);
        setSelectedShopColor('green');
    };

    return (
        <ImageBackground
            source={require("../assets/background-img.png")}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                {/* Top Bar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    {/* Left Section (Side Navigation) */}
                    <TouchableOpacity onPress={() => navigation.navigate('Shops')}>
                        <ArrowUturnLeftIcon size={35} color="#000000" />
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Shop Locations</Text>
                </View>

                {/* Main Content */}
                <View style={{ flex: 1, padding: 16 }}>
                    <View style={{ flex: 3, marginBottom: 16 }}>
                        <MapView
                            ref={mapViewRef}
                            style={{ flex: 1 }}
                            initialRegion={initialRegion}
                        >
                            {markers.map((shop, index) => (
                                <Marker
                                    key={index.toString()}
                                    coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                                    title={shop.name}
                                    description={shop.address}
                                    pinColor={shop === selectedShop ? selectedShopColor : 'red'}
                                    onPress={() => handleMarkerPress(shop)}
                                />
                            ))}
                        </MapView>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{
                            flex: 2, backgroundColor: 'white', borderRadius: 20, padding: 5, shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <TextInput
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                        </View>
                        <View style={{
                            flex: 1, backgroundColor: '#ffffff', borderRadius: 50, shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <Button style={{ color: 'black' }} title="Search" onPress={() => handleSearch(searchQuery)} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{
                            flex: 1, backgroundColor: '#ffffff', borderRadius: 50, shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}>
                            <Button title="Display Locations" onPress={loadMarkers} />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {selectedShop && (
                            <View>
                                {selectedShop.name && (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                        Name: {selectedShop.name}
                                    </Text>
                                )}
                                {selectedShop.address && (
                                    <Text style={{ fontSize: 16, color: 'black' }}>
                                        Address: {selectedShop.address}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                    <View style={{ flex: 3, padding: 16 }}>
                        {matchingShopNames.length > 0 && (
                            <FlatList
                                data={matchingShopNames}
                                keyExtractor={(item, index) => `${item}_${index}`}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: 'black',
                                                backgroundColor: '#ffffff',
                                                borderWidth: 1,
                                                padding: 12,
                                                marginBottom: 8,
                                                borderRadius: 0,
                                                textAlign: 'center',
                                            }}
                                            onPress={() => {
                                                const shop = markers.find((s) => s.name === item);
                                                handleListItemClick(shop);
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default FindNearestStore;