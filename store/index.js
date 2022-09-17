// set state by mutation
export const state = () => ({
  userInfo: {
    firstname: "",
    lastname: "",
    phoneNumber: "",
    points: "0"
  },
  line: {
    displayName: null,
    pictureUrl: null,
    userId: null,
  },
});

//get value from here
export const getters = {
  getUserInfo(state) {
    return state.userInfo
  },
  getLine(state) {
    return state.line
  }
};

// action set value through mutation
export const mutations = {
  SET_USERINFO(state, data) {
    state.userInfo = {
      ...state.userInfo,
      ...data,
    };
  },
  SET_LINE(state, data) {
    state.line = {
      ...state.line,
      ...data,
    };
  },
};

//every component set throught action
export const actions = {
  setUserInfo({ commit }, data) {
    commit("SET_USERINFO", data);
  },
  setLine({ commit }, data) {
    commit("SET_LINE", data);
  },


};
