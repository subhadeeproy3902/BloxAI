"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './_components/Navbar'
import FileList from '../_components/FileList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { FileListContext } from '@/app/_context/FilesListContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export default function Page() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  // const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const activeTeamId = useSelector((state:RootState)=>state.team.teamId)

  useEffect(()=>{
    const getFiles = async() => {
      const result = await convex.query(api.files.getFiles,{
        teamId:activeTeamId
      })
      console.log(result)
    }
    getFiles()
  },[])

  // const getTeamList = async () => {
  //   const result = await convex.query(api.teams.getTeam, {
  //     email: user?.email,
  //   });
  //   setTeamList(result);
  //   setActiveTeam(result[0]);
  //   dispatch(
  //     setTeamInfo({ teamId: result[0]._id, teamName: result[0].teamName })
  //   );
  // };


  // useEffect(() => {
  //   if(fileList_){
  //     const nonArchivedFiles = fileList_.filter((file: { archived: boolean; }) => file.archived);
  //     setFileList(nonArchivedFiles);
  //   }
  // }, [fileList_]);


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