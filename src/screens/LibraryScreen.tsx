// @ts-nocheck
// @ts-ignore
import React, { useEffect, useState } from "react"
import { Text, Box, VStack, Heading, useColorModeValue, View, Center, FormControl, Input, Button, Modal, Pressable, TextArea, Image, FlatList } from "native-base"
import { auth, db } from "../../firebase"
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { doc, getDoc, setDoc, addDoc, collection, query, orderBy, onSnapshot, deleteDoc, Timestamp } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore"
import { Camera, CameraType, requestCameraPermissionsAsync } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import Dropdown from "react-dropdown"

const PreviousPosts = () => {
    const [diaryEntires, setDiaryEntries] = useState([])
    const insets = useSafeAreaInsets()
    const diaryCollectionRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")
    const [image, setImage] = useState(null)

    useEffect(() => {
        const q = query(diaryCollectionRef, orderBy("createdAt", "desc"))
        onSnapshot(q, (snapshot) => {
            const diaryEntry = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setDiaryEntries(diaryEntry)
        })
    }, [])

    const handleDeleteDiaryEntry = async (id) => {
        try {
            const dbRef = doc(db, "diaryEntries", auth.currentUser.uid, "entries", id)
            await deleteDoc(dbRef)
            console.log("Diary entry deleted!")
        } catch (error) {
            console.error("Error deleting diary entry:", error)
        }
    }

    return (
        <FlatList
            style={{ height: "100%" }}
            w={"350px"}
            data={diaryEntires}
            numcolumns={1}
            borderRadius={15}
            borderWidth={5}
            borderColor={useColorModeValue("dark.100", "dark.600")}
            renderItem={({ item }) => (
                <Pressable m={5} bgColor={"gray.300"} borderRadius={10} borderWidth={5} p={5} minHeight={200}>
                    <View>
                        <Text color="black" fontWeight={"bold"} fontSize={"2xl"}>
                            {item.title}
                        </Text>
                        <Text color="black" fontSize={"lg"}>
                            Overall mood: {item.rating}
                        </Text>
                        <Text color="black" fontSize={"lg"}>
                            {item.mainText}
                        </Text>

                        <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} alt="library image" borderRadius={10} />
                        <Button onPress={() => handleDeleteDiaryEntry(item.id)} position={"absolute"} right={0} bgColor={"red.500"}>
                            X
                        </Button>
                    </View>
                </Pressable>
            )}
        />
    )
}

const LibraryScreen = () => {
    const [status, requestPermission] = Camera.useCameraPermissions()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: "",
        rating: "",
        mainText: "",
        createdAt: Timestamp.now().toDate(),
    })
    const [diaryEntires, setDiaryEntries] = useState([])
    const diaryCollectionRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")
    const [selectedImage, setSelectedImage] = useState(null)

    const [image, setImage] = useState(null)

    const handleChange = (value, key) => {
        setNewDiaryEntry((prevState) => ({ ...prevState, [key]: value }))
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            console.log(result)

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri)
            }
        } catch (error) {
            console.error("Error selecting image:", error)
        }
    }

    const handleCreateDiaryEntry = async () => {
        try {
            Keyboard.dismiss()
            const dbRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")
            const newEntry = {
                ...newDiaryEntry,
                image: selectedImage,
                createdAt: serverTimestamp(),
            }
            await addDoc(dbRef, newEntry)
            console.log("Diary entry created!")
            setSelectedImage(null)
            setIsModalVisible(false)
        } catch (error) {
            console.error("Error creating diary entry:", error)
        }
    }

    useEffect(() => {
        const q = query(diaryCollectionRef, orderBy("createdAt", "desc"))
        onSnapshot(q, (snapshot) => {
            const diaryEntry = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setDiaryEntries(diaryEntry)
        })
    }, [])

    useEffect(() => {
        requestCameraPermissionsAsync()
    })
    return (
        <SafeAreaView style={styles.contentContainer}>
            <Heading mb={5}>Library</Heading>
            <Button onPress={() => setIsModalVisible(true)} w="200px">
                <Text fontSize={"xl"}>Add new entry!</Text>
            </Button>
            <Center style={styles.container} h={"100%"}>
                <Heading fontSize="lg">Previous Entries</Heading>
                <PreviousPosts />
            </Center>
            <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton onPress={() => setIsModalVisible(false)} />
                    <Modal.Header>Add a new diary entry</Modal.Header>
                    <Modal.Body>
                        <FormControl.Label>Entry Title</FormControl.Label>
                        <Input placeholder="Title" type="text" onChangeText={(text) => handleChange(text, "title")} h="40px" bgColor={useColorModeValue("dark.100", "dark.600")} color="black" fontSize={"xl"} borderRadius={15} />
                        <FormControl.Label>Emotional Rating</FormControl.Label>
                        <Picker selectedValue={newDiaryEntry.rating} onValueChange={(itemValue) => handleChange(itemValue, "rating")} h="40px" bgColor={"white"} color="white" fontSize={"xl"} borderRadius={15}>
                            <Picker.Item label="1 - very good" value="very good" color="white" />
                            <Picker.Item label="2 - good" value="good" color="white" />
                            <Picker.Item label="3 - alright" value="alright" color="white" />
                            <Picker.Item label="4 - bad" value="bad" color="white" />
                            <Picker.Item label="5 - very bad" value="very bad" color="white" />
                        </Picker>
                        <FormControl.Label>Main Entry</FormControl.Label>
                        <TextArea placeholder="Main" type="text" color="black" onChangeText={(text) => handleChange(text, "mainText")} h={20} bgColor={useColorModeValue("dark.100", "dark.600")} color="white" fontSize={"xl"} borderRadius={15} />
                        <Button onPress={pickImage} mt={2}>
                            Select an Image!
                        </Button>
                        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                        <Button onPress={handleCreateDiaryEntry} mt={2}>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </SafeAreaView>
    )
}

export default LibraryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#2b3e49",
    },
    contentContainer: {
        flex: 1,
        height: "100%",
        backgroundColor: "#2b3e49",
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "flex-end",
        height: 100,
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 10,
        padding: 5,

        minHeight: 200,
        width: "80%",
        margin: 10,
        backgroundColor: "#2b3e49",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    },

    // container: {
})
