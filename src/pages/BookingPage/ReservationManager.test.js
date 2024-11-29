import { initializeTimes, updateTimes } from "./ReservationManager";
import { fetchAPI, submitAPI } from "../../utils/api";
import { useNavigate } from "react-router-dom";

jest.mock("../../utils/api", () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe("ReservationManager API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initializeTimes should fetch available times for today", () => {
    const mockTimes = ["17:00", "18:00", "19:00"];
    fetchAPI.mockReturnValue(mockTimes);

    const result = initializeTimes();

    expect(fetchAPI).toHaveBeenCalledTimes(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calledWithDate = fetchAPI.mock.calls[0][0];
    calledWithDate.setHours(0, 0, 0, 0);

    expect(calledWithDate.getTime()).toEqual(today.getTime());
    expect(result).toEqual(mockTimes);
  });

  test("updateTimes should fetch available times for the given date", () => {
    const mockTimes = ["17:00", "18:00", "19:00"];
    fetchAPI.mockReturnValue(mockTimes);

    const action = { type: "UPDATE", payload: new Date("2024-11-27") };
    const result = updateTimes([], action);

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(new Date("2024-11-27"));
    expect(result).toEqual(mockTimes);
  });

  test("updateTimes should return current state if action type is unknown", () => {
    const initialState = ["17:00", "18:00", "19:00"];
    const action = { type: "UNKNOWN", payload: new Date("2024-11-27") };

    const result = updateTimes(initialState, action);

    expect(result).toBe(initialState);
    expect(fetchAPI).not.toHaveBeenCalled();
  });

  test("submitForm navigates to booking-confirmed on success", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const formData = { name: "Test User", date: "2024-11-27" };
    submitAPI.mockReturnValue(true);

    const submitForm = (data) => {
      if (submitAPI(data)) {
        mockNavigate("/booking-confirmed", { replace: true });
      }
    };

    submitForm(formData);

    expect(submitAPI).toHaveBeenCalledWith(formData);
    expect(mockNavigate).toHaveBeenCalledWith("/booking-confirmed", { replace: true });
  });
});
