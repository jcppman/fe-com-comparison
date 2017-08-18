export function Float32ToInt16(buff) {
    return Int16Array.from(buff, d => (d > 0 ? d * 32767 : d * 32768));
}
