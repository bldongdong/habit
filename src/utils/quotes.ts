import { getTodayKey } from './date';
import type { QuoteLanguage } from '../types/habit';

type QuoteItem = {
  quote_kr: string;
  quote_en: string;
  author_kr: string;
  author_en: string;
};

const quotes = require('../data/quotes.json') as QuoteItem[];

export function getTodaysQuote(quoteLanguage: QuoteLanguage) {
  const validQuotes = quotes.filter((item) =>
    quoteLanguage === 'en' ? item.quote_en.trim().length > 0 : item.quote_kr.trim().length > 0
  );

  if (validQuotes.length === 0) {
    return null;
  }

  const todayKey = getTodayKey();
  const daySeed = Number(todayKey.replaceAll('-', ''));
  const quoteIndex = daySeed % validQuotes.length;
  const selectedQuote = validQuotes[quoteIndex];

  return quoteLanguage === 'en'
    ? {
        quote: selectedQuote.quote_en,
        author: selectedQuote.author_en,
      }
    : {
        quote: selectedQuote.quote_kr,
        author: selectedQuote.author_kr,
      };
}
