export class ValidationUtil {
   static isValidDate(dateString: string): boolean {
      if (!dateString || typeof dateString !== 'string') {
         return false;
      }

      const date = new Date(dateString);
      return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
   }

   static isValidDateRange(startDate: string, endDate: string): boolean {
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
         return false;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      return start <= end;
   }

   static parseDecimalString(value: string): number {
      if (!value || typeof value !== 'string') {
         throw new Error('Invalid decimal value: empty or not a string');
      }

      // Replace comma with dot for proper parsing
      const normalizedValue = value.replace(',', '.');
      const parsed = parseFloat(normalizedValue);

      if (isNaN(parsed)) {
         throw new Error(`Invalid decimal value: ${value}`);
      }

      return parsed;
   }

   static isValidWarehouseName(name: string): boolean {
      return typeof name === 'string' && name.trim().length > 0;
   }

   static isValidGeoName(name: string): boolean {
      return typeof name === 'string' && name.trim().length > 0;
   }

   static sanitizeString(input: string, maxLength: number = 255): string {
      if (!input || typeof input !== 'string') {
         return '';
      }

      return input.trim().substring(0, maxLength);
   }

   static isPositiveNumber(value: number): boolean {
      return typeof value === 'number' && !isNaN(value) && value >= 0;
   }

   static validatePaginationParams(limit?: string, offset?: string): { limit: number; offset: number } {
      const parsedLimit = limit ? parseInt(limit, 10) : 100;
      const parsedOffset = offset ? parseInt(offset, 10) : 0;

      if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 1000) {
         throw new Error('Limit must be a positive number between 1 and 1000');
      }

      if (isNaN(parsedOffset) || parsedOffset < 0) {
         throw new Error('Offset must be a non-negative number');
      }

      return { limit: parsedLimit, offset: parsedOffset };
   }

   static validateApiKey(apiKey: string): boolean {
      return typeof apiKey === 'string' && apiKey.trim().length > 0;
   }

   static isValidUrl(url: string): boolean {
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   }
}
