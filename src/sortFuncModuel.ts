import { SortableItem } from "./App";

export const quickSort = async (
    arr: SortableItem[],
    low: number,
    high: number,
    setArray: (arr: SortableItem[]) => void
  ) => {
    if (low < high) {
      const pi = await partition(arr, low, high, setArray);
      await quickSort(arr, low, pi - 1, setArray);
      await quickSort(arr, pi + 1, high, setArray);
    }
};
  
export const partition = async (
    arr: SortableItem[],
    low: number,
    high: number,
    setArray: (arr: SortableItem[]) => void
  ) => {
    const pivotValue = arr[high].value;
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      if (arr[j].value < pivotValue) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    }
  
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 400));
  
    return i + 1;
};
  
  
  export const bubbleSort = async (
    arr: SortableItem[],
    setArray: (arr: SortableItem[]) => void
  ) => {
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i].value > arr[i + 1].value) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 400));
          swapped = true;
        }
      }
      n--;
    } while (swapped);
  };
  


 /**
 * Сортировка выбором
 */
 export const selectionSort = async (
    arr: SortableItem[],
    setArray: (arr: SortableItem[]) => void
  ) => {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      // Ищем минимальный элемент в подмассиве [i..arr.length - 1]
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
      }
      // Меняем местами текущий элемент и найденный минимум
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    }
};
  

 