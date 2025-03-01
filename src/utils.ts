import { nanoid } from 'nanoid';

// При генерации массива
export function generateRandomArray(len: number): { id: string; value: number }[] {
    const newArr: { id: string; value: number }[] = [];
  
    for (let i = 0; i < len; i++) {
      const randomValue = Math.floor(Math.random() * 100);
      // Сгенерировать уникальный id
      const uniqueId = nanoid();
      newArr.push({ id: uniqueId, value: randomValue });
    }
  
    // Если нужно убирать дубликаты по value, можно делать
    // const uniqueByValue = Array.from(new Map(newArr.map(el => [el.value, el])).values());
    // return uniqueByValue;
  
    return newArr;
  }