import { AudioFrequencyIcon } from 'app/components/Icons/Audio';
import spacing from 'app/config/theme/spacing';
import { Flex } from 'native-base';

function AudioPlayer({
  preview = true,
  src,
  preload,
  style,
  controls,
  autoPlay,
  controlsList,
  disableRemotePlayback,
  loop,
  muted,
  iconSize = spacing[100]
}) {
  return preview ? (
    <audio
      src={src}
      preload={preload}
      style={style}
      controls={preview ? true : controls}
      autoPlay={autoPlay}
      controlsList={controlsList}
      disableRemotePlayback={disableRemotePlayback}
      loop={loop}
      muted={muted}
      crossOrigin="anonymous"
    />
  ) : (
    <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
      <AudioFrequencyIcon width={iconSize} height={iconSize} />
    </Flex>
  );
}

export default AudioPlayer;
