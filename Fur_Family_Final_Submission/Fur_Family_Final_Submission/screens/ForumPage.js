import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import db from '../database';
import { UserIcon } from "react-native-heroicons/outline";
import { ArrowUturnLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const ForumPage = ({ route }) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const { postId } = route.params;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch the selected post
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM posts WHERE id = ?',
                [postId],
                (_, { rows }) => {
                    setPost(rows._array[0]);
                }
            );
        });

        // Fetch comments associated with the selected post
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM comments WHERE post_id = ?',
                [postId],
                (_, { rows }) => {
                    setComments(rows._array);
                }
            );
        });
    }, [postId]);

    const addComment = () => {
        if (newComment.trim() !== '') {
            // Insert a new comment into the database, associating it with the post
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO comments (post_id, text) VALUES (?, ?)',
                    [postId, newComment],
                    (_, { insertId }) => {
                        // Update the comments state with the new comment
                        setComments([...comments, { id: insertId, text: newComment }]);
                        // Clear the input field
                        setNewComment('');
                    }
                );
            });
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
                    <TouchableOpacity onPress={() => navigation.navigate('Discussion Forums')}>
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
                <View className="p-4 flex items-center space-y-8">
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Discussion Forum</Text>
                </View>

                {/* Main Content */}
                <View className="p-4 flex ">

                    <View className="bg-white flex p-4 m-4 rounded-lg shadow-xl">
                        <Text className=" text-2xl font-bold text-black">{post.title}</Text>
                        <Text className="mt-2 text-lg text-black" >{post.content}</Text>
                    </View>
                    <View className=" m-1">
                        <Text className="text-xl font-bold -mb-0 text-black shadow-xl">Comments:</Text>
                        <FlatList
                            data={comments}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', padding: 8, marginBottom: 8, borderRadius: 4 }}>
                                    <Text style={{ fontSize: 16, color: 'black', }}>{item.text}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={{
                            flex: 1, backgroundColor: 'white', paddingHorizontal: 8, borderRadius: 4, height: 40, width: '100%', shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={(text) => setNewComment(text)}
                        />
                        <View style={{ marginTop: 8 }}>
                            <Button style={{}} title="Add Comment" onPress={addComment} />
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </ImageBackground>
    );
};



export default ForumPage;
