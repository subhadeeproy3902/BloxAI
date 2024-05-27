"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './_components/Navbar'
import FileList from '../_components/FileList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { FileListContext } from '@/app/_context/FilesListContext';

export default function Page() {
  const { user }: any = useKindeBrowserClient();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();

  useEffect(() => {
    if(fileList_){
      const nonArchivedFiles = fileList_.filter((file: { archived: boolean; }) => file.archived);
      setFileList(nonArchivedFiles);
    }
  }, [fileList_]);


  return (
    <div className='md:p-8 p-3'>
      <Navbar />
      <FileList
        fileList={fileList || null}
        picture={user?.picture || "https://picsum.photos/50"}
      />
    </div>
  )
}