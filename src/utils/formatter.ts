/**
 * Date formatting utility for Backendless timestamps
 */
export const formatDate = (timestamp: number | Date): string => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
