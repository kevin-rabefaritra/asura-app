
/**
 * Represents a Page element returned by the server
 */
export interface Page<T> {
  content: T[];
  last: boolean;
}