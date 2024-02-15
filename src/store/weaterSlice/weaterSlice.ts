import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "../../Api/const";

export interface IWeather {
  isLoading: boolean;
  error: string;
  weather: any;
}

// export const fetchWeahter = createAsyncThunk<IWeather, string>(
//   "fetch/feacthWeather",
//   async (city) => {
//     try {
//       const response: Response = await fetch(
//         `${API_URL}data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`,
//       );

//       if (response.ok && response.status >= 200 && response.status < 300) {
//         return response.json();
//       } else {
//         throw new Error(response.statusText);
//       }
//     } catch (error) {
//       return error;
//     }
//   },
// );

export const fetchWeahter = createAsyncThunk<IWeather, string>(
  "fetch/feacthWeather",
  async (city) => {
    const response: Response = await fetch(
      `${API_URL}data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`,
    );

    if (response.ok && response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  },
);

const initialState: IWeather = {
  isLoading: false,
  error: "",
  weather: {},
};

const weaterSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeahter.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.weather = {};
      })
      .addCase(fetchWeahter.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.error = action.payload.error ?? "";
        state.weather = action.payload;
      })
      .addCase(fetchWeahter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Ошибка";
        state.weather = {};
      });
  },
});

export default weaterSlice.reducer;
