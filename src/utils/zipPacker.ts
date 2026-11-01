// Lightweight Pure-TypeScript ZIP Archive Creator (Stored/No Compression)
// Follows PKZip 2.0 Specification. 100% Client-Side, Zero External Dependencies.

// CRC-32 Lookup Table
const crcTable: Uint32Array = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

function computeCrc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export interface ZipFileInput {
  filename: string;
  data: Uint8Array;
}

export function createZipBlob(files: ZipFileInput[]): Blob {
  const localHeaders: Uint8Array[] = [];
  const centralHeaders: Uint8Array[] = [];
  let currentOffset = 0;

  files.forEach((file) => {
    const filenameBytes = new TextEncoder().encode(file.filename);
    const crc = computeCrc32(file.data);
    const size = file.data.length;

    // Local Header (30 bytes + filename + data)
    const localHeader = new Uint8Array(30 + filenameBytes.length + size);
    const view = new DataView(localHeader.buffer);

    view.setUint32(0, 0x04034b50, true); // Local header signature
    view.setUint16(4, 20, true); // Version needed
    view.setUint16(6, 0, true); // General purpose flag
    view.setUint16(8, 0, true); // Compression (0 = Store)
    view.setUint16(10, 0, true); // Time
    view.setUint16(12, 0, true); // Date
    view.setUint32(14, crc, true); // CRC-32
    view.setUint32(18, size, true); // Compressed size
    view.setUint32(22, size, true); // Uncompressed size
    view.setUint16(26, filenameBytes.length, true); // File name length
    view.setUint16(28, 0, true); // Extra field length

    localHeader.set(filenameBytes, 30);
    localHeader.set(file.data, 30 + filenameBytes.length);

    localHeaders.push(localHeader);

    // Central Directory Header (46 bytes + filename)
    const centralHeader = new Uint8Array(46 + filenameBytes.length);
    const cView = new DataView(centralHeader.buffer);

    cView.setUint32(0, 0x02014b50, true); // Central directory signature
    cView.setUint16(4, 20, true); // Version made by
    cView.setUint16(6, 20, true); // Version needed
    cView.setUint16(8, 0, true); // Flags
    cView.setUint16(10, 0, true); // Compression
    cView.setUint16(12, 0, true); // Time
    cView.setUint16(14, 0, true); // Date
    cView.setUint32(16, crc, true); // CRC-32
    cView.setUint32(20, size, true); // Compressed size
    cView.setUint32(24, size, true); // Uncompressed size
    cView.setUint16(28, filenameBytes.length, true); // Filename length
    cView.setUint16(30, 0, true); // Extra length
    cView.setUint16(32, 0, true); // Comment length
    cView.setUint16(34, 0, true); // Disk start
    cView.setUint16(36, 0, true); // Internal attributes
    cView.setUint32(38, 0, true); // External attributes
    cView.setUint32(42, currentOffset, true); // Offset of local header

    centralHeader.set(filenameBytes, 46);
    centralHeaders.push(centralHeader);

    currentOffset += localHeader.length;
  });

  const centralDirOffset = currentOffset;
  let centralDirSize = 0;
  centralHeaders.forEach((h) => (centralDirSize += h.length));

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const eView = new DataView(eocd.buffer);

  eView.setUint32(0, 0x06054b50, true); // EOCD signature
  eView.setUint16(4, 0, true); // Disk number
  eView.setUint16(6, 0, true); // Start disk
  eView.setUint16(8, files.length, true); // Central records this disk
  eView.setUint16(10, files.length, true); // Total central records
  eView.setUint32(12, centralDirSize, true); // Central directory size
  eView.setUint32(16, centralDirOffset, true); // Central directory offset
  eView.setUint16(20, 0, true); // Comment length

  // Combine all buffers into single contiguous ArrayBuffer
  const totalLength =
    localHeaders.reduce((acc, h) => acc + h.length, 0) +
    centralHeaders.reduce((acc, h) => acc + h.length, 0) +
    eocd.length;

  const combined = new Uint8Array(totalLength);
  let pos = 0;
  for (const h of localHeaders) {
    combined.set(h, pos);
    pos += h.length;
  }
  for (const h of centralHeaders) {
    combined.set(h, pos);
    pos += h.length;
  }
  combined.set(eocd, pos);

  return new Blob([combined.buffer as ArrayBuffer], { type: "application/zip" });
}

// Helper: Convert Data URL (base64) to Uint8Array
export function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
