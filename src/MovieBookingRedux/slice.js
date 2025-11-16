import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";

const initialState = {
  seatsData: data,

  selectedSeats: [],
};

const bookingSlice = createSlice({
  name: "movieBooking",
  initialState,
  reducers: {
    chooseSeat: (state, action) => {
      const seat = action.payload;
      const index = state.selectedSeats.findIndex(
        (s) => s.hang === seat.hang && s.soGhe === seat.soGhe
      );

      if (index !== -1) {
        state.selectedSeats.splice(index, 1);
      } else {
        state.selectedSeats.push(seat);
      }
    },

    confirmBooking: (state) => {
      if (state.selectedSeats.length === 0) {
        alert("Vui lòng chọn ghế trước khi đặt!");
        return;
      }

      state.selectedSeats.forEach((selectedSeat) => {
        const row = state.seatsData.find((r) => r.hang === selectedSeat.hang);
        if (row) {
          const seatToBook = row.danhSachGhe.find(
            (s) => s.soGhe === selectedSeat.soGhe
          );
          if (seatToBook) {
            seatToBook.trangThai = true;
          }
        }
      });

      state.selectedSeats = [];
      alert(`Bạn đã đặt thành công ${state.seatsData.length} ghế!`);
    },
  },
});

export const { chooseSeat, confirmBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
