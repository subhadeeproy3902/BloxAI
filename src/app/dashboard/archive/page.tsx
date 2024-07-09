"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './_components/Navbar'
import FileList from '../_components/FileList'
import { FileListContext } from '@/app/_context/FilesListContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store';

export default function Page() {
  const user = useSelector((state:RootState)=>state.auth.user)
  const [fileList, setFileList] = useState<any>();
  const { fileList_, setFileList_ } = useContext(FileListContext);


  useEffect(() => {
    if(fileList_){
      const nonArchivedFiles = fileList_.filter((file: { archive: boolean; }) => file.archive);
      setFileList(nonArchivedFiles);
    }
  }, [fileList_]);


  return (
    <div className='md:p-8 p-3'>
      <Navbar />
      <FileList
        user={user}
        fileList={fileList || null}
        picture={user.image || "https://picsum.photos/50"}
      />
    </div>
  )
}