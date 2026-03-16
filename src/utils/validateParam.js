/**
 * 양의 정수 검증 유틸리티
 * @param {*} value - 검증할 값
 * @returns {number|null} 유효한 양의 정수 또는 null
 */
function validatePositiveInt(value) {
  const n = parseInt(value, 10);
  if (!Number.isInteger(n) || n < 1) return null;
  return n;
}

module.exports = { validatePositiveInt };
