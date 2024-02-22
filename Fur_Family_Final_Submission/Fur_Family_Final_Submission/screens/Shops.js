import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, Bars3Icon } from "react-native-heroicons/outline";
import { HomeIcon, ShoppingBagIcon, TagIcon, BuildingStorefrontIcon } from "react-native-heroicons/solid";

const Shops = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

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

                {/* Heading */}
                <View className="p-4 flex items-center space-y-8">
                    <Text className="text-2xl font-medium text-black">Shops</Text>
                </View>

                {/* Main Content */}
                <View className="p-4 flex items-center space-y-8">


                    {/* Buttons */}
                    <TouchableOpacity onPress={() => navigation.navigate('Online Shops')} className="bg-white py-2 px-4 rounded-full mb-2 w-2/3 shadow-xl flex items-center" activeOpacity={0.6}>
                        <ShoppingBagIcon size={20} color="#000000" />
                        <Text className="text-black text-center text-base">Online Shops</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Top Selling Products')} className="bg-white py-2 px-4 rounded-full mb-2 w-2/3 shadow-xl flex items-center" activeOpacity={0.6}>
                        <TagIcon size={20} color="#000000" />
                        <Text className="text-black text-center text-base">Top Selling Products</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Find Nearest Store')} className="bg-white py-2 px-4 rounded-full w-2/3 shadow-xl flex items-center" activeOpacity={0.6}>
                        <BuildingStorefrontIcon size={20} color="#000000" />
                        <Text className="text-black text-center text-base">Find Nearest Store</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default Shops