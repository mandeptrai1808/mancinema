const stateDefault = {
   datVeData: {},
   loadingPage: false
  };
  
  export const DatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
      case "GET_DATA_DAT_VE":{
          state.datVeData = action.content;
          return {...state}
      }
      
      case "SET_LOADING_STATUS":{
        state.loadingPage = action.value;
        return {...state}
      }

      default:
        return { ...state };
    }
  };
  