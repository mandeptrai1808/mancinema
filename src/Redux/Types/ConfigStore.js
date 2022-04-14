import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { CarouselReducer } from "../Reducers/CarouselReducer";
import { QuanLyPhimReducer } from "../Reducers/QuanLyPhimReducer";
import { QuanLyRapPhimReducer } from "../Reducers/QuanLyRapPhimReducer";
import { UserReducer } from "../Reducers/UserReducer";
import { DatVeReducer } from "../Reducers/DatPhimReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapPhimReducer,
    UserReducer,
    DatVeReducer
    
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
