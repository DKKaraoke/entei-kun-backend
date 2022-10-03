/**
 * find-by-query-options.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Find by query options
 */
export interface FindByQueryOptions {
  /**
   * Query string
   */
  query?: string;
  /**
   * Ordering
   */
  ordering?: string;
  /**
   * Relations
   */
  relations?: string[];
  /**
   * Nameless properties
   */
  namelessProperties?: string[];
  /**
   * Start
   */
  start?: number;
  /**
   * Limit
   */
  limit?: number;
}
