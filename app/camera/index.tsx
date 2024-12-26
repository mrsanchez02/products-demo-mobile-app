import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useCameraStore } from '@/presentation/store/useCameraStore';


export default function CameraScreen() {

  const { addSelectedImage } = useCameraStore();

  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string>()
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();


  const cameraViewRef = useRef<CameraView>(null);

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } = await requestCameraPermission()
      if (cameraPermissionStatus !== 'granted') {
        Alert.alert('Sorry but...', 'Camera permission is required to take pictures.');
        return;
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission();
      if (mediaPermissionStatus !== 'granted') {
        Alert.alert('Sorry but...', 'Gallery permission is required to save pictures.');
        return;
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error requesting permissions');
    }
  }

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted || !mediaPermission?.granted) {
    return (
      <View style={{
        ...styles.container,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ThemedText style={styles.message}>
          Necesitamos permiso para acceder a la cámara y a la galería.
        </ThemedText>
        <TouchableOpacity onPress={onRequestPermissions}>
          <ThemedText type="subtitle">Solicitar permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const onShutterPress = async () => {
    if (!cameraViewRef.current) return;

    const picture = await cameraViewRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);

  }

  const onReturnPress = () => {
    // TODO: Clean up
    router.dismiss();
  }

  const onPictureConfirmed = async () => {
    if (!selectedImage) return; // Should not happen
    await MediaLibrary.createAssetAsync(selectedImage);

    addSelectedImage(selectedImage);
    router.dismiss();
  }

  const onRetakePicture = () => {
    setSelectedImage(undefined);
  }

  const onPickImages = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
      aspect: [4, 3],
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;

    result.assets.forEach(asset => addSelectedImage(asset.uri));
    router.dismiss();
  }

  const onFlashPress = () => {
    if (flash === 'off') {
      setFlash('on');
    } else if (flash === 'on') {
      setFlash('auto');
    } else {
      setFlash('off');
    }
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <ConfirmImageButton onPress={onPictureConfirmed} />
        <RetakePictureButton onPress={onRetakePicture} />
        <ReturnCancelButton onPress={onReturnPress} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraViewRef} flash={flash}>
        <ShutterButton onPress={onShutterPress} />
        <FlipCameraButton onPress={toggleCameraFacing} />
        {/* TODO Gallery */}
        <GalleryButton onPress={onPickImages} />

        <ReturnCancelButton onPress={onReturnPress} />
        <FlashButton onPress={onFlashPress} flashMode={flash} />
      </CameraView>
    </View>
  );
}

// Custom Components
const ShutterButton = ({ onPress = () => { } }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        }
      ]}
      onPress={onPress}
    >
    </TouchableOpacity>
  )
}

const FlipCameraButton = ({ onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.flipCameraButton}
    >
      <Ionicons name="camera-reverse-outline" size={30} color="white" />
    </TouchableOpacity>
  )
}

const GalleryButton = ({ onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.galleryButton}
    >
      <Ionicons name="images-outline" size={30} color="white" />
    </TouchableOpacity>
  )
}

const ReturnCancelButton = ({ onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.returnCancelButton}
    >
      <Ionicons name="arrow-back-outline" size={30} color="white" />
    </TouchableOpacity>
  )
}

interface FlashButtonProps {
  onPress: () => void;
  flashMode: FlashMode;
}

const FlashButton = ({ onPress, flashMode }: FlashButtonProps) => {
  const flashIcon = {
    on: 'flash',
    off: 'flash-off-outline',
    auto: 'flash'
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.flashButton}
    >
      <Ionicons name={flashIcon[flashMode] as keyof typeof Ionicons.glyphMap} size={30} color={flashMode === 'auto' ? "yellow" : "white"} />
    </TouchableOpacity>
  )
}

const ConfirmImageButton = ({ onPress = () => { }}) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        }
      ]}
      onPress={onPress}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  )
}

const RetakePictureButton = ({ onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.flipCameraButton}
    >
      <Ionicons name="close-outline" size={30} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
