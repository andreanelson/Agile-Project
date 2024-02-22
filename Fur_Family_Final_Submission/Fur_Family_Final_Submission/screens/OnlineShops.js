import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ArrowUturnLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import onlineShopsData from '../data/pet_stores.json';
import { Linking } from 'react-native';

const openShopUrl = (url) => {
    Linking.openURL(url)
        .catch((error) => {
            console.error('Error opening URL:', error);
        });
};

const OnlineShops = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const filteredShops = onlineShopsData.filter((shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const inputRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const renderOnlineShops = () => {
        return filteredShops.map((shop, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => openShopUrl(shop.url)}
                activeOpacity={0.6}
            >
                <View className="ml-5 mt-5 flex-row items-center space-x-10">
                    <Image source={{ uri: shop.image_link }} className="h-20 w-20 rounded-full" />

                    <View className="bg-white p-6 rounded-xl shadow-xl w-60">
                        <Text className="text-base font-medium mb-4">{shop.name}</Text>
                        <Text className=" items-center text-sm text-gray-500">Rating: {shop.rating}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ));
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
                    <TouchableOpacity onPress={() => navigation.navigate('Shops')}>
                        <ArrowUturnLeftIcon size={35} color="#000000" />
                    </TouchableOpacity>

                    {/* Middle Section (Logo) */}
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

                {/* {Heading} */}
                <View className="p-4 flex items-center space-y-8">
                    <Text className="text-2xl font-medium text-black">Online Shops</Text>
                </View>

                {/* {SearchBar} */}
                <TouchableOpacity
                    className=" flex-row items-center p-4" activeOpacity={1.0}
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
                                placeholder='Search Shops...'
                                keyboardType='default'
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* {Body} */}
                <ScrollView className="bg-transparent" vertical
                    showsVerticalScrollIndicator={true}>
                    {/* {Featured Shops} */}
                    {renderOnlineShops()}

                </ScrollView>

            </SafeAreaView>
        </ImageBackground>
    )
}

export default OnlineShops