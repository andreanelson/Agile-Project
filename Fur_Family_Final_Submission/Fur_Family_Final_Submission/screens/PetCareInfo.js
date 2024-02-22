import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Linking, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import petCareData from '../data/pet_care_info.json';
import { UserIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { HomeIcon, ChevronDownIcon } from 'react-native-heroicons/solid';

const openWebsite = (url) => {
    Linking.openURL(url).catch((error) => {
        console.error('Error opening URL:', error);
    });
};

const PetCareInfo = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]); // State to store the JSON data
    const [expandedIndex, setExpandedIndex] = useState(null); // State to store the expanded item index
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const inputRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        // Load your JSON data here and set it in the 'data' state
        // Replace 'require' with the actual path to your JSON file
        const jsonData = petCareData;
        setData(jsonData);
    }, []);

    const filteredData = data.filter((item) =>
        item.grooming_tip.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleExpansion = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <ImageBackground
            source={require("../assets/background-img.png")}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                {/* Top Bar */}
                <View className="flex flex-row justify-between p-4">
                    {/* Left Section (Side Navigation) */}
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <HomeIcon size={35} color="#000000" />
                    </TouchableOpacity>

                    <View>
                        <Image
                            source={require('../assets/Logo.png')}
                            className="w-40 h-40"
                        />
                    </View>

                    {/* Right Section (Profile Pic) */}
                    <View>
                        <UserIcon size={35} color="#000000" />
                    </View>
                </View>

                {/* Heading */}
                <View className="p-4 flex items-center space-y-8">
                    <Text className="text-2xl font-medium text-black">Pet Care Info</Text>
                </View>

                {/* Search Bar */}
                <TouchableOpacity
                    className="flex-row items-center p-4"
                    activeOpacity={1.0}
                    onPress={() => {
                        // Focus on the TextInput when the search bar is pressed
                        inputRef.current.focus();
                    }}
                >
                    <View className="flex-row flex-1 space-x-2 bg-white rounded-full p-3 shadow-xl">
                        <MagnifyingGlassIcon size={20} color="#000000" />
                        <View className="flex-1">
                            <TextInput
                                ref={inputRef} // Create a ref for the TextInput
                                placeholder="Search Tips..."
                                keyboardType="default"
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Main Body */}
                <ScrollView className="bg-transparent" vertical showsVerticalScrollIndicator={false}>
                    {filteredData.map((item, index) => (
                        <TouchableOpacity key={index} activeOpacity={1.0}>
                            <View className="flex-col items-center mb-5 p-4 mx-5 rounded-2xl bg-white shadow-xl">
                                <Text className="text-lg font-semibold mb-2">{item.grooming_tip}</Text>
                                {expandedIndex === index ? (
                                    <>
                                        <Text className="text-gray-600 mb-2">{item.description}</Text>
                                        <TouchableOpacity
                                            onPress={() => openWebsite(item.website_url)}
                                            className="bg-gray-200 text-white px-4 py-2 rounded-full text-center"
                                        >
                                            <Text className="text-sm font-medium">Read More</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text className="text-gray-600 mb-2">
                                            {item.description.substring(0, 100)}...
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => toggleExpansion(index)}
                                        >
                                            <ChevronDownIcon size={25} color="#000000" />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default PetCareInfo;
