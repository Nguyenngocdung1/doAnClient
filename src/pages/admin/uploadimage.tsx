import React, { memo, useState } from 'react';
import { Upload } from 'antd';
interface Props {
    uploadImageState: any
}

const Uploadimage = (props: Props) => {
    const {uploadImageState} = props;
    const [fileList, setFileList] = useState <any>([]);

    const onChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
        uploadImageState(newFileList)
    };
    return (    
        <div style={{flexWrap: 'wrap'}}>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
            >
                {'+ Upload'}
            </Upload>
        </div>
    );
}

export default memo(Uploadimage)
