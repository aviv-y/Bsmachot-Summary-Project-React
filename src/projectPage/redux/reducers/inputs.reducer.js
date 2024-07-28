
const initialState = {
  url: '',
  inptName: 0, //מצב שדה שם
  inptPass: 0, //מצב שדה סיסמא
  inptPhon: 0, //מצב שדה טלפון
  inptMail: 0, //מצב שדה מייל
  userType: 0, //האם זה לקוח פרטי או עסקי
  typeProf: 0, //מצב שדה סוג מקצוע
  userStatus: 0, //משתמש מחובר או לא
  btnNavB: 1, //כפתור תפריט
  area: "",
  city: [],
  profSelect: "", //מצב בחירת מקצוע
  bUSelect: {}, //מצב בחירת איש מקצוע
  img: '',
  userData: {}

};

export function reducer(state=initialState, action) {
    switch (action.type) {
      case "SET URL":
        return { ...state, url: action.payload };
      case "SET INPT NAME":
        return { ...state, inptName: action.payload };
      case "SET INPT PASS":
        return { ...state, inptPass: action.payload };
      case "SET INPT PHON":
        return { ...state, inptPhon: action.payload };
      case "SET INPT MAIL":
        return { ...state, inptMail: action.payload };
      case "SET USER TYPE":
        return { ...state, userType: action.payload };
      case "SET TYPE PROFESSION":
        return { ...state, typeProf: action.payload };
      case "SET BTN NAV BAR":
        return { ...state, btnNavB: action.payload };
      case "SET USER STATUS":
        return { ...state, userStatus: action.payload };
      case "SET PROF":
        return { ...state, profSelect: action.payload };
      case "SET BUSER SELECTED":
        return { ...state, bUSelect: action.payload };
      case "SET IMAGE":
        return { ...state, img: action.payload };
      case "SET USER DATA":
        return { ...state, userData: action.payload };
      default:
        return { ...state };
    }
}
