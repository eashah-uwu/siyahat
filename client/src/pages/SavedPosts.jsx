import React from 'react'

import {Box, useMediaQuery} from "@mui/material";
import { useSelector } from 'react-redux';
import Navbar  from "../components/Navbar";
import MyPostWidget from "../widgets/MyPostWidget.jsx"
import PostsWidget from '../widgets/PostsWidget';



function SavedPosts() {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id,picturePath } = useSelector((state) => state.user);
  
    return(
      <Box mt="7rem" bgcolor="rgb(247,245,235)">
      <Navbar />
      <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          
          <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath = {picturePath}/>
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              </Box>
            )}
      </Box>
      </Box>
    );
}

export default SavedPosts