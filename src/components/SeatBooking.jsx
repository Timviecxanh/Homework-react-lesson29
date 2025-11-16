import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmBooking, chooseSeat } from "../MovieBookingRedux/slice";
import Seat from "./Seat";

export default function SeatBooking() {
  const dispatch = useDispatch();
  const { seatsData, selectedSeats } = useSelector(
    (state) => state.movieBookingReducer
  );

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.gia, 0);

  const handleConfirm = () => {
    dispatch(confirmBooking());
  };

  const renderSeatMap = () => (
    <div className="seat-map-container flex flex-col items-center">
      {seatsData.map((row) => (
        <div key={row.hang} className="seat-row flex items-center mb-2">
          <div className="row-name w-8 text-center font-bold text-lg mr-2">
            {row.hang}
          </div>

          <div className="flex space-x-1">
            {row.danhSachGhe.map((seat) => (
              <Seat
                key={row.hang + seat.soGhe}
                seat={seat}
                rowHang={row.hang}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookingInfo = () => (
    <div className="booking-info p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-bold mb-3 text-gray-700">
        🎫 Chi tiết vé đã chọn ({selectedSeats.length})
      </h3>

      {selectedSeats.length === 0 ? (
        <p className="text-gray-500 italic">Chưa có ghế nào được chọn.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="py-2 px-1">Ghế</th>
              <th className="py-2 text-right">Giá (VNĐ)</th>
              <th className="py-2 text-center">Hủy</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeats.map((seat) => (
              <tr
                key={seat.hang + seat.soGhe}
                className="border-b border-gray-200"
              >
                <td className="py-2 px-1 font-semibold">
                  {seat.hang}
                  {seat.soGhe}
                </td>
                <td className="py-2 text-right">{seat.gia.toLocaleString()}</td>
                <td className="py-2 text-center">
                  <button
                    className="text-red-500 font-semibold hover:text-red-700 text-lg leading-none"
                    onClick={() =>
                      dispatch(
                        chooseSeat({ hang: seat.hang, soGhe: seat.soGhe })
                      )
                    }
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-yellow-50">
              <td className="py-2 font-bold text-lg px-1">Tổng Cộng:</td>
              <td
                colSpan="2"
                className="py-2 font-bold text-lg text-right pr-2 text-red-600"
              >
                {totalAmount.toLocaleString()} VNĐ
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <button
        onClick={handleConfirm}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-150 disabled:bg-gray-400"
        disabled={selectedSeats.length === 0}
      >
        Xác Nhận Đặt Vé ({selectedSeats.length})
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 border-b pb-4">
        🎬 ỨNG DỤNG ĐẶT VÉ XEM PHIM
      </h1>

      <div className="screen-display bg-gray-900 text-white text-center p-3 rounded-t-lg mb-8 font-serif text-2xl shadow-xl">
        MÀN HÌNH
      </div>

      <div className="flex justify-center space-x-6 mb-8 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 border-gray-400 border mr-1"></div>
          <span>Ghế Trống</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 border-green-600 border mr-1"></div>
          <span>Ghế Đang Chọn</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-600 border-red-700 border mr-1"></div>
          <span>Ghế Đã Đặt</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 flex justify-center bg-white p-6 rounded-lg shadow-lg">
          {renderSeatMap()}
        </div>

        <div className="col-span-1">{renderBookingInfo()}</div>
      </div>
    </div>
  );
}
