/**
 * Estimates the BSON size (in MB) of a document, given its JSON string.
 * Adds a 15% overhead to account for BSON metadata.
 *
 * @param jsonString - The JSON string representation of your document.
 * @returns Estimated size in megabytes (MB)
 */
export function estimateJsonSize(jsonString: string): number {
  const byteSize = Buffer.byteLength(jsonString, "utf8");
  const estimatedBsonSize = byteSize * 1.15;
  const sizeInMB = estimatedBsonSize / 1024 / 1024;
  return sizeInMB;
}
