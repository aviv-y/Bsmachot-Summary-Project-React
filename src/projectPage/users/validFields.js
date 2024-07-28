
export default function validFields(e) {
    /** אובייקט לביטויים רגולרים לכל השדות **/
    let validRgxField = {
        Name: new RegExp('^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$'),
        Pass: new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$'),
        Phon: /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/,
        Mail: new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
     
    }
    let valid = 0
    let test = eval(`validRgxField.${e.target.name}`);
    /** בדיקת ולידציה **/
    if (e.target.value.length > 3 && test.test(e.target.value))
        valid = 1;
    else valid = 0;
    
    return valid;
}
