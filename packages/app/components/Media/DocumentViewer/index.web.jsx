import { PdfIcon } from 'app/components/Icons/File';
import spacing from 'app/config/theme/spacing';
import { Flex } from 'native-base';

function DocumentViewer({ preview = true, src, iconSize = spacing[100], style }) {
  return preview ? (
    <object data={`https://docs.google.com/viewer?embedded=true&url=${src}`} style={style}></object>
  ) : (
    <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
      <PdfIcon width={iconSize} height={iconSize} />
    </Flex>
  );
}

export default DocumentViewer;
