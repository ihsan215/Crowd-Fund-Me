export const defaultUserParameters = {
  name: undefined,
  email: undefined,
  country: undefined,
  city: undefined,
  profileImg: undefined,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GENERAL_DATA": {
      return {
        name: action.data.name,
        email: action.data.email,
        country: action.data.country,
        city: action.data.city,
        profileImg: action.data.profileImg,
      };
    }

    case "SET_DEFAULT": {
      return defaultUserParameters;
    }

    default: {
      return defaultUserParameters;
    }
  }
};
