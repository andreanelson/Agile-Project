
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import db from '../database';
import { useNavigation } from '@react-navigation/native';
import { UserIcon } from "react-native-heroicons/outline";
import { HomeIcon } from "react-native-heroicons/solid";


const DiscussionForums = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);


    const handlePostSelect = (postId) => {
        navigation.navigate('ForumPage', { postId }); // Navigate to the post detail screen
    };

    useEffect(() => {
        // Retrieve posts from the database
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM posts', [], (_, { rows }) => {
                setPosts(rows._array);
            });
        });
    }, []);

    // Update the filtered posts whenever the search query changes
    useEffect(() => {
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);


    const addPost = () => {
        console.log('Adding post:', newPostTitle, newPostContent);

        if (newPostTitle.trim() !== '' && newPostContent.trim() !== '') {
            // Insert a new post into the database
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO posts (title, content) VALUES (?, ?)',
                    [newPostTitle, newPostContent, 0],
                    (_, { insertId }) => {
                        console.log('Inserted post with ID:', insertId);
                        setPosts([
                            ...posts,
                            {
                                id: insertId,
                                title: newPostTitle,
                                content: newPostContent,

                            },
                        ]);
                        setNewPostTitle('');
                        setNewPostContent('');
                    },
                    (error) => {
                        console.error('Error inserting post:', error);
                    }
                );
            });
        } else {
            console.log('Title or content is empty');
        }
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
                <View className="p-4 flex items-center space-y-8">
                    <Text className="text-2xl font-medium text-black">Discussion Forum</Text>
                </View>

                {/* Main Content */}
                <View style={{
                    flex: 1, padding: 16, shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}>
                    <TextInput
                        placeholder="Enter keyword"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'white', fontSize: 16, marginBottom: 16 }}
                    />
                    <View className="p-4 flex bg-white h-auto">
                        <TextInput
                            placeholder="Enter post title"
                            value={newPostTitle}
                            onChangeText={(text) => setNewPostTitle(text)}
                        />
                        <TextInput
                            placeholder="Enter post content"
                            value={newPostContent}
                            onChangeText={(text) => setNewPostContent(text)}
                        />
                        <Button title="Add Post" onPress={addPost} />
                    </View>

                    <View className="flex m-3 ">
                        <FlatList
                            data={filteredPosts.length > 0 ? filteredPosts : posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handlePostSelect(item.id)}>
                                    <View style={{ marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                                        <Text style={{ marginTop: 8, fontSize: 16, }}>{item.content}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};




export default DiscussionForums;
