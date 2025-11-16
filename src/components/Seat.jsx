import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseSeat } from "../MovieBookingRedux/slice";

export default function Seat({ seat, rowHang }) {
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.movieBookingReducer);

  const isBooked = seat.trangThai;

  const isSelected = selectedSeats.some(
    (s) => s.hang === rowHang && s.soGhe === seat.soGhe
  );

  let seatClass =
    "w-6 h-6 m-1 rounded border-2 flex items-center justify-center text-xs font-semibold";

  if (isBooked) {
    seatClass += " bg-red-600 text-white border-red-700 cursor-not-allowed";
  } else if (isSelected) {
    seatClass += " bg-green-500 text-white border-green-600";
  } else {
    seatClass +=
      " bg-gray-200 text-gray-800 border-gray-400 hover:bg-yellow-200 cursor-pointer";
  }

  const handleSelect = () => {
    if (!isBooked) {
      dispatch(
        chooseSeat({
          hang: rowHang,
          soGhe: seat.soGhe,
          gia: seat.gia,
        })
      );
    }
  };

  return (
    <div className={seatClass} onClick={handleSelect}>
      {seat.soGhe}
    </div>
  );
}
