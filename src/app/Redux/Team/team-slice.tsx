import { createSlice } from "@reduxjs/toolkit";

export interface TeamState {
  teamName: string;
  teamId: string;
}

const initialState: TeamState = {
  teamName: "",
  teamId: "",
};

export const TeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamInfo: (state, action) => {
      state.teamId = action.payload.teamId;
      state.teamName = action.payload.teamName;
    },
  },
});

export const {setTeamInfo} = TeamSlice.actions;
export default TeamSlice.reducer;