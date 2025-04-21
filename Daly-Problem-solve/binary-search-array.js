/*
Today's Problem – Binary Search Array
 * Given a SORTED array, find the index of an element
 * using a binary search algorithm.
 * Note that you can't just use indexOf. Your function must run in O(log(n)) time.
*/
let arr=[1,2,3,4,5,6,7,8,9,10]

const binarySearch = (arr, target) => {
    let low = 0;
    let high = arr.length - 1;
    let mid = Math.floor((low + high) / 2);
    while (low <= high) {
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid +1 ;
            mid = Math.floor((low + high) / 2);
        } else{
            high = mid -1 ;
            mid = Math.floor((low + high) / 2);
        }
    }
    return "not found";
}
console.log(binarySearch(arr,11))

/*
After re-reading the code for the last time, I noticed that I repeated this line
mid = Math.floor((low + high) / 2);
Instead, it is preferable to define it within the loop
*/

/*
const binarySearch = (arr, target) => {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid +1 ;
        } else{
            high = mid -1 ;
        }
    }
    return "not found";
}
*/