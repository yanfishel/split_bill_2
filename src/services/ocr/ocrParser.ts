import { BillItem } from '../../types';
import { generateId } from '../../utils/idGenerator';

interface ParseResult {
  items: BillItem[];
  totalRaw: number | null;
  restaurantName: string | null;
}

const STOP_WORDS = [
  'инн', 'кпп', 'огрн', 'кассир', 'официант', 'смена',
  'чек', 'фискальный', 'документ', 'спасибо', 'приятного',
  'аппетита', 'wi-fi', 'пароль', 'адрес', 'тел', 'телефон',
  'дата', 'время', 'ндс', 'нал', 'безнал', 'visa', 'mastercard',
  'оплата', 'сдача', 'предоплата', 'скидка', 'discount'
];

export const parseReceipt = (lines: string[]): ParseResult => {
  const items: BillItem[] = [];
  let totalRaw: number | null = null;
  let restaurantName: string | null = null;

  // Pre-processing: trim and remove empty lines
  const cleanLines = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (cleanLines.length === 0) {
    return { items, totalRaw, restaurantName };
  }

  // 1. Heuristic for Restaurant Name (usually the first line)
  restaurantName = cleanLines[0];

  for (const line of cleanLines) {
    const lowerLine = line.toLowerCase();

    // 2. Identify Total sum
    if (lowerLine.includes('итого') || lowerLine.includes('total') || lowerLine.includes('всего')) {
      const match = line.match(/(\d+[.,]\d{2})/);
      if (match) {
        totalRaw = parseFloat(match[1].replace(',', '.'));
      }
      continue;
    }

    // 3. Filter stop words
    if (STOP_WORDS.some((word) => lowerLine.includes(word))) {
      continue;
    }

    // 4. Extract Items using regex patterns
    // Pattern A: Name ... Quantity x Price ... TotalPrice
    // Example: "Pizza 1 x 500.00 500.00"
    const patternA = /(.+?)\s+(\d+)\s*[x*]\s*(\d+[.,]\d{2})\s+(\d+[.,]\d{2})/;
    const matchA = line.match(patternA);

    if (matchA) {
      items.push({
        id: generateId(),
        name: matchA[1].trim(),
        quantity: parseFloat(matchA[2]),
        price: parseFloat(matchA[3].replace(',', '.')),
        totalPrice: parseFloat(matchA[4].replace(',', '.')),
        assignedTo: [],
      });
      continue;
    }

    // Pattern B: Name ... TotalPrice
    // Example: "Coffee 150.00"
    const patternB = /(.+?)\s+(\d+[.,]\d{2})$/;
    const matchB = line.match(patternB);

    if (matchB) {
      const price = parseFloat(matchB[2].replace(',', '.'));
      items.push({
        id: generateId(),
        name: matchB[1].trim(),
        quantity: 1,
        price: price,
        totalPrice: price,
        assignedTo: [],
      });
      continue;
    }
  }

  return { items, totalRaw, restaurantName };
};
