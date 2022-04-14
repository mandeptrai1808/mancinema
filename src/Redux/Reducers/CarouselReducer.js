const stateDefault = {
  arrImg: [],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_BANNER_DATA":{
          state.arrImg = action.content;
          return {...state}
      }
    default:
      return { ...state };
  }
};
