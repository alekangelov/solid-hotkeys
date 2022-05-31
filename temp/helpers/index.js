export const arrayEquality = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};
export function whatModifierIsPressed(event) {
    const { ctrlKey, altKey, shiftKey } = event;
    return onlyTruthy([ctrlKey && "ctrl", altKey && "alt", shiftKey && "shift"]);
}
export function onlyTruthy(arr) {
    return arr.filter(Boolean);
}
export const arrToUpperCase = (arr) => {
    return arr.map((item) => item.toUpperCase());
};
