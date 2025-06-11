import moment from 'moment';

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format timestamp to readable date
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};

/**
 * Extract unique characters from search history
 * @param {Array} history - Search history array
 * @returns {Array} Array of unique characters
 */
export const getUniqueCharacters = (history) => {
  const unique = {};
  history.forEach(item => {
    if (!unique[item.characterId]) {
      unique[item.characterId] = {
        id: item.characterId,
        name: item.characterName,
        count: 0,
        timestamps: []
      };
    }
    unique[item.characterId].count++;
    unique[item.characterId].timestamps.push(item.timestamp);
  });
  return Object.values(unique).sort((a, b) => b.count - a.count);
};

/**
 * Extract unique users from search history
 * @param {Array} history - Search history array
 * @returns {Array} Array of unique users
 */
export const getUniqueUsers = (history) => {
  const unique = {};
  history.forEach(item => {
    if (!unique[item.userName]) {
      unique[item.userName] = {
        name: item.userName,
        count: 0,
        timestamps: []
      };
    }
    unique[item.userName].count++;
    unique[item.userName].timestamps.push(item.timestamp);
  });
  return Object.values(unique).sort((a, b) => b.count - a.count);
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text with ellipsis if too long
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate random color hex code
 * @returns {string} Random color hex code
 */
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};