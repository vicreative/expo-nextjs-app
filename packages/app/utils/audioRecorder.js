import { Alert } from 'react-native';
import { Audio } from 'expo-av';

// Function to start recording
export const startRecording = async ({
  onRecordingStatusUpdate = () => {},
  onRecordingStart = () => {}
}) => {
  try {
    const getAudioPermission = await Audio.requestPermissionsAsync();
    if (getAudioPermission.granted === false) {
      Alert.alert('Access denied', 'You denied access to your microphone', [{ text: 'OK' }]);

      return;
    } else {
      const recording = new Audio.Recording();

      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        // Prepare the Audio Recorder
        await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        recording.setOnRecordingStatusUpdate(status => onRecordingStatusUpdate(status, recording));
        // Start recording
        await recording.startAsync();
        onRecordingStart();
      } catch (error) {
        console.warn(error);
      }
    }
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

export const stopRecording = async ({ recordedUri, recording, onRecordingStopped = () => {} }) => {
  try {
    // Stop recording
    if (!recordedUri) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false
      });
    }
    const uri = recording.getURI();
    onRecordingStopped(uri);
    console.log('Recording stopped and stored at', uri);
  } catch (err) {
    console.error('Failed to stop recording', err);
  }
};

export const loadSound = async ({
  uri,
  initialStatus = { progressUpdateIntervalMillis: 500, shouldPlay: false },
  downloadFirst = false,
  setSound = () => {},
  onPlaybackStatusUpdate = () => {}
}) => {
  try {
    const getAudioPermission = await Audio.requestPermissionsAsync();
    if (getAudioPermission.granted === false) {
      Alert.alert('Access denied', 'You denied access to your microphone', [{ text: 'OK' }]);

      return;
    } else {
      const sound = new Audio.Sound();
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        });

        await sound.loadAsync({ uri: uri }, initialStatus, downloadFirst);
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(status => onPlaybackStatusUpdate(status));
      } catch (err) {
        console.warn(err);
      }
    }
  } catch (err) {
    console.error('Failed to play audio', err);
  }
};

export const unLoadSound = async ({ sound }) => {
  try {
    await sound.unloadAsync();
  } catch (err) {
    console.warn(err);
  }
};

export const playSound = async ({ sound }) => {
  try {
    await sound.playAsync();
  } catch (err) {
    console.warn(err);
  }
};

export const pauseSound = async ({ sound }) => {
  try {
    await sound.pauseAsync();
  } catch (err) {
    console.warn(err);
  }
};

export const stopSound = async ({ sound }) => {
  try {
    await sound.stopAsync();
  } catch (err) {
    console.warn(err);
  }
};
