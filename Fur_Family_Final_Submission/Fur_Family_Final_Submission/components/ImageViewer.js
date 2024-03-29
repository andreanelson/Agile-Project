import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 100,
    borderColor: "grey",
    borderWidth: 2,
    alignSelf: "center",
  },
});
