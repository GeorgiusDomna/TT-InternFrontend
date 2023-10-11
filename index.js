import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
    // Создание массива для хранения расшифрованных данных
    const decoded = encoded.map((item) => {
      const decodedItem = { ...item };
      for (const key in decodedItem) {
        if (key.endsWith("Id") && key !== "groupId" && key !== "service" && key !== "formatSize" && key !== "ca") {
          const id = decodedItem[key];
          if (translations[id]) {
            decodedItem[key] = translations[id];
          }
        }
      }
      return decodedItem;
    });
  
    // Список уникальных исходных ID
    const uniqueIds = [...new Set(
      Object.values(encoded)
        .map((item) => Object.entries(item))
        .flat()
        .filter(([key, value]) => key.endsWith("Id"))
        .map(([key, value]) => value)
    )];
  
    return { decoded, uniqueIds };
  }
  
  const { decoded, uniqueIds } = decodeFields(encoded, translations);
  console.log("Decoded Data:");
  console.log(decoded);
  console.log("Unique IDs:");
  console.log(uniqueIds);