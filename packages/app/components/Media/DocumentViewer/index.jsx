import { PdfIcon } from 'app/components/Icons/File';
import spacing from 'app/config/theme/spacing';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import { Flex } from 'native-base';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

function DocumentViewer({ preview = true, iconSize = spacing[100], source, width, height }) {
  return (
    <>
      {preview ? (
        Platform.OS === 'ios' ? (
          <WebView source={{ uri: source.uri }} />
        ) : (
          <WebView
            source={{
              uri: `https://docs.google.com/viewer?embedded=true&url=${source.uri}`
            }}
            style={{ marginTop: STATUS_BAR_HEIGHT }}
          />
        )
      ) : (
        <Flex alignItems="center" justifyContent="center" width={width} height={height}>
          <PdfIcon width={iconSize} height={iconSize} />
        </Flex>
      )}
    </>
  );
}

export default DocumentViewer;
