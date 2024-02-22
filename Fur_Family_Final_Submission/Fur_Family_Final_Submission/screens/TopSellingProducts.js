import React, { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ArrowUturnLeftIcon } from "react-native-heroicons/outline"
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import topSellingProductsData from '../data/products.json';

const TopSellingProducts = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const openProductUrl = (url) => {
        Linking.openURL(url)
            .catch((error) => {
                console.error('Error opening URL:', error);
            });
    };

    const renderTopSellingProducts = () => {
        return topSellingProductsData.map((product, index) => (
            <TouchableOpacity
                key={index}
                activeOpacity={1.0}
            >
                <View className="flex-col items-center mb-5 p-4 mx-5 rounded-2xl bg-white shadow-xl">
                    {/* Image */}
                    <Image source={{ uri: product.image }} className="h-40 w-40 rounded-lg" />

                    <View className="flex-1 ml-5 items-center">
                        {/* Product Name */}
                        <Text className="text-md font-medium mb-2">{product.name}</Text>

                        {/* Price */}
                        <Text className="text-gray-600 font-semibold text-lg mb-4">{product.price}</Text>

                        {/* "Visit Store" Button */}
                        <TouchableOpacity
                            onPress={() => openProductUrl(product.url)}
                            className=" bg-gray-200 py-2 px-4 rounded-full shadow-lg flex-row items-center"
                        >
                            <ShoppingBagIcon size={20} color="#000000" />
                            <Text className="text-sm font-medium">Visit Store</Text>
                        </TouchableOpacity>
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
                    <Text className="text-2xl font-medium text-black">Top Selling Products</Text>
                </View>

                {/* Top Selling Products */}
                <ScrollView className="bg-transparent" showsVerticalScrollIndicator={true}>
                    {renderTopSellingProducts()}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TopSellingProducts